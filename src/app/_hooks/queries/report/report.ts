import { postRequest } from "@/app/_config/request-methods";
import { IReportUserResponse, ReportUserPayload } from "./report.type";
import { MutationProps } from "@/app/_types/mutation-prop-types";
import handleApiError from "@/app/_utils/handle-api-error";
import { useMutation } from "@tanstack/react-query";

export const useReportUser = (props: MutationProps) => {
  const { onSuccess, onError } = props;

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: ReportUserPayload) =>
      postRequest<ReportUserPayload["payload"], IReportUserResponse>({
        url: "/report/user",
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
