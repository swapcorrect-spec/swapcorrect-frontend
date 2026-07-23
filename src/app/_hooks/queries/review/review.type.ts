export type AddReviewDto = {
  raterId: string;
  description: string;
  userId: string;
  rateScore: number;
};

export type AddReviewPayload = {
  payload: {
    dto: AddReviewDto;
  };
};

export interface IAddReviewResponse {
  statusCode: number;
  displayMessage: string;
  result: string | null;
  errorMessages: string | string[] | null;
}

export type UserReviewItem = {
  id?: string;
  raterId?: string;
  userId?: string;
  description?: string;
  rateScore?: number;
  rating?: number;
  created?: string;
  createdAt?: string;
  dateCreated?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  username?: string;
  profilePicture?: string | null;
  raterName?: string;
  raterFullName?: string;
  raterProfilePicture?: string | null;
};

export interface IGetReviewsByRaterResponse {
  statusCode: number;
  displayMessage: string;
  result: UserReviewItem[] | UserReviewItem | null;
  errorMessages: string | string[] | null;
}
