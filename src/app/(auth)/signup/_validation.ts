import {object, ref, string, type InferType} from 'yup'

export const validationSchema = object().shape({
  firstname: string().required('Required'),
  lastname: string().required('Required'),
  email: string().email("Invalid email address").required("Required"),
  phone: string().required('Required'),
  country: string().required('Required'),
  username: string().required('Required'),
  gender: string().required('Required'),
  address: string().required('Required'),
  password: string().required("Required"),
  confirm_password: string().required("Required")
    .oneOf([ref("password")], "Passwords do not match"),
  state: string().required('Required'),
  city: string().required('Required'),
});

export type signupPayload = InferType<typeof validationSchema>