import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #403f4c;
`;

export const Header = styled.header`
  background: #121420;
  padding: 20px 0;

  color: #fdfffc;

  h1 {
    text-align: center;
    font-size: 1.8em;
    margin: 0;
    font-weight: normal;
  }

  box-shadow: 1px 2px 5px 0 #1b1b1b;
  margin: 0;
`;

export const MainContent = styled.main`
  max-width: 1130px;
  margin: 0 auto;

  margin-top: 20px;

  color: #fdfffc;

  padding: 0 18px;
`;

export const ContentInfo = styled.div`
  margin-top: 32px;

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
    select {
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
      border-radius: 0px 10px 10px 0;

      margin-left: 2px;
    }

    select {
      border-radius: 10px 0px 0px 10px;
    }
  }
`;

export const ContactsContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;

  margin-top: 16px;
`;

export const ContactItem = styled.div`
  background: #121420;

  padding: 10px 8px;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  div.details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
`;

export const Divider = styled.div`
  width: 1px;
  background-color: #fdfffc;
  margin-left: 20px;
  margin-right: 20px;
  height: 1cm;
`;

export const ContactItemAvatar = styled.div`
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
