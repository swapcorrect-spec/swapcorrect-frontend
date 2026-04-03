import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRequestParams, postRequest } from "@/app/_config/request-methods";
import {  AddFavouriteResponseInterface, RemoveFavouriteResponseInterface } from "./favourite.type";
import { toast } from "sonner";
import { SwapResponseInterface } from "../listing/listing.type";
import { USER_FAVOURITE } from "@/app/_constants/api_contant";

export const useGetUserFavourite = (props: { enabler: boolean }) => {
  const { enabler = true } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [USER_FAVOURITE],
    queryFn: async ({ signal }) =>
      getRequestParams<{}, SwapResponseInterface>({
        url: "/listing/favourite/favourite/getUserFaviourite",
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

export const useAddToFavourite = (props: { 
  listId: string;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { listId, onSuccess, onError } = props;
  const queryClient = useQueryClient();
  
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["addToFavourite", listId],
    mutationFn: async () =>
      postRequest<{}, AddFavouriteResponseInterface>({
        url: `/listing/favourite/add_fav_list?ListId=${listId}`,
        payload: {},
      }),
    onSuccess: (data) => {
      toast.success(data.displayMessage || "Added to favourites successfully!", {
        onAutoClose: () => {
          if (onSuccess) onSuccess();
        },
      });
      // Invalidate user favourites query to refetch saved items
      queryClient.invalidateQueries({ queryKey: [USER_FAVOURITE] });
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.errorMessages?.[0] || err?.message || "Failed to add to favourites. Please try again.";
      toast.error(errorMessage);
      if (onError) onError();
    },
  });

  return {
    addToFavourite: mutate,
    isPending,
    isError,
    error,
  };
};

export const useRemoveFromFavourite = (props: { 
  listId: string;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { listId, onSuccess, onError } = props;
  const queryClient = useQueryClient();
  
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["removeFromFavourite", listId],
    mutationFn: async () =>
      postRequest<{}, RemoveFavouriteResponseInterface>({
        url: `/listing/favourite/remove_fav_list?ListId=${listId}`,
        payload: {},
      }),
    onSuccess: (data) => {
      toast.success(data.displayMessage || "Removed from favourites successfully!", {
        onAutoClose: () => {
          if (onSuccess) onSuccess();
        },
      });
      // Invalidate user favourites query to refetch saved items
      queryClient.invalidateQueries({ queryKey: [USER_FAVOURITE] });
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.errorMessages?.[0] || err?.message || "Failed to remove from favourites. Please try again.";
      toast.error(errorMessage);
      if (onError) onError();
    },
  });

  return {
    removeFromFavourite: mutate,
    isPending,
    isError,
    error,
  };
};