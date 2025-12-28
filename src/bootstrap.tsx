import { createRoot } from 'react-dom/client';
import { RCProvider } from './RCProvider';
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
    render();
  });
}
