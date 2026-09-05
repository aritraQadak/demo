import React from 'react';
import { Package, ShoppingBag, IndianRupee, Star, ArrowUpRight } from 'lucide-react';

const iconConfig = {
  products: {
    icon: Package,
    bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-100 dark:border-emerald-800',
  },
  orders: {
    icon: ShoppingBag,
    bg: 'bg-blue-50 dark:bg-blue-950/60',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-100 dark:border-blue-800',
  },
  earnings: {
    icon: IndianRupee,
    bg: 'bg-rose-50 dark:bg-rose-950/60',
    text: 'text-rose-500 dark:text-rose-400',
    border: 'border-rose-100 dark:border-rose-800',
  },
  rating: {
    icon: Star,
    bg: 'bg-purple-50 dark:bg-purple-950/60',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-100 dark:border-purple-800',
  }
};

export default function StatCard({
  type = 'products',
  value,
  label,
  subtext,
  growth,
  onClick
}) {
  const config = iconConfig[type] || iconConfig.products;
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200/90 dark:border-gray-700/80 shadow-xs hover:shadow-sm transition-all duration-200 flex items-center justify-between ${onClick ? 'cursor-pointer hover:border-gray-300 dark:hover:border-gray-600' : ''}`}
    >
      <div className="flex items-center gap-3.5">
        <div className={`w-11 h-11 rounded-lg ${config.bg} ${config.text} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-gray-900 dark:text-[#F9FAFB] tracking-tight">{value}</span>
            {growth && (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center">
                <ArrowUpRight className="w-3 h-3" />
                {growth}
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-gray-500 dark:text-[#CBD5E1] mt-0.5">{label}</p>
          {subtext && <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}
