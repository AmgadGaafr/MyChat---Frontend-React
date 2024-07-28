import PropTypes from 'prop-types';

function Message({ message }) {
    const date = new Date(message.createdAt).toLocaleDateString() + ' ' + new Date(message.createdAt).toLocaleTimeString();

    return (
        <li className="message">
            <span>{message.User.username} - {date}</span>
            <p>{message.content}</p>
        </li>
    );
}

Message.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    }).isRequired,
    User: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired
}.isRequired;

export default Message;
