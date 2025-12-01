import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/app/_config/request-methods";
import { IDashboardCardResponseData } from "./dashboard.type";

export const useGetDashboardCard = (props: { enabler: boolean }) => {
  const { enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["useGetDashboardCard"],
    queryFn: () =>
      getRequest<IDashboardCardResponseData>({
        url: "/listing_item/dashboard-card",
      }),
    enabled: !!enabler,
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

