export type ToastVariant = 'success' | 'error' | 'loading' | 'info';
export interface ToastOptions {
    id?: string;
    duration?: number;
}
export interface RCToastOptions {
    success: (message: string, options?: ToastOptions) => string;
    error: (message: string, options?: ToastOptions) => string;
    loading: (message: string, options?: ToastOptions) => string;
    info: (message: string, options?: ToastOptions) => string;
    dismiss: (id?: string) => void;
}
