import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import Header from "./components/layout/Header";
import Todos from "./pages/Todos";
import Mood from "./pages/Mood";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/todos"
              element={
                <PrivateRoute>
                  <Todos />
                </PrivateRoute>
              }
            />
            <Route
              path="/mood"
              element={
                <PrivateRoute>
                  <Mood />
                </PrivateRoute>
              }
            />

            <Route path="/account" element={<Account />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
