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
        <span>{isHovered ? 'nirmal.meka.la' : 'nirmal mekala'}</span>
      </a>
    </div>
  );
}

export default HeaderLink;
