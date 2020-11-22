import styled from "styled-components";

export const Container = styled.div`
  hr {
    margin-top: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 12px;

  label {
    display: block;
    font-weight: 500;

    & + label {
      margin-top: 8px;
    }
  }

  input {
    display: block;
    width: 100%;
    margin-top: 4px;

    padding: 8px;

    border: 1px solid #403f4c;
    border-radius: 4px;

    font-size: 14px;
  }

  button {
    margin-top: 12px;
    width: 100%;

    padding: 8px;

    font-size: 16px;

    border: 0;
    outline: none;

    background: #403f4c;

    color: white;
    font-weight: bold;
    text-transform: uppercase;

    border-radius: 4px;

    transition: opacity 200ms;

    &:hover {
      opacity: 0.8;
    }
  }
`;
