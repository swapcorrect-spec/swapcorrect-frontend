import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface MediaItem {
  mediaType: "Image" | "Video" | "Img";
  url: string | StaticImport;
}

export interface IProduct {
  listingId: number | null | string;
  listType: string;
  itemName: string;
  estimatedCurrency: string;
  estimatedAmount: number;
  itemDescription: string;
  isFavItem: boolean;
  reviewStage: string;
  categoryName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  username: string;
  media: MediaItem[];
  swapListRequest: string[];
  itemCondition: string;
  
  // Legacy fields for backward compatibility
  id?: number;
  wants?: string[];
  price?: string;
  rating?: number;
  photo?: string;
  image?: string | StaticImport;
  name?: string;
  author?: string;
}