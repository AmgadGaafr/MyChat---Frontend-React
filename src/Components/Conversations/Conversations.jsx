import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Conversation from './Conversation';
import PropTypes from 'prop-types';

function Conversations({ setCurrentConversation, onClick }) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/conversation/get_conversations', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        .then((response) => {
            const sortedConversations = response.data
                .slice()
                .sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));
            
            setConversations(sortedConversations);
            if (sortedConversations.length > 0) {
                setCurrentConversation(sortedConversations[0].conversation.id);
            }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    }, [setCurrentConversation]);

    return ( 
        <aside className="conversations">
          <ul>
            {conversations.map((conversation) => (
              <Conversation conversation={conversation} key={conversation.conversation.id} onClick={onClick}/>
            ))}
          </ul>
        </aside>
    );
}

Conversations.propTypes = {
  setCurrentConversation: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Conversations;
