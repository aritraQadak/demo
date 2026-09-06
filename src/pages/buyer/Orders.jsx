import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Package, Truck, ShieldCheck, Award, ArrowRight, ExternalLink } from 'lucide-react';

export default function Orders() {
  const { t } = useTranslation();

  const mockOrders = [
    {
      id: 'KGR-849201',
      date: '12 Oct 2024',
      status: 'In Transit',
      statusColor: 'text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300',
      artisanName: 'Smt. Ananya Devi',
      productName: 'Radha-Krishna Narrative Nakshi Kantha Tapestry',
      craft: 'Nakshi Kantha',
      state: 'West Bengal',
      price: 48000,
      artisanPayout: 43200,
      giTag: '#WB-082',
      image: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'KGR-710293',
      date: '28 Aug 2024',
      status: 'Delivered & Escrow Released',
      statusColor: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300',
      artisanName: 'Ustad Ramdas Ansari',
      productName: 'Imperial Gold Zari Chanderi Dupatta',
      craft: 'Banarasi / Chanderi',
      state: 'Madhya Pradesh',
      price: 34500,
      artisanPayout: 31050,
      giTag: '#MP-104',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="w-full bg-surface py-space-2xl px-space-md lg:px-space-4xl min-h-[80vh]">
      <div className="max-w-[1440px] mx-auto space-y-space-2xl">
        {/* Header */}
        <div className="border-b border-outline-variant/40 pb-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-[0.14em] mb-1">
              <Link to="/" className="hover:text-secondary transition-colors">
                {t('buyer.orders.home', 'Home')}
              </Link>
              <span>/</span>
              <span className="text-on-surface font-semibold">{t('buyer.orders.title', 'My Collection & Orders')}</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              {t('buyer.orders.heading', 'Patron Consignments & Escrow Ledger')}
            </h1>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-space-lg">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-surface-container-lowest p-space-xl shadow-md border border-outline-variant/40 space-y-space-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/30 pb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <Package className="w-5 h-5 text-secondary" />
                  <span className="font-title-md text-title-md font-bold text-on-surface">
                    {t('buyer.orders.orderNo', 'Ledger No')}: {order.id}
                  </span>
                  <span className="text-xs text-outline font-body-sm">({order.date})</span>
                </div>
                <span className={`px-space-md py-1 rounded font-label-sm text-xs uppercase tracking-wider font-semibold ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-space-lg items-start md:items-center justify-between">
                <div className="flex items-center gap-space-md">
                  <img
                    src={order.image}
                    alt={order.productName}
                    className="w-20 h-20 object-cover bg-surface-container shadow-xs flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                      {order.craft} • {order.state}
                    </span>
                    <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                      {order.productName}
                    </h3>
                    <div className="text-body-sm text-on-surface-variant">
                      {t('buyer.orders.artisan', 'Master Artisan')}: <span className="font-semibold text-on-surface">{order.artisanName}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 space-y-1 w-full md:w-auto pt-space-xs md:pt-0 border-t md:border-t-0 border-outline-variant/20">
                  <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    ₹{order.price.toLocaleString('en-IN')}
                  </div>
                  <div className="font-label-sm text-xs text-secondary font-semibold">
                    {t('buyer.orders.artisanPayout', 'Artisan Direct Payout')}: ₹{order.artisanPayout.toLocaleString('en-IN')} (90%)
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[11px] text-outline font-label-sm">
                    <Award className="w-3.5 h-3.5 text-secondary" />
                    <span>{t('buyer.orders.giMark', 'GI Certificate')}: {order.giTag}</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low p-space-md flex flex-wrap items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-xs text-xs text-on-surface-variant font-body-sm">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>{t('buyer.orders.escrowNote', 'Escrow Vault release locked until physical receipt & QR scan.')}</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <Link
                    to="/buyer/certificates"
                    className="inline-flex items-center gap-1 font-label-sm text-xs uppercase tracking-wider text-secondary font-bold hover:underline"
                  >
                    <span>{t('buyer.orders.viewCertificate', 'View Provenance Ledger')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
