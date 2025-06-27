import { useState, useEffect } from 'preact/hooks';

function HeaderLink() {
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

  const containerStyle = {
    width: '80px',
    height: '40px',
    backgroundColor: 'magenta',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '0 10px',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
  };

  const sideStyle = {
    flex: 1,
    textAlign: 'center',
    zIndex: 1,
  };

  const iconStyle = {
    fontSize: '24px',
  };

  const thumbStyle = {
    width: '30px',
    height: '30px',
    backgroundColor: 'blue',
    borderRadius: '50%',
    position: 'absolute',
    top: '5px',
    left: darkMode ? '44px' : '4px',
    transition: 'left 0.3s ease',
  };

  const thumbStyleHaxor = {
    ...thumbStyle,
    left: haxorMode ? '4px' : '44px',
  };

  // TODO - make this real CSS lol

  useEffect(() => {
    document.body.classList.remove('light', 'dark', 'haxor');
    document.body.classList.add(darkMode ? 'dark' : 'light');
    if (haxorMode) document.body.classList.add('haxor');
  }, [darkMode, haxorMode]);

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
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* componentize */}
        <div
          style={containerStyle}
          role="button"
          tabIndex={0}
          onClick={toggleDarkMode}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && toggleDarkMode()
          }
        >
          <div style={sideStyle}>
            <span style={iconStyle}>{darkMode ? '🌜' : ''}</span>
          </div>
          <div style={sideStyle}>
            <span style={iconStyle}>{!darkMode ? '🌞' : ''}</span>
          </div>
          <div style={thumbStyle} />
        </div>

        <div
          style={containerStyle}
          role="button"
          tabIndex={0}
          onClick={toggleHaxorMode}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && toggleHaxorMode()
          }
        >
          <div style={sideStyle}>
            <span style={iconStyle}>{!haxorMode ? '😎' : ''}</span>
          </div>
          <div style={sideStyle}>
            <span style={iconStyle}>{haxorMode ? ' 😵‍💫' : ''}</span>
          </div>
          <div style={thumbStyleHaxor} />
        </div>
      </div>
    </div>
  );
}

export default HeaderLink;
