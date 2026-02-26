import { useCallback, useEffect, useState } from 'preact/hooks';
import { HeaderLink } from '../headerLink';
import { Toggle } from '../toggle';
import {
  manageAlternateThemeClasses,
  manageDarkModeClasses,
  secondaryToggleEnabled,
  writeLocalStorage,
} from './utils.ts';

function Header() {
  const {
    siteifyConfig,
    alternateThemeClass,
    darkMode: initialDarkModeValue,
    alternateTheme: initialAlternateThemeValue,
  } = window.siteifyThemeConfig();
  const [darkMode, setDarkMode] = useState(initialDarkModeValue);
  const [alternateTheme, setAlternateTheme] = useState(initialAlternateThemeValue);

  const toggles = useCallback(() => {
    const toggles = [
      {
        left: darkMode,
        toggleMethod: () => setDarkMode(!darkMode),
        leftEmoji: '🌜',
        rightEmoji: '🌞',
      },
    ];
    if (secondaryToggleEnabled(siteifyConfig)) {
      toggles.push({
        left: alternateTheme,
        toggleMethod: () => setAlternateTheme(!alternateTheme),
        leftEmoji: '🙃',
        rightEmoji: '🙂',
      });
    }
    return toggles;
  }, [darkMode, alternateTheme, siteifyConfig]);

  useEffect(() => {
    manageDarkModeClasses(darkMode);
    manageAlternateThemeClasses(alternateTheme, alternateThemeClass);
    writeLocalStorage(darkMode, alternateTheme);
  }, [darkMode, alternateTheme]);

  return (
    <div>
      <HeaderLink />
      <div className="toggles-wrapper">
        {toggles().map((toggle) => (
          <Toggle
            left={toggle.left}
            toggle={toggle.toggleMethod}
            leftEmoji={toggle.leftEmoji}
            rightEmoji={toggle.rightEmoji}
          />
        ))}
      </div>
    </div>
  );
}

export default Header;
