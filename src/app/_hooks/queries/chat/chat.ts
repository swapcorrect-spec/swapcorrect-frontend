import { useQuery } from "@tanstack/react-query";
import { getRequest, getRequestParams } from "@/app/_config/request-methods";
import { IGetActiveChatUsersResponseData, IGetChatRoomMessagesResponseData } from "@/app/_hooks/queries/chat/chat.type";

export const useGetActiveChatUsers = (props: { enabler: boolean }) => {
  const { enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["useGetActiveChatUsers"],
    queryFn: () =>
      getRequest<IGetActiveChatUsersResponseData>({
        url: "/chat/active/user",
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
    refetch,
  };
};

export const useGetChatRoomMessages = (props: { roomName: string; enabler: boolean }) => {
  const { roomName, enabler } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["useGetChatRoomMessages", roomName],
    queryFn: () =>
      getRequestParams<{}, IGetChatRoomMessagesResponseData>({
        url: "/chat/room/messages",
        params: { roomName },
      }),
    enabled: !!enabler && !!roomName,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
