export interface Bank {
  id?: string;
  name: string;
  code: string;
  slug?: string;
  [key: string]: any;
}

export interface GetAllBanksResponseData {
  statusCode: number;
  displayMessage: string;
  result: Bank[] | any;
  errorMessages: null | string;
}

export interface AddUpdateBankAccountPayload {
  bankCode: string;
  accountName: string;
  accountNumber: string;
}

export interface AddUpdateBankAccountResponseData {
  statusCode: number;
  displayMessage: string;
  result: any;
  errorMessages: null | string;
}

export interface BankAccountInfo {
  bankCode?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  [key: string]: any;
}

export interface GetBankAccountInfoResponseData {
  statusCode: number;
  displayMessage: string;
  result: BankAccountInfo | null | any;
  errorMessages: null | string;
}

