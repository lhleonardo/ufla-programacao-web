import styled from "styled-components";

export const PageInfo = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    padding: 8px;
    background: var(--primary);
    color: white;

    border: none;
    border-radius: 5px;

    box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.5);
    font-size: 12px;
    &:hover {
      background: var(--primary-hover);
    }
  }
`;

export const CarsContainer = styled.div`
  margin-top: 10px;

  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 10px;
`;

export const CarItem = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  border: 1px solid #787a7d;
  border-radius: 10px;
  padding: 8px 4px;

  transition: transform 0.2s;
  img {
    width: 150px;
    border-radius: 20px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
