import { AxiosError, AxiosInstance } from 'axios';

export function setupInterceptors(client: AxiosInstance) {
  // REQUEST
  client.interceptors.request.use(
    (config) => {
      // Example: trace id / app id
      config.headers['x-app-name'] = 'todo-remote';

      return config;
    },
    (error) => Promise.reject(error)
  );

  // RESPONSE
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
      const status = error.response?.status;

      switch (status) {
        case 401:
          handleUnauthorized();
          break;

        case 403:
          console.error('Forbidden');
          break;

        case 500:
          console.error('Server error');
          break;
      }

      return Promise.reject(error);
    }
  );
}

function handleUnauthorized() {
  /**
   * VERY IMPORTANT:
   * Remote should NOT decide auth flow.
   * It should notify host OR fallback gracefully.
   */

  // Option 1: notify host
  window.dispatchEvent(new CustomEvent('mf:auth-expired'));

  // Option 2: standalone fallback
  if (!window.parent || window.parent === window) {
    window.location.href = '/login';
  }
}
