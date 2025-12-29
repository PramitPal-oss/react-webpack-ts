import hotToast from 'react-hot-toast';
import { RCToastOptions, ToastOptions } from '../Interface/ToastInterface';

const DEFAULT_DURATION = 3000;

export const toast: RCToastOptions = {
  success: (message: string, options?: ToastOptions) =>
    hotToast.success(message, {
      id: options?.id,
      duration: options?.duration ?? DEFAULT_DURATION,
    }),

  error: (message: string, options?: ToastOptions) =>
    hotToast.error(message, {
      id: options?.id,
      duration: options?.duration ?? DEFAULT_DURATION,
    }),

  loading: (message: string, options?: ToastOptions) =>
    hotToast.loading(message, {
      id: options?.id,
    }),

  info: (message: string, options?: ToastOptions) =>
    hotToast(message, {
      id: options?.id,
      duration: options?.duration ?? DEFAULT_DURATION,
    }),

  dismiss: (id?: string) => hotToast.dismiss(id),
};
