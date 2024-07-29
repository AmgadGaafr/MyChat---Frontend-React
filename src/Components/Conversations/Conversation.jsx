import PropTypes from 'prop-types';

function Conversation({ conversation, onClick }) {
    const date = new Date(conversation.lastMessage.createdAt).toLocaleDateString() + ' ' + new Date(conversation.lastMessage.createdAt).toLocaleTimeString();
    
    return (    
       <li key={conversation.conversation.id} className="conversation" onClick={() => onClick(conversation.conversation.id)}>
           <p>{conversation.conversation.name}</p>
           <span>{conversation.lastMessage.User.username} : {conversation.lastMessage.content} - {date}</span>
       </li>
    );
}

Conversation.propTypes = {
    conversation: PropTypes.shape({
        conversation: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        lastMessage: PropTypes.shape({
            id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            User: PropTypes.shape({
                id: PropTypes.number.isRequired,
                username: PropTypes.string.isRequired
            }).isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default Conversation;
