import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Edit3,
  Package,
  Heart,
  CreditCard,
  Settings as SettingsIcon,
  X,
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';
import { useSeller } from '../../context/SellerContext';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { t } = useTranslation();
  const { updateProfile: updateContextProfile, addToast } = useSeller();

  // Initial default seller profile as specified in requirement
  const defaultProfile = {
    name: 'Sushila Devi',
    email: 'sushila@karigar.in',
    phone: '+91 98765 43210',
    role: 'Verified Artisan',
    craftType: 'Terracotta Artisan',
    location: 'West Bengal, India',
    state: 'West Bengal',
    district: 'Bankura',
    experienceYears: '24',
    businessName: 'Devi Terracotta & Clay Creations',
    aboutArtisan: 'Master terracotta artisan preserving generations of traditional Bankura clay crafts, earthenware, and GI-certified heritage pottery.',
    memberSince: 'August 2026',
    trustScore: '4.8 / 5',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  };

  // Safe localStorage loader for karigar-seller-profile
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('karigar-seller-profile');
      if (saved) {
        return { ...defaultProfile, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Error reading karigar-seller-profile from localStorage:', e);
    }
    return defaultProfile;
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState('Profile');

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(profileData);

  // Sync edit form with profile data whenever opened
  const openEditModal = () => {
    setEditForm(profileData);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    try {
      // Persist to karigar-seller-profile
      localStorage.setItem('karigar-seller-profile', JSON.stringify(editForm));
      setProfileData(editForm);

      // Sync with context for global header/sidebar reflection
      if (updateContextProfile) {
        updateContextProfile({
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
          craftType: editForm.craftType,
          location: `${editForm.district ? editForm.district + ', ' : ''}${editForm.state || 'West Bengal, India'}`,
          businessName: editForm.businessName,
          avatar: editForm.avatar
        });
      }

      setIsEditModalOpen(false);
      addToast(t('profile.saveProfileSuccess', 'Profile updated and saved to localStorage successfully.'), 'success');
    } catch (err) {
      console.error('Error saving profile:', err);
      addToast(t('profile.saveProfileError', 'Failed to save profile changes.'), 'error');
    }
  };

  // Orders listed in Requirement #4
  const profileOrders = [
    {
      id: 'KGR-1234',
      product: 'Terracotta Pot',
      amount: '₹1,200',
      status: 'Delivered',
      date: '2026-03-02',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'KGR-1235',
      product: 'Dhokra Brass Figurine',
      amount: '₹3,450',
      status: 'Shipped',
      date: '2026-03-01',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'KGR-1236',
      product: 'Handwoven Silk Stole',
      amount: '₹2,800',
      status: 'Delivered',
      date: '2026-02-27',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=150&q=80'
    }
  ];

  // Navigation tabs for Profile page
  const tabs = [
    { id: 'Profile', label: t('profile.tabProfile', 'Profile'), icon: User },
    { id: 'Orders', label: t('profile.tabOrders', 'Orders'), icon: Package },
    { id: 'Wishlist', label: t('profile.tabWishlist', 'Wishlist'), icon: Heart },
    { id: 'Addresses', label: t('profile.tabAddresses', 'Addresses'), icon: MapPin },
    { id: 'Saved Cards', label: t('profile.tabCards', 'Saved Cards'), icon: CreditCard },
    { id: 'Settings', label: t('profile.tabSettings', 'Settings'), icon: SettingsIcon },
  ];

  // Sample photo choices for quick edit demo
  const sampleAvatars = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 dark:text-white">
            {t('profile.pageTitle', 'My Profile')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {t('profile.pageSubtitle', 'Manage your verified artisan credentials, trade presence, and listings.')}
          </p>
        </div>

        <button
          type="button"
          onClick={openEditModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#14532D] hover:bg-[#0f3f22] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4" />
          <span>{t('profile.editProfile', 'Edit Profile')}</span>
        </button>
      </div>

      {/* TOP SELLER INFORMATION CARD */}
      <div className="bg-white dark:bg-[#1F2937] rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Avatar + Main Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Profile Photo */}
            <div className="relative flex-shrink-0">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-emerald-50 dark:ring-emerald-950/60 shadow-md"
              />
              <span
                className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 rounded-full text-white ring-2 ring-white dark:ring-[#1F2937] shadow-xs"
                title="Verified Artisan"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </div>

            {/* Profile Details */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {profileData.name}
                </h2>
                {/* Verified Artisan Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('profile.verifiedArtisan', 'Verified Artisan')} ✓</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400">
                {profileData.craftType}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1 text-xs text-gray-600 dark:text-gray-300">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  <span>{t('profile.memberSince', 'Member Since')}: {profileData.memberSince}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Score & Quick Stats */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-700/80">
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
                {t('profile.trustScore', 'Trust Score')}
              </span>
              <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {profileData.trustScore}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 font-semibold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                {t('profile.kycVerifiedBadge', '100% KYC Verified')}
              </span>
            </div>
          </div>
        </div>

        {/* Artisan Story / Bio */}
        {profileData.aboutArtisan && (
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700/80 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <span className="font-semibold text-gray-900 dark:text-gray-100 mr-2">{t('profile.aboutArtisanLabel', 'About Artisan:')}</span>
            {profileData.aboutArtisan}
          </div>
        )}
      </div>

      {/* PROFILE NAVIGATION TABS */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#14532D] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1F2937]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT: PROFILE / ORDERS / ETC */}
      {activeTab === 'Profile' || activeTab === 'Orders' ? (
        <div className="space-y-6">
          {/* MY ORDERS SECTION */}
          <div className="bg-white dark:bg-[#1F2937] rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-gray-900 dark:text-white">
                  {t('profile.myOrdersTitle', 'My Orders')}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t('profile.myOrdersSubtitle', 'Recent customer orders and shipments fulfilled by your studio.')}
                </p>
              </div>

              <Link
                to="/orders"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
              >
                <span>{t('profile.viewAll', 'View All')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Orders Table / List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[540px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700/80 text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    <th className="pb-3 pl-2">{t('profile.thProduct', 'Product')}</th>
                    <th className="pb-3">{t('profile.thAmount', 'Amount')}</th>
                    <th className="pb-3">{t('profile.thStatus', 'Status')}</th>
                    <th className="pb-3 pr-2 text-right">{t('profile.thDate', 'Date')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50 text-xs sm:text-sm">
                  {profileOrders.map((order) => {
                    const isDelivered = order.status === 'Delivered';
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50/80 dark:hover:bg-[#243244] transition-colors"
                      >
                        {/* Product Thumbnail & Title */}
                        <td className="py-3.5 pl-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={order.image}
                              alt={order.product}
                              className="w-11 h-11 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shadow-2xs"
                            />
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white leading-tight">
                                {order.product}
                              </p>
                              <p className="text-[11px] text-gray-400 dark:text-gray-500 font-mono mt-0.5">
                                #{order.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="py-3.5 font-bold text-gray-900 dark:text-white">
                          {order.amount}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5">
                          {isDelivered ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {t('common.delivered', 'Delivered')}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                              {t('common.shipped', 'Shipped')}
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 pr-2 text-right text-gray-500 dark:text-gray-400 font-medium text-xs">
                          {order.date}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Placeholder for other tabs (Wishlist, Addresses, Saved Cards, Settings) */
        <div className="bg-white dark:bg-[#1F2937] rounded-3xl p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#243244] text-gray-500 dark:text-gray-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            {t('profile.tabFallbackTitle', { tab: activeTab, defaultValue: `${activeTab} Management` })}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            {t('profile.tabFallbackDesc', { tab: activeTab.toLowerCase(), defaultValue: `Your ${activeTab.toLowerCase()} are encrypted and linked with your verified Karigar artisan credentials.` })}
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('Profile')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            {t('profile.backToOverview', '← Back to Profile Overview')}
          </button>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1F2937] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col my-8 animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700/80">
              <div>
                <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white">
                  {t('profile.editProfileModalTitle', 'Edit Artisan Profile')}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t('profile.editProfileModalSubtitle', 'Update your personal, craft, and cluster details stored in localStorage.')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Change Profile Photo Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  {t('profile.changePhoto', 'Change Profile Photo')}
                </label>
                <div className="flex items-center gap-3">
                  {sampleAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditForm({ ...editForm, avatar: url })}
                      className={`relative rounded-xl overflow-hidden ring-2 transition-all ${
                        editForm.avatar === url
                          ? 'ring-emerald-600 scale-105'
                          : 'ring-transparent hover:ring-gray-300 dark:hover:ring-gray-600'
                      }`}
                    >
                      <img src={url} alt={`Avatar option ${idx + 1}`} className="w-12 h-12 object-cover" />
                      {editForm.avatar === url && (
                        <span className="absolute inset-0 bg-emerald-600/30 flex items-center justify-center text-white">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.fullNameReq', 'Full Name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.phoneReq', 'Phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.emailReq', 'Email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Craft Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.craftTypeReq', 'Craft Type')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.craftType}
                    onChange={(e) => setEditForm({ ...editForm, craftType: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.stateLabel', 'State')}
                  </label>
                  <input
                    type="text"
                    value={editForm.state}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        state: e.target.value,
                        location: `${editForm.district ? editForm.district + ', ' : ''}${e.target.value || 'India'}`
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.districtLabel', 'District')}
                  </label>
                  <input
                    type="text"
                    value={editForm.district}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        district: e.target.value,
                        location: `${e.target.value ? e.target.value + ', ' : ''}${editForm.state || 'India'}`
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.experienceLabel', 'Years of Experience')}
                  </label>
                  <input
                    type="number"
                    value={editForm.experienceYears}
                    onChange={(e) => setEditForm({ ...editForm, experienceYears: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Business / Artisan Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.businessNameLabel', 'Business / Artisan Name')}
                  </label>
                  <input
                    type="text"
                    value={editForm.businessName}
                    onChange={(e) => setEditForm({ ...editForm, businessName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* About Artisan */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t('profile.aboutArtisanField', 'About Artisan')}
                </label>
                <textarea
                  rows={3}
                  value={editForm.aboutArtisan}
                  onChange={(e) => setEditForm({ ...editForm, aboutArtisan: e.target.value })}
                  placeholder="Share a brief story about your traditional craft and heritage techniques..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {t('profile.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-[#14532D] hover:bg-[#0f3f22] text-white shadow-xs hover:shadow-md transition-all"
                >
                  {t('profile.saveChanges', 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
