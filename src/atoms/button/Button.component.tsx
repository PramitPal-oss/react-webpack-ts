interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary';
  children: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...rest }) => {
  return (
    <button
      {...rest}
      className='text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'
    >
      {children}
    </button>
  );
};

export default Button;
