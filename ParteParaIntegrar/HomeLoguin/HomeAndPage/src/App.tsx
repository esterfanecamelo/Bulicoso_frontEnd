import { useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login'>('home');

  const handleNavigation = (page: 'home' | 'login') => {
    setCurrentPage(page);
  };

  const handleGoogleLogin = () => {
    // Simulate successful login - navigate back to home
    alert('Login com Google simulado com sucesso!');
    setCurrentPage('home');
  };

  return (
    <>
      {currentPage === 'home' ? (
        <div className="w-[1920px] h-[2062px] overflow-auto">
          <HomePage onNavigate={handleNavigation} />
        </div>
      ) : (
        <div className="w-screen h-screen overflow-hidden">
          <LoginPage onGoogleLogin={handleGoogleLogin} />
        </div>
      )}
    </>
  );
}