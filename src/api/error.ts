import { AxiosError } from 'axios';
import { ApiFailure } from './types';

export function normalizeApiError(error: unknown): ApiFailure {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Something went wrong',
      code: status ? String(status) : 'NETWORK_ERROR',
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: false,
    message: 'Unknown error',
  };
}
