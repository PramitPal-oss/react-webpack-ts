import type { RCButtonProps, RCFieldsetProps, RCPasswordInputProps, RCTextInputProps } from 'components/ui';
import React, { ComponentType, Suspense } from 'react';

const ComponentLoader = () => (
  <div className='min-h-10 flex items-center'>
    <span className='font-poppins'>Loading...</span>
  </div>
);

function createLazyComponent<P extends object>(importFn: () => Promise<any>, componentName: string): React.FC<P> {
  const LazyComponent = React.lazy(async () => {
    const module = await importFn();
    return {
      default: module[componentName] as ComponentType<P>,
    };
  });

  const WrappedComponent: React.FC<P> = (props) => (
    <Suspense fallback={<ComponentLoader />}>{React.createElement(LazyComponent as ComponentType<P>, props)}</Suspense>
  );

  WrappedComponent.displayName = `Lazy(${componentName})`;

  return WrappedComponent;
}

// Wrapped exports
export const RCButton = createLazyComponent<RCButtonProps>(() => import('components/ui'), 'RCButton');

export const RCTextInput = createLazyComponent<RCTextInputProps>(() => import('components/ui'), 'RCTextInput');

export const RCFieldset = createLazyComponent<RCFieldsetProps>(() => import('components/ui'), 'RCFieldset');

export const RCPasswordInput = createLazyComponent<RCPasswordInputProps>(
  () => import('components/ui'),
  'RCPasswordInput'
);

// export const RCToast = createLazyComponent<RCToastOptions>(() => import('components/ui'), 'toast');
