import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Conversation from "./Conversation";
import PropTypes from 'prop-types';

function Conversations({handleGetCurrentConversationId}) {

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user/get_conversations', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        .then((response) => {
            setConversations(response.data);
        })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    }, []);

    return ( 
        <ul>
            {conversations.map((conversation) => (
                <Conversation conversation={conversation} key={conversation.id} onClick={() => handleGetCurrentConversationId(conversation.id)}/>
            ))}
        </ul>
     );
}

Conversations.propTypes = {
    handleGetCurrentConversationId: PropTypes.func.isRequired
};

export default Conversations;