/**
 * Loads Google Translate script and initializes it
 * This should be called once globally in the app
 * Returns a promise that resolves when Google Translate is ready
 */
export function loadGoogleTranslate(): Promise<void> {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.google?.translate?.TranslateElement) {
      resolve();
      return;
    }

    // Check if script is already in the DOM
    const existingScript = document.querySelector('script[src*="translate.googleapis.com"]');
    if (existingScript) {
      // Wait for it to be ready
      const checkReady = setInterval(() => {
        if (window.google?.translate?.TranslateElement) {
          clearInterval(checkReady);
          resolve();
        }
      }, 100);
      return;
    }

    // Define the initialization function
    (window as any).googleTranslateElementInit = function () {
      try {
        console.log('Initializing Google Translate...');
        const translateElement = new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'hi,ta,te,kn,ml,mr,bn,gu,pa,ur,or,as,en',
            autoDisplay: false,
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
        
        console.log('Google Translate element created:', translateElement);
        
        // Wait for the select element to be created
        const checkForSelect = setInterval(() => {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            console.log('✓ Google Translate select element found');
            clearInterval(checkForSelect);
            resolve();
          }
        }, 100);
        
        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkForSelect);
          console.log('Google Translate initialized (timeout)');
          resolve();
        }, 5000);
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
        resolve(); // Resolve anyway to not block
      }
    };

    // Create and inject the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load Google Translate script');
      resolve(); // Resolve anyway
    };
    document.head.appendChild(script);
  });
}

