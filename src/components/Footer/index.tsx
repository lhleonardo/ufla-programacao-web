import React from "react";
import styled from "styled-components";

const FooterStyle = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 8px 0;

  background: var(--primary);

  box-shadow: 1px -1px 5px 0 rgba(0, 0, 0, 0.5);
  color: white;

  a {
    color: #f1faee;
  }
`;

export const Footer: React.FC = () => (
  <FooterStyle>
    <span>
      Desenvolvido por <a href="https://github.com/lhleonardo">Leonardo Braz</a>
    </span>
    <span>{new Date().getFullYear()}</span>
  </FooterStyle>
);
