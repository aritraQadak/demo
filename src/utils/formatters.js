/**
 * Karigar Locale & Formatting Utilities
 * Standardized localization helpers for currency (INR), numerals, dates, relative time, and avatars.
 */

export const LOCALE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN'
};

/**
 * Returns the standardized BCP 47 locale tag for the given language code.
 */
export function getLocale(lang = 'en') {
  return LOCALE_MAP[lang] || 'en-IN';
}

/**
 * Formats an amount into localized Indian Rupee (INR) currency.
 * Automatically renders localized currency symbols, grouping, and numerals.
 *
 * @param {number|string} amount
 * @param {string} lang - 'en' | 'hi' | 'bn'
 * @param {Intl.NumberFormatOptions} options
 * @returns {string} e.g. "₹1,250" or "₹১,২৫০"
 */
export function formatCurrency(amount, lang = 'en', options = {}) {
  const num = Number(amount);
  if (isNaN(num)) return '₹0';
  const locale = getLocale(lang);
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      ...options
    }).format(num);
  } catch (err) {
    console.warn('formatCurrency error:', err);
    return `₹${num.toLocaleString('en-IN')}`;
  }
}

/**
 * Formats a plain number with localized digits and Indian numbering separators.
 *
 * @param {number|string} value
 * @param {string} lang - 'en' | 'hi' | 'bn'
 * @param {Intl.NumberFormatOptions} options
 * @returns {string}
 */
export function formatNumber(value, lang = 'en', options = {}) {
  const num = Number(value);
  if (isNaN(num)) return String(value);
  const locale = getLocale(lang);
  try {
    return new Intl.NumberFormat(locale, options).format(num);
  } catch (err) {
    return num.toLocaleString('en-IN');
  }
}

/**
 * Formats a date object or ISO date string into a localized date representation.
 *
 * @param {Date|string|number} date
 * @param {string} lang - 'en' | 'hi' | 'bn'
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export function formatDate(date, lang = 'en', options = {}) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return String(date);
  const locale = getLocale(lang);
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    }).format(d);
  } catch (err) {
    return d.toLocaleDateString();
  }
}

/**
 * Formats relative time (e.g. "2 days ago", "5 minutes ago", "just now").
 *
 * @param {number} value - Negative for past, positive for future
 * @param {Intl.RelativeTimeFormatUnit} unit - 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
 * @param {string} lang - 'en' | 'hi' | 'bn'
 * @returns {string}
 */
export function formatRelativeTime(value, unit, lang = 'en') {
  const locale = getLocale(lang);
  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    return rtf.format(value, unit);
  } catch (err) {
    return `${Math.abs(value)} ${unit}s ago`;
  }
}

/**
 * Generates clean 1 to 2 letter uppercase initials from a full name.
 * e.g. "Santosh Sharma" -> "SS", "Anita Sharma" -> "AS", "Ramesh" -> "R"
 *
 * @param {string} fullName
 * @returns {string}
 */
export function getInitials(fullName) {
  if (!fullName || typeof fullName !== 'string') return 'U';
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
