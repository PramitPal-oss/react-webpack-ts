import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        style: {
          fontSize: '14px',
        },
      }}
    />
  );
};
