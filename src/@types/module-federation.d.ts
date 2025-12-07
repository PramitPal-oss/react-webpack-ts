declare module 'components/RCButton' {
  import * as React from 'react';

  export interface RCButtonProps {
    children?: React.ReactNode;
    color?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onClick?: () => void;
  }

  const RCButton: React.ComponentType<RCButtonProps>;
  export default RCButton;
}
