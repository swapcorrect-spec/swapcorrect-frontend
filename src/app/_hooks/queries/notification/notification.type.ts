export interface IGetNotificationsResponseData {
  statusCode: number;
  displayMessage: string;
  result: {
    items: {
      id: string;
      title: string;
      message: string;
      type: string;
      referenceId: null | string;
      isRead: boolean;
      createdAt: string;
    }[];
    totalCount: number;
    pageNumber: number;
    totalPages: number;
    pageSize: number;
  };
  errorMessages: null | string;
}

export interface IGetUnreadNotificationCountResponseData {
  statusCode: number;
  displayMessage: string;
  result: number;
  errorMessages: null | string;
}

export interface IReadNotificationResponse {
  statusCode: number;
  displayMessage: string;
  result: null | string;
  errorMessages: string | string[] | null;
}
