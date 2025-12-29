import { PasswordInput } from '@mantine/core';
import { RCPasswordInputProps } from '../../Interface/PasswordInputInterface';

const RCPasswordInput = ({ label, error, onChange, className, onValueChange, ...rest }: RCPasswordInputProps) => {
  return (
    <PasswordInput
      label={label}
      error={error}
      className={className}
      type='password'
      {...rest}
      onChange={(e) => {
        onChange?.(e); // ✅ RHF handler
        onValueChange?.(e.currentTarget.value); // ✅ DX handler
      }}
    />
  );
};

export default RCPasswordInput;
