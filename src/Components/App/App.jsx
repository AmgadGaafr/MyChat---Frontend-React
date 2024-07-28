import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Login from '../Login/Login.jsx';
import Message from '../Message/Message.jsx';
import SendMessage from '../SendMessage/SendMessage.jsx';
import Conversation from '../Conversations/Conversation.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  // Handle selecting a conversation
  const handleGetCurrentConversationId = (id) => {
    setCurrentConversation(id);
  };

  // Check for authentication token and set state
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch user info once authenticated
  useEffect(() => {
    if (isAuthenticated && !userInfo) {
      axios.get('http://127.0.0.1:8000/api/user/get_info', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    }
  }, [isAuthenticated, userInfo]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/conversation/get_conversations', {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
    .then((response) => {
        setCurrentConversation(response.data[0].id);
        setConversations(response.data);
    })
  .catch((error) => {
    console.error('There was an error!', error);
  });
}, []);

  // Fetch messages for the current conversation
  useEffect(() => {
    if (isAuthenticated && currentConversation) {
      axios.get(`http://127.0.0.1:8000/api/message/get/${currentConversation}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    }
  }, [isAuthenticated, currentConversation]);

  return (
    <div className="container">
      {!isAuthenticated && <Login />}
      {isAuthenticated && userInfo && (
        <main>
          <aside className="conversations">
            <ul>
            {conversations.map((conversation) => (
              <Conversation conversation={conversation} key={conversation.id} onClick={() => handleGetCurrentConversationId(conversation.id)}/>
            ))}
            </ul>
          </aside>
          <section className="messages">
            <ul>
              {messages.map((message) => (
                <Message message={message} key={message.id} />
              ))}
            </ul>
            <SendMessage conversationId={currentConversation}/>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
