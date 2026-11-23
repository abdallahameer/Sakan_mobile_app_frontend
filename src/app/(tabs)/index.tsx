import PropertyCard from "@/components/propertyCard";
import PropertyFilter from "@/components/propertyFilter";
import PropertySearchBar from "@/components/propertySearchBar";
import VideoSplash from "@/components/SplashScreen";
import { api, getSavedToken } from "@/lib/api";
import type { PropertyFilterForm } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeProvider";

export default function Index() {
  const { colors } = useTheme();
  const [isLoadingSplash, setIsLoadingSplash] = useState(true);
  // undefined = still checking, null = not logged in, string = logged in
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    getSavedToken().then(setToken);
  }, []);

  const {
    control,
    getValues,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<PropertyFilterForm>({
    defaultValues: {
      listingType: null,
      paymentType: null,
      familyOrSingle: null,
      propertyStatus: null,
      propertyType: null,
      furnished: null,
      rooms: null,
      bathrooms: null,
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
    },
  });
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const formValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchText.trim()), 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["properties", formValues, debouncedSearch],
      initialPageParam: 1,
      enabled: !!token, // do not load ads for a logged-out user
      queryFn: async ({ pageParam }) =>
        (
          await api.get("/properties", {
            params: {
              page: pageParam,
              limit: 5,
              ...formValues,
              search: debouncedSearch,
            },
          })
        ).data,
      getNextPageParam: (last) =>
        last.pagination.hasMore ? last.pagination.page + 1 : undefined,
    });

  const properties = data?.pages.flatMap((p) => p.properties) ?? [];

  if (isLoadingSplash) return <VideoSplash setLoading={setIsLoadingSplash} />;

  // still reading the token from the phone (very short)
  if (token === undefined) return null;

  // not logged in -> go to the login page
  if (token === null) return <Redirect href={"/login/login" as any} />;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#F0F1FA] dark:bg-[#0B0D1D]">
      <PropertySearchBar
        placeholder="ابحث بي المدينة او الحي او العنوان"
        value={searchText}
        onChangeText={setSearchText}
      />
      <PropertyFilter
        getValues={getValues}
        reset={reset}
        setError={setError}
        errors={errors}
        control={control}
        clearErrors={clearErrors}
        formValues={formValues}
        setValue={setValue}
      />

      <FlatList
        keyExtractor={(property) => property.id}
        data={properties}
        renderItem={({ item }) => <PropertyCard property={item} />}
        contentContainerClassName="px-4 py-4"
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={colors.text} className="my-4" />
          ) : null
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" color={colors.text} className="my-4" />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
