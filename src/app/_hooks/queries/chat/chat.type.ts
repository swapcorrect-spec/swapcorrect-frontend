export interface IGetActiveChatUsersResponseData {
  statusCode: number;
  displayMessage: string;
  result: {
    chatRooomName: string;
    userId: string;
    message: null | string;
    name: string;
    unreadCount: number;
    url: null | string;
    time: null | string;
    userStatus: "Online" | "Offline";
  }[];
  errorMessages: null | string;
}

export interface IGetChatRoomMessagesResponseData {
  statusCode: number;
  displayMessage: string;
  result: any;
  errorMessages: null | string;
}
