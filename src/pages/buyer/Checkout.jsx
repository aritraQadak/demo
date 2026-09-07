import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { useBuyer } from '../../context/BuyerContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export default function Checkout() {
  const { t, i18n } = useTranslation();
  const { cart, cartTotal, artisanDirectTotal, clearCart } = useBuyer();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: '14/B Heritage Enclave, Salt Lake Sector V',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700091',
    paymentMethod: 'escrow_upi'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.address || !formData.pincode) {
      alert(t('buyer.checkout.fillRequired', 'Please fill in all required shipping fields.'));
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="w-full bg-surface py-space-4xl px-space-md lg:px-space-4xl min-h-[70vh] flex items-center justify-center">
        <div className="max-w-xl w-full bg-surface-container-lowest p-space-2xl shadow-xl border border-outline-variant/40 text-center space-y-space-md">
          <div className="w-20 h-20 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-bold">
            {t('buyer.checkout.successBadge', 'Sovereign Escrow Locked')}
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface">
            {t('buyer.checkout.successTitle', 'Acquisition Order Placed Successfully!')}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {t('buyer.checkout.successDesc', 'Your payment has been safely deposited into the Karigar Sovereign Escrow Vault. Funds will be released to the master artisan only upon parcel delivery and your inspection.')}
          </p>

          <div className="bg-surface-container p-space-md space-y-1 text-left">
            <div className="flex justify-between font-label-sm text-label-sm text-outline uppercase">
              <span>{t('buyer.checkout.orderNumber', 'Order Ledger ID')}:</span>
              <span className="font-mono text-on-surface font-bold">#KGR-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between font-label-sm text-label-sm text-outline uppercase">
              <span>{t('buyer.checkout.directArtisanPayout', 'Direct Artisan Release')}:</span>
              <span className="text-secondary font-bold">{formatCurrency(artisanDirectTotal, i18n.language)}</span>
            </div>
          </div>

          <div className="pt-space-md flex flex-col sm:flex-row gap-space-sm justify-center">
            <Link
              to="/buyer/orders"
              className="px-space-xl py-space-md bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-[0.16em] shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-all"
            >
              {t('buyer.checkout.viewOrders', 'View My Collection & Orders')}
            </Link>
            <Link
              to="/explore/west-bengal"
              className="px-space-xl py-space-md bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-[0.16em] transition-colors"
            >
              {t('buyer.checkout.continueExploring', 'Return to Guilds')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="w-full bg-surface py-space-4xl px-space-md lg:px-space-4xl min-h-[70vh] flex items-center justify-center text-center">
        <div className="space-y-space-md">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {t('buyer.checkout.noItems', 'No Items in Cart for Checkout')}
          </h2>
          <Link
            to="/explore/west-bengal"
            className="inline-flex items-center gap-space-xs px-space-2xl py-space-md bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-[0.18em]"
          >
            <span>{t('buyer.checkout.browseGuilds', 'Browse Guild Masterworks')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface py-space-2xl px-space-md lg:px-space-4xl min-h-[80vh]">
      <div className="max-w-[1440px] mx-auto space-y-space-2xl">
        {/* Header Title */}
        <div className="border-b border-outline-variant/40 pb-space-lg">
          <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-[0.14em] mb-1">
            <Link to="/cart" className="hover:text-secondary transition-colors">
              {t('buyer.checkout.cartLink', 'Cart')}
            </Link>
            <span>/</span>
            <span className="text-on-surface font-semibold">{t('buyer.checkout.checkoutTitle', 'Sovereign Checkout')}</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            {t('buyer.checkout.heading', 'Dispatch & Sovereign Escrow Setup')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
          {/* Left Shipping & Payment Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-space-xl">
            {/* Section 1: Dispatch Address */}
            <div className="bg-surface-container-lowest p-space-xl shadow-sm border border-outline-variant/30 space-y-space-md">
              <div className="flex items-center gap-space-xs border-b border-outline-variant/30 pb-space-xs">
                <Truck className="w-5 h-5 text-secondary" />
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                  {t('buyer.checkout.shippingDetails', '1. Dispatch & Delivery Address')}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                    {t('buyer.checkout.fullName', 'Full Name')} *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-2 font-body-md text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                    {t('buyer.checkout.email', 'Email Address')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-2 font-body-md text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                    {t('buyer.checkout.address', 'Street Address & Colony')} *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-2 font-body-md text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                    {t('buyer.checkout.city', 'City / District')} *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-2 font-body-md text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                    {t('buyer.checkout.state', 'State')} *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-2 font-body-md text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                    {t('buyer.checkout.pincode', 'Pincode')} *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-2 font-body-md text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                    {t('buyer.checkout.mobile', 'Mobile Number')}
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-2 font-body-md text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Sovereign Escrow Payment Gateways */}
            <div className="bg-surface-container-lowest p-space-xl shadow-sm border border-outline-variant/30 space-y-space-md">
              <div className="flex items-center gap-space-xs border-b border-outline-variant/30 pb-space-xs">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                  {t('buyer.checkout.paymentTitle', '2. Escrow Payment Gateway')}
                </h3>
              </div>

              <div className="space-y-space-sm">
                <label className={`flex items-start gap-space-sm p-space-md border cursor-pointer transition-colors ${formData.paymentMethod === 'escrow_upi' ? 'border-secondary bg-surface-container-low' : 'border-outline-variant/40 bg-surface'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="escrow_upi"
                    checked={formData.paymentMethod === 'escrow_upi'}
                    onChange={handleInputChange}
                    className="mt-1 text-secondary accent-secondary"
                  />
                  <div>
                    <div className="font-title-md text-title-md text-on-surface font-semibold">
                      {t('buyer.checkout.upiTitle', 'Sovereign Escrow Vault (UPI / GPay / PhonePe)')}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      {t('buyer.checkout.upiDesc', 'Instant 256-bit encrypted deposit into Karigar Trustee Account. Funds locked until delivery.')}
                    </p>
                  </div>
                </label>

                <label className={`flex items-start gap-space-sm p-space-md border cursor-pointer transition-colors ${formData.paymentMethod === 'escrow_card' ? 'border-secondary bg-surface-container-low' : 'border-outline-variant/40 bg-surface'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="escrow_card"
                    checked={formData.paymentMethod === 'escrow_card'}
                    onChange={handleInputChange}
                    className="mt-1 text-secondary accent-secondary"
                  />
                  <div>
                    <div className="font-title-md text-title-md text-on-surface font-semibold">
                      {t('buyer.checkout.cardTitle', 'Credit / Debit Card (Insured Trade)')}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      {t('buyer.checkout.cardDesc', 'Supports Visa, Mastercard, RuPay & International Patron Cards.')}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-space-md">
            <div className="bg-surface-container-lowest p-space-xl shadow-md border border-outline-variant/40 space-y-space-md">
              <h3 className="font-title-lg text-title-lg text-on-surface border-b border-outline-variant/30 pb-space-sm font-semibold">
                {t('buyer.checkout.itemsOverview', 'Order Items Overview')}
              </h3>

              <div className="space-y-space-sm max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-body-sm font-body-sm">
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-on-surface truncate">{item.product.name}</div>
                      <div className="text-[11px] text-outline">
                        {t('buyer.checkout.qty', 'Qty')}: {formatNumber(item.quantity, i18n.language)} × {formatCurrency(item.product.price, i18n.language)}
                      </div>
                    </div>
                    <span className="font-semibold text-on-surface flex-shrink-0">
                      {formatCurrency(item.product.price * item.quantity, i18n.language)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-outline-variant/40"></div>

              {/* Total & Direct Breakdown */}
              <div className="space-y-space-xs font-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>{t('buyer.checkout.subtotal', 'Items Total')}</span>
                  <span className="font-semibold text-on-surface">{formatCurrency(cartTotal, i18n.language)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>{t('buyer.checkout.logistics', 'Insured Express Shipping')}</span>
                  <span className="text-secondary font-semibold">{t('buyer.checkout.free', 'FREE')}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>{t('buyer.checkout.guaranteedArtisan', 'Direct Artisan Payout')}</span>
                  <span className="text-secondary font-bold">{formatCurrency(artisanDirectTotal, i18n.language)}</span>
                </div>
              </div>

              <div className="h-[1px] bg-outline-variant/40"></div>

              <div className="flex justify-between items-baseline">
                <span className="font-title-lg text-title-lg text-on-surface font-semibold">{t('buyer.checkout.totalAmount', 'Total Escrow Amount')}</span>
                <span className="font-headline-md text-headline-md text-secondary font-bold">
                  {formatCurrency(cartTotal, i18n.language)}
                </span>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-space-md bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-[0.18em] shadow-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all flex items-center justify-center gap-space-xs font-semibold disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? t('buyer.checkout.processing', 'Locking Escrow...') : t('buyer.checkout.authorize', 'Authorize Sovereign Escrow')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
