import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const COLORS = {
  primary: "#0F113C", // page/nav background + unselected pill bg
  selected: "#151743", // lighter navy — selected pill bg
  accent: "#10B981", // teal
  white: "#ffffff",
  textGray: "#6B7280",
};

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
    <View className=" border-b-white border-b-[1px]">
      <View className="flex-row-reverse items-center  px-3 py-2.5">
        {/* Tune icon — white circle, same treatment as the heart icon on
            the property card (white circle floating on the image) */}
        <TouchableOpacity
          onPress={() => setShowAdvanced((prev) => !prev)}
          className="items-center justify-center w-10 h-10 bg-white rounded-full shadow-md ms-2"
        >
          <Ionicons name="options-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: 8,
          }}
        >
          {FILTERS.map((filter) => {
            const isSelected = selected === filter.key;
            return (
              <TouchableOpacity
                key={filter.key}
                onPress={() => setSelected(filter.key)}
                className={`flex-row-reverse items-center px-4 py-2 rounded-lg border border-gray-500 ${
                  isSelected ? "bg-[#424474]" : "bg-white"
                }`}
              >
                <Text
                  className={`text-sm text-white ${
                    isSelected ? "font-bold" : "font-semibold text-[#0F113C]"
                  }`}
                >
                  {filter.label}
                </Text>
                {filter.hasDropdown && (
                  <Ionicons
                    name="chevron-down"
                    size={14}
                    color={COLORS.white}
                    className="ms-1"
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
