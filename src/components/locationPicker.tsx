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
  onChange: (value: { city: string; neighborhood: string }) => void;
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
  onChange,
}: Props) {
  const [open, setOpen] = useState<"city" | "neighborhood" | null>(null);

  const failed = citiesError || neighborhoodsError;
  const loading = open === "city" ? loadingCities : loadingNeighborhood;
  const options = open === "city" ? cities : neighborhoods;
  const selected = open === "city" ? city : neighborhood;

  const choose = (name: string) => {
    if (open === "city") {
      onChange({ city: name, neighborhood: name === city ? neighborhood : "" });
    } else {
      onChange({ city, neighborhood: name });
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
            className="px-4 pt-4 pb-8 bg-white rounded-t-2xl"
            style={{ maxHeight: "60%" }}
            onPress={() => {}}
          >
            <Text className="mb-3 text-lg font-bold text-[#0F113C]">
              {open === "city" ? "اختر المدينة" : "اختر المنطقة"}
            </Text>

            {loading ? (
              <ActivityIndicator className="py-6" />
            ) : options.length === 0 ? (
              <Text className="py-6 text-center text-[#6B7280]">
                لا توجد خيارات
              </Text>
            ) : (
              <FlatList
                data={options}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => choose(item.name)}
                    className="flex-row items-center justify-between py-3 border-b border-[#E5E7EB]"
                  >
                    <Text className="text-base text-[#0F113C]">
                      {item.name}
                    </Text>
                    {item.name === selected && (
                      <Ionicons name="checkmark" size={20} color="#10B981" />
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
  return (
    <View style={{ gap: 8 }}>
      <Text className="text-sm font-semibold text-[#0F113C]">{label}</Text>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className="flex-row items-center justify-between px-4 py-4 bg-white border border-[#E5E7EB] rounded-xl"
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <Text
          className={
            value ? "text-base text-[#0F113C]" : "text-base text-[#9CA3AF]"
          }
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </Pressable>
    </View>
  );
}
