
import React from 'react';
import { motion } from 'framer-motion';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-prosalud-light via-white to-secondary-prosaludgreen/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, rotateY: -10, z: -100 }}
          animate={{ opacity: 1, rotateY: 0, z: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-prosalud-border/20 p-8 relative overflow-hidden"
        >
          {/* Logo */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src="/images/logo_prosalud.webp"
                alt="ProSalud Logo"
                className="h-16 w-auto mx-auto"
              />
            </Link>
          </div>

          <ForgotPasswordForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
