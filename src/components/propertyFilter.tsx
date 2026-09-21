import { PropertyFilterForm, RoomsNumber } from "@/data/typs";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AllFiltersModal from "./filterModals/allFiltersModal";
import BathRoomsNumberModal from "./filterModals/bathRoomsNumberModal";
import FamilyOrSingleModal from "./filterModals/familyOrSingleModal";
import IsFurnishedModal from "./filterModals/isFurnishedModal";
import PriceRangeModal from "./filterModals/priceRangeModal";
import PropertyTypeModal from "./filterModals/propertyTypeModal";
import ResidentialorCommercial from "./filterModals/residentialorCommercial";
import RoomsNumberModal from "./filterModals/roomsNumberModal";
import SpaceRangeModal from "./filterModals/SpaceRangeModal";

type PropertyFilterProps = {
  setValue: UseFormSetValue<PropertyFilterForm>;
  formValues: PropertyFilterForm;
  control: Control<PropertyFilterForm>;
  getValues: UseFormGetValues<PropertyFilterForm>;
  setError: UseFormSetError<PropertyFilterForm>;
  clearErrors: UseFormClearErrors<PropertyFilterForm>;
  errors: FieldErrors<PropertyFilterForm>;
  reset: UseFormReset<PropertyFilterForm>;
};

