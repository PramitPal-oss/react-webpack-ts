import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
});

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
root.render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
