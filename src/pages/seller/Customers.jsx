import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Star, Heart, MapPin, MessageSquare } from 'lucide-react';
import { useSeller } from '../../context/SellerContext';

export default function Customers() {
  const { t } = useTranslation();
  const { customers } = useSeller();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#1F2937] p-5 sm:p-6 rounded-2xl border border-gray-200/90 dark:border-gray-700/80 shadow-2xs transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#F9FAFB] tracking-tight">
            {t('customers.pageTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-[#CBD5E1] mt-1">
            {t('customers.pageSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800 self-start sm:self-auto">
          <Heart className="w-4 h-4 text-purple-600 dark:text-purple-400 fill-purple-100 dark:fill-purple-950/80" />
          <span>{customers.length} {t('customers.badgePatron')}</span>
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((cust) => (
          <div
            key={cust.id}
            className="bg-white dark:bg-[#1F2937] rounded-2xl p-5 border border-gray-200/90 dark:border-gray-700/80 shadow-2xs space-y-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={cust.avatar}
                  alt={cust.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-100 dark:border-orange-900/60"
                />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-[#F9FAFB] flex items-center gap-1.5">
                    <span>{cust.name}</span>
                    <span className="text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2 py-0.2 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {t('customers.badgePatron')}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {cust.city}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-400 dark:text-gray-500 block">{t('customers.ordersCount')}:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{cust.ordersCount} {t('common.units')}</span>
              </div>
            </div>

            {/* Note / Review */}
            <div className="p-3.5 bg-gray-50 dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-700/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">
                  {t('customers.lastOrder')}: {cust.favoriteCraft}
                </span>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(cust.rating) ? 'fill-amber-400' : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 ml-1">
                    {cust.rating}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
                "{cust.note}"
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-gray-400 dark:text-gray-500 text-[11px]">
                {t('verification.verifiedSince')} {cust.joinedDate}
              </span>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t('customers.messagePatron')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
