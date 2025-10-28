export const writeLocalStorage = (darkMode: boolean, alternateTheme: boolean) => {
  localStorage.setItem(SITEIFY_THEME_SELECTION_KEY, JSON.stringify({ darkMode, alternateTheme }));
};

export const manageDarkModeClasses = (darkMode: boolean) => {
  if (darkMode) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }
};

export const manageAlternateThemeClasses = (alternateTheme: boolean, alternateThemeClass: string) => {
  if (alternateTheme) {
    document.body.classList.add(alternateThemeClass);
  } else {
    document.body.classList.remove(alternateThemeClass);
  }
};

const SITEIFY_THEME_SELECTION_KEY = 'siteifyThemeSelection';

export const secondaryToggleEnabled = (siteifyConfig: (typeof window)['SITEIFY_CONFIG']) => {
  return !siteifyConfig?.secondaryToggle?.disabled;
};

interface SiteifySelections {
  darkMode: boolean;
  alternateTheme: boolean;
}

export const isSiteifySelections = (v: unknown): v is SiteifySelections => {
  if (typeof v !== 'object' || v === null) return false;
  const { darkMode, alternateTheme } = v as { darkMode: unknown; alternateTheme: unknown };
  return [darkMode, alternateTheme].every((value) => typeof value === 'boolean');
};

export const siteifySelections = (userPrefersDark: boolean, secondaryToggleEnabled: boolean): SiteifySelections => {
  const DEFAULT_SELECTIONS: SiteifySelections = {
    darkMode: userPrefersDark,
    alternateTheme: false,
  };
  try {
    const selectionsString = localStorage.getItem(SITEIFY_THEME_SELECTION_KEY) || '';
    const selectionsObj = JSON.parse(selectionsString);
    if (isSiteifySelections(selectionsObj)) {
      return secondaryToggleEnabled ? selectionsObj : { ...selectionsObj, alternateTheme: false };
    } else {
      throw new Error('selections did not match expected shape');
    }
  } catch {
    return DEFAULT_SELECTIONS;
  }
};

export const config = () => {
  // get system dark/light preference
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // grab configuration for the site - (stored on window, configured on a per-site basis via script tag)
  const siteifyConfig = window?.SITEIFY_CONFIG;
  const alternateThemeClass: string = siteifyConfig?.secondaryToggle?.className || 'haxor';

  // read local storage for user selections
  const selections: SiteifySelections = siteifySelections(userPrefersDark, secondaryToggleEnabled(siteifyConfig));

  return { siteifyConfig, alternateThemeClass, ...selections };
};
