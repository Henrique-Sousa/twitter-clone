import { FC, useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import fetchJSON from './lib/fetchJSON';
import { UserResult } from './lib/ApiResult';

interface GetUserError {
  error: {
    title: string;
    detail: string;
    resourceType: string;
    resourceId: number;
    parameter: number;
  }
}

const Signup: FC = () => {

  const apiURL: string = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001';
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameElement = document.getElementById('name') as HTMLInputElement;
    const usernameElement = document.getElementById('username') as HTMLInputElement;
    const passwordElement = document.getElementById('password') as HTMLInputElement;
    const typedName: string | null = nameElement.value;
    const typedUsername: string | null = usernameElement.value;
    const typedPassword: string | null = passwordElement.value;

    if (typedUsername && typedPassword) {
      try {
        const userResult: UserResult | GetUserError = await fetchJSON(`${apiURL}/users/by/username/${typedUsername}`);
        if ('error' in userResult) {

          await fetch(`${apiURL}/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: typedName,
              username: typedUsername,
              password: typedPassword,
            }),
          });

          setRedirect(true);
        }
      } catch (e) {
        // ...
      }
    }
  };

  return (
    redirect ? <Redirect to="/login" />
      : (
        <div>
          <h1>Create your account</h1>
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              minLength={1}
              maxLength={50}
              pattern="[A-Za-z0-9_]{1,50}"
              required
            />
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
            <button type="submit"> Create </button>
          </form>
        </div>
      )
  );
};

export default Signup;
