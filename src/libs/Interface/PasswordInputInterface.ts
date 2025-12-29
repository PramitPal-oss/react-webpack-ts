import { InputHTMLAttributes } from 'react';

export interface RCPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
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

  /** Value change handler (string-based for DX) */
  onValueChange?: (value: string) => void;
}
