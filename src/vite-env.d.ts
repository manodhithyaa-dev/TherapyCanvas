/// <reference types="vite/client" />

// Google Translate types
interface Window {
  google?: {
    translate?: {
      TranslateElement: {
        new (config: any, elementId: string): any;
        InlineLayout: {
          SIMPLE: number;
        };
      };
    };
  };
  googleTranslateElementInit?: () => void;
}
