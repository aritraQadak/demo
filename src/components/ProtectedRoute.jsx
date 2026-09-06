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

  // If authenticated but role mismatch (e.g. PATRON accessing ARTISAN or vice versa)
  if (requiredRole && user.role !== requiredRole) {
    const isPatronAccessingArtisan = requiredRole === 'ARTISAN' && user.role === 'PATRON';
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-surface dark:bg-[#111827]">
        <div className="max-w-md w-full bg-surface-container-lowest dark:bg-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-xl border border-outline-variant/60 dark:border-red-900/50 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 dark:bg-red-950/50 rounded-full flex items-center justify-center text-secondary dark:text-red-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-on-surface dark:text-white mb-2">
            {t('auth.accessRestricted', 'Access Restricted')}
          </h2>
          <p className="text-sm text-on-surface-variant dark:text-gray-300 mb-6">
            {isPatronAccessingArtisan
              ? t('auth.artisanOnlyNotice', 'Access restricted to registered artisans. Buyer and patron accounts cannot access the seller dashboard.')
              : t('auth.patronOnlyNotice', 'Access restricted to registered patrons. Artisan accounts must switch to a patron account to access buyer features.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={logout}
              className="flex-1 py-2.5 px-4 rounded-xl bg-surface-container dark:bg-gray-800 hover:bg-surface-container-high dark:hover:bg-gray-700 text-on-surface dark:text-gray-200 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('auth.switchAccount', 'Switch Account')}
            </button>
            <a
              href="/login"
              className="flex-1 py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary/90 text-on-secondary text-sm font-semibold transition-colors flex items-center justify-center"
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
