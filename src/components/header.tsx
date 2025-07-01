import { useState, useEffect } from 'preact/hooks';

function Toggle(props: {
  left: boolean;
  toggle: () => void;
  leftEmoji: string;
  rightEmoji: string;
}) {
  const { left, toggle, leftEmoji, rightEmoji } = props;

  // TODO consider handling via CSS - would feel cleaner
  const thumbStyle = {
    left: left ? '44px' : '4px',
  };

  return (
    <div
      className="toggle-container"
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
    >
      <div className="toggle-side">
        <span className="toggle-icon">{left ? leftEmoji : ''}</span>
      </div>
      <div className="toggle-side">
        <span className="toggle-icon">{left ? '' : rightEmoji}</span>
      </div>
      <div className="toggle-thumb" style={thumbStyle} />
    </div>
  );
}

function Header() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isHovered, setIsHovered] = useState(false);
  const [darkMode, setDarkMode] = useState(prefersDark);
  const [haxorMode, setHaxorMode] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleHaxorMode = () => {
    setHaxorMode(!haxorMode);
  };

  useEffect(() => {
    document.body.classList.remove('light', 'dark', 'haxor');
    document.body.classList.add(darkMode ? 'dark' : 'light');
    if (haxorMode) document.body.classList.add('haxor');
  }, [darkMode, haxorMode]);

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
      <a
        href="https:/nirmal.meka.la"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>nirmal</span>
        <span>{isHovered ? '.' : '\u00A0'}</span>
        <span>meka</span>
        {isHovered && <span>.</span>}
        <span>la</span>
      </a>
      {/* TODO get rid of style tag  */}
      <div style={{ display: 'flex', gap: '10px' }}>
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
