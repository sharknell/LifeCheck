import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
