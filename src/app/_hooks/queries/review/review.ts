import { getRequest, postRequest } from "@/app/_config/request-methods";
import { MutationProps } from "@/app/_types/mutation-prop-types";
import handleApiError from "@/app/_utils/handle-api-error";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddReviewPayload,
  IAddReviewResponse,
  IGetUserReviewsResponse,
  UserReviewItem,
} from "./review.type";

export const useAddReview = (props: MutationProps) => {
  const { onSuccess, onError } = props;

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: AddReviewPayload) =>
      postRequest<AddReviewPayload["payload"], IAddReviewResponse>({
        url: "/UserReview/Review/add-Review",
        payload,
      }),
    onSuccess(values) {
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      if (onError) {
        onError(msgError, err);
      }
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};

/** Fetches reviews for a rated user (profile being viewed). */
export const useGetUserReviews = (props: { ratedUserId: string; enabler: boolean }) => {
  const { ratedUserId, enabler } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["useGetUserReviews", ratedUserId],
    queryFn: () =>
      getRequest<IGetUserReviewsResponse>({
        url: `/UserReview/Review/${ratedUserId}`,
      }),
    enabled: !!enabler && !!ratedUserId,
  });

  const raw = data?.result;
  const reviews: UserReviewItem[] = Array.isArray(raw) ? raw : raw ? [raw] : [];

  return {
    data: reviews,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  };
};
