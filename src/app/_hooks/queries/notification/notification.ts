import { getRequest, getRequestParams, putRequest } from "@/app/_config/request-methods";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  IGetNotificationsResponseData,
  IGetUnreadNotificationCountResponseData,
  IReadNotificationResponse,
} from "./notification.type";
import { MutationProps } from "@/app/_types/mutation-prop-types";
import { handleApiError } from "@/app/_utils/handle-api-error";

export const useGetNotifications = ({
  unreadOnly,
  enabler,
}: {
  unreadOnly?: boolean;
  enabler: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: ["useGetNotifications", unreadOnly],

    queryFn: ({ pageParam = 1 }) =>
      getRequestParams<{}, IGetNotificationsResponseData>({
        url: "/notification",
        params: {
          pageNumber: pageParam,
          pageSize: 20,
          ...(unreadOnly !== undefined && { unreadOnly }),
        },
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, pages) => {
      const items = lastPage.result.items;

      if (items.length < 20) {
        return undefined;
      }

      return pages.length + 1;
    },

    enabled: enabler,
  });
};

export const useGetUnreadNotificationCount = (props: { enabler: boolean }) => {
  const { enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery({
    queryKey: ["useGetUnreadNotificationCount"],
    queryFn: () =>
      getRequest<IGetUnreadNotificationCountResponseData>({
        url: "/notification/unread-count",
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

export const useReadNotification = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: { payload: { notification_id: string } }) =>
      putRequest<{}, IReadNotificationResponse>({
        url: `/notification/${payload.notification_id}/read`,
        payload: {},
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
