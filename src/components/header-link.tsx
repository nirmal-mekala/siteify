import { useState } from 'preact/hooks';

function HeaderLink() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
        <span className="la">la</span>
      </a>
    </div>
  );
}

export default HeaderLink;
