import { useState, useEffect } from 'preact/hooks';

function HeaderLink() {
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState('light');
  // light funk dark fancy

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const themeUpdater = (theme: string) => {
    return () => setTheme(theme);
  };

  useEffect(() => {
    document.body.classList.remove(
      'light',
      'dark',
      'haxor-light',
      'haxor-dark',
    );
    document.body.classList.add(theme);
  }, [theme]);

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
      <div>
        <span style={{ marginRight: '0.5rem' }}>selected: {theme}</span>
        <button onClick={themeUpdater('light')}>lt</button>
        <button onClick={themeUpdater('dark')}>dk</button>
        <button onClick={themeUpdater('haxor-light')}>haxor-lt</button>
        <button onClick={themeUpdater('haxor-dark')}>haxor-dk</button>
      </div>
    </div>
  );
}

export default HeaderLink;
