import styled from "styled-components";

import { darken } from "polished";

export const Container = styled.div`
  background: #403f4c;
  height: 100vh;
`;

export const Header = styled.header`
  background: #121420;
  box-shadow: 1px 2px 5px 0 #1b1b1b;

  color: #fdfffc;

  width: 100%;
  height: 10%;

  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    text-align: center;
    font-size: 1.8em;
    margin: 0;
    font-weight: normal;
  }
`;

export const MainContent = styled.main`
  max-width: 1130px;
  margin: 20px auto;

  color: #fdfffc;

  padding: 0 18px;
`;

export const ContentInfo = styled.div`
  margin-top: 32px;

  width: 100%;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h2 {
    color: #fdfffc;
    font-weight: 400;
  }

  form {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    input,
    select,
    button {
      vertical-align: top;
      height: 36px;
      padding: 8px 4px;
      border: none;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }

    input {
      width: 100%;

      margin-left: 2px;
    }

    select {
      border-radius: 10px 0px 0px 10px;
    }

    button {
      margin-left: 2px;
      border-radius: 0px 10px 10px 0;
      width: 50px;

      align-content: center;
    }
  }
`;

export const ContactsContainer = styled.div`
  display: grid;

  @media screen and (min-width: 480px) {
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  grid-template-columns: 1fr;
  grid-gap: 10px;

  margin-top: 16px;
`;

export const ContactItem = styled.div`
  background: #121420;

  padding: 10px 8px;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #121420;

  transition: transform 150ms, border 150ms;
  div.details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    flex-grow: 1;

    h3 {
      color: #89c2d9;
      font-size: 16px;
      text-align: center;
    }

    h4 {
      font-size: 14px;
      font-weight: normal;
    }

    h3,
    h4,
    span {
      padding: 2px 0;
    }
  }

  &:hover {
    border: 1px solid #4f6e38;
    transform: scale(1.03);
  }
`;

export const Divider = styled.div`
  width: 1px;
  background-color: #fdfffc;
  margin-left: 20px;
  margin-right: 20px;
  height: 1cm;
`;

export const ContactItemAvatar = styled.span`
  width: 48px;
  height: 48px;
  background: #b76d68;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 4px;

  flex-shrink: 0;
`;

export const AddButton = styled.button`
  width: 35px;
  height: 35px;

  border-radius: 50%;
  border: 0;

  background: #7159c1;
  color: #fff;

  font-size: 24px;

  align-self: center;

  transition: background 200ms;

  &:hover {
    background: ${darken(0.15, "#7159c1")};
  }
`;
