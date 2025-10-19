import { useQuery } from "@tanstack/react-query";
import { getRequestParams } from "@/app/_config/request-methods";
import { FavouriteResponseInterface } from "./favourite.type";

export const useGetUserFavourite = (props: { enabler: boolean }) => {
  const { enabler = true } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["getUserFavourite"],
    queryFn: async ({ signal }) =>
      getRequestParams<{}, FavouriteResponseInterface>({
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