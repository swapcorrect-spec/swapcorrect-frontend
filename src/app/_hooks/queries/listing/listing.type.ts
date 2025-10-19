export interface ListingDetailsResponseInterface {
  result: {
    listingId: string;
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
    media: Array<{
      mediaType: "Image" | "Video" | "Img";
      url: string;
    }>;
    swapListRequest: string[];
    itemCondition: string;
  };
  statusCode: 200;
  displayMessage: string;
}

export interface SwapResponseInterface<T = any> {
  result: Array<{
    listingId: string;
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
    media: Array<{
      mediaType: "Image" | "Video" | "Img";
      url: string;
    }>;
    swapListRequest: string[];
    itemCondition: string;
  }>;
  statusCode: 200;
  displayMessage: string;
}


export interface SearchResponseInterface {
  result: {
    items: Array<{
      listingId: string;
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
      media: Array<{
        mediaType: "Image" | "Video" | "Img";
        url: string;
      }>;
      swapListRequest: string[];
      itemCondition: string;
    }>;
    totalCount: number;
    pageNumber: number;
    totalPages: number;
    pageSize: number;
  };
  statusCode: 200;
  displayMessage: string;
}

export interface CategoryItem {
  categoryName: string;
  id: string;
  created: string;
  dateUpdated: string | null;
  isDeleted: boolean;
}

export interface CategoriesResponseInterface {
  result: CategoryItem[];
  statusCode: 200;
  displayMessage: string;
  errorMessages?: string | null;
}
