import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #403f4c;
  }

  body, input, button, span, select {
    font-family: 'Raleway', sans-serif;  
  } 
  
  button, input[type=submit] {
    cursor: pointer;
  }
`;
