import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from '../components/SocialIcons';
import { useSeller } from '../context/SellerContext';
import Footer from '../components/Footer';

export default function Contact() {
  const { t } = useTranslation();
  const { addToast } = useSeller();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = t('contact.nameRequired') || 'Full name is required';
    }
    if (!formData.email.trim()) {
      errs.email = t('contact.emailRequired') || 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = t('contact.validEmail') || 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = t('contact.messageRequired') || 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = t('contact.minChars') || 'Please provide at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Safely load existing messages from localStorage
      let existingMessages = [];
      try {
        const stored = localStorage.getItem('karigar-contact-messages');
        if (stored) existingMessages = JSON.parse(stored);
      } catch (err) {
        console.warn('Could not parse karigar-contact-messages:', err);
      }

      const newMessage = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'Unread'
      };

      existingMessages.unshift(newMessage);
      localStorage.setItem('karigar-contact-messages', JSON.stringify(existingMessages));

      // Show toast
      addToast(t('contact.messageSent') || 'Message sent successfully.', 'success');
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error('Error saving message:', err);
      addToast(t('common.error') || 'Error sending message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between -m-4 sm:-m-6 lg:-m-8">
      <div className="p-4 sm:p-6 lg:p-10 max-w-6xl w-full mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('contact.title')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-gray-900 dark:text-white">
            {t('contact.title')}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Contact Information & Social Media */}
          <div className="lg:col-span-5 space-y-6 bg-white dark:bg-[#1F2937] p-6 sm:p-8 rounded-3xl border border-gray-200/80 dark:border-gray-700/80 shadow-xs">
            <div>
              <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white">
                {t('contact.title')}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {t('common.email')}
                  </h3>
                  <a
                    href="mailto:support@karigar.in"
                    className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  >
                    support@karigar.in
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {t('common.phone')}
                  </h3>
                  <a
                    href="tel:+919876543210"
                    className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {t('common.address')}
                  </h3>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug">
                    {t('contact.addressValue') || 'Haldia Institute of Technology, Haldia, West Bengal, India'}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700/80">
              <h3 className="text-xs font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-3">
                {t('contact.followUs')}
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#243244] hover:bg-[#14532D] dark:hover:bg-[#14532D] text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#243244] hover:bg-[#EA580C] dark:hover:bg-[#EA580C] text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#243244] hover:bg-[#0284C7] dark:hover:bg-[#0284C7] text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#243244] hover:bg-[#DC2626] dark:hover:bg-[#DC2626] text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1F2937] p-6 sm:p-8 rounded-3xl border border-gray-200/80 dark:border-gray-700/80 shadow-xs">
            <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white">
              {t('contact.sendUsMessage')}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-6">
              {t('contact.subtitle')}
            </p>

            {isSent && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    {t('common.success')}
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    {t('contact.messageSent')}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {t('contact.yourName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('contact.namePlaceholder')}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-200 dark:border-gray-700 focus:border-[#14532D] focus:ring-emerald-200 dark:focus:ring-emerald-800'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {t('contact.yourEmail')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('contact.emailPlaceholder')}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-200 dark:border-gray-700 focus:border-[#14532D] focus:ring-emerald-200 dark:focus:ring-emerald-800'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {t('contact.message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contact.messagePlaceholder')}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-200 dark:border-gray-700 focus:border-[#14532D] focus:ring-emerald-200 dark:focus:ring-emerald-800'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Send Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#14532D] hover:bg-[#0f3f22] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t('common.loading') : t('contact.sendMessage')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Reusable Full Footer */}
      <Footer className="mt-16" />
    </div>
  );
}
