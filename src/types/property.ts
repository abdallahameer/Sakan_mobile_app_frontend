export type ListingType = "sale" | "rent";
export type PropertyCategory = "residential" | "commercial";
export type PropertyStatus = "ready" | "underConstruction";
export type FamilyOrSingle = "family" | "single";
export type PaymentFrequency = "monthly" | "yearly" | "daily";

export type PropertyLocation = {
  address: string;
  city: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  listingType: ListingType;
  propertyType: PropertyCategory;
  propertyStatus: PropertyStatus;
  familyOrSingle: FamilyOrSingle;
  paymentType: PaymentFrequency;
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
  images: string[];
  videos: string[];
  location: PropertyLocation;
  views: number;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
  postedAt?: string;
};
