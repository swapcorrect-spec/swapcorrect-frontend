import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postRequest, getRequest } from "@/app/_config/request-methods";
import { GetAllBanksResponseData, AddUpdateBankAccountPayload, AddUpdateBankAccountResponseData, GetBankAccountInfoResponseData } from "./wallet.type";
import { toast } from "sonner";

export const useGetAllBanks = (props: { enabler: boolean }) => {
  const { enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["useGetAllBanks"],
    queryFn: () =>
      postRequest<{}, GetAllBanksResponseData>({
        url: "/payment/paystack/banks",
        payload: {},
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

export const useGetBankAccountInfo = (props: { enabler: boolean }) => {
  const { enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["useGetBankAccountInfo"],
    queryFn: () =>
      getRequest<GetBankAccountInfoResponseData>({
        url: "/payment/bank_account/info",
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

export const useAddUpdateBankAccount = (props?: { onSuccess?: () => void }) => {
  const { onSuccess } = props || {};
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (payload: AddUpdateBankAccountPayload) =>
      postRequest<AddUpdateBankAccountPayload, AddUpdateBankAccountResponseData>({
        url: "/payment/add_update/bank_account",
        payload,
      }),
    onSuccess: (response) => {
      // Invalidate and refetch bank account info
      queryClient.invalidateQueries({ queryKey: ["useGetBankAccountInfo"] });
      toast.success(response.displayMessage || "Bank account saved successfully!", {
        onAutoClose: () => {
          if (onSuccess) onSuccess();
        },
      });
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.errorMessages?.[0] || err?.message || "Failed to save bank account. Please try again.";
      toast.error(errorMessage);
    },
  });

  return {
    addUpdateBankAccount: mutate,
    isPending,
    isError,
    error,
  };
};

