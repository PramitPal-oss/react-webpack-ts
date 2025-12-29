export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiFailure {
  success: false;
  message: string;
  code?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
