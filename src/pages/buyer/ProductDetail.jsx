import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BadgeCheck,
  ZoomIn,
  Leaf,
  Hand,
  Droplet,
  Image as ImageIcon,
  Star,
  StarHalf,
  ArrowRight,
  PackageCheck,
  Truck,
  ShoppingBag,
  Award,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Play,
  X,
  FileCheck
} from 'lucide-react';
import { getProductById, PRODUCTS } from '../../data/products';
import { useBuyer } from '../../context/BuyerContext';

export default function ProductDetail() {
  const { productId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useBuyer();

  const product = getProductById(productId) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('story');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const handleAcquire = () => {
    addToCart(product, 1);
    navigate('/cart');
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* BREADCRUMB STRIP */}
      <section className="w-full bg-surface-container-low px-space-md sm:px-space-xl py-space-sm border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <nav className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-[0.14em] text-on-surface-variant">
            <Link className="hover:text-secondary transition-colors" to="/">{t('buyer.product.homeNav', 'Home')}</Link>
            <span className="text-outline-variant">/</span>
            <Link className="hover:text-secondary transition-colors" to={`/explore/${product.stateSlug}`}>
              {product.stateName}
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-outline">{product.craftLineage}</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">{product.id.toUpperCase()}</span>
          </nav>

          <div className="hidden md:flex items-center gap-space-xs font-label-sm text-[11px] text-outline uppercase tracking-[0.16em]">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span>Registered Archival Specimen • One-of-a-Kind Heirloom</span>
          </div>
        </div>
      </section>

      {/* TOP PRODUCT SECTION: TWO-COLUMN EDITORIAL GRID */}
      <section className="w-full bg-surface py-space-xl px-space-md sm:px-space-xl">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
          {/* LEFT COLUMN: CRAFT GALLERY & VISUAL INSPECTION */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Large Hero Frame */}
            <div className="relative bg-surface-container-lowest overflow-hidden shadow-sm aspect-[5/4] flex items-center justify-center group cursor-crosshair border border-outline-variant/40">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Discreet Embossed GI Seal Mark */}
              <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md p-space-xs flex items-center gap-space-xs shadow-xs border border-outline-variant/40">
                <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                  <BadgeCheck className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex flex-col pr-space-xs">
                  <span className="font-label-sm text-[10px] uppercase tracking-[0.16em] text-primary font-bold">
                    {product.giTagStatus}
                  </span>
                  <span className="font-label-sm text-[9px] text-on-surface-variant uppercase tracking-[0.1em]">
                    {product.giTagNumber}
                  </span>
                </div>
              </div>

              {/* Zoom Loupe Interactive Hint */}
              <div className="absolute bottom-4 right-4 bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface px-space-sm py-1 flex items-center gap-space-xs pointer-events-none">
                <ZoomIn className="w-4 h-4 text-primary-fixed" />
                <span className="font-label-sm text-[11px] uppercase tracking-[0.12em]">
                  {t('buyer.product.magnifyHint', '180 Stitches/Inch Density • Magnify')}
                </span>
              </div>
            </div>

            {/* Thumbnail Reel (5 Curated Angles) */}
            <div className="grid grid-cols-5 gap-space-xs">
              {product.images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`thumb-btn relative aspect-square bg-surface-container overflow-hidden transition-all border ${
                    selectedImageIndex === idx ? 'ring-2 ring-secondary opacity-100' : 'opacity-70 hover:opacity-100 border-outline-variant/40'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-inverse-surface/75 text-inverse-on-surface text-[9px] uppercase tracking-wider text-center py-0.5 font-label-sm">
                    {idx === 0 ? 'Full Piece' : idx === 1 ? 'Macro View' : idx === 2 ? 'Materials' : idx === 3 ? 'Artisan Mark' : 'Living Space'}
                  </span>
                </button>
              ))}
            </div>

            {/* Quiet Provenance Strip Below Gallery */}
            <div className="bg-surface-container-low p-space-sm flex flex-wrap items-center justify-between gap-space-xs text-on-surface-variant font-label-sm text-label-sm tracking-[0.08em] border border-outline-variant/30">
              <div className="flex items-center gap-space-2xs">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-xs">{product.specs?.material || '100% Pure Natural Fibres'}</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-space-2xs">
                <Hand className="w-4 h-4 text-primary" />
                <span className="text-xs">{t('buyer.product.zeroAutomation', 'Zero Machine Automation')}</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-space-2xs">
                <Droplet className="w-4 h-4 text-primary" />
                <span className="text-xs">{product.specs?.dyeType || 'Organic Mineral Dyes'}</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-space-2xs text-secondary font-semibold">
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs">{t('buyer.product.certifiedArchival', 'Certified Sovereign Archival')}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CRAFT DETAILS, PRICING & ESCROW */}
          <div className="lg:col-span-7 lg:col-span-5 flex flex-col gap-space-md">
            {/* Origin Pill & Badges */}
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] uppercase tracking-[0.14em] px-space-sm py-1 font-semibold">
                {product.district}
              </span>
              <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-[11px] uppercase tracking-[0.12em] px-space-xs py-1">
                {t('buyer.product.archivalBatch', 'Archival Batch 2026')}
              </span>
            </div>

            {/* Master Title */}
            <div className="flex flex-col gap-space-2xs">
              <h1 className="font-garamond text-headline-lg text-on-surface leading-tight font-bold">
                {product.name}
              </h1>
              <div className="flex items-center gap-space-xs mt-1">
                <span className="font-title-md text-title-md text-secondary italic font-semibold">
                  By {product.artisanName}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
                <span className="font-label-sm text-[11px] uppercase tracking-[0.1em] text-primary font-semibold">
                  {product.artisanTitle}
                </span>
              </div>
            </div>

            {/* Trust Score Seal */}
            <div className="bg-surface-container-low p-space-sm flex items-center justify-between border border-outline-variant/40">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center font-bold text-primary font-garamond text-lg">
                  {product.rating ? (product.rating * 20).toFixed(1) : '99.4'}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5 text-primary">
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    <StarHalf className="w-3.5 h-3.5 fill-primary" />
                    <span className="font-label-sm text-[11px] text-on-surface ml-1 font-semibold">{t('buyer.product.giIntegrityScore', 'GI Integrity Score')}</span>
                  </div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">Validated by {product.reviewsCount || 42} Connoisseurs & Curators</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(true)}
                className="font-label-sm text-[11px] uppercase tracking-[0.1em] text-secondary hover:underline flex items-center gap-1 font-semibold"
              >
                <span>{t('buyer.product.viewLedger', 'View Ledger')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pricing Block */}
            <div className="bg-surface-container-lowest p-space-md shadow-xs flex flex-col gap-space-sm border border-outline-variant/40">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-garamond text-headline-md text-on-surface font-bold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">INR</span>
                </div>
                <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] uppercase tracking-[0.12em] px-space-xs py-0.5 font-bold">
                  1/1 Unique Masterpiece
                </span>
              </div>

              {/* Transparent Revenue Allocation */}
              <div className="bg-surface-container p-space-sm flex flex-col gap-space-2xs border border-outline-variant/30">
                <div className="flex items-center justify-between font-label-sm text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                  <span>{t('buyer.product.fairTradeAllocation', 'Fair-Trade Revenue Allocation')}</span>
                  <span className="text-primary font-semibold">100% Transparent</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest flex overflow-hidden rounded-full">
                  <div className="bg-secondary h-full" style={{ width: `${product.artisanSharePercent}%` }} />
                  <div className="bg-primary h-full" style={{ width: '5%' }} />
                  <div className="bg-outline h-full" style={{ width: '5%' }} />
                </div>
                <div className="grid grid-cols-3 gap-space-xs text-[11px] font-body-sm pt-1">
                  <div className="text-on-surface">
                    <span className="font-semibold text-secondary">₹{product.artisanShareAmount.toLocaleString('en-IN')} ({product.artisanSharePercent}%)</span>
                    <span className="block text-on-surface-variant text-[9px]">Direct to {product.artisanName}</span>
                  </div>
                  <div className="text-on-surface">
                    <span className="font-semibold text-primary">₹{(product.clusterFundAmount || 2400).toLocaleString('en-IN')} (5%)</span>
                    <span className="block text-on-surface-variant text-[9px]">{t('buyer.product.clusterFund', 'Cluster Fund')}</span>
                  </div>
                  <div className="text-on-surface">
                    <span className="font-semibold text-on-surface-variant">₹{(product.platformFeeAmount || 2400).toLocaleString('en-IN')} (5%)</span>
                    <span className="block text-on-surface-variant text-[9px]">{t('buyer.product.registryEscrow', 'Registry & Vault Escrow')}</span>
                  </div>
                </div>
              </div>

              {/* Shipping & Packaging info */}
              <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-xs pt-1">
                <PackageCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>{t('buyer.product.keepsakePackaging', 'Includes Hand-Carved Teak Keepsake Chest & Climate Seal Bag')}</span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-xs">
                <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t('buyer.product.freeLogistics', 'Free Insured Air Courier via National Handloom Logistics (5-7 Days)')}</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-space-xs pt-space-xs">
              <button
                type="button"
                onClick={handleAcquire}
                className="flex-1 bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-[0.16em] py-space-md px-space-lg text-center hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center justify-center gap-space-xs font-bold shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('buyer.product.acquireBtn', 'Acquire Masterwork')}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(true)}
                className="flex-1 bg-surface-container text-primary hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-[0.16em] py-space-md px-space-lg text-center transition-colors flex items-center justify-center gap-space-xs font-semibold border border-outline-variant/60"
              >
                <Award className="w-4 h-4" />
                <span>{t('buyer.product.inspectBtn', 'Inspect Provenance')}</span>
              </button>
            </div>

            {/* Sovereign Escrow Vault Card */}
            <div className="bg-surface-container-high p-space-md flex items-start gap-space-sm border border-outline-variant/40">
              <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex-shrink-0 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-label-sm text-[11px] uppercase tracking-[0.14em] font-bold text-on-surface">
                  {t('buyer.product.escrowVaultProtected', 'Protected by Sovereign Escrow Vault')}
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Your payment of ₹{product.price.toLocaleString('en-IN')} remains safely impounded in the GI Artisan Escrow. Funds are released directly to {product.artisanName} only after you physically receive, inspect, and verify the tapestry and embedded cryptotag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IN-DEPTH TABBED DOSSIER SECTION */}
      <section className="w-full bg-surface-container-low py-space-3xl px-space-md sm:px-space-xl border-t border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto">
          {/* Tabs Bar */}
          <div className="flex flex-wrap border-b border-outline-variant/50 gap-space-md mb-space-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('story')}
              className={`font-label-md text-label-md uppercase tracking-[0.16em] pb-space-sm font-bold transition-colors ${
                activeTab === 'story' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              01. Craft Narrative & Bilingual Story
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('artisan')}
              className={`font-label-md text-label-md uppercase tracking-[0.16em] pb-space-sm font-bold transition-colors ${
                activeTab === 'artisan' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              02. Artisan Dossier & Documentary
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('certificate')}
              className={`font-label-md text-label-md uppercase tracking-[0.16em] pb-space-sm font-bold transition-colors ${
                activeTab === 'certificate' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              03. Sovereign GI Certificate & Ledger
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`font-label-md text-label-md uppercase tracking-[0.16em] pb-space-sm font-bold transition-colors ${
                activeTab === 'reviews' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              04. Patron Appraisals ({product.reviewsCount || 42})
            </button>
          </div>

          {/* TAB 1: STORY */}
          {activeTab === 'story' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
              <div className="lg:col-span-8 flex flex-col gap-space-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl bg-surface-container-lowest p-space-xl shadow-xs border border-outline-variant/40">
                  {/* English Story */}
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-[11px] uppercase tracking-[0.16em] text-outline font-semibold">{t('buyer.product.englishEditorial', 'English Editorial')}</span>
                      <span className="h-[1px] flex-1 bg-outline-variant/40" />
                    </div>
                    <h3 className="font-garamond text-title-lg text-on-surface font-bold">
                      {product.longStory?.englishTitle || 'The Song of the Loom'}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {product.longStory?.englishText || product.description}
                    </p>
                  </div>

                  {/* Native Language Story */}
                  <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md border border-outline-variant/30">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-[11px] uppercase tracking-[0.16em] text-secondary font-semibold">বাংলা আদি রূপ</span>
                      <span className="h-[1px] flex-1 bg-outline-variant/40" />
                    </div>
                    <h3 className="font-garamond text-headline-sm text-secondary font-bold">
                      {product.longStory?.bengaliTitle || 'কদমতলার অমর প্রেমগাথা'}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                      {product.longStory?.bengaliText || 'বাংলার শতাব্দীপ্রাচীন সুজনী ভরাট ও সুক্ষ্ম কাঁথাস্টিচের বুননে সৃষ্ট প্রতিটি নকশা যেন পল্লীপ্রকৃতির এক নিবিড় উচ্চারণ।'}
                    </p>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-surface-container-lowest p-space-xl shadow-xs flex flex-col gap-space-md border border-outline-variant/40">
                  <h4 className="font-garamond text-title-lg text-on-surface font-bold">{t('buyer.product.curatorialSpecs', 'Curatorial Specifications')}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[10px] uppercase tracking-[0.14em] text-outline">{t('buyer.product.dimensions', 'Dimensions')}</span>
                      <span className="font-title-md text-title-md text-on-surface mt-1 font-semibold">{product.specs?.dimensions || '60" × 40" Inches'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[10px] uppercase tracking-[0.14em] text-outline">{t('buyer.product.baseMaterial', 'Base Material')}</span>
                      <span className="font-title-md text-title-md text-on-surface mt-1 font-semibold">{product.specs?.material || 'Wild Tussar Silk'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[10px] uppercase tracking-[0.14em] text-outline">{t('buyer.product.density', 'Density')}</span>
                      <span className="font-title-md text-title-md text-on-surface mt-1 font-semibold">{product.specs?.stitchDensity || '180 Stitches/In²'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[10px] uppercase tracking-[0.14em] text-outline">{t('buyer.product.craftTime', 'Crafting Time')}</span>
                      <span className="font-title-md text-title-md text-on-surface mt-1 font-semibold">{product.specs?.embroideryTime || '180 Days'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Care */}
              <div className="lg:col-span-4 flex flex-col gap-space-md">
                <div className="bg-surface-container p-space-lg flex flex-col gap-space-sm border border-outline-variant/40">
                  <span className="font-label-sm text-[11px] uppercase tracking-[0.16em] text-secondary font-bold">{t('buyer.product.archivalPreservation', 'Archival Preservation')}</span>
                  <h4 className="font-garamond text-headline-sm text-on-surface font-bold">{t('buyer.product.museumCare', 'Museum-Grade Care & Longevity')}</h4>
                  <ul className="flex flex-col gap-space-xs font-body-sm text-xs text-on-surface pt-2 space-y-1">
                    <li className="flex items-start gap-space-xs">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{t('buyer.product.sunExposure', 'Avoid direct unfiltered southern sun exposure.')}</span>
                    </li>
                    <li className="flex items-start gap-space-xs">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{t('buyer.product.dryClean', 'Dry clean exclusively by heritage textile conservators.')}</span>
                    </li>
                    <li className="flex items-start gap-space-xs">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{t('buyer.product.neemPacking', 'Supplied with pure neem-leaf parchment for seasonal packing.')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTISAN */}
          {activeTab === 'artisan' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl bg-surface-container-lowest p-space-xl shadow-xs border border-outline-variant/40 items-center">
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container border border-outline-variant/40">
                  <img
                    src={product.artisanAvatar || product.images[0]}
                    alt={product.artisanName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-inverse-surface/90 to-transparent p-space-md text-inverse-on-surface">
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.16em] text-primary-fixed">{t('buyer.product.masterArtisan', 'Master Artisan')}</span>
                    <div className="font-garamond text-headline-sm font-bold">{product.artisanName}</div>
                    <div className="text-xs opacity-80">{product.district}</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="bg-primary text-on-primary font-label-sm text-[10px] uppercase tracking-[0.16em] px-space-sm py-1 font-bold">
                    {product.artisanTitle}
                  </span>
                </div>
                <h3 className="font-garamond text-headline-md text-on-surface italic font-bold">
                  "The needle does not pierce the silk to wound it, but to awaken the song sleeping in its threads."
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {t('buyer.product.artisanBio', 'Dedicated to preserving and passing on centuries-old indigenous weaving and embroidery traditions to future generations. Every piece represents hundreds of hours of focused mastery.')}
                </p>
                <div className="bg-surface-container-low p-space-md flex items-center gap-space-md border border-outline-variant/30">
                  <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 ml-1 fill-on-secondary" />
                  </div>
                  <div>
                    <h5 className="font-title-md text-title-md text-on-surface font-bold">{t('buyer.product.miniDocTitle', 'Mini Documentary: Voices of the Loom')}</h5>
                    <p className="font-body-sm text-xs text-on-surface-variant">Inside the sunlit courtyard in {product.district}.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CERTIFICATE */}
          {activeTab === 'certificate' && (
            <div className="max-w-3xl mx-auto bg-surface-container-lowest p-space-2xl shadow-md border border-outline-variant/40 relative">
              <div className="p-space-xl bg-surface-container-low/40 flex flex-col gap-space-lg border border-outline-variant/30">
                <div className="flex flex-col items-center text-center gap-space-2xs">
                  <BadgeCheck className="w-12 h-12 text-secondary mb-1" />
                  <span className="font-label-sm text-[11px] uppercase tracking-[0.22em] text-outline font-bold">
                    {t('buyer.product.nationalRegistry', 'National Geographical Indications Registry')}
                  </span>
                  <h3 className="font-garamond text-headline-md text-on-surface font-bold">
                    {t('buyer.product.certTitle', 'Certificate of Sovereign Provenance')}
                  </h3>
                  <p className="font-label-sm text-[11px] uppercase tracking-[0.16em] text-secondary font-semibold">
                    {t('buyer.product.actInfo', 'Government of India GI Protection Act')} • Specimen #{product.giTagNumber}
                  </p>
                </div>
                <div className="h-[1px] w-full bg-outline-variant/60" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md font-body-sm text-xs">
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.12em] text-outline block">{t('buyer.product.regMasterwork', 'Registered Masterwork')}</span>
                    <span className="font-semibold text-on-surface text-sm">{product.name}</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.12em] text-outline block">{t('buyer.product.clusterOrigin', 'Cluster of Origin')}</span>
                    <span className="font-semibold text-on-surface text-sm">{product.district}</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.12em] text-outline block">{t('buyer.product.masterArtisan', 'Master Artisan')}</span>
                    <span className="font-semibold text-on-surface text-sm">{product.artisanName}</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.12em] text-outline block">{t('buyer.product.materialPurity', 'Material Purity')}</span>
                    <span className="font-semibold text-primary text-sm">100% Certified Natural (Pass)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="bg-surface-container-lowest p-space-xl shadow-xs border border-outline-variant/40 space-y-space-md">
              <h3 className="font-garamond text-headline-sm text-on-surface font-bold">Patron Appraisals & Verification Logs</h3>
              <div className="space-y-space-md">
                <div className="p-space-md bg-surface-container-low border border-outline-variant/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-title-md text-sm font-bold">{t('buyer.product.inspectorName', 'Dr. Suniti Banerjee')}</span>
                    <span className="text-xs text-outline">Verified Patron • Mumbai</span>
                  </div>
                  <div className="flex text-primary mb-2">
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    <Star className="w-3.5 h-3.5 fill-primary" />
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    "An exquisite piece of living history. The tactile stitch density and color richness far exceed gallery photographs."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CERTIFICATE MODAL */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-on-surface/80 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest max-w-xl w-full p-space-xl relative shadow-2xl border border-outline-variant/60">
            <button
              type="button"
              onClick={() => setIsCertModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center space-y-3">
              <FileCheck className="w-12 h-12 text-secondary mx-auto" />
              <h3 className="font-garamond text-headline-sm text-on-surface font-bold">{t('buyer.product.provenanceLedger', 'Sovereign Provenance Ledger')}</h3>
              <p className="text-xs text-on-surface-variant">
                Certificate Specimen #{product.giTagNumber} issued for {product.name} crafted by {product.artisanName}.
              </p>
              <div className="p-4 bg-surface-container-low text-left font-mono text-[11px] space-y-1 text-on-surface border border-outline-variant/40">
                <div>{t('buyer.product.ledgerHash', 'HASH: 0x8F92A1...921C')}</div>
                <div>ORIGIN: {product.district}</div>
                <div>{t('buyer.product.escrowStatus', 'ESCROW STATUS: IMPOUNDED UNTIL DELIVERY')}</div>
              </div>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="w-full py-2.5 bg-secondary text-on-secondary font-label-sm uppercase tracking-wider font-semibold"
              >
                {t('buyer.product.closeCertificate', 'Close Certificate')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
