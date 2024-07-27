import PropTypes from 'prop-types';

function Message({ messages }) {
    return (
        <li className="message">
            <p>{messages.content}</p>
            <span>{messages.User.username}</span>
        </li>
    );
}

Message.propTypes = {
    messages: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        User: PropTypes.shape({
            username: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default Message;
