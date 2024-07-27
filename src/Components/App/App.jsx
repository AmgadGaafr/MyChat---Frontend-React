import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Login from '../Login/Login.jsx';
import Message from '../Message/Message.jsx';
import Conversations from '../Conversations/Conversations.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
    if (isAuthenticated) {
      axios.get('http://127.0.0.1:8000/api/message/get/4', {
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
  }, [isAuthenticated]);

  return (
    <div className="container">
      {!isAuthenticated && <Login />}
      {isAuthenticated && userInfo && (
        <main>
          <aside className="conversations">
            <Conversations />
          </aside>
          <section className="messages">
            <ul>
            {messages.map((message) => (
              <Message messages={message} key={message.id} />
            ))}
            </ul>
            <section className="send-message">
              <input type="text" />
              <button>Send</button>
            </section>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
