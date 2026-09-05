const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const en = JSON.parse(fs.readFileSync(path.join(srcDir, 'i18n', 'en.json'), 'utf8'));
const hi = JSON.parse(fs.readFileSync(path.join(srcDir, 'i18n', 'hi.json'), 'utf8'));
const bn = JSON.parse(fs.readFileSync(path.join(srcDir, 'i18n', 'bn.json'), 'utf8'));

function getDeep(obj, pathStr) {
  const parts = pathStr.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[part];
  }
  return curr;
}

function getAllFiles(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (exts.includes(path.extname(fullPath))) {
      results.push(fullPath);
    }
  }
  return results;
}

const jsxFiles = getAllFiles(srcDir, ['.jsx']);
let missingInEn = 0;
let missingInHi = 0;
let missingInBn = 0;
let totalChecked = 0;

const tRegex = /\bt\(\s*['"]([a-zA-Z0-9_.]+)['"]/g;

for (const file of jsxFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = tRegex.exec(content)) !== null) {
    const key = match[1];
    totalChecked++;
    const enVal = getDeep(en, key);
    const hiVal = getDeep(hi, key);
    const bnVal = getDeep(bn, key);

    if (enVal === undefined) {
      console.error(`[MISSING EN] Key "${key}" in ${path.relative(srcDir, file)}`);
      missingInEn++;
    }
    if (hiVal === undefined) {
      console.error(`[MISSING HI] Key "${key}" in ${path.relative(srcDir, file)}`);
      missingInHi++;
    }
    if (bnVal === undefined) {
      console.error(`[MISSING BN] Key "${key}" in ${path.relative(srcDir, file)}`);
      missingInBn++;
    }
  }
}

console.log(`\n--- TRANSLATION VERIFICATION REPORT ---`);
console.log(`Total t() calls scanned: ${totalChecked}`);
console.log(`Missing in EN: ${missingInEn}`);
console.log(`Missing in HI: ${missingInHi}`);
console.log(`Missing in BN: ${missingInBn}`);

if (missingInEn === 0 && missingInHi === 0 && missingInBn === 0) {
  console.log(`\n>>> 100% PERFECT LOCALIZATION COVERAGE ACHIEVED! ALL KEYS PRESENT IN EN, HI, AND BN! <<<`);
} else {
  process.exit(1);
}
