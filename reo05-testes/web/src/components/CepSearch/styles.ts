import styled from "styled-components";

export const Container = styled.label`
  div.cep-search {
    display: flex;
    flex-direction: row;
    align-items: center;

    input {
      flex: 1;

      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    button {
      width: 50px;
      margin-top: 4px;

      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;
