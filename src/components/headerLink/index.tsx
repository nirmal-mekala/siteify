import { useState } from 'preact/hooks';
import { HeaderLinkText } from '../headerLinkText';

export const HeaderLink = () => {
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
};
