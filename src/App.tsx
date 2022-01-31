import React from 'react';
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Confirmation from "./pages/ForgotPassword/components/Confirmation";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ResetPasswordConfirmation from "./pages/ResetPassword/components/ResetPasswordConfirmation";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/forgot-password-confirmation" element={<Confirmation />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password-confirmation" element={<ResetPasswordConfirmation />} />
              <Route path="/register" element={<Register />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
