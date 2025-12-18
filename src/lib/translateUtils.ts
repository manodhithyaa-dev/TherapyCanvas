/**
 * Utility functions for Google Translate
 */

/**
 * Checks if Google Translate is ready and the select element exists
 */
export function isGoogleTranslateReady(): boolean {
  const hasAPI = !!(window.google?.translate?.TranslateElement);
  const hasSelect = !!document.querySelector('.goog-te-combo');
  const ready = hasAPI && hasSelect;
  
  if (!ready) {
    console.log('Google Translate ready check:', {
      hasAPI,
      hasSelect,
      selectElement: document.querySelector('.goog-te-combo')
    });
  }
  
  return ready;
}

/**
 * Waits for Google Translate to be ready
 * @param timeout - Maximum time to wait in milliseconds (default: 10000)
 */
export function waitForGoogleTranslate(timeout = 10000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isGoogleTranslateReady()) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isGoogleTranslateReady()) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        console.warn('Google Translate not ready after timeout');
        resolve(false);
      }
    }, 100);
  });
}

