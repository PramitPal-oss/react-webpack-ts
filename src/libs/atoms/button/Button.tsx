import { Button, ButtonProps } from '@mantine/core';

interface RCButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const RCButton: React.FC<RCButtonProps> = ({ variant = 'filled', color = 'blue', children, ...rest }) => {
  return (
    <Button variant={variant} color={color} {...rest}>
      {children}
    </Button>
  );
};

export default RCButton;
