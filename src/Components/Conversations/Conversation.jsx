import PropTypes from 'prop-types';

function Conversation({ conversation, onClick }) {
    const date = new Date(conversation.messages[0].createdAt).toLocaleDateString() + ' ' + new Date(conversation.messages[0].createdAt).toLocaleTimeString();

    return ( 
        <li className="conversation" onClick={onClick}>
            <p>{conversation.name}</p>
            <span>{conversation.messages[0].User.username} : {conversation.messages[0].content} - {date}</span>
        </li>
    );
}

Conversation.propTypes = {
    conversation: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        messages: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
            User: PropTypes.shape({
                username: PropTypes.string.isRequired
            }).isRequired,
            createdAt: PropTypes.string.isRequired
        })).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default Conversation;
