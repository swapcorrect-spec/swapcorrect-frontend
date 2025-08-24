type Register = {
 email: string;
  userName: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  state: string;
  gender: string;
  role: string;
  deliveryAddress: string;
  phoneNumber: string;
  password: string
};

export type RegisterPayload = Prettify<BaseApiPayloadDto<Register>>;

export interface IRegisterResponse {
  statusCode: number;
  displayMessage: string;
  result: string;
}

type Login = {
  email: string;
  password: string
};

export type LoginPayload = Prettify<BaseApiPayloadDto<Login>>;

export interface ILoginResponse {
  statusCode: number;
  displayMessage: string;
  result: {
    jwt: string;
    userRole: Array<'Visitor'>;
  },
  errorMessages: string | null
}