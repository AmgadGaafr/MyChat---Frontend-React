import PropTypes from 'prop-types';

function Conversation({conversation}) {
    return ( 
        <li className="conversation">
            <p>{conversation.name}</p>
        </li>
     );
}

Conversation.propTypes = {
    conversation: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
        
    }).isRequired
}

export default Conversation;