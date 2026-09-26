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
  propertyType: ListingType | null;
  familyOrSingle: FamilyOrSingle | null;
  paymentType: PaymentFrequency | null;
  status: "all" | PropertyStatus;
  residentialOrCommercial: PropertyCategory | null;
  furnished: "furnished" | "unfurnished" | null;
  rooms: RoomsNumber;
  bathRooms: RoomsNumber;
  minPrice: FilterText;
  maxPrice: FilterText;
  minSpace: FilterText;
  maxSpace: FilterText;
};

export type UploadFormFields = {
  images: string[];
  videos: string[];
  title: string;
  price: string;
  description: string;
  area: string;
  propertyStatus: PropertyStatus | null;
  termsAccepted: boolean;
  propertyType: PropertyCategory | null;
  familyOrSingle: FamilyOrSingle | null;
  paymentType: "سنوي" | "شهري" | "يومي" | null;
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
  forRent: boolean;
  forSell: boolean;
};

export type MyAd = UploadFormFields & {
  id: string;
  location: string;
  views: number;
  postedAt: string;
};

export type LoginForm = {
  phone: string;
  password: string;
  countryKey: string;
};
