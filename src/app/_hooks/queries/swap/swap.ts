import { useQuery, useMutation } from "@tanstack/react-query";
import { getRequestParams, postRequest } from "@/app/_config/request-methods";
import { SwapSearchResponseInterface, CloseSwapResponseData } from "./swap.type";
import { toast } from "sonner";

export interface UseSearchSwapsProps {
  enabler: boolean;
  listingUserId?: string;
  searhParam?: string;
  swapListingStatus?: "Published" | "Negotiation" | "Swapped" | "All";
  listingDate?: "All" | "LastWeek" | "LastMonth";
  pageNumber?: number;
  perpageSize?: number;
}

export const useSearchSwaps = (props: UseSearchSwapsProps) => {
  const {
    enabler,
    listingUserId,
    searhParam,
    swapListingStatus,
    listingDate,
    pageNumber = 1,
    perpageSize = 20,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [
      "useSearchSwaps",
      listingUserId,
      searhParam,
      swapListingStatus,
      listingDate,
      pageNumber,
      perpageSize,
    ],
    queryFn: async ({ signal }) =>
      getRequestParams<
        {
          listingUserId?: string;
          searhParam?: string;
          swapListingStatus?: string;
          listingDate?: string;
          pageNumber?: number;
          perpageSize?: number;
        },
        SwapSearchResponseInterface
      >({
        url: "/listing_item/paginated/search_swap",
        params: {
          listingUserId,
          searhParam,
          swapListingStatus,
          listingDate,
          pageNumber,
          perpageSize,
        },
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

export const useCloseSwap = (props?: { onSuccess?: () => void }) => {
  const { onSuccess } = props || {};

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (swapId: string) =>
      postRequest<{}, CloseSwapResponseData>({
        url: `/listing_item/close/swap_now?swapId=${swapId}`,
        payload: {},
      }),
    onSuccess: (response) => {
      toast.success(response.displayMessage || "Swap closed successfully!", {
        onAutoClose: () => {
          if (onSuccess) onSuccess();
        },
      });
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.errorMessages?.[0] || err?.message || "Failed to close swap. Please try again.";
      toast.error(errorMessage);
    },
  });

  return {
    closeSwap: mutate,
    isPending,
    isError,
    error,
  };
};

