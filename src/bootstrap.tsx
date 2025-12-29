import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { RCProvider } from './RCProvider';

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
    render();
  });
}
