import { getRequestParams, postRequest } from "@/app/_config/request-methods";
import { MutationProps } from "@/app/_types/mutation-prop-types";
import handleApiError from "@/app/_utils/handle-api-error";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddReviewPayload,
  IAddReviewResponse,
  IGetReviewsByRaterResponse,
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

export const useGetReviewsByRater = (props: {
  userId: string;
  raterId: string;
  enabler: boolean;
}) => {
  const { userId, raterId, enabler } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["useGetReviewsByRater", userId, raterId],
    queryFn: () =>
      getRequestParams<{ userId: string; raterId: string }, IGetReviewsByRaterResponse>({
        url: "/UserReview/Review/review_by_rater",
        params: {
          userId,
          raterId,
        },
      }),
    enabled: !!enabler && !!userId && !!raterId,
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
