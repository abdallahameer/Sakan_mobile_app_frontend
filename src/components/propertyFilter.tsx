import type { PropertyFilterForm, RoomsNumber } from "@/types";
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
import BathroomsNumberModal from "./filterModals/bathroomsNumberModal";
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
  const [openBathroomsNumberModal, setOpenBathroomsNumberModal] =
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
    formValues.listingType === "sale"
      ? "للبيع"
      : formValues.listingType === "rent"
        ? "للإيجار"
        : "نوع العملية";

  const residentialOrCommercialLable =
    formValues.propertyType === "residential"
      ? "سكني"
      : formValues.propertyType === "commercial"
        ? "تجاري"
        : "نوع العقار";

  const isFurnishedLable =
    formValues.furnished === true
      ? "مفروش"
      : formValues.furnished === false
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
      className="w-full min-h-[10%] max-h-[10%]"
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
          className={`flex-row items-center px-4 py-3 rounded-lg border ${formValues.listingType ? "bg-[#0F113C] " : "bg-white"} border-gray-500  `}
        >
          <Text
            className={`text-sm ${formValues.listingType ? "text-white" : "text-[#0F113C]"}`}
          >
            {propertyTypeLabel}
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={
              formValues.listingType
                ? "white"
                : "#0F113C"
            }
            className="ms-1"
          />
        </TouchableOpacity>

        {formValues.listingType === "sale" ? (
          <View className="flex-row gap-3 p-1 bg-white border border-gray-500 rounded-lg">
            <TouchableOpacity
              onPress={() => setValue("propertyStatus", null)}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.propertyStatus === null
                  ? "bg-[#0F113C]"
                  : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${formValues.propertyStatus === null ? "text-[#ffffff]" : "text-[#0F113C]"} `}
              >
                الكل
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue("propertyStatus", "ready")}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.propertyStatus === "ready"
                  ? "bg-[#0F113C]"
                  : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${formValues.propertyStatus === "ready" ? "text-[#ffffff]" : "text-[#0F113C]"} `}
              >
                جاهز
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setValue("propertyStatus", "underConstruction")}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.propertyStatus === "underConstruction"
                  ? "bg-[#0F113C]"
                  : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${
                  formValues.propertyStatus === "underConstruction"
                    ? "text-white"
                    : "text-[#0F113C]"
                }`}
              >
                قيد الإنشاء
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {formValues.listingType === "rent" ? (
          <View className="flex-row gap-3 p-1 bg-white border border-gray-500 rounded-lg">
            <TouchableOpacity
              onPress={() => setValue("paymentType", null)}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                formValues.paymentType === null ? "bg-[#0F113C]" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${formValues.paymentType === null ? "text-[#ffffff]" : "text-[#0F113C]"}`}
              >
                الكل
              </Text>
            </TouchableOpacity>

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

        {formValues.listingType === "rent" &&
        formValues.propertyType === "residential" ? (
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
            formValues.propertyType ? "bg-[#0F113C]" : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.propertyType ? "text-white" : "text-[#0F113C]"}`}
          >
            {residentialOrCommercialLable}
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={formValues.propertyType ? "#ffffff" : "#0F113C"}
            className="ms-1"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setOpenIsFurnishedModal(true)}
          className={`flex-row items-center px-4 py-3 rounded-lg border border-gray-500 ${
            formValues.furnished !== null ? "bg-[#0F113C]" : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.furnished !== null ? "text-white" : "text-[#0F113C]"}`}
          >
            {isFurnishedLable}
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={formValues.furnished !== null ? "#ffffff" : "#0F113C"}
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
          onPress={() => setOpenBathroomsNumberModal(true)}
          className={`flex-row items-center px-4 py-3 rounded-lg border border-gray-500 ${
            formValues.bathrooms ? "bg-[#0F113C]" : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.bathrooms ? "text-white" : "text-[#0F113C]"}`}
          >
            الحمامات
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={formValues.bathrooms ? "#ffffff" : "#0F113C"}
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
            formValues.maxArea || formValues.minArea
              ? "bg-[#0F113C]"
              : "bg-white"
          }`}
        >
          <Text
            className={`text-sm ${formValues.maxArea || formValues.minArea ? "text-white" : "text-[#0F113C]"}`}
          >
            المساحة
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={
              formValues.maxArea || formValues.minArea ? "#ffffff" : "#0F113C"
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
        value={formValues.listingType}
        onApply={(type) => {
          setValue("listingType", type);
          setValue(
            "propertyStatus",
            type === "sale" ? formValues.propertyStatus : null,
          );
          setValue(
            "paymentType",
            type === "rent" ? formValues.paymentType : null,
          );
          setValue(
            "familyOrSingle",
            type === "rent" &&
              formValues.propertyType === "residential"
              ? formValues.familyOrSingle
              : null,
          );
          setOpenPropertyTypeModal(false);
        }}
        onClose={() => setOpenPropertyTypeModal(false)}
        visible={openPropertyTypeModal}
      />

      <ResidentialorCommercial
        value={formValues.propertyType}
        onClose={() => {
          setopenResidentialorCommercialModal(false);
        }}
        onApply={(type) => {
          setValue("propertyType", type);
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

      <BathroomsNumberModal
        onClose={() => setOpenBathroomsNumberModal(false)}
        onApply={(bathrooms) => setValue("bathrooms", bathrooms)}
        value={formValues.bathrooms}
        visible={openBathroomsNumberModal}
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
          setValue("minArea", min);
          setValue("maxArea", max);
          setOpenSpaceRangeModal(false);
        }}
        onClose={() => setOpenSpaceRangeModal(false)}
        min={formValues.minArea}
        max={formValues.maxArea}
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
