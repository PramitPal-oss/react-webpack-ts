// // src/bootstrap.tsx (REMOTE) - NEW FILE
// import { RCProvider } from 'components/ui';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import './index.css';

// const rootElement = document.getElementById('root')!;
// const root = createRoot(rootElement);

// root.render(
//   <RCProvider>
//     <App />
//   </RCProvider>
// );

// src/bootstrap.tsx (REMOTE)
import { RCProvider } from 'components/ui';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

function render() {
  root.render(
    <RCProvider>
      <App />
    </RCProvider>
  );
}

render();

// ✅ Handle HMR properly
if (module.hot) {
  module.hot.accept('./App', () => {
    // Re-render when App changes
    render();
  });
}
