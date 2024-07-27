import PropTypes from 'prop-types';

function Conversation({ conversation, onClick }) {
    return ( 
        <li className="conversation" onClick={onClick}>
            <p>{conversation.name}</p>
        </li>
    );
}

Conversation.propTypes = {
    conversation: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default Conversation;
