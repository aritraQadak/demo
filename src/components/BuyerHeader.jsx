import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShoppingBag,
  ChevronDown,
  BadgeCheck,
  Package,
  Award,
  Bookmark,
  Wallet,
  Languages,
  Headset,
  LogOut,
  User,
  LogIn
} from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import StateSelectorDropdown from './StateSelectorDropdown';
import { useBuyer } from '../context/BuyerContext';
import { useAuth } from '../context/AuthContext';

export default function BuyerHeader({ className = '' }) {
  const { t, i18n } = useTranslation();
  const { cartItemCount } = useBuyer();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('karigar-language', lng);
    } catch (_e) {}
  };

  const handleSignOut = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/40 shadow-[0_1px_8px_rgba(0,0,0,0.02)] transition-colors ${className}`}>
      <div className="h-20 max-w-[1440px] mx-auto px-space-md lg:px-space-xl flex items-center justify-between gap-space-md">
        {/* Left Brand Logo & Divider */}
        <div className="flex items-center gap-space-md">
          <Logo clickable linkTo="/" imgClassName="h-10 sm:h-11 w-auto object-contain" />
          <span className="h-4 w-[1px] bg-outline-variant/60 hidden sm:inline-block ml-1"></span>
        </div>

        {/* Center Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-center gap-space-xl mx-auto">
          <Link
            to="/explore/west-bengal"
            className="font-label-md text-label-md uppercase tracking-[0.14em] text-on-surface-variant hover:text-secondary transition-colors py-space-xs font-semibold"
          >
            {t('buyer.nav.explore', 'Explore')}
          </Link>
          <a
            href="#clusters"
            className="font-label-md text-label-md uppercase tracking-[0.14em] text-on-surface-variant hover:text-secondary transition-colors py-space-xs font-semibold"
          >
            {t('buyer.nav.categories', 'Categories')}
          </a>
          <StateSelectorDropdown />
        </nav>

        {/* Right Action Icons & User Dropdown */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          {/* Cart Icon Button */}
          <Link
            to="/cart"
            className="relative p-space-xs text-on-surface hover:text-secondary transition-colors flex items-center gap-1 group"
            title={t('buyer.nav.cart', 'Cart')}
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              [{cartItemCount}]
            </span>
          </Link>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Language Switcher Button Group */}
          <div className="hidden sm:flex items-center bg-surface-container rounded-lg p-0.5 border border-outline-variant/40 text-xs">
            <button
              type="button"
              onClick={() => changeLanguage('en')}
              className={`px-2 py-0.5 rounded font-label-sm transition-all ${
                i18n.language === 'en' ? 'bg-secondary text-on-secondary font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => changeLanguage('hi')}
              className={`px-2 py-0.5 rounded font-label-sm transition-all ${
                i18n.language === 'hi' ? 'bg-secondary text-on-secondary font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              HI
            </button>
            <button
              type="button"
              onClick={() => changeLanguage('bn')}
              className={`px-2 py-0.5 rounded font-label-sm transition-all ${
                i18n.language === 'bn' ? 'bg-secondary text-on-secondary font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              BN
            </button>
          </div>

          <span className="h-5 w-[1px] bg-outline-variant/60 inline-block"></span>

          {/* User Menu / Auth Button */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1 focus:outline-none group"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-8 h-8 rounded-full border border-outline-variant/60 group-hover:border-secondary transition-colors overflow-hidden bg-surface-container flex items-center justify-center">
                  <User className="w-5 h-5 text-secondary" />
                </div>
                <ChevronDown className={`w-4 h-4 text-outline group-hover:text-on-surface transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180 text-secondary' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-surface border border-outline-variant/40 shadow-2xl z-50 p-space-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User Profile Info Header */}
                  <div className="p-space-sm border-b border-outline-variant/30 flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary font-bold border border-outline-variant/60 flex-shrink-0">
                      {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'P'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 mb-0.5">
                        <div className="font-title-md text-[14px] leading-tight truncate text-on-surface font-semibold">
                          {user?.fullName || 'Ananya Sen'}
                        </div>
                        <BadgeCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                      </div>
                      <div className="font-label-sm text-[10px] text-secondary font-semibold uppercase tracking-wider">
                        {user?.role === 'ARTISAN' ? t('buyer.user.verifiedArtisan', 'Verified Artisan') : t('buyer.user.verifiedPatron', 'Verified Patron')}
                      </div>
                      <div className="font-body-sm text-[11px] text-outline truncate">
                        {user?.email || 'patron@karigar.in'}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/buyer/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-space-sm px-space-sm py-2 text-on-surface hover:bg-surface-container hover:text-secondary transition-colors"
                    >
                      <Package className="w-4 h-4 text-secondary flex-shrink-0" />
                      <div>
                        <div className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                          {t('buyer.user.myCollection', 'My Collection & Orders')}
                        </div>
                        <div className="text-[11px] text-outline">
                          {t('buyer.user.myCollectionSub', 'Track active consignments & escrow')}
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/buyer/certificates"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-space-sm px-space-sm py-2 text-on-surface hover:bg-surface-container hover:text-secondary transition-colors"
                    >
                      <Award className="w-4 h-4 text-secondary flex-shrink-0" />
                      <div>
                        <div className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                          {t('buyer.user.giCertificates', 'GI Certificates & Dossiers')}
                        </div>
                        <div className="text-[11px] text-outline">
                          {t('buyer.user.giCertificatesSub', 'Verified blockchain origin records')}
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/buyer/saved"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-space-sm px-space-sm py-2 text-on-surface hover:bg-surface-container hover:text-secondary transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-secondary flex-shrink-0" />
                      <div>
                        <div className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                          {t('buyer.user.savedCrafts', 'Saved Crafts & Artisans')}
                        </div>
                        <div className="text-[11px] text-outline">
                          {t('buyer.user.savedCraftsSub', 'Bookmarked masterworks')}
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/buyer/wallet"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-space-sm px-space-sm py-2 text-on-surface hover:bg-surface-container hover:text-secondary transition-colors"
                    >
                      <Wallet className="w-4 h-4 text-secondary flex-shrink-0" />
                      <div>
                        <div className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                          {t('buyer.user.escrowWallet', 'Sovereign Escrow & Wallet')}
                        </div>
                        <div className="text-[11px] text-outline">
                          {t('buyer.user.escrowWalletSub', 'Protected escrow balance')}
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="h-[1px] bg-outline-variant/30 my-1"></div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        const nextLang = i18n.language === 'en' ? 'hi' : i18n.language === 'hi' ? 'bn' : 'en';
                        changeLanguage(nextLang);
                      }}
                      className="w-full flex items-center gap-space-sm px-space-sm py-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm uppercase tracking-wider text-left"
                    >
                      <Languages className="w-4 h-4 text-outline" />
                      <span>{t('buyer.user.preferences', 'Preferences & Language')}</span>
                    </button>

                    <Link
                      to="/contact"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-space-sm px-space-sm py-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm uppercase tracking-wider"
                    >
                      <Headset className="w-4 h-4 text-outline" />
                      <span>{t('buyer.user.helpDesk', 'Help Desk & Ombudsman')}</span>
                    </Link>
                  </div>

                  <div className="h-[1px] bg-outline-variant/30 my-1"></div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-space-sm px-space-sm py-2 text-secondary hover:bg-surface-container-high transition-colors font-label-sm text-label-sm uppercase tracking-wider text-left font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('buyer.user.signOut', 'Sign Out')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-space-md py-1.5 bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-[0.14em] font-semibold shadow-xs hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('buyer.nav.signIn', 'Sign In')}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
