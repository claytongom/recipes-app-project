import Proptypes from 'prop-types';
// serve para aparecer a mensagem LINK COPIED!
export default function Gift({ message }) {
  return (
    <div
      className="gift"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="Gift-body">{message}</div>
    </div>
  );
}

Gift.propTypes = {
  message: Proptypes.string.isRequired,
};
