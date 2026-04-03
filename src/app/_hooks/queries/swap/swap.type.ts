export interface SwapItem {
  swapProceedId: string;
  swapperUserId: string;
  swapperName: string;
  swapperImage: string | null;
  visitorName: string;
  visitorUserId: string;
  visitorImage: string | null;
  listedItem: string;
  swapperRequestItem: string;
  status: "Negotiation" | "Published" | "Swapped" | "Cancelled" | "Confirmed" | "Completed";
  roomName: string | null;
  createdOn: string;
  lastActivity: string;
}

export interface SwapSearchResult {
  items: SwapItem[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
}

export interface SwapSearchResponseInterface {
  statusCode: number;
  displayMessage: string;
  result: SwapSearchResult;
  errorMessages: null | string;
}

export interface CloseSwapResponseData {
  statusCode: number;
  displayMessage: string;
  result: any;
  errorMessages: null | string;
}

