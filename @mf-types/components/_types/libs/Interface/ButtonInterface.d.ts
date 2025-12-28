export interface RCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    color?: 'dark' | 'gray' | 'red' | 'pink' | 'grape' | 'violet' | 'indigo' | 'blue' | 'cyan' | 'green' | 'lime' | 'yellow' | 'orange' | 'teal' | (string & {});
}
