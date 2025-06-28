import {object, string, type InferType} from 'yup'

export const validationSchema = object().shape({
  fullname: string().required('Required'),
  email: string().email("Invalid email address").required("Required"),
  phone: string().required('Required'),
  address: string().required('Required'),
  password: string().required("Required"),
});

export type signupPayload = InferType<typeof validationSchema>