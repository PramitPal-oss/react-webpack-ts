import { TextInput } from '@mantine/core';
import * as React from 'react';
import { RCTextInputProps } from '../../Interface/TextInputInterface';

const RCTextInput = React.forwardRef<HTMLInputElement, RCTextInputProps>(
  (
    {
      label,
      description,
      error,
      withAsterisk,
      size = 'md',
      radius = 'sm',
      variant = 'default',
      leftSection,
      rightSection,
      ...rest
    },
    ref
  ) => {
    return (
      <TextInput
        ref={ref}
        label={label}
        description={description}
        error={error}
        withAsterisk={withAsterisk}
        size={size}
        radius={radius}
        variant={variant}
        leftSection={leftSection}
        rightSection={rightSection}
        {...rest} // native input props go here
      />
    );
  }
);

RCTextInput.displayName = 'RCTextInput';

export default RCTextInput;
