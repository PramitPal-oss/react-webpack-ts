import { Fieldset } from '@mantine/core';
import { RCFieldsetProps } from '../../Interface/FieldsetInterface';

const RCFieldset = ({ legend, children, className = '', disabled = false, padding = 'md' }: RCFieldsetProps) => {
  return (
    <Fieldset
      legend={legend}
      disabled={disabled}
      className={className}
      styles={{
        root: {
          borderRadius: 12,
          border: '1px solid var(--mantine-color-gray-3)',
          padding: padding,
        },
        legend: {
          fontSize: 'var(--mantine-font-size-md)',
          fontWeight: 600,
        },
      }}
    >
      {children}
    </Fieldset>
  );
};

export default RCFieldset;
