/**
 * Programmatically sets the Google Translate language
 * @param langCode - Language code (e.g., 'en', 'hi', 'ta', etc.)
 */
export function setGoogleLanguage(langCode: string): void {
  // Map our language codes to Google Translate codes
  const languageMap: Record<string, string> = {
    'english': 'en',
    'hindi': 'hi',
    'tamil': 'ta',
    'telugu': 'te',
    'kannada': 'kn',
    'malayalam': 'ml',
    'bengali': 'bn',
    'marathi': 'mr',
    'gujarati': 'gu',
    'punjabi': 'pa',
    'urdu': 'ur',
    'odia': 'or',
    'assamese': 'as',
  };

  const googleLangCode = languageMap[langCode.toLowerCase()] || langCode.toLowerCase();

  // Wait for Google Translate to be ready and set the language
  const setLanguage = () => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    
    if (select) {
      if (select.value !== googleLangCode) {
        select.value = googleLangCode;
        // Trigger change event
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else {
      // Retry if element not found yet
      setTimeout(setLanguage, 100);
    }
  };

  // Start trying to set the language
  setTimeout(setLanguage, 500);
}

