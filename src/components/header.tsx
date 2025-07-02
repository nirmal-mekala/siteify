import { useState, useEffect } from 'preact/hooks';

function HeaderLink() {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <a
      class="header-link"
      href="https://nirmal.meka.la"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>nirmal</span>
      <span>{isHovered ? '.' : '\u00A0'}</span>
      <span>meka</span>
      {isHovered && <span>.</span>}
      <span>la</span>
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
    if (['Enter', ' '].includes(e.key)) {
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
        <span className="toggle-icon">{left ? leftEmoji : ''}</span>
      </div>
      <div className="toggle-side">
        <span className="toggle-icon">{left ? '' : rightEmoji}</span>
      </div>
      <div className={'toggle-slider' + (left ? ' toggle-left' : '')}></div>
    </div>
  );
}

function Header() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [darkMode, setDarkMode] = useState(prefersDark);
  const [haxorMode, setHaxorMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleHaxorMode = () => {
    setHaxorMode(!haxorMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [darkMode]);

  useEffect(() => {
    if (haxorMode) {
      document.body.classList.add('haxor');
    } else {
      document.body.classList.remove('haxor');
    }
  }, [haxorMode]);

  useEffect(() => {
    document.body.classList.remove('hidden');
  }, []);

  const toggles = [
    {
      left: darkMode,
      toggleMethod: toggleDarkMode,
      leftEmoji: '🌜',
      rightEmoji: '🌞',
    },
    {
      left: !haxorMode,
      toggleMethod: toggleHaxorMode,
      leftEmoji: '🙂',
      rightEmoji: '🙃',
    },
  ];

  return (
    <div>
      <HeaderLink />
      <div className="toggles-wrapper">
        {toggles.map((toggle) => (
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
