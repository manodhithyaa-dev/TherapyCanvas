/**
 * Observer to maintain Google Translate functionality with React
 */

let currentLanguage: string | null = null;
let observer: MutationObserver | null = null;

/**
 * Stores the current language for re-application
 */
export function setCurrentTranslateLanguage(lang: string): void {
  currentLanguage = lang;
}

/**
 * Gets the current language
 */
export function getCurrentTranslateLanguage(): string | null {
  return currentLanguage;
}

/**
 * Re-applies translation if needed after DOM changes
 */
export function reapplyTranslationIfNeeded(): void {
  if (!currentLanguage) return;
  
  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (select && select.value !== currentLanguage) {
    console.log('Re-applying translation after DOM change');
    select.value = currentLanguage;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

/**
 * Starts observing DOM changes to maintain translations
 */
export function startTranslateObserver(): void {
  if (observer) {
    return; // Already observing
  }

  observer = new MutationObserver((mutations) => {
    // Check if significant DOM changes occurred
    const hasSignificantChanges = mutations.some(mutation => 
      mutation.type === 'childList' && mutation.addedNodes.length > 0
    );

    if (hasSignificantChanges) {
      // Small delay to let React finish rendering
      setTimeout(() => {
        reapplyTranslationIfNeeded();
      }, 300);
    }
  });

  // Observe the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
  });

  console.log('Google Translate observer started');
}

/**
 * Stops observing DOM changes
 */
export function stopTranslateObserver(): void {
  if (observer) {
    observer.disconnect();
    observer = null;
    console.log('Google Translate observer stopped');
  }
}

