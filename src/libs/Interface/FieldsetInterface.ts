import { ReactNode } from 'react';

export interface RCFieldsetProps {
  legend?: ReactNode;
  children: ReactNode;

  /** Tailwind / custom styling */
  className?: string;

  /** Accessibility */
  disabled?: boolean;

  /** Layout control */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
