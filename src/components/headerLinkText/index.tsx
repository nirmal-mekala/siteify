export const HeaderLinkText = (props: { isHovered: boolean }) => {
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
};
