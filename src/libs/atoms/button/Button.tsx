import { Button } from '@mantine/core';
import * as React from 'react';
import { RCButtonProps } from '../../Interface/ButtonInterface';

const RCButton: React.FC<RCButtonProps> = ({
  variant = 'filled',
  color = 'blue',
  size = 'md',
  radius = 'md',
  children,
  ...rest
}) => {
  return (
    // <MantineProvider theme={theme}>
    <Button variant={variant} color={color} {...rest}>
      {children}
    </Button>
    // </MantineProvider>
  );
};

export default RCButton;
