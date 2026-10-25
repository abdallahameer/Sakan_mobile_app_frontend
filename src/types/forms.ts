import { Control, UseFormSetValue } from "react-hook-form";
import type {
  FamilyOrSingle,
  ListingType,
  PaymentFrequency,
  PropertyCategory,
  PropertyStatus,
} from "./property";

export type RoomsNumber = null | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "+8";
export type FilterText = string | null;

export type PropertyFilterForm = {
  listingType: ListingType | null;
  familyOrSingle: FamilyOrSingle | null;
  paymentType: PaymentFrequency | null;
  propertyStatus: PropertyStatus | null;
  propertyType: PropertyCategory | null;
  furnished: boolean | null;
  rooms: RoomsNumber;
  bathRooms: RoomsNumber;
  minPrice: FilterText;
  maxPrice: FilterText;
  minArea: FilterText;
  maxArea: FilterText;
};

export type UploadFormFields = {
  images: string[];
  videos: string[];
  title: string;
  price: string;
  description: string;
  area: string;
  phone?: string;
  whatsapp?: string;
  propertyStatus: PropertyStatus;
  termsAccepted: boolean;
  listingType: ListingType;
  propertyType: PropertyCategory;
  phoneKey: string;
  whatsAppKey: string;
  familyOrSingle: FamilyOrSingle | null;
  paymentType: PaymentFrequency | null;
  city: string;
  neighborhood: string;
  rooms: number;
  bathrooms: number;
  livingRoom: number;
  floorNumber: number;
  propertyAge: number;
  furnished: boolean;
  kitchen: boolean;
  annex: boolean;
  carEntrance: boolean;
  elevator: boolean;
  airConditioners: boolean;
  water: boolean;
  roof: boolean;
  electricity: boolean;
  solarSystem: boolean;
  latitude: number | null;
  longitude: number | null;
  cityId?: number | null;
  areaId?: number | null;
  addressDetail?: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type StepOneProps = {
  control: Control<UploadFormFields>;
  formValues: UploadFormFields;
  setValue: UseFormSetValue<UploadFormFields>;
  onNext: () => void;
  update?: boolean;
};

export type StepTwoProps = {
  control: Control<UploadFormFields>;
  formValues: UploadFormFields;
  setValue: UseFormSetValue<UploadFormFields>;
  onNext: () => void;
  update?: boolean;
};

export type StepThreeProps = {
  formValues: UploadFormFields;
  setValue: UseFormSetValue<UploadFormFields>;
  onSubmit: (formValues: UploadFormFields) => void;
  onNext?: () => void;
  update?: boolean;
};

export type StepFourProps = {
  formValues: UploadFormFields;
  setValue: UseFormSetValue<UploadFormFields>;
  onSubmit: (formValues: UploadFormFields) => void | Promise<void>;
};
