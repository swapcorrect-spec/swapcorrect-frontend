

import {
  HOT_PICKS,
  RECOMMENDED_ITEMS,
  ELECTRONICS_ITEMS,
  SEARCH_ITEMS,
  ALL_CATEGORIES,
  START_SWAP,
  LISTING_DETAILS
} from "@/app/_constants/api_contant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRequestParams, postRequest, getRequest } from "@/app/_config/request-methods";
import { SwapResponseInterface, SearchResponseInterface, CategoriesResponseInterface, ListingDetailsResponseInterface } from "./listing.type";
import { toast } from "sonner";

export const useGetListingDetails = (props: { 
  enabler: boolean;
  listingId: string;
}) => {
  const { enabler, listingId } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [LISTING_DETAILS, listingId],
    queryFn: () =>
      getRequest<ListingDetailsResponseInterface>({
        url: `/listing_item/listing_details?listingId=${listingId}`,
      }),
    enabled: !!enabler && !!listingId,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

export const useGetItemByRaterHotPick = (props: { enabler: boolean }) => {
  const { enabler = true } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [HOT_PICKS],
    queryFn: async ({ signal }) =>
      getRequestParams<{ limit: number }, SwapResponseInterface>({
        url: "/listing_item/GetItemByRaterHotPick",
        params: { limit: 10 },
        config: { signal },
      }),
    enabled: !!enabler,
  });
  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

export const useGetRecommendedItems = (props: { enabler: boolean }) => {
  const { enabler = true } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [RECOMMENDED_ITEMS],
    queryFn: async ({ signal }) =>
      getRequestParams<{ limit: number }, SwapResponseInterface>({
        url: "/listing_item/recommended",
        params: { limit: 10 },
        config: { signal },
      }),
    enabled: !!enabler,
  });
  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

export const useGetElectronicsItems = (props: { enabler: boolean }) => {
  const { enabler = true } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [ELECTRONICS_ITEMS],
    queryFn: async ({ signal }) =>
      getRequestParams<{ limit: number }, SwapResponseInterface>({
        url: "/listing_item/electronic",
        params: { limit: 10 },
        config: { signal },
      }),
    enabled: !!enabler,
  });
  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

export const useSearchItems = (props: { 
  enabler: boolean;
  searhParam?: string;
  categoryld?: string;
  location?: string;
  lowestRange?: number;
  highestRange?: number;
  listingDate?: string;
  pageNumber?: number;
  perpageSize?: number;
}) => {
  const { 
    enabler = true,
    searhParam,
    categoryld,
    location,
    lowestRange,
    highestRange,
    listingDate,
    pageNumber,
    perpageSize = 20
  } = props;
  
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [SEARCH_ITEMS, searhParam, categoryld, location, lowestRange, highestRange, listingDate, pageNumber, perpageSize],
    queryFn: async ({ signal }) =>
      getRequestParams<{
        searhParam?: string;
        categoryld?: string;
        location?: string;
        lowestRange?: number;
        highestRange?: number;
        listingDate?: string;
        pageNumber?: number;
        perpageSize?: number;
      }, SearchResponseInterface>({
        url: "/listing_item/paginated/search_item",
        params: {
          searhParam,
          categoryld,
          location,
          lowestRange,
          highestRange,
          listingDate,
          pageNumber,
          perpageSize
        },
        config: { signal },
      }),
    enabled: !!enabler,
  });
  return {
    data: data?.result?.items,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

export const useGetAllCategories = (props: { enabler: boolean }) => {
  const { enabler = true } = props;
  
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [ALL_CATEGORIES],
    queryFn: async ({ signal }) =>
      getRequestParams<{}, CategoriesResponseInterface>({
        url: "/listing_item/category/all",
        params: {},
        config: { signal },
      }),
    enabled: !!enabler,
  });
  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};

export const useStartSwap = (props: { 
  listingId: string;
  onSuccess?: () => void;
}) => {
  const { listingId, onSuccess } = props;
  
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [START_SWAP, listingId],
    mutationFn: async () =>
      postRequest<{}, SwapResponseInterface>({
        url: `/listing_item/start/swap_now?listingId=${listingId}`,
      payload: {},
      }),
    onSuccess: (data) => {
      toast.success(data.displayMessage || "Swap started successfully!", {
        onAutoClose: () => {
          if (onSuccess) onSuccess();
        },
      });
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.errorMessages?.[0] || err?.message || "Failed to start swap. Please try again.";
      toast.error(errorMessage);
    },
  });

  return {
    startSwap: mutate,
    isPending,
    isError,
    error,
  };
};
