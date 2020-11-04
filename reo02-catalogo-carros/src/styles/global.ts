import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #457b9d;
    --primary-hover: #3c6b88;
    --background: #F1F5FC;
  }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, span {
    font-family: 'Roboto Slab', serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Domine', serif;
    font-weight: 500;
  }

  button, input[type=submit] {
    cursor: pointer;
  }
`;