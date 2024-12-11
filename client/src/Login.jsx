import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [usernameState, setUsernameState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  function handleUsername(e) {
    const username = e.target.value;
    setUsernameState(username);
  }
  function handlePassword(e) {
    const password = e.target.value;
    setPasswordState(password);
  }
  async function handleSubmit() {
    try {
      const response = await axios.post('/api/login', {
        username: usernameState,
        password: passwordState
      });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
  
  return (<div>
    <h1>Login Page</h1>
    <div>
        <h3>Username:</h3>
        <input value={usernameState} onChange={handleUsername}></input>
    </div>
    <div>
        <h3>Password:</h3>
        <input type='password' value={passwordState} onChange={handlePassword}></input>
    </div>
    <button onClick={handleSubmit}>Click here to log in!</button>
</div>)
}
