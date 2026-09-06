const fs = require('fs');
const path = require('path');

const srcBuyer = path.join(__dirname, '..', 'src', 'pages', 'buyer');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  replacements.forEach(([target, replacement]) => {
    content = content.split(target).join(replacement);
  });
  fs.writeFileSync(filePath, content, 'utf8');
}

const homeReplacements = [
  ['Details', "{t('buyer.home.details', 'Details')}"],
  ['Ledger', "{t('buyer.home.ledger', 'Ledger')}"]
];

const productDetailReplacements = [
  ['Density', "{t('buyer.product.density', 'Density')}"],
  ['Master Artisan', "{t('buyer.product.masterArtisan', 'Master Artisan')}"],
  ['Dedicated to preserving and passing on centuries-old indigenous weaving and embroidery traditions to future generations. Every piece represents hundreds of hours of focused mastery.', "{t('buyer.product.artisanBio', 'Dedicated to preserving and passing on centuries-old indigenous weaving and embroidery traditions to future generations. Every piece represents hundreds of hours of focused mastery.')}"],
  ['Mini Documentary: Voices of the Loom', "{t('buyer.product.miniDocTitle', 'Mini Documentary: Voices of the Loom')}"],
  ['Material Purity', "{t('buyer.product.materialPurity', 'Material Purity')}"],
  ['Dr. Suniti Banerjee', "{t('buyer.product.inspectorName', 'Dr. Suniti Banerjee')}"],
  ['Sovereign Provenance Ledger', "{t('buyer.product.provenanceLedger', 'Sovereign Provenance Ledger')}"],
  ['HASH: 0x8F92A1...921C', "{t('buyer.product.ledgerHash', 'HASH: 0x8F92A1...921C')}"],
  ['ESCROW STATUS: IMPOUNDED UNTIL DELIVERY', "{t('buyer.product.escrowStatus', 'ESCROW STATUS: IMPOUNDED UNTIL DELIVERY')}"],
  ['VERIFICATION TIMESTAMP', "{t('buyer.product.verificationTimestamp', 'VERIFICATION TIMESTAMP')}"]
];

const stateExploreReplacements = [
  ['Reset', "{t('buyer.stateExplore.reset', 'Reset')}"],
  ['GI TAG', "{t('buyer.stateExplore.giTagLabel', 'GI TAG')}"],
  ["Every purchase deposits directly into the master artisan's regional bank account via the KARIGAR Sovereign Escrow Gateway.", "{t('buyer.stateExplore.escrowPromiseDesc', 'Every purchase deposits directly into the master artisan\\'s regional bank account via the KARIGAR Sovereign Escrow Gateway.')}"],
  ['Fair Wage Share: High to Low', "{t('buyer.stateExplore.sortWage', 'Fair Wage Share: High to Low')}"],
  ['Price: Low to High', "{t('buyer.stateExplore.sortPriceAsc', 'Price: Low to High')}"],
  ['Price: High to Low', "{t('buyer.stateExplore.sortPriceDesc', 'Price: High to Low')}"],
  ['Clear Filters', "{t('buyer.stateExplore.clearFilters', 'Clear Filters')}"],
  ['GI Certified', "{t('buyer.stateExplore.giCertified', 'GI Certified')}"],
  ['Master Craftsman', "{t('buyer.stateExplore.masterCraftsman', 'Master Craftsman')}"],
  ['Geographical Indication Cartography', "{t('buyer.stateExplore.cartographyLabel', 'Geographical Indication Cartography')}"]
];

replaceInFile(path.join(srcBuyer, 'Home.jsx'), homeReplacements);
replaceInFile(path.join(srcBuyer, 'ProductDetail.jsx'), productDetailReplacements);
replaceInFile(path.join(srcBuyer, 'StateExplore.jsx'), stateExploreReplacements);

console.log('Finished wrapping remaining buyer JSX strings!');
