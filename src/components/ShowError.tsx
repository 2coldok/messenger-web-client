import styled from "styled-components";

interface IShowErrorProp {
  error: string;
}

export default function ShowError({ error }: IShowErrorProp) {
  if (error === '') {
    return;
  }

  return (
    <StyledContainer>
      <h1>ERRPR!!</h1>
      <p>{error}</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  color: red;
`;
