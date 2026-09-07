const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const enPath = path.join(srcDir, 'i18n', 'en.json');
const hiPath = path.join(srcDir, 'i18n', 'hi.json');
const bnPath = path.join(srcDir, 'i18n', 'bn.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));
const bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

function setDeep(obj, pathStr, value) {
  const parts = pathStr.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!curr[part] || typeof curr[part] !== 'object') {
      curr[part] = {};
    }
    curr = curr[part];
  }
  curr[parts[parts.length - 1]] = value;
}

const additions = [
  // common
  { key: 'common.verified', en: 'Verified', hi: 'सत्यापित', bn: 'যাচাইকৃত' },
  { key: 'common.unverified', en: 'Unverified', hi: 'असत्यापित', bn: 'অযাচাইকৃত' },
  { key: 'common.optional', en: 'Optional', hi: 'वैकल्पिक', bn: 'ঐচ্ছিক' },

  // profile
  { key: 'profile.uploadFormatError', en: 'Please select a valid image file (JPEG, PNG, or WEBP).', hi: 'कृपया एक वैध छवि फ़ाइल चुनें (JPEG, PNG, या WEBP)।', bn: 'দয়া করে একটি বৈধ ছবি ফাইল নির্বাচন করুন (JPEG, PNG, বা WEBP)।' },
  { key: 'profile.uploadSizeError', en: 'Image size must be less than 5 MB.', hi: 'छवि का आकार 5 एमबी से कम होना चाहिए।', bn: 'ছবির আকার ৫ এমবি-র কম হতে হবে।' },
  { key: 'profile.uploadSuccess', en: 'Profile picture updated successfully.', hi: 'प्रोफ़ाइल फ़ोटो सफलतापूर्वक अपडेट की गई।', bn: 'প্রোফাইল ছবি সফলভাবে আপডেট করা হয়েছে।' },
  { key: 'profile.uploadError', en: 'Failed to upload profile picture.', hi: 'प्रोफ़ाइल फ़ोटो अपलोड करने में विफल।', bn: 'প্রোফাইল ছবি আপলোড করতে ব্যর্থ হয়েছে।' },
  { key: 'profile.nameRequired', en: 'Full Name is required.', hi: 'पूरा नाम आवश्यक है।', bn: 'সম্পূর্ণ নাম আবশ্যক।' },
  { key: 'profile.saveProfileSuccess', en: 'Profile updated successfully.', hi: 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई।', bn: 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে।' },
  { key: 'profile.saveProfileError', en: 'Failed to save profile changes.', hi: 'प्रोफ़ाइल परिवर्तन सहेजने में विफल।', bn: 'প্রোফাইল পরিবর্তন সংরক্ষণ করতে ব্যর্থ হয়েছে।' },
  { key: 'profile.notProvided', en: 'Not provided', hi: 'उपलब्ध नहीं', bn: 'প্রদান করা হয়নি' },
  { key: 'profile.pageTitle', en: 'My Profile', hi: 'मेरी प्रोफ़ाइल', bn: 'আমার প্রোফাইল' },
  { key: 'profile.pageSubtitle', en: 'Manage your verified artisan credentials, trade presence, and listings.', hi: 'अपनी सत्यापित कारीगर साख, व्यापार उपस्थिति और लिस्टिंग प्रबंधित करें।', bn: 'আপনার যাচাইকৃত কারিগর শংসাপত্র, বাণিজ্য উপস্থিতি এবং তালিকা পরিচালনা করুন।' },
  { key: 'profile.editProfile', en: 'Edit Profile', hi: 'प्रोफ़ाइल संपादित करें', bn: 'প্রোফাইল সম্পাদনা করুন' },
  { key: 'profile.changePhoto', en: 'Change Photo', hi: 'फ़ोटो बदलें', bn: 'ছবি পরিবর্তন করুন' },
  { key: 'profile.roleArtisan', en: 'Artisan / Weaver', hi: 'कारीगर / बुनकर', bn: 'কারিগর / তাঁতি' },
  { key: 'profile.rolePatron', en: 'Patron / Collector', hi: 'संरक्षक / संग्रहकर्ता', bn: 'পৃষ্ঠপোষক / সংগ্রাহক' },
  { key: 'profile.craftDetails', en: 'Craft & Experience', hi: 'शिल्प और अनुभव', bn: 'শিল্প ও অভিজ্ঞতা' },
  { key: 'profile.craftType', en: 'Craft Type', hi: 'शिल्प प्रकार', bn: 'শিল্পের ধরন' },
  { key: 'profile.yearsOfExperience', en: 'Years of Experience', hi: 'अनुभव के वर्ष', bn: 'অভিজ্ঞতার বছর' },
  { key: 'profile.years', en: 'years', hi: 'वर्ष', bn: 'বছর' },
  { key: 'profile.businessName', en: 'Business / Studio Name', hi: 'व्यापार / स्टूडियो का नाम', bn: 'ব্যবসা / স্টুডিওর নাম' },
  { key: 'profile.giAndCluster', en: 'GI Tag & Cluster', hi: 'जीआई टैग और क्लस्टर', bn: 'জিআই ট্যাগ এবং ক্লাস্টার' },
  { key: 'profile.giTagNumber', en: 'GI Tag Number', hi: 'जीआई टैग संख्या', bn: 'জিআই ট্যাগ নম্বর' },
  { key: 'profile.cluster', en: 'Cluster / Cooperative', hi: 'क्लस्टर / सहकारी', bn: 'ক্লাস্টার / সমবায়' },
  { key: 'profile.state', en: 'State', hi: 'राज्य', bn: 'রাজ্য' },
  { key: 'profile.district', en: 'District', hi: 'ज़िला', bn: 'জেলা' },
  { key: 'profile.accountStatusHeader', en: 'Account & Verification', hi: 'खाता और सत्यापन', bn: 'অ্যাকাউন্ট এবং যাচাইকরণ' },
  { key: 'profile.accountStatus', en: 'Account Status', hi: 'खाता स्थिति', bn: 'অ্যাকাউন্ট স্থিতি' },
  { key: 'profile.verificationStatus', en: 'Verification Status', hi: 'सत्यापन स्थिति', bn: 'যাচাইকরণ স্থিতি' },
  { key: 'profile.memberSince', en: 'Member Since', hi: 'सदस्यता तिथि', bn: 'সদস্যপদ গ্রহণের সময়' },
  { key: 'profile.editModalSub', en: 'Update your personal details and craft credentials.', hi: 'अपना व्यक्तिगत विवरण और शिल्प साख अपडेट करें।', bn: 'আপনার ব্যক্তিগত বিবরণ এবং কারিগর শংসাপত্র আপডেট করুন।' },
  { key: 'profile.editPatronSub', en: 'Update your personal details and shipping address preferences.', hi: 'अपना व्यक्तिगत विवरण और वितरण पता प्राथमिकताएं अपडेट करें।', bn: 'আপনার ব্যক্তিগত विवरण এবং ডেলিভারি ঠিকানার পছন্দসমূহ আপডেট করুন।' },
  { key: 'profile.fullName', en: 'Full Name', hi: 'पूरा नाम', bn: 'সম্পূর্ণ নাম' },
  { key: 'profile.mobile', en: 'Mobile Number', hi: 'मोबाइल नंबर', bn: 'মোবাইল নম্বর' },

  // buyer.user
  { key: 'buyer.user.verifiedPatron', en: 'Verified Patron', hi: 'सत्यापित संरक्षक', bn: 'যাচাইকৃত পৃষ্ঠপোষক' },
  { key: 'buyer.user.guest', en: 'Guest Patron', hi: 'अतिथि संरक्षक', bn: 'অতিথি পৃষ্ঠপোষক' },
  { key: 'buyer.user.myProfile', en: 'My Profile', hi: 'मेरी प्रोफ़ाइल', bn: 'আমার প্রোফাইল' },
  { key: 'buyer.user.myProfileSub', en: 'View and edit your personal profile', hi: 'अपनी व्यक्तिगत प्रोफ़ाइल देखें और संपादित करें', bn: 'আপনার ব্যক্তিগত প্রোফাইল দেখুন এবং সম্পাদনা করুন' },
  { key: 'buyer.user.profileSubtitle', en: 'Manage your patron account, personal details, and provenance records.', hi: 'अपना संरक्षक खाता, व्यक्तिगत विवरण और मूल प्रमाण रिकॉर्ड प्रबंधित करें।', bn: 'আপনার পৃষ্ঠপোষক অ্যাকাউন্ট, ব্যক্তিগত বিবরণ এবং ঐতিহ্য রেকর্ড পরিচালনা করুন।' },
  { key: 'buyer.user.trustPledge', en: 'Sovereign Patron Trust Pledge', hi: 'संप्रभु संरक्षक विश्वास प्रतिज्ञा', bn: 'সার্বভৌম পৃষ্ঠপোষক আস্থার অঙ্গীকার' },
  { key: 'buyer.user.trustPledgeDesc', en: '100% of your acquisition payments are secured in RBI escrow vaults until delivery inspection.', hi: 'डिलीवरी निरीक्षण तक आपके भुगतान का 100% आरबीआई एस्क्रो वॉल्ट में सुरक्षित रहता है।', bn: 'ডেলিভারি যাচাইকরণ না হওয়া পর্যন্ত আপনার অর্থপ্রদানের ১০০% আরবিআই এসক্রো ভল্টে সুরক্ষিত থাকে।' },

  // buyer.nav
  { key: 'buyer.nav.marketplace', en: 'Karigar Marketplace', hi: 'कारीगर बाज़ार', bn: 'কারিগর মার্কেটপ্লেস' },

  // buyer.home
  { key: 'buyer.home.statClustersNum', en: '128', hi: '१२८', bn: '১২৮' },
  { key: 'buyer.home.statEscrowNum', en: '100%', hi: '१००%', bn: '১০০%' },
  { key: 'buyer.home.statHonorariumNum', en: '₹4.8 Cr', hi: '₹४.८ करोड़', bn: '₹৪.৮ কোটি' },
  { key: 'buyer.home.fiveGenWeaver', en: '5th Gen Weaver', hi: '५वीं पीढ़ी के बुनकर', bn: '৫ম প্রজন্মের তাঁতি' },
  { key: 'buyer.home.masterArtisan', en: 'Master Artisan:', hi: 'मास्टर कारीगर:', bn: 'মাস্টার কারিগর:' },
  { key: 'buyer.home.artisanShare', en: 'Artisan Share:', hi: 'कारीगर का हिस्सा:', bn: 'কারিগর অংশীদারিত্ব:' },
  { key: 'buyer.home.directArtisanPayoutBadge', en: 'Direct Artisan Payout', hi: 'प्रत्यक्ष कारीगर भुगतान', bn: 'সরাসরি কারিগর পাওনা' },
  { key: 'buyer.home.artisanDirect', en: 'Artisan Direct', hi: 'सीधा कारीगर', bn: 'সরাসরি কারিগর' },
  { key: 'buyer.home.filmRuntime', en: 'Runtime: 06:45 • High-Definition Heritage Film', hi: 'अवधि: ०६:४५ • उच्च-परिभाषा हेरिटेज फिल्म', bn: 'দৈর্ঘ্য: ০৬:৪৫ • হাই-ডেফিনিশন ঐতিহ্যবাহী চলচ্চিত্র' },
  { key: 'buyer.home.storyVideoPreview', en: 'Story Video Preview', hi: 'कहानी वीडियो पूर्वावलोकन', bn: 'গল্প ভিডিও প্রাকদর্শন' },

  // buyer.product
  { key: 'buyer.product.uniqueMasterpiece', en: '1/1 Unique Masterpiece', hi: '१/१ अद्वितीय उत्कृष्ट कृति', bn: '১/১ অনন্য মাস্টারপিস' },
  { key: 'buyer.product.transparentLedger', en: '100% Transparent', hi: '१००% पारदर्शी', bn: '১০০% স্বচ্ছ' },
  { key: 'buyer.product.directToArtisan', en: 'Direct to', hi: 'सीधे कारीगर को', bn: 'সরাসরি কারিগরকে' },
  { key: 'buyer.product.tabCraftNarrative', en: '01. Craft Narrative & Story', hi: '०१. शिल्प कथा और इतिहास', bn: '০১. কারুশিল্পের কাহিনী ও বিবরণ' },
  { key: 'buyer.product.tabArtisanDossier', en: '02. Artisan Dossier & Documentary', hi: '०२. कारीगर विवरण और वृत्तचित्र', bn: '০২. কারিগর নথিপত্র ও তথ্যচিত্র' },
  { key: 'buyer.product.tabGiCertificate', en: '03. Sovereign GI Certificate & Ledger', hi: '०३. संप्रभु जीआई प्रमाणपत्र और लेज़र', bn: '০৩. সার্বভৌম জিআই প্রশংসাপত্র ও লেজার' },
  { key: 'buyer.product.tabPatronAppraisals', en: '04. Patron Appraisals', hi: '०४. संरक्षक समीक्षाएं', bn: '০৪. পৃষ্ঠপোষক মূল্যায়ন' },
  { key: 'buyer.product.escrowSafelyImpounded', en: 'Your payment of {amount} remains safely impounded in the GI Artisan Escrow. Funds are released directly to {artisan} only after you physically receive, inspect, and verify the craft and embedded cryptotag.', hi: 'आपकी {amount} की राशि जीआई कारीगर एस्क्रो में सुरक्षित रूप से जमा रहती है। शिल्प और एम्बेडेड क्रिप्टोटैग को भौतिक रूप से प्राप्त करने, निरीक्षण करने और सत्यापित करने के बाद ही धन सीधे {artisan} को जारी किया जाता है।', bn: 'আপনার {amount}-এর অর্থপ্রদান নিরাপদে জিআই কারিগর এসক্রোতে জমা থাকে। আপনি হস্তশিল্প এবং সংযুক্ত ক্রিপ্টোট্যাগ শারীরিকভাবে গ্রহণ, পরিদর্শন এবং যাচাই করার পরেই কেবল {artisan}-এর কাছে সরাসরি অর্থ হস্তান্তর করা হয়।' },

  // buyer.cart
  { key: 'buyer.cart.decreaseQty', en: 'Decrease quantity', hi: 'मात्रा घटाएं', bn: 'পরিমাণ কমান' },
  { key: 'buyer.cart.increaseQty', en: 'Increase quantity', hi: 'मात्रा बढ़ाएं', bn: 'পরিমাণ বাড়ান' },

  // buyer.checkout
  { key: 'buyer.checkout.qty', en: 'Qty', hi: 'मात्रा', bn: 'পরিমাণ' },

  // buyer.saved
  { key: 'buyer.saved.byArtisan', en: 'By', hi: 'द्वारा', bn: 'দ্বারা' },
  { key: 'buyer.saved.artisanShare', en: 'Artisan', hi: 'कारीगर', bn: 'কারিগর' },

  // buyer.stateExplore
  { key: 'buyer.stateExplore.artisanShare', en: 'Artisan Share:', hi: 'कारीगर का हिस्सा:', bn: 'কারিগর অংশীদারিত্ব:' },

  // buyer.wallet
  { key: 'buyer.wallet.escrowLocked', en: 'Escrow Locked', hi: 'एस्क्रो में सुरक्षित', bn: 'এসক্রোতে আবদ্ধ' },
  { key: 'buyer.wallet.escrowDisbursed', en: 'Escrow Disbursed to Artisan', hi: 'कारीगर को एस्क्रो संवितरित', bn: 'কারিগরকে এসক্রো বিতরণ করা হয়েছে' },
  { key: 'buyer.wallet.disbursedAmount', en: '₹ 4.8 Cr+', hi: '₹ ४.८ करोड़+', bn: '₹ ৪.৮ কোটি+' }
];

for (const item of additions) {
  setDeep(en, item.key, item.en);
  setDeep(hi, item.key, item.hi);
  setDeep(bn, item.key, item.bn);
}

fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2), 'utf8');
fs.writeFileSync(bnPath, JSON.stringify(bn, null, 2), 'utf8');

console.log(`Updated translations in EN, HI, and BN with ${additions.length} keys.`);
