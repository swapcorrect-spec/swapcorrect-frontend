import { HOT_PICKS, RECOMMENDED_ITEMS, ELECTRONICS_ITEMS } from "@/app/_constants/api_contant";
import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "@/app/_config/request-methods";
import { DashboardFeatureResponseInterface } from "./dashboard.features";

export const useGetItemByRaterHotPick = (props: { enabler: boolean }) => {
  const { enabler = true } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: [HOT_PICKS],
    queryFn: async ({ signal }) =>
      getRequestParams<{ limit: number }, DashboardFeatureResponseInterface>({
        url: "/listing_item/GetItemByRaterHotPick",
        params: { limit: 10 },
        config: { signal }
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
      getRequestParams<{ limit: number }, DashboardFeatureResponseInterface>({
        url: "/listing_item/recommended",
        params: { limit: 10 },
        config: { signal }
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
      getRequestParams<{ limit: number }, DashboardFeatureResponseInterface>({
        url: "/listing_item/electronic",
        params: { limit: 10 },
        config: { signal }
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
