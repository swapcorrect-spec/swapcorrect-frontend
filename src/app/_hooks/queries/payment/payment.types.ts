export type InitializePayment = {
  proceedingId: string;
  isChargeFee: boolean;
  roomName: string;
};

export type InitializePaymentPayload = Prettify<BaseApiPayloadDto<InitializePayment>>;

export interface IInitializePaymentResponse {
  statusCode: number;
  displayMessage: string;
  result: {
    status: boolean;
    message: string;
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  };
  errorMessages: null | string;
}

export type ConfirmPayment = {
  reference: string;
};

export type ConfirmPaymentPayload = Prettify<BaseApiPayloadDto<ConfirmPayment>>;

export interface IConfirmPaymentResponse {
  statusCode: number;
  displayMessage: string;
  result: string;
  errorMessages: null | string;
}
