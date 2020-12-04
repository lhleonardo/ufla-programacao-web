import styled from "styled-components";

export const Main = styled.main`
  margin: 30px;

  hr {
    margin-top: 20px;
  }
`;

export const FormSection = styled.section`
  width: 100%;
  form {
    display: flex;
    flex-direction: column;

    label {
      display: flex;
      flex-direction: column;

      & + label {
        margin-top: 12px;
      }
    }

    input[type="submit"] {
      margin-top: 12px;
    }
  }
`;

export const TableSection = styled.section`
  width: 100%;

  table {
    width: 100%;

    td {
      text-align: center;
    }
  }

  table,
  th,
  td {
    border: 1px solid black;
  }
`;
