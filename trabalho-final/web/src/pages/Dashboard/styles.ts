import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const Card = styled.div`
  background: ${({ total }: CardProps): string => (total ? '#ffa45f' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};

  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 12px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;

      button {
        background: transparent;
        border: none;

        margin-left: 4px;
      }
    }

    tbody {
      tr {
        background: #fff;
        transition: transform 0.2s;
      }

      tr:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }

      td {
        padding: 20px 32px;
        border: 0;
        background: inherit;
        font-size: 16px;
        font-weight: normal;
        color: #969cb3;

        &.title {
          color: #363f5f;
        }

        &.income {
          color: #12a454;
        }

        &.outcome {
          color: #e83f5b;
        }
      }

      td.actions {
        display: flex;
        flex-direction: row;
        align-items: center;

        button {
          background: transparent;
          border: 0;
        }
      }

      td:first-child {
        border-radius: 8px 0 0 8px;
      }

      td:last-child {
        border-radius: 0 8px 8px 0;
      }
    }
  }
`;

export const Empty = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  height: 100%;

  margin-top: 20%;

  img {
    width: 120px;
  }

  span {
    margin-top: 10px;

    font-size: 18px;
  }
`;
