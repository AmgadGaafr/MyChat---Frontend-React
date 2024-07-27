import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Conversation from "./Conversation";

function Conversations() {

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
                <Conversation conversation={conversation} key={conversation.id} />
            ))}
        </ul>
     );
}

export default Conversations;