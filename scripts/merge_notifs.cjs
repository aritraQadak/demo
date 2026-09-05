const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '..', 'src', 'i18n', 'en.json');
const hiPath = path.join(__dirname, '..', 'src', 'i18n', 'hi.json');
const bnPath = path.join(__dirname, '..', 'src', 'i18n', 'bn.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));
const bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

const notifAdditions = {
  en: {
    notifications: {
      title: "Notifications & Alerts",
      allSystemsActive: "All Systems Active",
      paymentReleased: "Payment Released from Escrow",
      customerInquiry: "New Customer Inquiry",
      giRenewal: "GI Registry Renewal Approved"
    }
  },
  hi: {
    notifications: {
      title: "सूचनाएं एवं अलर्ट",
      allSystemsActive: "सभी प्रणालियां सक्रिय",
      paymentReleased: "एस्क्रो से भुगतान जारी",
      customerInquiry: "नई ग्राहक पूछताछ",
      giRenewal: "जीआई रजिस्ट्री नवीनीकरण स्वीकृत"
    }
  },
  bn: {
    notifications: {
      title: "বিজ্ঞপ্তি ও সতর্কতা",
      allSystemsActive: "সমস্ত সিস্টেম সক্রিয়",
      paymentReleased: "এসক্রো থেকে অর্থ প্রদান প্রকাশ",
      customerInquiry: "নতুন গ্রাহকের অনুসন্ধান",
      giRenewal: "জিআই রেজিস্ট্রি পুনর্নবীকরণ অনুমোদিত"
    }
  }
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

deepMerge(en, notifAdditions.en);
deepMerge(hi, notifAdditions.hi);
deepMerge(bn, notifAdditions.bn);

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2) + '\n', 'utf8');
fs.writeFileSync(bnPath, JSON.stringify(bn, null, 2) + '\n', 'utf8');

console.log('Notifications localized successfully!');
