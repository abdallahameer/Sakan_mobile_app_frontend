export type {
  FilterText,
  LoginForm,
  PropertyFilterForm,
  RoomsNumber,
  UploadFormFields,
} from "./forms";
export type {
  FamilyOrSingle,
  ListingType,
  PaymentFrequency,
  Property,
  PropertyCategory,
  PropertyLocation,
  PropertyStatus,
} from "./property";

export type User = {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
};
