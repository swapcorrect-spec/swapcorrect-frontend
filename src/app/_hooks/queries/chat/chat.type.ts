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

export interface IRoomMessage {
  message: string;
  dateTime: string;
  status: "Read" | "Unread" | "Sent" | "Sending" | "Failed";
  messageType: "Text" | "Image" | "Video" | "File";
  senderImgUrl: string | null;
  senderId: string;
  isMe: boolean;
}

export interface SwappingProceeding {
  id: string;
  isSwapper: boolean;
  status: string;
  [key: string]: any;
}

export interface IGetChatRoomMessagesResponseData {
  statusCode: number;
  displayMessage: string;
  result: {
    roomMessages: IRoomMessage[];
    imageCount: number;
    videoCount: number;
    fileCount: number;
    isSwapper: boolean;
    swappingProceeding?: SwappingProceeding | null;
  };
  errorMessages: null | string;
}
