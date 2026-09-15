import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type FilterOption = {
  key: string;
  label: string;
  hasDropdown?: boolean;
};

const FILTERS: FilterOption[] = [
  { key: "sale", label: "للبيع", hasDropdown: true },
  { key: "all", label: "الجميع" },
  { key: "ready", label: "جاهز" },
  { key: "underConstruction", label: "قيد الإنشاء" },
  { key: "residential", label: "سكني", hasDropdown: true },
];

export default function PropertyFilter() {
  const [selected, setSelected] = useState<string>("all");
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    // Sits directly on the app's dark navy page background — same bg as
    // the home screen, not a separate white bar.
    <View>
      <View className="flex-row-reverse items-center  px-3 py-2.5">
        {/* Tune icon — white circle, same treatment as the heart icon on
            the property card (white circle floating on the image) */}
        <TouchableOpacity
          onPress={() => setShowAdvanced((prev) => !prev)}
          className="items-center justify-center w-10 h-10 bg-white rounded-full shadow-md ms-2"
        >
          <Ionicons name="options-outline" size={20} color="#0F113C" />
        </TouchableOpacity>

        <FlatList
          horizontal
          ItemSeparatorComponent={() => <View className=" w-2" />}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSelected(item.key)}
              className={`flex-row-reverse items-center px-4 py-2 rounded-lg border border-gray-500 ${
                selected == item.key ? "bg-[#424474]" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm  ${
                  selected == item.key
                    ? "font-bold text-white"
                    : "font-semibold text-[#0F113C]"
                }`}
              >
                {item.label}
              </Text>
              {item.hasDropdown && (
                <Ionicons
                  name="chevron-down"
                  size={14}
                  color={selected == item.key ? "#ffffff" : "#0F113C"}
                  className="ms-1"
                />
              )}
            </TouchableOpacity>
          )}
          data={FILTERS}
          keyExtractor={(item) => item.key}
        />
      </View>

      {/* Advanced filter options — shown as a white card, same as the
          property-details card style below the image carousel */}
      {showAdvanced && (
        <View className="p-4 mx-3 mb-3 bg-white rounded-2xl">
          <Text className="text-slate-900 font-bold mb-2.5">نطاق السعر</Text>
          <Text className="font-bold text-slate-900">نوع العقار</Text>
        </View>
      )}
    </View>
  );
}
