import PropertyCard from "@/components/propertyCard";
import PropertyFilter from "@/components/propertyFilter";
import PropertySearchBar from "@/components/propertySearchBar";
import { api } from "@/lib/api";
import type { PropertyFilterForm } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
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
      propertyType: "rent",
      paymentType: "monthly",
      familyOrSingle: "family",
      status: "all",
      residentialOrCommercial: "residential",
      furnished: "furnished",
      rooms: null,
      bathRooms: null,
      minPrice: "",
      maxPrice: "",
      minSpace: "",
      maxSpace: "",
    },
  });
  const formValues = watch();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["properties"],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) =>
        (
          await api.get("/properties", {
            params: { page: pageParam, limit: 10, hello: "true" },
          })
        ).data,
      getNextPageParam: (last) =>
        last.pagination.hasMore ? last.pagination.page + 1 : undefined,
    });

  const properties = data?.pages.flatMap((p) => p.properties) ?? [];

  return (
    <SafeAreaView edges={["top"]} className="flex-1   bg-[#F0F1FA]">
      <PropertySearchBar />
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
            <ActivityIndicator size="large" className="my-4 text-[#0F113C]" />
          ) : null
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" className="my-4 text-[#0F113C]" />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
