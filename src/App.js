import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./views/routes";
import { ThemeProvider } from "./contexts/themeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
