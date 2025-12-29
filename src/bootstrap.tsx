import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { MFEErrorBoundary } from './core/MFEErrorBoundary';
import './index.css';
import { ConditionalProvider, loadProvider } from './utils/providerLoader';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

let Provider: React.ComponentType<{ children: React.ReactNode }> | null = null;

async function init() {
  try {
    Provider = await loadProvider();
  } catch (error) {
    console.warn('Failed to load provider during init:', error);
  }
  render();
}

function render() {
  root.render(
    <MFEErrorBoundary>
      <ConditionalProvider Provider={Provider}>
        <App />
      </ConditionalProvider>
    </MFEErrorBoundary>
  );
}

// Initialize and render
init();

// ✅ Handle HMR properly
if (module.hot) {
  // Accept App changes - just re-render, don't reload provider
  module.hot.accept('./App', () => {
    render();
  });

  // Accept providerLoader changes - don't reload provider during HMR to avoid errors
  // The cached provider will be used, just re-render
  module.hot.accept('./utils/providerLoader', () => {
    // Don't reload provider during HMR - use cached version
    // This prevents script errors from remote module reloads
    render();
  });

  // Accept CSS changes
  module.hot.accept('./index.css', () => {
    // CSS is handled by style-loader, no action needed
  });
}
