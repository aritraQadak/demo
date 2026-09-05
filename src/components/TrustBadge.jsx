import React from 'react';
import { ShieldCheck, Award, CheckCircle2, Sparkles, Building2, Layers } from 'lucide-react';

const iconMap = {
  verified_artisan: CheckCircle2,
  gi_verified: Award,
  trusted_seller: ShieldCheck,
  verified_cluster: Building2,
  authentic_image: Sparkles,
  process_proof: Layers,
};

export default function TrustBadge({
  type = 'verified_artisan',
  label,
  sublabel,
  size = 'md',
  showDescription = false,
  className = ''
}) {
  const Icon = iconMap[type] || ShieldCheck;

  const colorStyles = {
    verified_artisan: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    gi_verified: 'bg-amber-50 text-amber-800 border-amber-200',
    trusted_seller: 'bg-blue-50 text-blue-800 border-blue-200',
    verified_cluster: 'bg-teal-50 text-teal-800 border-teal-200',
    authentic_image: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    process_proof: 'bg-purple-50 text-purple-800 border-purple-200',
  };

  const currentStyle = colorStyles[type] || colorStyles.verified_artisan;

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${currentStyle} ${className}`}>
        <Icon className="w-3 h-3 flex-shrink-0" />
        <span>{label || 'Verified'}</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${currentStyle} ${className}`}>
      <div className="p-1 rounded-md bg-white/70 shadow-xs">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-bold leading-tight">{label}</p>
        {sublabel && <p className="text-[10px] opacity-80 leading-none mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
}
