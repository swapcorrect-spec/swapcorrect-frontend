export interface FavouriteResponseInterface<T = any> {
  result: T;
  statusCode: 200;
  displayMessage: string;
}

export interface AddFavouriteResponseInterface {
  result: string | null;
  statusCode: 200;
  displayMessage: string;
}

export interface RemoveFavouriteResponseInterface {
  result: string | null;
  statusCode: 200;
  displayMessage: string;
}
