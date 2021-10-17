import { FC, useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';

const Login: FC = () => {

  const apiURL: string = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001';
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameElement = document.getElementById('username') as HTMLInputElement;
    const passwordElement = document.getElementById('password') as HTMLInputElement;
    const typedUsername: string | null = usernameElement.value;
    const typedPassword: string | null = passwordElement.value;

    if (typedUsername && typedPassword) {

      const userToSend = {
        username: typedUsername,
        password: typedPassword,
      };

      try {
        const response = await fetch(`${apiURL}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userToSend),
        });
        const result = await response.json();
        if (!('error' in result)) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('loggedUser', JSON.stringify(result.user));
          setRedirect(true);
        }

      } catch (e) {
        // ...
      }
    }
  };

  return (
    redirect
      ? (
        <Redirect to="/home" />
      )
      : (
        <div>
          <h1>Enter your username and password</h1>
          <form onSubmit={handleSubmit}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              minLength={1}
              maxLength={15}
              pattern="[A-Za-z0-9_]{1,15}"
              required
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              minLength={1}
              maxLength={128}
              pattern=".{1,128}"
              required
            />
            <button type="submit"> Log in </button>
          </form>
        </div>
      )
  );
};
export default Login;
