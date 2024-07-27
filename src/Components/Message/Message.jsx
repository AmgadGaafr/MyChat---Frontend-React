import PropTypes from 'prop-types';

function Message({ message }) {
    return (
        <li className="message">
            <p>{message.content}</p>
            <span>{message.User.username}</span> 
        </li>
    );
}

Message.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        User: PropTypes.shape({
            username: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default Message;
