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
    userId: string;
    rating: number;
    swapCount: number;
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

export interface ICreateListingPayload {
  listType: string;
  itemName: string;
  estimatedCurrency: string;
  estimatedAmount: number;
  itemDescription: string;
  categoryId: string;
  itemCondition: string;
  location: string;
  listMediaFiles: Array<{
    mediaType: string;
    url: string;
  }>;
  listingSwapReq: Array<{
    itemNeededName: string;
  }>;
}

export interface ICreateListingResponse {
  statusCode: number;
  displayMessage: string;
  result: any;
  errorMessages: string | null;
}

export interface IUpdateListingPayload extends ICreateListingPayload {
  listId: string;
}

export interface IUpdateListingResponse {
  statusCode: number;
  displayMessage: string;
  result: any;
  errorMessages: string | null;
}

export interface IDeleteListingResponse {
  statusCode: number;
  displayMessage: string;
  result: any;
  errorMessages: string | null;
}

export type SwitchSwapStatus = {
  swapId: string;
  status: string;
};

export type SwitchSwapStatusPayload = Prettify<BaseApiPayloadDto<SwitchSwapStatus>>;

export interface ISwitchSwapStatusResponse {
  statusCode: number;
  displayMessage: string;
  result: string;
  errorMessages: null | string;
}
