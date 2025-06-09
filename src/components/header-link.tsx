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
      'fancy',
      'funk',
      'rgb',
      'pattern',
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
        <button onClick={themeUpdater('light')}>1</button>
        <button onClick={themeUpdater('dark')}>2</button>
        <button onClick={themeUpdater('fancy')}>3</button>
        <button onClick={themeUpdater('funk')}>4</button>
        <button onClick={themeUpdater('rgb')}>5</button>
        <button onClick={themeUpdater('pattern')}>6</button>
      </div>
    </div>
  );
}

export default HeaderLink;
