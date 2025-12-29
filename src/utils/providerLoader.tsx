import { ReactNode } from 'react';

// Cache the provider to avoid reloading during HMR
let cachedProvider: React.ComponentType<{ children: ReactNode }> | null | undefined = undefined;

/**
 * Dual-booting provider loader
 * Tries to load RCProvider from host (components), falls back to standalone mode if host is not available
 * Caches the result to prevent unnecessary reloads during HMR
 */
export async function loadProvider(forceReload = false): Promise<React.ComponentType<{ children: ReactNode }> | null> {
  // Return cached provider if available and not forcing reload
  if (!forceReload && cachedProvider !== undefined) {
    return cachedProvider ?? null;
  }

  try {
    // Try to dynamically import RCProvider from host
    const componentsModule = await import('components/ui');

    if (componentsModule && componentsModule.RCProvider) {
      console.log('✅ Host provider detected - using host RCProvider');
      cachedProvider = componentsModule.RCProvider;
      return componentsModule.RCProvider;
    }

    cachedProvider = null;
    return null;
  } catch (error) {
    // Host is not available, remote will run standalone
    // Only log if we haven't cached a result yet (first load)
    if (cachedProvider === undefined) {
      console.log('ℹ️ Host not available - running in standalone mode');
    }
    cachedProvider = null;
    return null;
  }
}

/**
 * Wrapper component that conditionally applies provider
 */
export function ConditionalProvider({
  children,
  Provider,
}: {
  children: ReactNode;
  Provider: React.ComponentType<{ children: ReactNode }> | null;
}) {
  if (Provider) {
    return <Provider>{children}</Provider>;
  }

  // No provider available - render children directly
  return <>{children}</>;
}
