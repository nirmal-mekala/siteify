export const writeLocalStorage = (darkMode: boolean, alternateTheme: boolean) => {
  localStorage.setItem(window.SITEIFY_THEME_SELECTION_KEY, JSON.stringify({ darkMode, alternateTheme }));
};

export const manageDarkModeClasses = (darkMode: boolean) => {
  if (darkMode) {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
};

export const manageAlternateThemeClasses = (alternateTheme: boolean, alternateThemeClass: string) => {
  if (alternateTheme) {
    document.documentElement.classList.add(alternateThemeClass);
  } else {
    document.documentElement.classList.remove(alternateThemeClass);
  }
};

export const secondaryToggleEnabled = (siteifyConfig: (typeof window)['SITEIFY_CONFIG']) => {
  return !siteifyConfig?.secondaryToggle?.disabled;
};