export default function PropertyFilter({
  setValue,
  formValues,
  control,
  getValues,
  setError,
  clearErrors,
  errors,
  reset,
}: PropertyFilterProps) {
  const [openPropertyTypeModal, setOpenPropertyTypeModal] = useState(false);
  const [openRoomsNumberModal, setOpenRoomsNumberModal] = useState(false);
  const [openIsFurnishedModal, setOpenIsFurnishedModal] = useState(false);
  const [openBathRoomsNumberModal, setOpenBathRoomsNumberModal] =
    useState(false);
  const [openPricerangeModal, setOpenPriceRangeModal] = useState(false);
  const [openSpaceRangeModal, setOpenSpaceRangeModal] = useState(false);
  const [
    openResidentialorCommercialModal,
    setopenResidentialorCommercialModal,
  ] = useState(false);
  const [openFiltersModal, setOpenFiltersModal] = useState(false);
  const [openFamilyOrSingleModal, setOpenFamilyOrSingleModal] = useState(false);
  const propertyTypeLabel =
    formValues.propertyType === "sale"
      ? "للبيع"
      : formValues.propertyType === "rent"
        ? "للإيجار"
        : "نوع العملية";

  const residentialOrCommercialLable =
    formValues.residentialOrCommercial === "residential"
      ? "سكني"
      : formValues.residentialOrCommercial === "commercial"
        ? "تجاري"
        : "نوع العقار";

  const isFurnishedLable =
    formValues.furnished === "furnished"
      ? "مفروش"
      : formValues.furnished === "unfurnished"
        ? "غير مفروش"
        : "التأثيث";

  const familyOrSingleLable =
    formValues.familyOrSingle === "family"
      ? "عوائل"
      : formValues.familyOrSingle === "single"
        ? "عزاب"
        : "نوع السكن";

  const handleApplyRooms = (rooms: RoomsNumber) => {
    setValue("rooms", rooms);
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      className="w-full h-[10%]"
      horizontal
    >
      <View className="flex-row items-center gap-2 px-3 py-2.5">
        <TouchableOpacity
          onPress={() => setOpenFiltersModal(true)}
          className="items-center justify-center w-10 h-10 bg-white rounded-full shadow-md"
        >
          <Ionicons name="options-outline" size={20} color="#0F113C" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setOpenPropertyTypeModal(true);
          }}
          className={`flex-row items-center px-4 py-3 rounded-lg border ${formValues.propertyType == "sale" || formValues.propertyType == "rent" ? "bg-[#0F113C] " : "bg-white"} border-gray-500  `}
        >
          <Text
            className={`text-sm ${formValues.propertyType == "sale" || formValues.propertyType == "rent" ? "text-white" : "text-[#0F113C]"}`}
          >
            {propertyTypeLabel}
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={
              formValues.propertyType === "sale" ||
              formValues.propertyType === "rent"
                ? "white"
                : "#0F113C"
            }
            className="ms-1"
          />
        </TouchableOpacity>

        {formValues.propertyType == "sale" ? (
          <View className="flex-row gap-3 p-1 bg-white border border-gray-500 rounded-lg">
            <TouchableOpacity
              onPress={() => setValue("status", "all")}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.status == "all" ? "bg-[#0F113C]" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${formValues.status == "all" ? "text-[#ffffff]" : "text-[#0F113C]"} `}
              >
                الجميع
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue("status", "ready")}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.status == "ready" ? "bg-[#0F113C]" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${formValues.status == "ready" ? "text-[#ffffff]" : "text-[#0F113C]"} `}
              >
                جاهز
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue("status", "underConstruction")}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.status == "underConstruction"
                  ? "bg-[#0F113C]"
                  : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${
                  formValues.status == "underConstruction"
                    ? "text-white"
                    : "text-[#0F113C]"
                }`}
              >
                قيد الإنشاء
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {formValues.propertyType == "rent" ? (
          <View className="flex-row gap-3 p-1 bg-white border border-gray-500 rounded-lg">
            <TouchableOpacity
              onPress={() => setValue("paymentType", "yearly")}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.paymentType == "yearly" ? "bg-[#0F113C]" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${formValues.paymentType == "yearly" ? "text-[#ffffff]" : "text-[#0F113C]"} `}
              >
                سنوي
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue("paymentType", "monthly")}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.paymentType == "monthly"
                  ? "bg-[#0F113C]"
                  : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${formValues.paymentType == "monthly" ? "text-[#ffffff]" : "text-[#0F113C]"} `}
              >
                شهري
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue("paymentType", "daily")}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.paymentType == "daily" ? "bg-[#0F113C]" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${
                  formValues.paymentType == "daily"
                    ? "text-white"
                    : "text-[#0F113C]"
                }`}
              >
                يومي
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {formValues.propertyType == "rent" &&
        formValues.residentialOrCommercial == "residential" ? (
          <TouchableOpacity
            onPress={() => setOpenFamilyOrSingleModal(true)}
            className={`flex-row items-center px-4 py-3 rounded-lg border border-gray-500 ${
              formValues.familyOrSingle ? "bg-[#0F113C]" : "bg-white"
            }`}
          >
            <Text
              className={`text-sm ${formValues.familyOrSingle ? "text-white" : "text-[#0F113C]"}`}
            >
              {familyOrSingleLable}
            </Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color={formValues.familyOrSingle ? "#ffffff" : "#0F113C"}
              className="ms-1"
            />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={() => setopenResidentialorCommercialModal(true)}
          className={`flex-row items-center px-4 py-3 rounded-lg border border-gray-500 ${
            formValues.residentialOrCommercial ? "bg-[#0F113C]" : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.residentialOrCommercial ? "text-white" : "text-[#0F113C]"}`}
          >
            {residentialOrCommercialLable}
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={formValues.residentialOrCommercial ? "#ffffff" : "#0F113C"}
            className="ms-1"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setOpenIsFurnishedModal(true)}
          className={`flex-row items-center px-4 py-3 rounded-lg border border-gray-500 ${
            formValues.furnished ? "bg-[#0F113C]" : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.furnished ? "text-white" : "text-[#0F113C]"}`}
          >
            {isFurnishedLable}
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={formValues.furnished ? "#ffffff" : "#0F113C"}
            className="ms-1"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setOpenRoomsNumberModal(true)}
          className={`flex-row items-center px-4 py-3 rounded-lg border border-gray-500 ${
            formValues.rooms ? "bg-[#0F113C]" : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.rooms ? "text-white" : "text-[#0F113C]"}`}
          >
            الغرف
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={formValues.rooms ? "#ffffff" : "#0F113C"}
            className="ms-1"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setOpenBathRoomsNumberModal(true)}
          className={`flex-row items-center px-4 py-3 rounded-lg border border-gray-500 ${
            formValues.bathRooms ? "bg-[#0F113C]" : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.bathRooms ? "text-white" : "text-[#0F113C]"}`}
          >
            الحمامات
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={formValues.bathRooms ? "#ffffff" : "#0F113C"}
            className="ms-1"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setOpenPriceRangeModal(true)}
          className={`flex-row items-center px-4 py-3 rounded-lg border border-gray-500 ${
            formValues.maxPrice || formValues.minPrice
              ? "bg-[#0F113C]"
              : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.maxPrice || formValues.minPrice ? "text-white" : "text-[#0F113C]"}`}
          >
            السعر
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={
              formValues.maxPrice || formValues.minPrice ? "#ffffff" : "#0F113C"
            }
            className="ms-1"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setOpenSpaceRangeModal(true)}
          className={`flex-row items-center px-4 py-3 rounded-lg border border-gray-500 ${
            formValues.maxSpace || formValues.minSpace
              ? "bg-[#0F113C]"
              : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.maxSpace || formValues.minSpace ? "text-white" : "text-[#0F113C]"}`}
          >
            المساحة
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={
              formValues.maxSpace || formValues.minSpace ? "#ffffff" : "#0F113C"
            }
            className="ms-1"
          />
        </TouchableOpacity>
      </View>

      <AllFiltersModal
        visible={openFiltersModal}
        onClose={() => setOpenFiltersModal(false)}
        formValues={formValues}
        setError={setError}
        clearErrors={clearErrors}
        errors={errors}
        reset={reset}
      />

      <PropertyTypeModal
        value={formValues.propertyType}
        onApply={(type) => {
          setValue("propertyType", type);
          setValue("status", type === "sale" ? formValues.status : null);
          setValue(
            "paymentType",
            type === "rent" ? formValues.paymentType : null,
          );
          setValue(
            "familyOrSingle",
            type === "rent" &&
              formValues.residentialOrCommercial === "residential"
              ? formValues.familyOrSingle
              : null,
          );
          setOpenPropertyTypeModal(false);
        }}
        onClose={() => setOpenPropertyTypeModal(false)}
        visible={openPropertyTypeModal}
      />

      <ResidentialorCommercial
        value={formValues.residentialOrCommercial}
        onClose={() => {
          setopenResidentialorCommercialModal(false);
        }}
        onApply={(type) => {
          setValue("residentialOrCommercial", type);
          setValue(
            "familyOrSingle",
            type === "residential" ? formValues.familyOrSingle : null,
          );
          setopenResidentialorCommercialModal(false);
        }}
        visible={openResidentialorCommercialModal}
      />

      <FamilyOrSingleModal
        onApply={(value) => {
          setValue("familyOrSingle", value);
          setOpenFamilyOrSingleModal(false);
        }}
        value={formValues.familyOrSingle}
        onClose={() => setOpenFamilyOrSingleModal(false)}
        visible={openFamilyOrSingleModal}
      />

      <RoomsNumberModal
        onClose={() => setOpenRoomsNumberModal(false)}
        onApply={handleApplyRooms}
        value={formValues.rooms}
        visible={openRoomsNumberModal}
      />

      <BathRoomsNumberModal
        onClose={() => setOpenBathRoomsNumberModal(false)}
        onApply={(bathRooms) => setValue("bathRooms", bathRooms)}
        value={formValues.bathRooms}
        visible={openBathRoomsNumberModal}
      />

      <PriceRangeModal
        visible={openPricerangeModal}
        min={formValues.minPrice}
        max={formValues.maxPrice}
        onApply={(min, max) => {
          setValue("minPrice", min);
          setValue("maxPrice", max);
          setOpenPriceRangeModal(false);
        }}
        onClose={() => setOpenPriceRangeModal(false)}
      />

      <SpaceRangeModal
        visible={openSpaceRangeModal}
        onApply={(min, max) => {
          setValue("minSpace", min);
          setValue("maxSpace", max);
          setOpenSpaceRangeModal(false);
        }}
        onClose={() => setOpenSpaceRangeModal(false)}
        min={formValues.minSpace}
        max={formValues.maxSpace}
      />

      <IsFurnishedModal
        value={formValues.furnished}
        onApply={(type) => {
          setValue("furnished", type);
          setOpenIsFurnishedModal(false);
        }}
        onClose={() => setOpenIsFurnishedModal(false)}
        visible={openIsFurnishedModal}
      />
    </ScrollView>
  );
}
