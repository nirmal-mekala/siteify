import { useState, useEffect } from "preact/hooks";

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
      {" "}
      <span>nirmal</span>
      <span>{isHovered ? "." : "\u00A0"}</span>
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
      href={url || "https://nirmal.meka.la"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text || <HeaderLinkText isHovered={isHovered} />}
    </a>
  );
}

function Toggle(props: {
  left: boolean;
  toggle: () => void;
  leftEmoji: string;
  rightEmoji: string;
}) {
  const { left, toggle, leftEmoji, rightEmoji } = props;
  const handleKeyDown = (e: KeyboardEvent) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
      toggle();
    }
  };
  return (
    <div
      className="toggle"
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <div className="toggle-side">
        <span className="toggle-icon">{left ? leftEmoji : ""}</span>
      </div>
      <div className="toggle-side">
        <span className="toggle-icon">{left ? "" : rightEmoji}</span>
      </div>
      <div className={"toggle-slider" + (left ? " toggle-left" : "")}></div>
    </div>
  );
}

function Header() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const siteifyConfig = window?.SITEIFY_CONFIG;
  const alternateThemeClass: string =
    siteifyConfig?.secondaryToggle?.className || "haxor";
  const [darkMode, setDarkMode] = useState(prefersDark);
  const [alternateTheme, setAlternateTheme] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleAlternateTheme = () => {
    setAlternateTheme(!alternateTheme);
  };
  const toggles = () => {
    let toggles = [
      {
        left: darkMode,
        toggleMethod: toggleDarkMode,
        leftEmoji: "🌜",
        rightEmoji: "🌞",
      },
    ];
    const secondaryToggleEnabled = !siteifyConfig?.secondaryToggle?.disabled;
    if (secondaryToggleEnabled) {
      toggles.push({
        left: alternateTheme,
        toggleMethod: toggleAlternateTheme,
        leftEmoji: "🙃",
        rightEmoji: "🙂",
      });
    }
    return toggles;
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [darkMode]);

  useEffect(() => {
    if (alternateTheme) {
      document.body.classList.add(alternateThemeClass);
    } else {
      document.body.classList.remove(alternateThemeClass);
    }
  }, [alternateTheme]);

  useEffect(() => {
    document.body.classList.remove("hidden");
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
