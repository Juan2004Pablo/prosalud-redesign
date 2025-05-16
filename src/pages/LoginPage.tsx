
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom'; // Import Link for the logo

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/">
            <img 
              src="/lovable-uploads/2bf2da56-4967-4a17-8849-9efab8759375.png" 
              alt="ProSalud Logo" 
              className="h-16 w-auto" // Increased logo size slightly
            />
          </Link>
        </div>
        
        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
