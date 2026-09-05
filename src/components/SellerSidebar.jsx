import React from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  ShoppingBag,
  IndianRupee,
  Users,
  ShieldCheck,
  MessageSquare,
  Settings,
  LogOut,
  X,
  User,
  Info,
  Mail
} from 'lucide-react';
import { useSeller } from '../context/SellerContext';
import logo from '../assets/logo.jpg';

export default function SellerSidebar({ isMobileOpen, setIsMobileOpen }) {
  const location = useLocation();
  const { t } = useTranslation();
  const { addToast, profile } = useSeller();

  const mainNavItems = [
    { name: t('nav.dashboard'), path: '/', icon: LayoutDashboard },
    { name: t('nav.addProduct'), path: '/add-product', icon: PlusCircle, badge: 'AI' },
    { name: t('nav.myProducts'), path: '/products', icon: Package, count: profile.totalProducts },
    { name: t('nav.orders'), path: '/orders', icon: ShoppingBag, count: profile.totalOrders },
    { name: t('nav.earnings'), path: '/earnings', icon: IndianRupee },
    { name: t('nav.customers'), path: '/customers', icon: Users },
    { name: t('nav.verification'), path: '/verification', icon: ShieldCheck, verifiedDot: true },
    { name: t('nav.messages'), path: '/messages', icon: MessageSquare, badge: '2' },
    { name: t('nav.myProfile'), path: '/seller/profile', icon: User },
    { name: t('nav.settings'), path: '/settings', icon: Settings },
  ];

  const secondaryNavItems = [
    { name: t('nav.aboutKarigar'), path: '/about', icon: Info },
    { name: t('nav.getInTouch'), path: '/contact', icon: Mail },
  ];

  const handleLogout = () => {
    addToast(t('common.loggedOut'), 'info');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#0F172A] border-r border-gray-200/90 dark:border-gray-800 text-sm select-none transition-colors">
      {/* Brand / Logo */}
      <div className="h-20 px-4 sm:px-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800/80">
        <RouterNavLink to="/" className="flex items-center group">
          <div className="bg-white/95 dark:bg-white/90 rounded-xl p-1.5 shadow-2xs transition-transform duration-200 group-hover:scale-102 flex items-center justify-center">
            <img
              src={logo}
              alt="Karigar"
              className="h-[52px] sm:h-[56px] w-auto object-contain max-w-[170px]"
              style={{ objectFit: 'contain', width: 'auto' }}
            />
          </div>
        </RouterNavLink>

        {isMobileOpen && (
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 pb-1">
          {t('nav.artisanPortal')}
        </div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <RouterNavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-[#FFF5ED] dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1E293B]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-gray-400 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200'
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span>{item.name}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-normal">
                    {item.count}
                  </span>
                )}
                {item.verifiedDot && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="All IDs Verified"></span>
                )}
              </div>
            </RouterNavLink>
          );
        })}

        {/* Quick Links / Explore Section */}
        <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 pb-1">
            {t('footer.quickLinks')}
          </div>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <RouterNavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#FFF5ED] dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1E293B]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      isActive
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                    }`}
                    strokeWidth={1.8}
                  />
                  <span>{item.name}</span>
                </div>
              </RouterNavLink>
            );
          })}
        </div>
      </nav>

      {/* Trust & Cluster Credibility mini card */}
      <div className="p-3 mx-3 mb-2 rounded-xl bg-gradient-to-br from-emerald-50/90 to-teal-50/40 dark:from-emerald-950/40 dark:to-teal-950/20 border border-emerald-200/70 dark:border-emerald-800/60 text-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t('nav.trustScore')}
          </span>
          <span className="font-extrabold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-[#1F2937] px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-700 shadow-2xs">
            4.8 / 5
          </span>
        </div>
        <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-snug">
          {t('nav.giAuthorized')} &amp; 95% On-Time Artisan.
        </p>
      </div>

      {/* Logout button at bottom */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-5 h-5 text-gray-400 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" strokeWidth={1.8} />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:block w-60 fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
