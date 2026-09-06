import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ProtectedRoute({ children, requiredRole = 'ARTISAN' }) {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] dark:bg-[#111827]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-emerald-800 border-t-transparent dark:border-emerald-500 rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {t('common.loading', 'Loading Karigar...')}
          </span>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to /login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but role mismatch (e.g. PATRON)
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8F9FA] dark:bg-[#111827]">
        <div className="max-w-md w-full bg-white dark:bg-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-xl border border-red-100 dark:border-red-900/50 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 dark:bg-red-950/50 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('auth.accessRestricted', 'Access Restricted')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {t('auth.artisanOnlyNotice', 'Access restricted to registered artisans. Buyer and patron accounts cannot access the seller dashboard.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={logout}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('auth.switchAccount', 'Switch Account')}
            </button>
            <a
              href="/login"
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#14532D] hover:bg-[#0f3e21] text-white text-sm font-semibold transition-colors flex items-center justify-center"
            >
              {t('auth.backToLogin', 'Go to Login')}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
