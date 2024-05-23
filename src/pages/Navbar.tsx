import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  }
  
  return (
    <StyledContainer>
      <button className="home" onClick={() => handleClick('/')}>Home</button>
      <button className="mytweet">My Tweet</button>
      <button className="login" onClick={() => handleClick('/login')}>Login</button>
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
