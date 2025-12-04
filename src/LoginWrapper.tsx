import React from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../ParteParaIntegrar/HomeLoguin/HomeAndPage/src/pages/LoginPage";

export default function LoginWrapper() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // After successful login, go to chat
    navigate('/chat');
  };

  return <LoginPage onGoogleLogin={handleGoogleLogin} />;
}
