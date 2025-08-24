import {useMutation} from '@tanstack/react-query'

import { postRequest } from '@/app/_config/request-methods'

import { MutationProps } from '@/app/_types/mutation-prop-types';

import { ILoginResponse, IRegisterResponse, LoginPayload, RegisterPayload } from '@/app/_hooks/queries/auth/auth.type';
import handleApiError from '@/app/_utils/handle-api-error';

export const useRegister = (props: MutationProps) => {
  const {onSuccess, onError} = props;
  const {mutate, isError, isSuccess, isPending} = useMutation({
    mutationFn: ({payload}: RegisterPayload) => postRequest<RegisterPayload['payload'], IRegisterResponse>({
      url: '/auth/user/register',
      payload
    }),
    onSuccess(values){
      onSuccess(values)
    },
    onError(err){
      const msgError = handleApiError(err)
      if (onError) {
        onError(msgError, err);
      }
    }
  })

  return {
    mutate, isError, isSuccess, isPending
  }
}

export const useLogin = (props: MutationProps) => {
  const {onSuccess, onError} = props;
  const {mutate, isError, isSuccess, isPending} = useMutation({
    mutationFn: ({payload}: LoginPayload) => postRequest<LoginPayload['payload'], ILoginResponse>({
      url: '/auth/user/login',
      payload
    }),
    onSuccess(values){
      onSuccess(values)
    },
    onError(err){
      const msgError = handleApiError(err)
      if (onError) {
        onError(msgError, err);
      }
    }
  })

  return {
    mutate, isError, isSuccess, isPending
  }
}