import React from "react";
import { ContainerStyle } from "./styles";

export const Container: React.FC = ({ children }) => (
  <ContainerStyle>{children}</ContainerStyle>
);
