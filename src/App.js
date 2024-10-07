import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./views/routes";
import { AuthProvider } from "./contexts/AccountContext";
import { ThemeProvider } from "./contexts/themeContext";
import { PostProvider } from "./contexts/postContext";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <ThemeProvider>
            <PostProvider>
              <AllRoutes />
            </PostProvider>
          </ThemeProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
