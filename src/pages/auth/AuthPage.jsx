import { useState } from 'react';
import LoginForm from '../../components/forms/LoginForm';
import RegisterForm from '../../components/forms/RegisterForm';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';

const AuthPage = () => {
  const [currentView, setCurrentView] = useState('login');

  switch (currentView) {
    case 'login':
      return (
        <LoginForm 
          onSwitchToSignUp={() => setCurrentView('register')}
          onSwitchToForgotPassword={() => setCurrentView('forgot')}
        />
      );
    case 'register':
      return (
        <RegisterForm 
          onSwitchToLogin={() => setCurrentView('login')}
        />
      );
    case 'forgot':
      return (
        <ForgotPasswordForm 
          onBackToLogin={() => setCurrentView('login')}
        />
      );
    default:
      return (
        <LoginForm 
          onSwitchToSignUp={() => setCurrentView('register')}
          onSwitchToForgotPassword={() => setCurrentView('forgot')}
        />
      );
  }
};

export default AuthPage;