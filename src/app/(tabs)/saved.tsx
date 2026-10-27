import PropertyCard from "@/components/propertyCard";
import { api } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedProperties() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["savedProperties"],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) =>
        (
          await api.get("/favorites", {
            params: { page: pageParam, limit: 5 },
          })
        ).data,
      getNextPageParam: (last) =>
        last.pagination.hasMore ? last.pagination.page + 1 : undefined,
    });

  const SavedProperties = data?.pages.flatMap((p) => p.properties) ?? [];

  return (
    <SafeAreaView className="flex-1">
      <View>
        <View className="flex-row pt-3 pl-3 items-center justify-center  border-b-[#0F113C] border-b-[1px] mb-3">
          <Text className="text-2xl font-bold text-[#0F113C] ">المحفوظات</Text>
        </View>

        <FlatList
          keyExtractor={(property) => property.id}
          data={SavedProperties}
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
      </View>
    </SafeAreaView>
  );
}
