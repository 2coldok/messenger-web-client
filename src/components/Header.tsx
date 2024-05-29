import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";

export default function Header() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  
  const handleClick = (path: string) => {
    navigate(path);
  }

  return (
    <StyledContainer>
      { user && <span>{user.username}님 로그인 상태 입니다</span>}
      <button className="home" onClick={() => handleClick('/')}>Home</button>
      { !user && <button className="login" onClick={() => handleClick('/login')}>Login</button>}
      { user && <button className="mytweet" onClick={() => navigate(`/${user.username}`)}>My Tweet</button> }
      { user && <button onClick={logOut}>로그아웃</button> }
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;

  & > button {
    width: 100px;
    height: 70px;
    border-radius: 1rem;
    margin-right: 10px;
    color: black;
    font-weight: bold;
  }
  
  .home {
    background-color: #c474d8;
  }

  .mytweet {
    background-color: yellow;
  }

  .login {
    background-color: #449d77;
  }

  
`;
