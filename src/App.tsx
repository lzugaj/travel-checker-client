import React from 'react';
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import { Provider } from "react-redux";
import store from './store/store';

import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ForgotPasswordConfirmation from "./pages/ForgotPassword/components/ForgotPasswordConfirmation";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ResetPasswordConfirmation from "./pages/ResetPassword/components/ResetPasswordConfirmation";

function App() {
    return (
        <Provider store={ store }>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <Navigate to="/home"/> }/>
                    <Route path="/home" element={ <Home/> }/>
                    <Route path="/login" element={ <Login/> }/>
                    <Route path="/forgot-password" element={ <ForgotPassword/> }/>
                    <Route path="/forgot-password-confirmation" element={ <ForgotPasswordConfirmation/> }/>
                    <Route path="/reset-password" element={ <ResetPassword/> }/>
                    <Route path="/reset-password-confirmation" element={ <ResetPasswordConfirmation/> }/>
                    <Route path="/register" element={ <Register/> }/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
