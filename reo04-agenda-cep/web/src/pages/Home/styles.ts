import styled from "styled-components";

import { darken } from "polished";
import { AnimateSharedLayout, motion } from "framer-motion";

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
    font-size: 2.5em;
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
    font-size: 1.8em;
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
      height: 50px;
      padding: 12px 8px;
      border: none;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;

      font-size: 1.3em;
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
      width: 60px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const ContactsContainer = styled(AnimateSharedLayout)`
  margin-top: 16px;
`;

export const ContactItem = styled(motion.div)`
  margin: 10px 0;
  background: #121420;
  height: 200px;
  padding: 5px;
  border-radius: 20px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  border: 1px solid #121420;

  transition: transform 150ms, border 150ms;

  &:hover {
    transform: scale(1.03);
  }

  div.logo {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ContactItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  div.details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    flex-grow: 1;

    padding: 10px 0;

    h3 {
      color: #89c2d9;
      font-size: 1.3em;
      text-align: center;
    }

    h4 {
      margin-top: 15px;
      font-size: 1.1em;
      font-weight: normal;
    }

    span {
      margin-top: 8px;
      letter-spacing: 2px;
    }
  }
`;

export const SelectedContactItem = styled.div`
  margin: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  button.editar {
    background: #e6b800;

    padding: 8px 4px;

    border-radius: 5px;
    border: none;

    color: #333;
    font-weight: bold;

    margin-right: 10px;
  }

  button.excluir {
    background: #ff3300;

    padding: 8px 4px;

    border-radius: 5px;
    border: none;

    color: #333;
    font-weight: bold;
  }
`;

export const Divider = styled.div`
  width: 1px;
  background-color: #fdfffc;
  margin: 0 30px;
  height: 2cm;
`;

export const ContactItemAvatar = styled.span`
  width: 70px;
  height: 70px;
  background: #b76d68;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 16px;

  flex-shrink: 0;
`;

export const AddButton = styled.button`
  width: 35px;
  height: 35px;

  border-radius: 50%;
  border: 0;

  background: #7159c1;
  color: #fff;

  font-size: 2em;

  align-self: center;

  transition: background 200ms;

  &:hover {
    background: ${darken(0.15, "#7159c1")};
  }
`;
