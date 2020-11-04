import React from "react";
import { CarProvider } from "./CarProvider";

export const AppProviders: React.FC = ({ children }) => (
  <CarProvider>{children}</CarProvider>
);
