import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileText,
  Video,
  UploadCloud,
  ExternalLink,
  Info,
  Clock,
  Check,
  AlertTriangle
} from 'lucide-react';
import { useSeller } from '../../context/SellerContext';
import TrustBadge from '../../components/TrustBadge';

export default function Verification() {
  const { t } = useTranslation();
  const { profile, addToast } = useSeller();
  const [activeTab, setActiveTab] = useState('overview');

  const verificationItems = [
    {
      id: 'identity',
      title: 'Artisan Pehchan Card & Aadhaar KYC',
      authority: 'Ministry of Textiles, Development Commissioner (Handicrafts)',
      status: 'Verified',
      score: '100%',
      regNo: 'PAH-WB-BK-2021-08492',
      date: 'Verified on 14 Jan 2024',
      description: 'Physical identity and traditional artisan genealogy verified against national handicrafts artisan registry.'
    },
    {
      id: 'gi',
      title: 'Geographical Indication (GI-452)',
      authority: 'Geographical Indications Registry, Government of India',
      status: 'Verified',
      score: '100%',
      regNo: 'GI-APPL-452 / Certificate #WB-8821',
      date: 'Valid through Dec 2030',
      description: 'Authorized user certificate for Bankura Panchmura Terracotta craft originating exclusively from alluvial clay beds in Bankura, WB.'
    },
    {
      id: 'cluster',
      title: 'Panchmura Terracotta Artisan Cooperative',
      authority: 'West Bengal State Handicrafts Development Corporation',
      status: 'Verified',
      score: '88%',
      regNo: 'COOP-WB-BK-114',
      date: 'Audit completed March 2026',
      description: 'Active membership verified in the local community cluster with peer endorsement from fellow master artisans.'
    },
    {
      id: 'process',
      title: 'Process Proof & Workshop Firing Audit',
      authority: 'Karigar Independent Craft Verification Team',
      status: 'Verified',
      score: '95%',
      regNo: 'AUD-VID-99201',
      date: 'Verified via Video Inspection',
      description: 'Raw alluvial clay preparation, traditional manual wheel throwing, and wood-fired kiln proof inspected and cataloged.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#1F2937] p-5 sm:p-6 rounded-2xl border border-gray-200/90 dark:border-gray-700/80 shadow-2xs transition-colors">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#F9FAFB] tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>{t('verification.pageTitle')}</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-[#CBD5E1] mt-1">
            {t('verification.pageSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('nav.verifiedBadge')}</span>
          </span>
        </div>
      </div>

      {/* Main Trust Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score & Breakdown (Col 1) */}
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-6 border border-gray-200/90 dark:border-gray-700/80 shadow-2xs space-y-5 transition-colors">
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              Composite Trust Score
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black text-gray-900 dark:text-[#F9FAFB]">4.8</span>
              <span className="text-sm font-semibold text-gray-400 dark:text-gray-500">/ 5.0</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
              Top 5% among 12,000+ Indian regional craftspeople
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700/80 text-xs">
            <div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-1">
                <span>Identity Verification</span>
                <strong className="text-emerald-700 dark:text-emerald-400">100%</strong>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-1">
                <span>GI Tag Authenticity</span>
                <strong className="text-emerald-700 dark:text-emerald-400">100%</strong>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-1">
                <span>Process &amp; Workshop Proof</span>
                <strong className="text-emerald-700 dark:text-emerald-400">95%</strong>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-1">
                <span>Buyer Satisfaction Rating</span>
                <strong className="text-emerald-700 dark:text-emerald-400">94%</strong>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-1">
                <span>Cluster Credibility</span>
                <strong className="text-emerald-700 dark:text-emerald-400">88%</strong>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-700/80 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
            <Info className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 inline mr-1 -mt-0.5" />
            Scores are recalculated continuously based on dispatch punctuality, buyer feedback, and periodic cluster re-certification.
          </div>
        </div>

        {/* Verification Credentials List (Col 2 & 3) */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-5 border border-gray-200/90 dark:border-gray-700/80 shadow-2xs transition-colors">
            <h3 className="text-sm font-bold text-gray-900 dark:text-[#F9FAFB] mb-3">
              Active Official Credentials
            </h3>

            <div className="space-y-3">
              {verificationItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#111827]/60 hover:bg-white dark:hover:bg-[#1E293B] hover:border-emerald-300 dark:hover:border-emerald-700 transition-all space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full self-start sm:self-auto">
                      {item.status} ({item.score})
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-200/60 dark:border-gray-700/60 text-[11px] text-gray-400 dark:text-gray-400">
                    <span>Issued by: <strong className="text-gray-600 dark:text-gray-300">{item.authority}</strong></span>
                    <span className="font-mono text-gray-500 dark:text-gray-400">{item.regNo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Preview on Marketplace */}
          <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-5 border border-gray-200/90 dark:border-gray-700/80 shadow-2xs transition-colors">
            <h3 className="text-sm font-bold text-gray-900 dark:text-[#F9FAFB] mb-2">
              Buyer-Facing Trust Badges
            </h3>
            <p className="text-xs text-gray-500 dark:text-[#CBD5E1] mb-3">
              These verified badges are automatically stamped onto your craft product pages and checkout receipts:
            </p>

            <div className="flex flex-wrap gap-2.5">
              <TrustBadge type="verified_artisan" label="Master Artisan Verified" size="md" />
              <TrustBadge type="gi_verified" label="GI-452 Certified Origin" size="md" />
              <TrustBadge type="authentic_image" label="Authentic Craft (No AI)" size="md" />
              <TrustBadge type="verified_cluster" label="Panchmura Cluster Co-op" size="md" />
              <TrustBadge type="process_proof" label="Video Firing Proof" size="md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
