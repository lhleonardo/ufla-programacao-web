import React, { InputHTMLAttributes } from "react";
import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <Container>
      <span>{label}</span>
      <input {...props} />
    </Container>
  );
};
