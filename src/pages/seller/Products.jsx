import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Filter } from 'lucide-react';
import { useSeller } from '../../context/SellerContext';
import ProductTable from '../../components/ProductTable';

export default function Products() {
  const { t } = useTranslation();
  const { products, deleteProduct, toggleProductStatus } = useSeller();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categoryOptions = [
    { value: 'All', label: t('common.all') },
    { value: 'Pottery', label: t('products.categoryPottery') },
    { value: 'Bamboo & Cane', label: t('products.categoryBamboo') },
    { value: 'Woodcraft', label: t('products.categoryWood') },
    { value: 'Folk Painting', label: t('products.categoryPainting') },
    { value: 'Metal Craft', label: t('products.categoryMetal') }
  ];

  const statusOptions = [
    { value: 'All', label: t('common.all') },
    { value: 'Active', label: t('common.active') },
    { value: 'Out of Stock', label: t('common.outOfStock') },
    { value: 'Draft', label: t('common.draft') }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1F2937] p-5 sm:p-6 rounded-2xl border border-gray-200/90 dark:border-gray-700/80 shadow-2xs transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#F9FAFB] tracking-tight">
            {t('nav.myProducts')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-[#CBD5E1] mt-1">
            {t('products.pageSubtitle')}
          </p>
        </div>

        <Link
          to="/add-product"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14532D] hover:bg-[#0f3e22] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('nav.addProduct')}</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-[#1F2937] p-4 rounded-2xl border border-gray-200/90 dark:border-gray-700/80 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between transition-colors">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('products.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-800 dark:text-[#F9FAFB] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white dark:focus:bg-[#111827]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span>{t('common.category')}:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-800 dark:text-[#F9FAFB] focus:outline-none"
            >
              {categoryOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap">
            <span>{t('common.status')}:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-800 dark:text-[#F9FAFB] focus:outline-none"
            >
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Table Container */}
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-gray-200/90 dark:border-gray-700/80 shadow-2xs overflow-hidden transition-colors">
        <ProductTable
          products={filteredProducts}
          onDelete={deleteProduct}
          onToggleStatus={toggleProductStatus}
        />
      </div>
    </div>
  );
}
