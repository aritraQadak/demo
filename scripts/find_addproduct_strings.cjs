const fs = require('fs');
const content = fs.readFileSync('src/pages/seller/AddProduct.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  const matches = [...line.matchAll(/>([^<>{}`]+)</g)];
  matches.forEach(m => {
    const text = m[1].trim();
    if (text.length > 2 && !text.startsWith('&') && !/^[\d\s.,₹%#\-_/()|:;+*]+$/.test(text)) {
      console.log(`L${idx+1}: ${text}`);
    }
  });
});
