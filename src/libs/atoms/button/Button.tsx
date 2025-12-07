import { Button, ButtonProps, createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
interface RCButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
});

const RCButton: React.FC<RCButtonProps> = ({ variant = 'filled', color = 'blue', children, ...rest }) => {
  return (
    <MantineProvider theme={theme}>
      <Button variant={variant} color={color} {...rest}>
        {children}
      </Button>
    </MantineProvider>
  );
};

export default RCButton;
