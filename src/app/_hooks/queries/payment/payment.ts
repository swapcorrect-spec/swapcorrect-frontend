import { postRequest } from "@/app/_config/request-methods";
import { MutationProps } from "@/app/_types/mutation-prop-types";
import handleApiError from "@/app/_utils/handle-api-error";
import { useMutation } from "@tanstack/react-query";
import {
  ConfirmPaymentPayload,
  IConfirmPaymentResponse,
  IInitializePaymentResponse,
  InitializePaymentPayload,
} from "./payment.types";

export const useInitializePayment = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: InitializePaymentPayload) =>
      postRequest<InitializePaymentPayload["payload"], IInitializePaymentResponse>({
        url: "/payment/paystack/initialize",
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

export const useConfirmPayment = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: ConfirmPaymentPayload) =>
      postRequest<ConfirmPaymentPayload["payload"], IConfirmPaymentResponse>({
        url: "/payment/paystack/confirm",
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
