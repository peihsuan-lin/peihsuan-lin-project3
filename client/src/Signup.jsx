import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [usernameState, setUsernameState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  function handleUsername(e) {
    const username = e.target.value;
    setUsernameState(username);
  }
  function handlePassword(e) {
    const pwd = e.target.value;
    setPasswordState(pwd);
  }
  async function handleSubmit() {
    try {
      const response = await axios.post('/api/signup', {
        username: usernameState,
        password: passwordState
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
  
  return (<div>
    <h1>Signup Page</h1>
    <div>
        <h3>Username:</h3>
        <input value={usernameState} onChange={handleUsername}></input>
    </div>
    <div>
        <h3>Password:</h3>
        <input type='password' value={passwordState} onChange={handlePassword}></input>
    </div>
    <button onClick={handleSubmit}>Click here to sign up!</button>
</div>)
}
