import { createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';
interface RCProviderProps {
    children: React.ReactNode;
    theme?: ReturnType<typeof createTheme>;
}
export declare const RCProvider: React.FC<RCProviderProps>;
export {};
