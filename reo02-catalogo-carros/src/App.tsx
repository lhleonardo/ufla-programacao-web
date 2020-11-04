import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./providers";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/global";

const App: React.FC = () => (
  <BrowserRouter>
    <AppProviders>
      <Routes />
    </AppProviders>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
