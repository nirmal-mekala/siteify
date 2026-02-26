import { render } from 'preact';
import './index.css';
import { App } from './app.tsx';

declare global {
  interface Window {
    SITEIFY_CONFIG?: {
      secondaryToggle?: {
        disabled?: boolean;
        className?: string;
      };
      headerLink?: {
        text?: string;
        url?: string;
      };
    };
    SITEIFY_THEME_SELECTION_KEY: string;
    siteifyThemeConfig: () => {
      siteifyConfig: (typeof window)['SITEIFY_CONFIG'];
      alternateThemeClass: string;
      darkMode: boolean;
      alternateTheme: boolean;
    };
  }
}

const container = document.body.querySelector('#page');
if (container) {
  container.insertBefore(document.createElement('header'), container.firstChild);
  if (container.firstChild) {
    render(<App />, container.firstChild);
  }
}
