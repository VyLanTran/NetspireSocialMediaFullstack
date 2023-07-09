import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {

  const theme = createTheme({
    palette: {
      mode: "light"
    },
  });

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/profile/:userId" element={isAuth ? <Profile /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
