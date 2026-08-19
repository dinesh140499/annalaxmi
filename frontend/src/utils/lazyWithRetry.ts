import React, { lazy } from 'react';

/**
 * Enhanced lazy import with automatic retry and cache recovery.
 * Resolves production 'ChunkLoadError' / 'Failed to fetch dynamically imported module'
 * caused by browser caching old chunks after live deployments.
 */
export const lazyWithRetry = <T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) => {
  return lazy(async () => {
    try {
      const component = await componentImport();
      // Reset refresh flag on successful chunk load
      window.sessionStorage.removeItem('chunk-reload-in-progress');
      return component;
    } catch (error) {
      console.warn('[Vite Lazy Chunk Error] Attempting recovery for live chunk load:', error);

      const hasReloaded = window.sessionStorage.getItem('chunk-reload-in-progress') === 'true';

      if (!hasReloaded) {
        // If a new build was deployed on live, old chunk hash doesn't exist.
        // Reload once to fetch the latest index.html with new asset hashes.
        window.sessionStorage.setItem('chunk-reload-in-progress', 'true');
        window.location.reload();
        return new Promise<{ default: T }>(() => {}); // Never resolves as page is reloading
      }

      // If already reloaded, retry dynamic import after a short delay
      return new Promise<{ default: T }>((resolve, reject) => {
        setTimeout(async () => {
          try {
            const retried = await componentImport();
            window.sessionStorage.removeItem('chunk-reload-in-progress');
            resolve(retried);
          } catch (retryError) {
            reject(retryError);
          }
        }, 800);
      });
    }
  });
};
