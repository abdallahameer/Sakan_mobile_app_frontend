import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export type LocationOption = { id: number; name: string };

type Props = {
  cities: LocationOption[];
  neighborhoods: LocationOption[];
  loadingCities: boolean;
  loadingNeighborhood: boolean;
  citiesError: boolean;
  neighborhoodsError: boolean;
  city: string;
  neighborhood: string;
  onChangeNeighborhood: (value: {
    neighborhood: string;
    neighborhoodId: number;
  }) => void;
  onChangeCity: (value: { city: string; cityId: number }) => void;
};

export default function LocationPicker({
  cities,
  neighborhoods,
  loadingCities,
  citiesError,
  loadingNeighborhood,
  neighborhoodsError,
  city,
  neighborhood,
  onChangeCity,
  onChangeNeighborhood,
}: Props) {
  const [open, setOpen] = useState<"city" | "neighborhood" | null>(null);
  const { colors } = useTheme();

  const failed = citiesError || neighborhoodsError;
  const loading = open === "city" ? loadingCities : loadingNeighborhood;
  const options = open === "city" ? cities : neighborhoods;
  const selected = open === "city" ? city : neighborhood;

  const choose = (name: LocationOption) => {
    if (open === "city") {
      onChangeCity({ city: name.name, cityId: name.id });
    } else {
      onChangeNeighborhood({
        neighborhood: name.name,
        neighborhoodId: name.id,
      });
    }
    setOpen(null);
  };

  return (
    <View style={{ gap: 16 }}>
      <Field
        label="المدينة*"
        value={city}
        placeholder="اختر المدينة"
        onPress={() => setOpen("city")}
      />
      <Field
        label="المنطقة*"
        value={neighborhood}
        placeholder={city ? "اختر المنطقة" : "اختر المدينة أولاً"}
        disabled={!city}
        onPress={() => setOpen("neighborhood")}
      />

      {failed && (
        <Text className="text-sm text-red-500">
          تعذر تحميل القوائم، تأكد من الاتصال بالإنترنت
        </Text>
      )}

      <Modal
        visible={open !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(null)}
      >
        <Pressable
          className="justify-end flex-1 bg-black/40"
          onPress={() => setOpen(null)}
        >
          <Pressable
            className="px-4 pt-4 pb-8 bg-white rounded-t-2xl dark:bg-[#0B0D1D]"
            style={{ maxHeight: "60%" }}
            onPress={() => {}}
          >
            <Text className="mb-3 text-lg font-bold text-[#0F113C] dark:text-[#F3F4F6]">
              {open === "city" ? "اختر المدينة" : "اختر المنطقة"}
            </Text>

            {loading ? (
              <ActivityIndicator className="py-6" />
            ) : options.length === 0 ? (
              <Text className="py-6 text-center text-[#6B7280] dark:text-[#A1A1AA]">
                لا توجد خيارات
              </Text>
            ) : (
              <FlatList
                data={options}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => choose(item)}
                    className="flex-row items-center justify-between py-3 border-b border-[#E5E7EB] dark:border-[#36384D]"
                  >
                    <Text className="text-base text-[#0F113C] dark:text-[#F3F4F6]">
                      {item.name}
                    </Text>
                    {item.name === selected && (
                      <Ionicons name="checkmark" size={20} color={colors.accent} />
                    )}
                  </Pressable>
                )}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function Field({
  label,
  value,
  placeholder,
  disabled,
  onPress,
}: {
  label: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text className="text-sm font-semibold text-[#0F113C] dark:text-[#F3F4F6]">{label}</Text>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className="flex-row items-center justify-between px-4 py-4 bg-white border border-[#E5E7EB] rounded-xl dark:bg-[#17192D] dark:border-[#36384D]"
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <Text
          className={
            value
              ? "text-base text-[#0F113C] dark:text-[#F3F4F6]"
              : "text-base text-[#9CA3AF] dark:text-[#A1A1AA]"
          }
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={colors.secondaryText} />
      </Pressable>
    </View>
  );
}
