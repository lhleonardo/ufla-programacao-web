import React from "react";
import styled from "styled-components";

export const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--primary);
  color: white;

  padding: 16px 0px;
  box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.5);

  h1 {
    font-size: 22px;
  }
`;

export const Header: React.FC = () => (
  <HeaderStyle>
    <h1>Catálogo de Carros</h1>
  </HeaderStyle>
);
