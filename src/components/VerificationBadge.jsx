import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function VerificationBadge({ text = "Verified Artisan", showText = true, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 text-emerald-600 font-medium ${className}`}>
      {showText && <span className="text-xs text-gray-500">{text}</span>}
      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100 flex-shrink-0" />
    </span>
  );
}
