import { apiClient } from './axios';
import { normalizeApiError } from './error';
import { ApiResponse } from './types';

export async function get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
  try {
    const res = await apiClient.get<T>(url, { params });
    return { success: true, data: res.data };
  } catch (err) {
    return normalizeApiError(err);
  }
}

export async function post<TResponse, TRequest>(url: string, body: TRequest): Promise<ApiResponse<TResponse>> {
  try {
    const res = await apiClient.post<TResponse>(url, body);
    return { success: true, data: res.data };
  } catch (err) {
    return normalizeApiError(err);
  }
}

export async function patch<TResponse, TRequest>(
  url: string,
  body: Partial<TRequest>
): Promise<ApiResponse<TResponse>> {
  try {
    const res = await apiClient.patch<TResponse>(url, body);
    return { success: true, data: res.data };
  } catch (err) {
    return normalizeApiError(err);
  }
}

export async function del<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const res = await apiClient.delete<T>(url);
    return { success: true, data: res.data };
  } catch (err) {
    return normalizeApiError(err);
  }
}
