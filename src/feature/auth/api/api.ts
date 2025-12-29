import { post } from '@/api/request';
import { SignInRequest, SignInResponse } from './authInterface';

export const signIn = (payload: SignInRequest) => post<SignInResponse, SignInRequest>('/user/signIn', payload);
