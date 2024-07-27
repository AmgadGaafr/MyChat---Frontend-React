import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {

  const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://127.0.0.1:8000/api/login_check', {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then((response) => {
            Cookies.set('token', response.data.token);
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"/>
            </div>
            <button type="submit">Valider</button>
        </form>
     );
}

export default Login;