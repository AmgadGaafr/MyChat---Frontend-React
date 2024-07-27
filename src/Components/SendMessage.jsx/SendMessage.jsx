import axios from "axios";
import Cookies from "js-cookie";
import PropTypes from 'prop-types';

function SendMessage({ conversationId }) {

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        const content = e.target.content.value.trim();
        if (!content) {
            console.error('Message content cannot be empty');
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/message/create/${conversationId}`, 
        { content },
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        .then((response) => {
            if (response.status === 200) {
                e.target.content.value = '';
            }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    }

    return ( 
        <section>
            <form className="send-message" onSubmit={handleMessageSubmit}>
                <input type="text" name="content" placeholder="Type your message..." />
                <button type="submit">Send</button>
            </form>
        </section>
    );
}

SendMessage.propTypes = {
    conversationId: PropTypes.number.isRequired
};

export default SendMessage;
