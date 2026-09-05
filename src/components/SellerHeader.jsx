import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bell,
  Menu,
  ShieldCheck,
  PackageCheck,
  MessageCircle,
} from 'lucide-react';
import { useSeller } from '../context/SellerContext';
import ThemeToggle from './ThemeToggle';
import SellerProfileDropdown from './SellerProfileDropdown';

export default function SellerHeader({ onToggleMobileMenu }) {
  const { t, i18n } = useTranslation();
  const { profile, lang, setLang, addToast } = useSeller();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notifRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: 'Payment Released from Escrow',
      desc: '₹1,200 for Terracotta Pot (#KGR1234) released to your SBI Account.',
      time: '10m ago',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400'
    },
    {
      id: 2,
      title: 'New Customer Inquiry',
      desc: 'Priya Sharma asked: "Is this terracotta pot 100% handmade?"',
      time: '1h ago',
      icon: MessageCircle,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400'
    },
    {
      id: 3,
      title: 'GI Registry Renewal Approved',
      desc: 'Bankura Panchmura Pottery GI-452 authorization re-verified.',
      time: '1d ago',
      icon: PackageCheck,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400'
    }
  ];

  // Close notifications on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    const messages = {
      en: 'Language switched to English',
      hi: 'भाषा बदलकर हिन्दी कर दी गई',
      bn: 'ভাষা বাংলায় পরিবর্তিত হয়েছে'
    };
    addToast(messages[newLang] || messages.en, 'info');
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white dark:bg-[#1F2937] border-b border-gray-200/90 dark:border-gray-700/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger & breadcrumb or title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#243244] md:hidden"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-gray-100">{t('nav.artisanStudio')}</span>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 font-medium px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            {profile.cluster || 'Bankura Artisan Cluster'}
          </span>
        </div>
      </div>

      {/* Right side: Language, Theme Toggle, Notifications, Seller Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language selector */}
        <div className="flex items-center bg-gray-100/90 dark:bg-[#0F172A] rounded-lg p-0.5 border border-gray-200 dark:border-gray-700">
          {[
            { code: 'en', label: 'EN' },
            { code: 'hi', label: 'हि' },
            { code: 'bn', label: 'বাং' }
          ].map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleLanguageChange(item.code)}
              className={`text-xs px-2 py-1 rounded-md font-semibold transition-all ${
                lang === item.code
                  ? 'bg-white dark:bg-[#1F2937] text-gray-900 dark:text-gray-100 shadow-2xs'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              title={item.code === 'en' ? 'English' : item.code === 'hi' ? 'हिन्दी' : 'বাংলা'}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 1. Theme Toggle */}
        <ThemeToggle />

        {/* 2. Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (unreadCount > 0) setUnreadCount(0);
            }}
            className="relative p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#243244] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-white dark:ring-[#1F2937]"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white dark:bg-[#1F2937] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in fade-in-50 duration-150">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700/80 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Notifications &amp; Alerts
                </h4>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  All Systems Active
                </span>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-700/50 max-h-80 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="p-3 hover:bg-gray-50 dark:hover:bg-[#243244] flex items-start gap-3 transition-colors cursor-pointer">
                      <div className={`p-2 rounded-lg ${n.color} flex-shrink-0 mt-0.5`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{n.title}</p>
                        <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 leading-snug">{n.desc}</p>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 inline-block">{n.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-0.5" />

        {/* 3 & 4. Seller Avatar & Name with interactive Dropdown */}
        <SellerProfileDropdown />
      </div>
    </header>
  );
}
