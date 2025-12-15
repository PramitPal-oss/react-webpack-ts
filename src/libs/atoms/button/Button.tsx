import { Button, createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import * as React from 'react';

interface RCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'filled' | 'outline' | 'light' | 'subtle' | 'default' | 'white' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  color?:
    | 'dark'
    | 'gray'
    | 'red'
    | 'pink'
    | 'grape'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange'
    | 'teal'
    | (string & {});
}

const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
});

const RCButton: React.FC<RCButtonProps> = ({
  variant = 'filled',
  color = 'blue',
  size = 'md',
  radius = 'md',
  children,
  ...rest
}) => {
  return (
    <MantineProvider theme={theme}>
      <Button variant={variant} color={color} {...rest}>
        {children}
      </Button>
    </MantineProvider>
  );
};

export default RCButton;
