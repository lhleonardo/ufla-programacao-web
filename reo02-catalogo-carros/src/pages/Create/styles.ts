import styled from "styled-components";

export const Content = styled.main`
  padding-top: 10px;
`;

export const Form = styled.form`
  margin-top: 16px;

  button {
    width: 100%;
    padding: 10px 0;
    margin-top: 4px;

    background: #43ab9b;

    color: white;
    font-weight: 500;

    border: 0;
    border-radius: 5px;

    &:hover {
      opacity: 0.9;
    }
  }
`;
