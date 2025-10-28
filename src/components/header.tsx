import { useEffect, useState } from 'preact/hooks';

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
  }
}

function HeaderLinkText(props: { isHovered: boolean }) {
  const { isHovered } = props;
  return (
    <>
      {' '}
      <span>nirmal</span>
      <span>{isHovered ? '.' : '\u00A0'}</span>
      <span>meka</span>
      {isHovered && <span>.</span>}
      <span>la</span>
    </>
  );
}

function HeaderLink() {
  const [isHovered, setIsHovered] = useState(false);
  const text = window?.SITEIFY_CONFIG?.headerLink?.text;
  const url = window?.SITEIFY_CONFIG?.headerLink?.url;
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <a
      class="header-link"
      href={url || 'https://nirmal.meka.la'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text || <HeaderLinkText isHovered={isHovered} />}
    </a>
  );
}

function Toggle(props: { left: boolean; toggle: () => void; leftEmoji: string; rightEmoji: string }) {
  const { left, toggle, leftEmoji, rightEmoji } = props;
  const handleKeyDown = (e: KeyboardEvent) => {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      toggle();
    }
  };
  return (
    <div className="toggle" role="button" tabIndex={0} onClick={toggle} onKeyDown={handleKeyDown}>
      <div className="toggle-side">
        <span className="toggle-icon">{left ? leftEmoji : ''}</span>
      </div>
      <div className="toggle-side">
        <span className="toggle-icon">{left ? '' : rightEmoji}</span>
      </div>
      <div className={'toggle-slider' + (left ? ' toggle-left' : '')}></div>
    </div>
  );
}

const siteifyThemeSelectionKey = 'siteifyThemeSelection';

// TODO this is getting big enought for cleanup
interface SiteifySelections {
  darkMode: boolean;
  alternateTheme: boolean;
}

const isSiteifySelections = (v: unknown): v is SiteifySelections => {
  if (typeof v !== 'object' || v === null) return false;
  const { darkMode, alternateTheme } = v as { darkMode: unknown; alternateTheme: unknown };
  return [darkMode, alternateTheme].every((value) => typeof value === 'boolean');
};

const safeSelectionParse = (userPrefersDark: boolean): SiteifySelections => {
  const DEFAULT_SELECTIONS: SiteifySelections = {
    darkMode: userPrefersDark,
    alternateTheme: false,
  };
  try {
    const selectionsString = localStorage.getItem(siteifyThemeSelectionKey) || '';
    const selectionsObj = JSON.parse(selectionsString);
    if (isSiteifySelections(selectionsObj)) {
      return selectionsObj;
    } else {
      throw new Error('selections did not match expected shape');
    }
  } catch {
    return DEFAULT_SELECTIONS;
  }
};

const useConfig = () => {
  // get system dark/light preference
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // read local storage
  const selections: SiteifySelections = safeSelectionParse(userPrefersDark);

  // grab configuration for the site
  const siteifyConfig = window?.SITEIFY_CONFIG;
  const alternateThemeClass: string = siteifyConfig?.secondaryToggle?.className || 'haxor';

  return { siteifyConfig, alternateThemeClass, ...selections };
};

const writeLocalStorage = (darkMode: boolean, alternateTheme: boolean) => {
  localStorage.setItem(siteifyThemeSelectionKey, JSON.stringify({ darkMode, alternateTheme }));
};

const manageDarkModeClasses = (darkMode: boolean) => {
  if (darkMode) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }
};

const manageAlternateThemeClasses = (alternateTheme: boolean, alternateThemeClass: string) => {
  if (alternateTheme) {
    document.body.classList.add(alternateThemeClass);
  } else {
    document.body.classList.remove(alternateThemeClass);
  }
};

function Header() {
  const {
    siteifyConfig,
    alternateThemeClass,
    darkMode: initialDarkModeValue,
    alternateTheme: initialAlternateThemeValue,
  } = useConfig();
  const [darkMode, setDarkMode] = useState(initialDarkModeValue);
  const [alternateTheme, setAlternateTheme] = useState(initialAlternateThemeValue);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleAlternateTheme = () => {
    setAlternateTheme(!alternateTheme);
  };

  const toggles = () => {
    const toggles = [
      {
        left: darkMode,
        toggleMethod: toggleDarkMode,
        leftEmoji: '🌜',
        rightEmoji: '🌞',
      },
    ];
    const secondaryToggleEnabled = !siteifyConfig?.secondaryToggle?.disabled;
    if (secondaryToggleEnabled) {
      toggles.push({
        left: alternateTheme,
        toggleMethod: toggleAlternateTheme,
        leftEmoji: '🙃',
        rightEmoji: '🙂',
      });
    }
    return toggles;
  };

  useEffect(() => {
    manageDarkModeClasses(darkMode);
    manageAlternateThemeClasses(alternateTheme, alternateThemeClass);
    writeLocalStorage(darkMode, alternateTheme);
  }, [darkMode, alternateTheme]);

  useEffect(() => {
    document.body.classList.remove('hidden');
  }, []);

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
