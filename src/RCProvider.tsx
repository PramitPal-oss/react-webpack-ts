// src/provider/RCProvider.tsx
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';

const defaultTheme = createTheme({
  fontFamily: 'Poppins, sans-serif',
});

interface RCProviderProps {
  children: React.ReactNode;
  theme?: ReturnType<typeof createTheme>;
}

export const RCProvider: React.FC<RCProviderProps> = ({ children, theme = defaultTheme }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
