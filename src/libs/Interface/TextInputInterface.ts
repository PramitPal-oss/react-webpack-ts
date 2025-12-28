import * as React from 'react';

export interface RCTextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Mantine-like props */
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  withAsterisk?: boolean;

  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  variant?: 'default' | 'filled' | 'unstyled';

  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;

  /** Mantine specific flags */
  disabled?: boolean;
  required?: boolean;
}
