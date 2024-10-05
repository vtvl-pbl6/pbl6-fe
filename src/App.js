import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./views/routes";
import { AuthProvider } from "./contexts/AccountContext";
import { ThemeProvider } from "./contexts/themeContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AllRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
