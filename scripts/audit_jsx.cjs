const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '..', 'src'));
console.log(`Auditing ${files.length} JSX files...`);

// Patterns that look like English text between tags: >Some English Text<
const textPattern = />\s*([A-Za-z][A-Za-z0-9 ,.!?:'\"()/-]{2,})\s*</g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  const relPath = path.relative(path.join(__dirname, '..'), file);
  const found = [];
  while ((match = textPattern.exec(content)) !== null) {
    const text = match[1].trim();
    // Exclude common code or numbers or simple symbols
    if (
      !text.includes('{') &&
      !text.includes('}') &&
      !text.startsWith('//') &&
      !text.startsWith('/*') &&
      !text.startsWith('http') &&
      !/^\d+[\d.,:%]*$/.test(text) &&
      !['EN', 'hi', 'bn', 'SBI', 'INR', 'GI', 'ID', 'PAH', 'WB', 'COOP', 'AUD', 'USD', 'EUR'].includes(text)
    ) {
      found.push(text);
    }
  }
  if (found.length > 0) {
    console.log(`\nFile: ${relPath} (${found.length} suspect strings):`);
    found.slice(0, 10).forEach(s => console.log(`  - "${s}"`));
    if (found.length > 10) console.log(`  ... and ${found.length - 10} more`);
  }
}
