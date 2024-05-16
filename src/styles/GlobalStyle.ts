import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  // html
  :root {
    /* 색상 */
    --primary-color: #2979ff;
    --secondary-color: #ff1744;
    --background-color: #212121;
    --text-color: #ececec;
    --text-color-dark: #333;
    --link-color: #1e88e5;

    /* 폰트 사이즈 */
    --base-font-size: 16px;
    --small-font-size: 14px;
    --large-font-size: 20px;

    /* 간격 */
    --base-spacing: 8px;
    --small-spacing: 4px;
    --large-spacing: 16px;

    /* 그림자 */
    --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    --text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

    /* 반응형 브레이크포인트 */
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
  }
  
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  
    background-color: #212121;
    color: #ECECEC;
    
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  // App.tsx container
  #root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  button {
    border-style: none;
    color: inherit; // button은 부모 color, background-color 를 상속받지 않는다.
    background-color:transparent;

    &:hover {
      filter: brightness(125%);
      cursor: pointer;
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

`;

export default GlobalStyle;
