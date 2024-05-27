import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";

export default function Login() {
  const { signUp, logIn } = useAuth();
  
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setURL] = useState('');

  // error text
  // const [text, setText] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    switch (name) {
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'url':
        return setURL(value);
      case 'signup':
        return setSignup(checked);
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (signup) {
      signUp(username, password, name, email, url)
    } else {
      logIn(username, password)
    }
  }
  
  return (
    <StyledContainer>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" placeholder="ID" value={username} onChange={onChange} />
        <input type="text" name="password" placeholder="PASSWORD" value={password} onChange={onChange} />
        {signup && (
          <input type="text" name="name" placeholder="NAME" value={name} onChange={onChange} />
        )}
        {signup && (
          <input type="email" name="email" placeholder="EMAIL" value={email} onChange={onChange} />
        )}
        {signup && (
          <input type="url" name="url" placeholder="PROFILE URL" value={url} onChange={onChange} />
        )}

        <div>
          <input type="checkbox" name="signup" id="signup" checked={signup} onChange={onChange} />
          <label htmlFor="signup">새 계정을 생성하시겠습니까?</label>
        </div>

        <button type="submit">{signup ? '회원가입' : '로그인'}</button>
      </form>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  background-color: #3a62a9;

  & > form {
    display: flex;
    width: 400px;
    flex-direction: column;
    
    & > input {
      height: 30px;
      margin: 5px;
    }

    & > button {
      background-color: #2d3d7c;
      color: #b4c9df;
      margin: 1rem;
      padding: 0.5rem;
      border-radius: 1rem;
      font-weight: bold;
    }
  }
`;
