import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  PlayCircle,
  Play,
  BadgeCheck,
  Award,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  FlaskConical,
  ShieldCheck,
  ScrollText,
  Globe,
  MapPin,
  Map,
  X
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { STATES_CRAFTS } from '../../data/statesCrafts';
import { useBuyer } from '../../context/BuyerContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useBuyer();

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const clusterStripRef = useRef(null);

  // Filter featured products
  const featuredProducts = PRODUCTS.slice(0, 5);
  const mainFeature = featuredProducts[0]; // Chanderi / Kantha
  const secondFeature = featuredProducts[1]; // Jamdani / Pottery
  const smallFeatures = featuredProducts.slice(2, 5);

  const featuredStates = [
    { slug: 'jammu-kashmir', name: t('buyer.home.kashmirName', 'Kashmir Valley'), craft: t('buyer.home.kashmirCraft', 'Kani & Pashmina'), looms: '410 Master Looms', img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=400&q=80' },
    { slug: 'rajasthan', name: t('buyer.home.rajasthanName', 'Rajasthan'), craft: t('buyer.home.rajasthanCraft', 'Jaipur Blue Pottery'), looms: '88 Kiln Collectives', img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80' },
    { slug: 'uttar-pradesh', name: t('buyer.home.varanasiName', 'Uttar Pradesh'), craft: t('buyer.home.varanasiCraft', 'Varanasi Brocade'), looms: '1,240 Registered Looms', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80' },
    { slug: 'west-bengal', name: t('buyer.home.bengalName', 'West Bengal'), craft: t('buyer.home.bengalCraft', 'Nakshi Kantha & Jamdani'), looms: '620 Craft Guilds', img: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=400&q=80' },
    { slug: 'gujarat', name: t('buyer.home.kutchName', 'Gujarat'), craft: t('buyer.home.kutchCraft', 'Ajrakh Block Print'), looms: '312 Dye Masters', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80' },
    { slug: 'odisha', name: t('buyer.home.odishaName', 'Odisha'), craft: t('buyer.home.odishaCraft', 'Pattachitra Scrolls'), looms: '195 Heritage Chitrakars', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleAcquire = (product) => {
    addToCart(product, 1);
    navigate('/cart');
  };

  const scrollRibbon = (direction) => {
    if (clusterStripRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      clusterStripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* HERO SECTION */}
      <section className="relative w-full -mt-20 overflow-hidden bg-on-background">
        {/* Background Visual Mosaic */}
        <div className="absolute inset-0 z-0 opacity-45">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full">
            <div
              className="bg-cover bg-center h-full w-full hidden md:block"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1200&q=80')` }}
            />
            <div
              className="bg-cover bg-center h-full w-full"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80')` }}
            />
            <div
              className="bg-cover bg-center h-full w-full hidden md:block"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80')` }}
            />
          </div>
        </div>

        {/* Gradient Scrim */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-on-background via-on-background/75 to-on-background/60" />

        {/* Hero Content Container */}
        <div className="relative z-20 max-w-[1440px] mx-auto px-space-md sm:px-space-xl pt-36 sm:pt-40 pb-space-4xl flex flex-col items-center text-center">
          {/* Archival Badge */}
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 bg-surface-container-low/10 backdrop-blur-md rounded-full mb-space-xl border border-primary-fixed/20">
            <span className="w-1.5 h-1.5 rounded-full bg-inverse-primary animate-pulse" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-primary-fixed">
              {t('buyer.home.heroBadge', 'National Handloom & Guild Archives • Verified GI Registry')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-garamond text-display-xl text-surface-container-lowest max-w-4xl tracking-tight leading-[1.08] mb-space-lg">
            {t('buyer.home.heroTitleLine1', 'Where Every Thread')}{' '}
            <br />
            <span className="italic font-garamond text-primary-fixed font-normal">
              {t('buyer.home.heroTitleLine2', 'Has a Sovereign Story')}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="font-manrope text-body-lg text-surface-variant max-w-2xl font-light tracking-wide leading-relaxed mb-space-2xl">
            {t('buyer.home.heroSubtitle', 'Direct from India’s master craftspeople to your sanctuary. Verified Geographical Indication provenance, protected by fair-wage artisan escrow.')}
          </p>

          {/* Dual CTA Pairing */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md w-full sm:w-auto">
            <a
              href="#clusters"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#14532D] hover:bg-[#0E3D20] text-white font-label-md text-xs sm:text-sm uppercase tracking-[0.18em] shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-center font-bold"
            >
              {t('buyer.home.exploreClustersCta', 'Explore Craft Clusters')}
            </a>
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-amber-100 font-label-md text-xs sm:text-sm uppercase tracking-[0.18em] transition-all duration-200 text-center flex items-center justify-center gap-2 border border-amber-200/30"
            >
              <PlayCircle className="w-4 h-4 text-amber-300" />
              <span>{t('buyer.home.watchStoriesCta', 'Watch Artisan Stories')}</span>
            </button>
          </div>

          {/* Provenance Telemetry Ticker */}
          <div className="mt-space-4xl grid grid-cols-2 md:grid-cols-4 gap-space-md sm:gap-space-xl max-w-4xl w-full text-left pt-space-xl border-t border-surface-variant/20">
            <div className="p-space-md bg-surface-container-low/5 backdrop-blur-sm rounded-none border border-surface-variant/10">
              <div className="font-garamond text-headline-sm text-primary-fixed">14,280+</div>
              <div className="font-label-sm text-[11px] text-outline-variant uppercase tracking-[0.14em] mt-1">
                {t('buyer.home.tickerMasters', 'Registered Guild Masters')}
              </div>
            </div>
            <div className="p-space-md bg-surface-container-low/5 backdrop-blur-sm rounded-none border border-surface-variant/10">
              <div className="font-garamond text-headline-sm text-primary-fixed">{t('buyer.home.statClustersNum', '128')}</div>
              <div className="font-label-sm text-[11px] text-outline-variant uppercase tracking-[0.14em] mt-1">
                {t('buyer.home.tickerClusters', 'Certified GI Clusters')}
              </div>
            </div>
            <div className="p-space-md bg-surface-container-low/5 backdrop-blur-sm rounded-none border border-surface-variant/10">
              <div className="font-garamond text-headline-sm text-primary-fixed">{t('buyer.home.statEscrowNum', '100%')}</div>
              <div className="font-label-sm text-[11px] text-outline-variant uppercase tracking-[0.14em] mt-1">
                {t('buyer.home.tickerEscrow', 'Escrow Protected Payout')}
              </div>
            </div>
            <div className="p-space-md bg-surface-container-low/5 backdrop-blur-sm rounded-none border border-surface-variant/10">
              <div className="font-garamond text-headline-sm text-primary-fixed">{t('buyer.home.statHonorariumNum', '₹4.8 Cr')}</div>
              <div className="font-label-sm text-[11px] text-outline-variant uppercase tracking-[0.14em] mt-1">
                {t('buyer.home.tickerHonorarium', 'Direct Artisan Honorarium')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. HORIZONTAL STATE-SELECTOR RIBBON */}
      <section className="w-full bg-surface-container-low py-space-2xl overflow-hidden" id="clusters">
        <div className="max-w-[1440px] mx-auto px-space-md sm:px-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-semibold block mb-1">
                {t('buyer.home.cartographySub', 'Territorial Cartography')}
              </span>
              <h2 className="font-garamond text-headline-md text-on-surface">
                {t('buyer.home.cartographyTitle', 'Explore Indigenous Lineages')}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md hidden sm:block">
                {t('buyer.home.cartographyDesc', 'Select a region to discover indigenous craft traditions, master weavers, and active sovereign preservation mandates.')}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollRibbon('left')}
                  className="w-9 h-9 bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors shadow-xs"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRibbon('right')}
                  className="w-9 h-9 bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors shadow-xs"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Region Carousel Strip */}
          <div
            ref={clusterStripRef}
            className="flex items-center gap-space-lg overflow-x-auto pb-space-md no-scrollbar py-space-xs"
          >
            {featuredStates.map((st) => (
              <button
                key={st.slug}
                type="button"
                onClick={() => navigate(`/explore/${st.slug}`)}
                className="group flex-shrink-0 flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-stone-900 hover:bg-[#FCFAF6] dark:hover:bg-stone-850 transition-all text-left shadow-xs hover:shadow-md hover:-translate-y-0.5 w-72 border border-stone-200/80 dark:border-stone-800 cursor-pointer"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-800 ring-2 ring-[#14532D]/10">
                  <img
                    src={st.img}
                    alt={st.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[#14532D] dark:text-emerald-400 mb-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-label-sm text-[11px] uppercase tracking-wider font-bold">
                      {st.name}
                    </span>
                  </div>
                  <div className="font-title-md text-sm text-stone-900 dark:text-stone-100 truncate font-bold">
                    {st.craft}
                  </div>
                  <div className="font-label-sm text-[11px] text-stone-500 dark:text-stone-400 tracking-tight mt-0.5">
                    {st.looms}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CURATED 'MEET THE ARTISANS' SHOWCASE */}
      <section className="w-full py-space-4xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-space-md sm:px-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl">
            <div>
              <div className="flex items-center gap-space-xs mb-space-xs">
                <BadgeCheck className="w-4 h-4 text-secondary" />
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-semibold">
                  {t('buyer.home.artisansBadge', 'The Living Heirlooms')}
                </span>
              </div>
              <h2 className="font-garamond text-headline-lg text-on-surface">
                {t('buyer.home.artisansTitle', 'Custodians of the Loom')}
              </h2>
            </div>
            <div className="mt-space-md md:mt-0 flex items-center gap-space-md">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {t('buyer.home.artisansCount', '4 of 14,280 Registered Master Craftsmen')}
              </span>
            </div>
          </div>

          {/* 4 Artisan Dossier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Artisan 1 */}
            <div className="group bg-white dark:bg-stone-900 rounded-2xl p-5 flex flex-col shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-stone-200/80 dark:border-stone-800">
              <div className="relative w-full aspect-[4/5] rounded-xl bg-stone-100 dark:bg-stone-800 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
                  alt={t('buyer.home.ramdasName', 'Ustad Ramdas Ansari')}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm p-1 flex items-center justify-center shadow-xs">
                  <Award className="w-4 h-4 text-[#14532D] dark:text-emerald-400" />
                </div>
                <div className="absolute top-3 left-3 bg-[#14532D] px-2.5 py-0.5 rounded-full text-white font-label-sm text-[10px] font-bold uppercase tracking-widest">
                  {t('buyer.home.fiveGenWeaver', '5th Gen Weaver')}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-label-sm text-[11px] uppercase tracking-wider text-[#C2410C] font-bold mb-1">
                    {t('buyer.home.varanasiLoc', 'Varanasi, Uttar Pradesh')}
                  </div>
                  <h3 className="font-garamond text-xl text-stone-900 dark:text-stone-100 mb-1 font-bold">
                    {t('buyer.home.ramdasName', 'Ustad Ramdas Ansari')}
                  </h3>
                  <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                    {t('buyer.home.ramdasBio', 'Master of Kadwa and Katan silk techniques. Keeper of 18th-century Persian jaal draught cards.')}
                  </p>
                </div>
                <div className="pt-3 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl bg-[#FCFAF6] dark:bg-stone-850 flex items-center justify-between border-t border-stone-200/60 dark:border-stone-800">
                  <span className="font-label-sm text-[11px] text-stone-500 uppercase tracking-wider font-medium">{t('buyer.home.padmaNominee', 'Padma Shri Nominee')}</span>
                  <Link
                    to="/explore/uttar-pradesh"
                    className="font-label-sm text-[11px] text-[#14532D] dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center hover:underline"
                  >
                    {t('buyer.home.dossier', 'Dossier')} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Artisan 2 */}
            <div className="group bg-white dark:bg-stone-900 rounded-2xl p-5 flex flex-col shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-stone-200/80 dark:border-stone-800">
              <div className="relative w-full aspect-[4/5] rounded-xl bg-stone-100 dark:bg-stone-800 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                  alt="{t('buyer.home.ananyaName', 'Smt. Ananya Devi')}"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm p-1 flex items-center justify-center shadow-xs">
                  <BadgeCheck className="w-4 h-4 text-[#14532D] dark:text-emerald-400" />
                </div>
                <div className="absolute top-3 left-3 bg-[#14532D] px-2.5 py-0.5 rounded-full text-white font-label-sm text-[10px] font-bold uppercase tracking-widest">
                  {t('buyer.home.nationalAwardee', 'National Awardee')}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-label-sm text-[11px] uppercase tracking-wider text-[#C2410C] font-bold mb-1">
                    {t('buyer.home.santipurLoc', 'Santipur, West Bengal')}
                  </div>
                  <h3 className="font-garamond text-xl text-stone-900 dark:text-stone-100 mb-1 font-bold">
                    {t('buyer.home.ananyaName', 'Smt. Ananya Devi')}
                  </h3>
                  <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                    {t('buyer.home.ananyaBio', 'Narrative Nakshi Kantha embroidery stitching folk cosmologies and botanical motifs on handloom tussar.')}
                  </p>
                </div>
                <div className="pt-3 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl bg-[#FCFAF6] dark:bg-stone-850 flex items-center justify-between border-t border-stone-200/60 dark:border-stone-800">
                  <span className="font-label-sm text-[11px] text-stone-500 uppercase tracking-wider font-medium">{t('buyer.home.giMarkWB', 'GI Mark #WB-0452')}</span>
                  <Link
                    to="/explore/west-bengal"
                    className="font-label-sm text-[11px] text-[#14532D] dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center hover:underline"
                  >
                    {t('buyer.home.dossier', 'Dossier')} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Artisan 3 */}
            <div className="group bg-white dark:bg-stone-900 rounded-2xl p-5 flex flex-col shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-stone-200/80 dark:border-stone-800">
              <div className="relative w-full aspect-[4/5] rounded-xl bg-stone-100 dark:bg-stone-800 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
                  alt="{t('buyer.home.ismailName', 'Dr. Ismail M. Khatri')}"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm p-1 flex items-center justify-center shadow-xs">
                  <Award className="w-4 h-4 text-[#14532D] dark:text-emerald-400" />
                </div>
                <div className="absolute top-3 left-3 bg-[#14532D] px-2.5 py-0.5 rounded-full text-white font-label-sm text-[10px] font-bold uppercase tracking-widest">
                  {t('buyer.home.shilpGuru', 'Shilp Guru Awardee')}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-label-sm text-[11px] uppercase tracking-wider text-[#C2410C] font-bold mb-1">
                    {t('buyer.home.ajrakhpurLoc', 'Ajrakhpur, Gujarat')}
                  </div>
                  <h3 className="font-garamond text-xl text-stone-900 dark:text-stone-100 mb-1 font-bold">
                    {t('buyer.home.ismailName', 'Dr. Ismail M. Khatri')}
                  </h3>
                  <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                    {t('buyer.home.ismailBio', '16-stage resist block dyeing using wild pomegranate, river mud, and fermented scrap iron.')}
                  </p>
                </div>
                <div className="pt-3 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl bg-[#FCFAF6] dark:bg-stone-850 flex items-center justify-between border-t border-stone-200/60 dark:border-stone-800">
                  <span className="font-label-sm text-[11px] text-stone-500 uppercase tracking-wider font-medium">{t('buyer.home.carverGen', '9th Gen Block Carver')}</span>
                  <Link
                    to="/explore/gujarat"
                    className="font-label-sm text-[11px] text-[#14532D] dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center hover:underline"
                  >
                    {t('buyer.home.dossier', 'Dossier')} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Artisan 4 */}
            <div className="group bg-white dark:bg-stone-900 rounded-2xl p-5 flex flex-col shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-stone-200/80 dark:border-stone-800">
              <div className="relative w-full aspect-[4/5] rounded-xl bg-stone-100 dark:bg-stone-800 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                  alt="{t('buyer.home.ghulamName', 'Ghulam Hassan Mir')}"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm p-1 flex items-center justify-center shadow-xs">
                  <BadgeCheck className="w-4 h-4 text-[#14532D] dark:text-emerald-400" />
                </div>
                <div className="absolute top-3 left-3 bg-[#14532D] px-2.5 py-0.5 rounded-full text-white font-label-sm text-[10px] font-bold uppercase tracking-widest">
                  {t('buyer.home.kaniLoomMaster', 'Kani Loom Master')}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-label-sm text-[11px] uppercase tracking-wider text-[#C2410C] font-bold mb-1">
                    {t('buyer.home.srinagarLoc', 'Srinagar, Kashmir')}
                  </div>
                  <h3 className="font-garamond text-xl text-stone-900 dark:text-stone-100 mb-1 font-bold">
                    {t('buyer.home.ghulamName', 'Ghulam Hassan Mir')}
                  </h3>
                  <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                    {t('buyer.home.ghulamBio', "Weaving coded 'Talim' manuscripts into whisper-soft Changthangi cashmere goat fleece.")}
                  </p>
                </div>
                <div className="pt-3 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl bg-[#FCFAF6] dark:bg-stone-850 flex items-center justify-between border-t border-stone-200/60 dark:border-stone-800">
                  <span className="font-label-sm text-[11px] text-stone-500 uppercase tracking-wider font-medium">{t('buyer.home.giMarkJK', 'GI Mark #JK-0921')}</span>
                  <Link
                    to="/explore/jammu-kashmir"
                    className="font-label-sm text-[11px] text-[#14532D] dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center hover:underline"
                  >
                    {t('buyer.home.dossier', 'Dossier')} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUIET TRUST STRIP */}
      <section className="w-full bg-[#F8F4EC] dark:bg-stone-900/60 py-12 border-y border-[#E7DECB]/80 dark:border-stone-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="flex gap-4 items-start p-6 rounded-2xl bg-white dark:bg-stone-900 shadow-xs border border-stone-200/80 dark:border-stone-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-[#14532D] dark:text-emerald-400 flex-shrink-0">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-title-md text-base text-stone-900 dark:text-stone-100 mb-1.5 font-bold">
                  {t('buyer.home.pillar1Title', 'Direct Kinship Verification')}
                </h4>
                <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {t('buyer.home.pillar1Desc', 'We bypass intermediate middlemen. Connect directly with over 14,000 certified national awardees, weaver societies, and sovereign guild masters.')}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex gap-4 items-start p-6 rounded-2xl bg-white dark:bg-stone-900 shadow-xs border border-stone-200/80 dark:border-stone-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-[#14532D] dark:text-emerald-400 flex-shrink-0">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-title-md text-base text-stone-900 dark:text-stone-100 mb-1.5 font-bold">
                  {t('buyer.home.pillar2Title', 'Rigorous Lab Provenance')}
                </h4>
                <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {t('buyer.home.pillar2Desc', 'Every textile is authenticated with Geographical Indication tags and laboratory burn-testing for 100% natural mulberry, tussar, and pure zari threads.')}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex gap-4 items-start p-6 rounded-2xl bg-white dark:bg-stone-900 shadow-xs border border-stone-200/80 dark:border-stone-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-[#14532D] dark:text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-title-md text-base text-stone-900 dark:text-stone-100 mb-1.5 font-bold">
                  {t('buyer.home.pillar3Title', 'Fair-Wage Escrow Vault')}
                </h4>
                <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {t('buyer.home.pillar3Desc', 'Your patron funds are held in sovereign escrow until parcel receipt & inspection, with 88-92% guaranteed release straight to artisan bank accounts.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED MASTERPIECE COLLECTION */}
      <section className="w-full py-space-4xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-space-md sm:px-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-semibold block mb-1">
                {t('buyer.home.collectionSub', 'Limited Certified Editions')}
              </span>
              <h2 className="font-garamond text-headline-lg text-on-surface">
                {t('buyer.home.collectionTitle', 'Curated Masterworks')}
              </h2>
            </div>
            <div className="mt-space-sm md:mt-0 flex items-center gap-space-md">
              <span className="font-body-sm text-body-sm text-outline">
                {t('buyer.home.certificateNotice', 'Each piece accompanied by signed Certificate of Origin')}
              </span>
              <Link
                to="/explore/west-bengal"
                className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold hover:underline flex items-center"
              >
                {t('buyer.home.viewAllTreasures', 'View All Treasures')} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Editorial Magazine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Large Feature (7 cols) */}
            {mainFeature && (
              <div className="md:col-span-7 group bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-xs hover:shadow-md flex flex-col border border-stone-200/80 dark:border-stone-800 transition-all duration-300">
                <div className="relative w-full aspect-[16/10] bg-stone-100 dark:bg-stone-800 rounded-xl overflow-hidden mb-5">
                  <img
                    src={mainFeature.images[0]}
                    alt={mainFeature.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full font-label-sm text-[11px] text-stone-800 dark:text-stone-200 uppercase tracking-wider font-semibold shadow-xs">
                    {mainFeature.craftLineage} • {mainFeature.district}
                  </div>
                  <div className="absolute bottom-3.5 right-3.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 rounded-full font-label-sm text-[11px] uppercase tracking-wider shadow-xs flex items-center gap-1 font-bold">
                    <BadgeCheck className="w-3.5 h-3.5" /> {mainFeature.giTagStatus}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-label-sm text-[11px] text-[#C2410C] uppercase tracking-wider font-bold mb-1">
                      {t('buyer.home.masterArtisan', 'Master Artisan:')} {mainFeature.artisanName}
                    </div>
                    <h3 className="font-garamond text-2xl text-stone-900 dark:text-stone-100 font-bold">
                      <Link to={`/product/${mainFeature.id}`} className="hover:text-[#14532D] dark:hover:text-emerald-400 transition-colors">
                        {mainFeature.name}
                      </Link>
                    </h3>
                    <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 max-w-xl mt-1 leading-relaxed">
                      {mainFeature.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-garamond text-2xl text-[#14532D] dark:text-emerald-400 font-bold">
                      {formatCurrency(mainFeature.price, i18n.language)}
                    </div>
                    <div className="font-label-sm text-[11px] text-stone-500 dark:text-stone-400 tracking-tight">
                      {t('buyer.home.artisanShare', 'Artisan Share:')} {formatCurrency(mainFeature.artisanShareAmount, i18n.language)} ({formatNumber(mainFeature.artisanSharePercent, i18n.language)}%)
                    </div>
                  </div>
                </div>

                {/* Transparent Payout Bar */}
                <div className="bg-[#FCFAF6] dark:bg-stone-850 p-4 rounded-xl border border-stone-200/60 dark:border-stone-800 flex flex-col gap-2 mt-auto">
                  <div className="flex justify-between text-stone-700 dark:text-stone-300 font-label-sm text-[11px]">
                    <span className="font-medium">{t('buyer.home.fairWageAllocation', 'Fair Wage Transparency Allocation')}</span>
                    <span className="text-[#14532D] dark:text-emerald-400 font-bold">{formatNumber(mainFeature.artisanSharePercent, i18n.language)}% {t('buyer.home.directArtisanPayoutBadge', 'Direct Artisan Payout')}</span>
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 flex overflow-hidden rounded-full">
                    <div className="bg-[#14532D] dark:bg-emerald-500 h-full" style={{ width: `${mainFeature.artisanSharePercent}%` }} />
                    <div className="bg-[#C2410C] h-full" style={{ width: '7%' }} />
                    <div className="bg-stone-400 dark:bg-stone-500 h-full" style={{ width: '3%' }} />
                  </div>
                  <div className="flex justify-between text-stone-500 dark:text-stone-400 font-label-sm text-[10px]">
                    <span>Artisan Guild: {mainFeature.artisanSharePercent}%</span>
                    <span>GI Verification: 7%</span>
                    <span>Platform Escrow: 3%</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleAcquire(mainFeature)}
                    className="flex-1 bg-[#14532D] hover:bg-[#0E3D20] text-white py-3 px-5 rounded-xl font-label-sm text-xs uppercase tracking-wider font-semibold transition-all shadow-xs hover:shadow-md text-center cursor-pointer"
                  >
                    {t('buyer.product.acquireBtn', 'Acquire Masterwork')}
                  </button>
                  <Link
                    to={`/product/${mainFeature.id}`}
                    className="px-5 py-3 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl font-label-sm text-xs uppercase tracking-wider flex items-center justify-center font-semibold transition-colors"
                  >
                    {t('buyer.home.details', 'Details')}
                  </Link>
                </div>
              </div>
            )}

            {/* Medium Feature (5 cols) */}
            {secondFeature && (
              <div className="md:col-span-5 group bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-xs hover:shadow-md flex flex-col border border-stone-200/80 dark:border-stone-800 transition-all duration-300">
                <div className="relative w-full aspect-[4/3] bg-stone-100 dark:bg-stone-800 rounded-xl overflow-hidden mb-5">
                  <img
                    src={secondFeature.images[0]}
                    alt={secondFeature.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full font-label-sm text-[11px] text-stone-800 dark:text-stone-200 uppercase tracking-wider font-semibold shadow-xs">
                    {secondFeature.craftLineage} • {secondFeature.district}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-label-sm text-[11px] text-[#C2410C] uppercase tracking-wider font-bold mb-1">
                      {t('buyer.home.masterArtisan', 'Master Artisan:')} {secondFeature.artisanName}
                    </div>
                    <h3 className="font-garamond text-xl text-stone-900 dark:text-stone-100 font-bold">
                      <Link to={`/product/${secondFeature.id}`} className="hover:text-[#14532D] dark:hover:text-emerald-400 transition-colors">
                        {secondFeature.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="font-garamond text-xl text-[#14532D] dark:text-emerald-400 font-bold">
                      {formatCurrency(secondFeature.price, i18n.language)}
                    </div>
                    <div className="font-label-sm text-[10px] text-stone-500 dark:text-stone-400">
                      {t('buyer.home.artisanShare', 'Artisan:')} {formatCurrency(secondFeature.artisanShareAmount, i18n.language)}
                    </div>
                  </div>
                </div>
                <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 mb-5 leading-relaxed">
                  {secondFeature.description}
                </p>
                <div className="mt-auto flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAcquire(secondFeature)}
                    className="flex-1 py-2.5 bg-[#14532D] hover:bg-[#0E3D20] text-white rounded-xl font-label-sm text-xs uppercase tracking-wider transition-all text-center font-semibold shadow-xs hover:shadow-md cursor-pointer"
                  >
                    {t('buyer.product.acquireBtn', 'Acquire Masterwork')}
                  </button>
                  <Link
                    to={`/product/${secondFeature.id}`}
                    className="py-2.5 px-4 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl font-label-sm text-xs uppercase tracking-wider flex items-center justify-center font-semibold transition-colors"
                  >
                    {t('buyer.home.ledger', 'Ledger')}
                  </Link>
                </div>
              </div>
            )}

            {/* Small Features (3 x 4 cols) */}
            {smallFeatures.map((prod) => (
              <div key={prod.id} className="md:col-span-4 group bg-white dark:bg-stone-900 rounded-2xl p-5 shadow-xs hover:shadow-md flex flex-col border border-stone-200/80 dark:border-stone-800 transition-all duration-300">
                <div className="relative w-full aspect-square bg-stone-100 dark:bg-stone-800 rounded-xl overflow-hidden mb-4">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full font-label-sm text-[10px] uppercase tracking-wider font-bold">
                    {prod.giTagStatus}
                  </div>
                </div>
                <div className="font-label-sm text-[11px] text-[#C2410C] uppercase tracking-wider font-bold mb-0.5">
                  {prod.district}
                </div>
                <h3 className="font-garamond text-lg text-stone-900 dark:text-stone-100 mb-1 font-bold">
                  <Link to={`/product/${prod.id}`} className="hover:text-[#14532D] dark:hover:text-emerald-400 transition-colors">
                    {prod.name}
                  </Link>
                </h3>
                <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 mb-4 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
                <div className="mt-auto pt-3 flex flex-col gap-2.5 border-t border-stone-200/60 dark:border-stone-800">
                  <div className="flex justify-between items-center">
                    <span className="font-garamond text-lg text-[#14532D] dark:text-emerald-400 font-bold">
                      {formatCurrency(prod.price, i18n.language)}
                    </span>
                    <span className="font-label-sm text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                      {formatNumber(prod.artisanSharePercent, i18n.language)}% {t('buyer.home.artisanDirect', 'Artisan Direct')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAcquire(prod)}
                    className="w-full py-2.5 bg-[#14532D] hover:bg-[#0E3D20] text-white rounded-xl font-label-sm text-xs uppercase tracking-wider font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer"
                  >
                    {t('buyer.product.acquireBtn', 'Acquire Masterwork')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL HERITAGE QUOTE & CRAFT MAP CALLOUT */}
      <section className="w-full bg-[#F8F4EC] dark:bg-stone-900/60 py-16 relative overflow-hidden border-t border-[#E7DECB]/80 dark:border-stone-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Editorial Quote Block */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-2 text-[#14532D] dark:text-emerald-400 mb-4">
                <ScrollText className="w-5 h-5" />
                <span className="font-label-sm text-xs uppercase tracking-[0.2em] font-bold">
                  {t('buyer.home.quoteBadge', 'UNESCO Intangible Cultural Heritage Manifesto')}
                </span>
              </div>
              <blockquote className="font-garamond text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-snug mb-6 italic">
                “The handloom is not an artifact of an obsolete past, but a living sacred mathematics that binds community, flora, and sovereignty into enduring cloth.”
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-[#C2410C]" />
                <div>
                  <div className="font-title-md text-sm text-stone-900 dark:text-stone-100 font-bold">
                    {t('buyer.home.quoteAuthor', 'Prof. Kamaladevi Chattopadhyay Archive')}
                  </div>
                  <div className="font-label-sm text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                    {t('buyer.home.quoteRole', 'Patron of Indian Craft Renaissance')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Map Callout Plate */}
            <div className="lg:col-span-5 bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md flex flex-col justify-between border border-stone-200/80 dark:border-stone-800 transition-all">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-label-sm text-xs uppercase tracking-wider text-[#14532D] dark:text-emerald-400 font-bold">
                    {t('buyer.home.mapBadge', 'Interactive Map Registry')}
                  </span>
                  <Globe className="w-5 h-5 text-stone-400" />
                </div>
                <h3 className="font-garamond text-2xl text-stone-900 dark:text-stone-100 mb-2 font-bold">
                  {t('buyer.home.mapHeading', 'The National Craft Atlas')}
                </h3>
                <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
                  Explore 750+ verified artisanal clusters across 28 states. View geo-tagged loom cooperatives, direct video feeds from workshops, and verifiable purity logs.
                </p>
                <div
                  className="w-full h-44 bg-cover bg-center mb-5 rounded-xl relative overflow-hidden shadow-inner border border-stone-200/60 dark:border-stone-700"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80')` }}
                >
                  <div className="absolute inset-0 bg-stone-900/20" />
                  <div className="absolute bottom-2.5 left-2.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-sm text-[11px] text-stone-800 dark:text-stone-200 flex items-center gap-1.5 shadow-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>{t('buyer.home.activeWeaveHubs', 'Active Weave Hubs in Focus')}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/explore/west-bengal"
                className="w-full py-3 bg-[#14532D] hover:bg-[#0E3D20] text-white rounded-xl font-label-sm text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 font-semibold shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>{t('buyer.home.launchAtlas', 'Launch Sovereign Craft Atlas')}</span>
                <Map className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ARTISAN STORY MODAL */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-stone-900 max-w-2xl w-full p-6 sm:p-8 rounded-2xl relative shadow-2xl border border-stone-200/80 dark:border-stone-800">
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 text-[#14532D] dark:text-emerald-400 mb-2">
              <BadgeCheck className="w-4 h-4" />
              <span className="font-label-sm text-xs uppercase tracking-widest font-bold">
                {t('buyer.home.modalBadge', 'Living Oral Histories')}
              </span>
            </div>
            <h3 className="font-garamond text-2xl text-stone-900 dark:text-stone-100 mb-4 font-bold">
              Voices from the Pit Loom: Kani & Pashmina of Kashmir
            </h3>
            <div className="w-full aspect-video bg-stone-900 rounded-xl relative mb-4 overflow-hidden flex items-center justify-center shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80"
                alt={t('buyer.home.storyVideoPreview', 'Story Video Preview')}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#14532D] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
              </div>
            </div>
            <p className="font-body-sm text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Watch Master {t('buyer.home.ghulamName', 'Ghulam Hassan Mir')} demonstrate the ancient rhythmic chanting of the 'Talim'—the cryptographic weaver's shorthand that dictates color and warp count without a painted guide.
            </p>
            <div className="flex justify-between items-center pt-4 border-t border-stone-200/60 dark:border-stone-800">
              <div className="font-label-sm text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                {t('buyer.home.filmRuntime', 'Runtime: 06:45 • High-Definition Heritage Film')}
              </div>
              <button
                type="button"
                onClick={() => setIsStoryModalOpen(false)}
                className="px-5 py-2.5 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-label-sm text-xs uppercase tracking-wider hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors font-semibold cursor-pointer"
              >
                {t('buyer.home.dismiss', 'Dismiss')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
