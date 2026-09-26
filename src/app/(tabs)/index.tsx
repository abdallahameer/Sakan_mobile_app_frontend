import PropertyCard from "@/components/propertyCard";
import PropertyFilter from "@/components/propertyFilter";
import PropertySearchBar from "@/components/propertySearchBar";
import { PROPERTIES } from "@/data/myAds";
import type { PropertyFilterForm } from "@/types";
import { useForm } from "react-hook-form";
import { FlatList } from "react-native";
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
        keyExtractor={(p) => p.id}
        className="flex-1"
        data={PROPERTIES}
        renderItem={({ item }) => <PropertyCard property={item} />}
        contentContainerClassName="px-4 py-4 "
      />
    </SafeAreaView>
  );
}
