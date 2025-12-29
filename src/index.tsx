// src/index.tsx or main.tsx (REMOTE)
import('./bootstrap').catch((err) => {
  console.error('Failed to load application:', err);
});
