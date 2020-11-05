import styled from "styled-components";

export const Content = styled.main`
  padding-top: 30px;
`;

export const PageHeader = styled.div`
  position: relative;

  h3 {
    margin-left: 24px;
    text-align: center;
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const CarInfo = styled.div`
  display: flex;

  flex-direction: row;
  align-items: center;

  border: 2px solid #888;
  border-radius: 10px;

  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.5);

  margin-top: 16px;

  img {
    width: 300px;

    border-right: 2px solid #888;
  }

  div.details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;

    span {
      font-size: 16px;
      font-weight: 350;

      strong {
        display: block;
        font-size: 18px;
      }

      & + span {
        margin-top: 6px;
      }
    }

    div.actions {
      padding-top: 20px;

      a,
      button {
        text-decoration: none;
        padding: 8px;

        background: var(--primary);
        color: white;

        border: none;
        border-radius: 5px;

        font-size: 12px;

        &:hover {
          opacity: 0.9;
        }

        & + a,
        & + button {
          margin-left: 4px;
        }

        &.edit {
          background: #43ab9b;
        }

        &.delete {
          background: #9e5556;
        }
      }
    }
  }
`;
