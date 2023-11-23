import React, { useRef } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isError, setIsError] = React.useState(false);

  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginMutation = useMutation(
    () =>
      axios.post('http://localhost:3000/login', {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      }),
    {
      onSuccess: (data) => {
        navigate('/home',{state: {"token": data.data.token}});
      },
      onError: () => {
        console.error('Login failed');
        setIsError(true);
      },
    }
  );

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="grid gap-8 text-center">
      <h1 className="text-4xl font-semibold tracking-widest lg:text-7xl">
        Polizei Berlin Login
      </h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="input"
          type="text"
          ref={usernameRef}
          placeholder="Username"
        />
        <input
          className="input"
          type="password"
          ref={passwordRef}
          placeholder="Password"
        />
        <button 
          className="button-primary" type="submit">Submit</button>
      </form>
      {isError && <div>User or password not correct, try again.</div>}
    </div>
  );
}

export default Login;