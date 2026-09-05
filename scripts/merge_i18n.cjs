const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '..', 'src', 'i18n', 'en.json');
const hiPath = path.join(__dirname, '..', 'src', 'i18n', 'hi.json');
const bnPath = path.join(__dirname, '..', 'src', 'i18n', 'bn.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));
const bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

const additions = {
  en: {
    dashboard: {
      escrowPaymentDesc: "₹1,200 for Terracotta Pot (#KGR1234) released to your SBI Account.",
      customerInquiryDesc: "Priya Sharma asked: \"Is this terracotta pot 100% handmade?\"",
      giRenewalDesc: "Bankura Panchmura Pottery GI-452 authorization re-verified.",
      timeAgo10m: "10m ago",
      timeAgo1h: "1h ago",
      timeAgo1d: "1d ago",
      bankuraCluster: "Bankura Artisan Cluster"
    },
    verification: {
      compositeScore: "Composite Trust Score",
      topPercentile: "Top 5% among 12,000+ Indian regional craftspeople",
      identityKyc: "Identity Verification",
      giTagAuth: "GI Tag Authenticity",
      processWorkshop: "Process & Workshop Proof",
      buyerSatisfaction: "Buyer Satisfaction Rating",
      clusterCredibility: "Cluster Credibility",
      scoreDisclaimer: "Scores are recalculated continuously based on dispatch punctuality, buyer feedback, and periodic cluster re-certification.",
      activeCredentials: "Active Official Credentials",
      issuedBy: "Issued by:",
      buyerBadges: "Buyer-Facing Trust Badges",
      buyerBadgesDesc: "These verified badges are automatically stamped onto your craft product pages and checkout receipts:",
      badgeMasterArtisan: "Master Artisan Verified",
      badgeGiCertified: "GI-452 Certified Origin",
      badgeAuthenticCraft: "Authentic Craft (No AI)",
      badgeClusterCoop: "Panchmura Cluster Co-op",
      badgeVideoFiring: "Video Firing Proof",
      statusVerified: "Verified",
      item1Title: "Artisan Pehchan Card & Aadhaar KYC",
      item1Authority: "Ministry of Textiles, Development Commissioner (Handicrafts)",
      item1Desc: "Physical identity and traditional artisan genealogy verified against national handicrafts artisan registry.",
      item2Title: "Geographical Indication (GI-452)",
      item2Authority: "Geographical Indications Registry, Government of India",
      item2Desc: "Authorized user certificate for Bankura Panchmura Terracotta craft originating exclusively from alluvial clay beds in Bankura, WB.",
      item3Title: "Panchmura Terracotta Artisan Cooperative",
      item3Authority: "West Bengal State Handicrafts Development Corporation",
      item3Desc: "Active membership verified in the local community cluster with peer endorsement from fellow master artisans.",
      item4Title: "Process Proof & Workshop Firing Audit",
      item4Authority: "Karigar Independent Craft Verification Team",
      item4Desc: "Raw alluvial clay preparation, traditional manual wheel throwing, and wood-fired kiln proof inspected and cataloged."
    },
    addProduct: {
      voiceTitle: "Describe Product With Voice",
      voiceBadge: "Regional Speech AI",
      voiceSubtitle: "Speak naturally in your local language — Karigar creates titles, descriptions & prices.",
      spokenLanguage: "Spoken Language:",
      listening: "Listening...",
      startSpeaking: "Start Speaking Now",
      recording: "Recording",
      voiceHint: "“Speak naturally about your product, materials used, size and village...”",
      recognizedSpeech: "Recognized Speech",
      audioCaptured: "Audio Captured",
      useInForm: "Use in Form Fields",
      autoFillWithAi: "Auto-Fill with AI"
    },
    contact: {
      addressValue: "Haldia Institute of Technology, Haldia, West Bengal, India"
    }
  },
  hi: {
    dashboard: {
      escrowPaymentDesc: "टेराकोटा पॉट (#KGR1234) के ₹1,200 आपके एसबीआई खाते में जारी किए गए।",
      customerInquiryDesc: "प्रिया शर्मा ने पूछा: \"क्या यह टेराकोटा पॉट 100% हस्तनिर्मित है?\"",
      giRenewalDesc: "बांकुरा पंचमुरा मिट्टी के बर्तन जीआई-452 प्राधिकरण पुनः सत्यापित।",
      timeAgo10m: "10 मिनट पहले",
      timeAgo1h: "1 घंटा पहले",
      timeAgo1d: "1 दिन पहले",
      bankuraCluster: "बांकुरा कारीगर क्लस्टर"
    },
    verification: {
      compositeScore: "समग्र विश्वास स्कोर",
      topPercentile: "12,000+ भारतीय क्षेत्रीय शिल्पकारों में शीर्ष 5%",
      identityKyc: "पहचान सत्यापन",
      giTagAuth: "जीआई टैग प्रामाणिकता",
      processWorkshop: "प्रक्रिया एवं कार्यशाला प्रमाण",
      buyerSatisfaction: "क्रेता संतुष्टि रेटिंग",
      clusterCredibility: "क्लस्टर विश्वसनीयता",
      scoreDisclaimer: "प्रेषण समयबद्धता, क्रेता प्रतिक्रिया और आवधिक क्लस्टर पुन: प्रमाणन के आधार पर स्कोर की लगातार पुनर्गणना की जाती है।",
      activeCredentials: "सक्रिय आधिकारिक प्रमाणपत्र",
      issuedBy: "द्वारा जारी:",
      buyerBadges: "क्रेता-उन्मुख विश्वास बैज",
      buyerBadgesDesc: "ये सत्यापित बैज स्वचालित रूप से आपके शिल्प उत्पाद पृष्ठों और चेकआउट रसीदों पर लगाए जाते हैं:",
      badgeMasterArtisan: "मास्टर कारीगर सत्यापित",
      badgeGiCertified: "जीआई-452 प्रमाणित मूल",
      badgeAuthenticCraft: "प्रामाणिक शिल्प (कोई एआई नहीं)",
      badgeClusterCoop: "पंचमुरा क्लस्टर सहकारी",
      badgeVideoFiring: "वीडियो फायरिंग प्रमाण",
      statusVerified: "सत्यापित",
      item1Title: "कारीगर पहचान पत्र एवं आधार केवाईसी",
      item1Authority: "वस्त्र मंत्रालय, विकास आयुक्त (हस्तशिल्प)",
      item1Desc: "राष्ट्रीय हस्तशिल्प कारीगर रजिस्ट्री के तहत भौतिक पहचान और पारंपरिक कारीगर वंशावली सत्यापित।",
      item2Title: "भौगोलिक उपदर्शन (जीआई-452)",
      item2Authority: "भौगोलिक उपदर्शन रजिस्ट्री, भारत सरकार",
      item2Desc: "बांकुरा, पश्चिम बंगाल में विशेष जलोढ़ मिट्टी से निर्मित बांकुरा पंचमुरा टेराकोटा शिल्प के लिए अधिकृत उपयोगकर्ता प्रमाणपत्र।",
      item3Title: "पंचमुरा टेराकोटा कारीगर सहकारी समिति",
      item3Authority: "पश्चिम बंगाल राज्य हस्तशिल्प विकास निगम",
      item3Desc: "साथी मास्टर कारीगरों के समर्थन के साथ स्थानीय सामुदायिक क्लस्टर में सक्रिय सदस्यता सत्यापित।",
      item4Title: "प्रक्रिया प्रमाण एवं कार्यशाला फायरिंग ऑडिट",
      item4Authority: "कारीगर स्वतंत्र शिल्प सत्यापन दल",
      item4Desc: "कच्ची जलोढ़ मिट्टी की तैयारी, पारंपरिक चाक निर्माण और लकड़ी से चलने वाली भट्टी का प्रमाण निरीक्षण और सूचीबद्ध।"
    },
    addProduct: {
      voiceTitle: "आवाज़ से उत्पाद का वर्णन करें",
      voiceBadge: "क्षेत्रीय वाणी एआई",
      voiceSubtitle: "अपनी स्थानीय भाषा में स्वाभाविक रूप से बोलें — कारीगर शीर्षक, विवरण और मूल्य बनाता है।",
      spokenLanguage: "बोली जाने वाली भाषा:",
      listening: "सुन रहा है...",
      startSpeaking: "अब बोलना शुरू करें",
      recording: "रिकॉर्डिंग",
      voiceHint: "“अपने उत्पाद, उपयोग की गई सामग्री, आकार और गाँव के बारे में स्वाभाविक रूप से बोलें...”",
      recognizedSpeech: "पहचानी गई वाणी",
      audioCaptured: "ऑडियो रिकॉर्ड हुआ",
      useInForm: "फ़ॉर्म फ़ील्ड में उपयोग करें",
      autoFillWithAi: "एआई के साथ स्वतः भरें"
    },
    contact: {
      addressValue: "हल्दिया इंस्टीट्यूट ऑफ टेक्नोलॉजी, हल्दिया, पश्चिम बंगाल, भारत"
    }
  },
  bn: {
    dashboard: {
      escrowPaymentDesc: "টেরাকোটা পট (#KGR1234)-এর জন্য ₹১,২০০ আপনার এসবিআই অ্যাকাউন্টে স্থানান্তরিত হয়েছে।",
      customerInquiryDesc: "প্রিয়া শর্মা জিজ্ঞাসা করেছেন: \"এই টেরাকোটা পট কি ১০০% হস্তনির্মিত?\"",
      giRenewalDesc: "বাঁকুড়া পাঁচমুড়া মৃৎশিল্প জিআই-৪৫২ অনুমোদন পুনঃযাচাই করা হয়েছে।",
      timeAgo10m: "১০ মিনিট আগে",
      timeAgo1h: "১ ঘণ্টা আগে",
      timeAgo1d: "১ দিন আগে",
      bankuraCluster: "বাঁকুড়া কারিগর ক্লাস্টার"
    },
    verification: {
      compositeScore: "সামগ্রিক ট্রাস্ট স্কোর",
      topPercentile: "১২,০০০+ ভারতীয় আঞ্চলিক কারিগরদের মধ্যে শীর্ষ ৫%",
      identityKyc: "পরিচয় যাচাইকরণ",
      giTagAuth: "জিআই ট্যাগ প্রামাণিকতা",
      processWorkshop: "প্রক্রিয়া ও কর্মশালার প্রমাণ",
      buyerSatisfaction: "ক্রেতা সন্তুষ্টি রেটিং",
      clusterCredibility: "ক্লাস্টার নির্ভরযোগ্যতা",
      scoreDisclaimer: "প্রেরণের সময়ানুবর্তিতা, ক্রেতার প্রতিক্রিয়া এবং পর্যায়ক্রমিক ক্লাস্টার পুনঃ-শংসাপত্রের ভিত্তিতে স্কোর ক্রমাগত পুনর্গণনা করা হয়।",
      activeCredentials: "সক্রিয় অফিসিয়াল শংসাপত্র",
      issuedBy: "প্রদানকারী:",
      buyerBadges: "ক্রেতামুখী ট্রাস্ট ব্যাজ",
      buyerBadgesDesc: "এই যাচাইকৃত ব্যাজগুলি স্বয়ংক্রিয়ভাবে আপনার কারুশিল্প পণ্যের পৃষ্ঠা এবং চেকআউট রসিদে স্ট্যাম্প করা হয়:",
      badgeMasterArtisan: "মাস্টার কারিগর যাচাইকৃত",
      badgeGiCertified: "জিআই-৪৫২ প্রত্যয়িত উৎস",
      badgeAuthenticCraft: "প্রকৃত কারুশিল্প (কোনো এআই নেই)",
      badgeClusterCoop: "পাঁচমুড়া ক্লাস্টার সমবায়",
      badgeVideoFiring: "ভিডিও ফায়ারিং প্রমাণ",
      statusVerified: "যাচাইকৃত",
      item1Title: "কারিগর পরিচয়পত্র ও আধার কেওয়াইসি",
      item1Authority: "বস্ত্র মন্ত্রক, উন্নয়ন কমিশনার (হস্তশিল্প)",
      item1Desc: "জাতীয় হস্তশিল্প কারিগর রেজিস্ট্রির অধীনে শারীরিক পরিচয় এবং ঐতিহ্যবাহী কারিগর বংশতালিকা যাচাই করা হয়েছে।",
      item2Title: "ভৌগোলিক নির্দেশক (জিআই-৪৫২)",
      item2Authority: "ভৌগোলিক নির্দেশক রেজিস্ট্রি, ভারত সরকার",
      item2Desc: "বাঁকুড়া, পশ্চিমবঙ্গের বিশেষ পলিমাটি থেকে উদ্ভূত বাঁকুড়া পাঁচমুড়া টেরাকোটা শিল্পের জন্য অনুমোদিত ব্যবহারকারী শংসাপত্র।",
      item3Title: "পাঁচমুড়া টেরাকোটা কারিগর সমবায় সমিতি",
      item3Authority: "পশ্চিমবঙ্গ রাজ্য হস্তশিল্প উন্নয়ন নিগম",
      item3Desc: "সহকর্মী মাস্টার কারিগরদের অনুমোদন সহ স্থানীয় কমিউনিটি ক্লাস্টারে সক্রিয় সদস্যপদ যাচাই করা হয়েছে।",
      item4Title: "প্রক্রিয়া প্রমাণ ও কর্মশালা ফায়ারিং অডিট",
      item4Authority: "কারিগর স্বাধীন কারুশিল্প যাচাইকরণ দল",
      item4Desc: "কাঁচা পলিমাটি প্রস্তুতি, ঐতিহ্যবাহী হস্তচালিত চাকার কাজ এবং কাঠের ভাটিতে পোড়ানোর প্রমাণ পরিদর্শন ও তালিকাভুক্ত করা হয়েছে।"
    },
    addProduct: {
      voiceTitle: "কণ্ঠস্বর দিয়ে পণ্যের বিবরণ দিন",
      voiceBadge: "আঞ্চলিক ভয়েস এআই",
      voiceSubtitle: "আপনার স্থানীয় ভাষায় স্বাভাবিকভাবে কথা বলুন — কারিগর শিরোনাম, বিবরণ এবং মূল্য তৈরি করবে।",
      spokenLanguage: "কথ্য ভাষা:",
      listening: "শুনছে...",
      startSpeaking: "এখন বলা শুরু করুন",
      recording: "রেকর্ডিং",
      voiceHint: "“আপনার পণ্য, ব্যবহৃত উপকরণ, আকার এবং গ্রাম সম্পর্কে স্বাভাবিকভাবে কথা বলুন...”",
      recognizedSpeech: "শনাক্তকৃত বক্তব্য",
      audioCaptured: "অডিও রেকর্ড করা হয়েছে",
      useInForm: "ফর্ম ফিল্ডে ব্যবহার করুন",
      autoFillWithAi: "এআই দিয়ে স্বয়ংক্রিয় পূরণ করুন"
    },
    contact: {
      addressValue: "হলদিয়া ইনস্টিটিউট অফ টেকনোলজি, হলদিয়া, পশ্চিমবঙ্গ, ভারত"
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

deepMerge(en, additions.en);
deepMerge(hi, additions.hi);
deepMerge(bn, additions.bn);

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2) + '\n', 'utf8');
fs.writeFileSync(bnPath, JSON.stringify(bn, null, 2) + '\n', 'utf8');

console.log('Successfully updated en.json, hi.json, and bn.json!');
