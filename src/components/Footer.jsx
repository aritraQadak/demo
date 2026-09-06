import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, BadgeCheck, Store, Building2 } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from './SocialIcons';
import Logo from './Logo';

export default function Footer({ className = '', variant = 'seller' }) {
  const { t } = useTranslation();

  if (variant === 'buyer') {
    return (
      <footer className={`w-full bg-surface-container-low border-t border-outline-variant/40 pt-space-2xl pb-space-xl ${className}`}>
        <div className="max-w-[1440px] mx-auto px-space-xl">
          {/* Institution & GI Credentials Row */}
          <div className="border-b border-outline-variant/40 pb-space-xl mb-space-xl">
            <div className="text-center mb-space-md">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-outline font-semibold">
                {t('buyer.footer.nationalRegistry', 'National Heritage Provenance & Institutional Registry')}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md max-w-4xl mx-auto">
              <div className="border border-outline-variant/60 bg-surface-container-lowest p-space-md flex items-center gap-space-sm shadow-xs">
                <BadgeCheck className="w-6 h-6 text-secondary flex-shrink-0" />
                <div>
                  <div className="font-label-sm text-label-sm uppercase tracking-[0.14em] font-semibold text-on-surface">
                    {t('buyer.footer.giTitle', 'Geographical Indication (GI)')}
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    {t('buyer.footer.giDesc', 'Certified Sovereign Origin Mark')}
                  </div>
                </div>
              </div>
              <div className="border border-outline-variant/60 bg-surface-container-lowest p-space-md flex items-center gap-space-sm shadow-xs">
                <Store className="w-6 h-6 text-secondary flex-shrink-0" />
                <div>
                  <div className="font-label-sm text-label-sm uppercase tracking-[0.14em] font-semibold text-on-surface">
                    {t('buyer.footer.gemTitle', 'Government e-Marketplace')}
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    {t('buyer.footer.gemDesc', 'Accredited GeM Guild Seller')}
                  </div>
                </div>
              </div>
              <div className="border border-outline-variant/60 bg-surface-container-lowest p-space-md flex items-center gap-space-sm shadow-xs">
                <Building2 className="w-6 h-6 text-secondary flex-shrink-0" />
                <div>
                  <div className="font-label-sm text-label-sm uppercase tracking-[0.14em] font-semibold text-on-surface">
                    {t('buyer.footer.ministryTitle', 'Ministry of Textiles')}
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    {t('buyer.footer.ministryDesc', 'Office of Dev. Commissioner (Handlooms)')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Guild Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-space-xl pb-space-2xl border-b border-outline-variant/30">
            <div>
              <h4 className="font-label-md text-label-md uppercase tracking-[0.16em] font-semibold text-on-surface mb-space-md">
                {t('buyer.footer.northernWeaves', 'Northern Weaves')}
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li><Link className="hover:text-secondary transition-colors" to="/explore/jammu-kashmir">{t('buyer.footer.kaniPashmina', 'Kani & Pashmina (Kashmir)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/uttar-pradesh">{t('buyer.footer.banarasiKatan', 'Banarasi Katan (Varanasi)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/uttar-pradesh">{t('buyer.footer.chikankari', 'Chikankari (Lucknow)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/himachal-pradesh">{t('buyer.footer.kulluShawls', 'Kullu Shawls (Himachal)')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-label-md text-label-md uppercase tracking-[0.16em] font-semibold text-on-surface mb-space-md">
                {t('buyer.footer.westernGuilds', 'Western Guilds')}
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li><Link className="hover:text-secondary transition-colors" to="/explore/gujarat">{t('buyer.footer.patanPatola', 'Patan Patola (Gujarat)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/gujarat">{t('buyer.footer.ajrakhPrint', 'Ajrakh Block Print (Kutch)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/maharashtra">{t('buyer.footer.paithaniSilks', 'Paithani Silks (Maharashtra)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/rajasthan">{t('buyer.footer.kotaDoria', 'Kota Doria (Rajasthan)')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-label-md text-label-md uppercase tracking-[0.16em] font-semibold text-on-surface mb-space-md">
                {t('buyer.footer.southernHeirlooms', 'Southern Heirlooms')}
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li><Link className="hover:text-secondary transition-colors" to="/explore/tamil-nadu">{t('buyer.footer.kanchipuramSilk', 'Kanchipuram Silk (Tamil Nadu)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/telangana">{t('buyer.footer.pochampallyIkat', 'Pochampally Ikat (Telangana)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/kerala">{t('buyer.footer.balaramapuram', 'Balaramapuram (Kerala)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/karnataka">{t('buyer.footer.mysoreCrepe', 'Mysore Crepe (Karnataka)')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-label-md text-label-md uppercase tracking-[0.16em] font-semibold text-on-surface mb-space-md">
                {t('buyer.footer.easternLooms', 'Eastern Looms')}
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li><Link className="hover:text-secondary transition-colors" to="/explore/west-bengal">{t('buyer.footer.jamdaniBaluchari', 'Jamdani & Baluchari (Bengal)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/assam">{t('buyer.footer.mugaEriSilk', 'Muga & Eri Silk (Assam)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/odisha">{t('buyer.footer.sambalpuriIkat', 'Sambalpuri Ikat (Odisha)')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/explore/bihar">{t('buyer.footer.bhagalpuriTussar', 'Bhagalpuri Tussar (Bihar)')}</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <h4 className="font-label-md text-label-md uppercase tracking-[0.16em] font-semibold text-on-surface mb-space-md">
                {t('buyer.footer.patronServices', 'Patron Services')}
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li><Link className="hover:text-secondary transition-colors" to="/buyer/certificates">{t('buyer.footer.provenanceVerification', 'Provenance Verification')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/about">{t('buyer.footer.fairTrade', 'Artisan Direct Fair Trade')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/contact">{t('buyer.footer.institutionalInquiries', 'Institutional Inquiries')}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" to="/buyer/wallet">{t('buyer.footer.restorationFund', 'Cluster Restoration Fund')}</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-sm text-label-sm tracking-[0.1em]">
            <div>
              © 2026 KARIGAR Artisanal Heritage Platform. {t('buyer.footer.allRightsReserved', 'All rights reserved under National Handloom Archives.')}
            </div>
            <div className="flex gap-space-lg">
              <Link className="hover:text-on-surface transition-colors" to="/buyer/certificates">{t('buyer.footer.compliance', 'GI Compliance')}</Link>
              <Link className="hover:text-on-surface transition-colors" to="/about">{t('buyer.footer.artisanRights', 'Artisan Rights')}</Link>
              <Link className="hover:text-on-surface transition-colors" to="/contact">{t('buyer.footer.privacy', 'Privacy Gazette')}</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const quickLinks = [
    { name: t('common.all') === 'All' ? 'Home' : t('nav.dashboard'), path: '/' },
    { name: t('nav.myProducts'), path: '/products' },
    { name: t('nav.customers'), path: '/customers' },
    { name: t('nav.aboutKarigar'), path: '/about' },
    { name: t('nav.verification'), path: '/verification' },
    { name: t('nav.getInTouch'), path: '/contact' },
  ];

  const artisanLinks = [
    { name: t('nav.addProduct'), path: '/add-product' },
    { name: t('nav.aboutKarigar'), path: '/about' },
    { name: t('nav.verification'), path: '/verification' },
    { name: t('nav.getInTouch'), path: '/contact' },
  ];

  const buyerLinks = [
    { name: t('about.title'), path: '/about' },
    { name: t('nav.orders'), path: '/orders' },
    { name: t('contact.title'), path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms & Conditions', path: '#' },
    { name: 'Cookie Policy', path: '#' },
  ];

  return (
    <footer
      className={`relative bg-[#063C32] text-[#F3F4F6] overflow-hidden ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 10% 20%, rgba(20, 83, 45, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(234, 88, 12, 0.15) 0%, transparent 40%)`
      }}
    >
      {/* Subtle traditional Indian geometric fretwork border overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #FFF 0, #FFF 1px, transparent 0, transparent 20px)`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-12">
          {/* Column 1: Brand, Tagline, Description, Socials */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
            <div>
              <Logo clickable linkTo="/" imgClassName="h-14 sm:h-16 w-auto" />
              <h3 className="text-amber-300/90 font-serif font-semibold text-sm mt-3 tracking-wide">
                {t('footer.tagline')}
              </h3>
              <p className="text-emerald-100/75 text-xs mt-2 leading-relaxed max-w-xs">
                {t('footer.description')}
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-1.5 inline-block">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-emerald-500 group-hover:text-amber-300 transition-colors">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Artisans */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-1.5 inline-block">
              {t('footer.artisanCorner')}
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              {artisanLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-emerald-500 group-hover:text-amber-300 transition-colors">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: For Buyers */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-1.5 inline-block">
              {t('footer.buyerGuide')}
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              {buyerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-emerald-500 group-hover:text-amber-300 transition-colors">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-1.5 inline-block">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-emerald-500 group-hover:text-amber-300 transition-colors">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200/70">
          <p>© 2026 Karigar. {t('footer.allRightsReserved')}</p>
          <p className="flex items-center gap-1.5 text-emerald-100/90 font-medium">
            <span>{t('footer.madeWithLove')}</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>🇮🇳</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

