export interface IDashboardCardResult {
  listedCount: number;
  ongoingCount: number;
  pendingConfirmationCount: number;
  completedCount: number;
}

export interface IDashboardCardResponseData {
  statusCode: number;
  displayMessage: string;
  result: IDashboardCardResult;
  errorMessages: null | string;
}

