export const Toggle = (props: { left: boolean; toggle: () => void; leftEmoji: string; rightEmoji: string }) => {
  const { left, toggle, leftEmoji, rightEmoji } = props;
  return (
    <button type="button" className="toggle" onClick={toggle}>
      <div className="toggle-side">
        <span className="toggle-icon">{left ? leftEmoji : ''}</span>
      </div>
      <div className="toggle-side">
        <span className="toggle-icon">{left ? '' : rightEmoji}</span>
      </div>
      <div className={`toggle-slider ${left ? 'toggle-left' : ''}`}></div>
    </button>
  );
};
