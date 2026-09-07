const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) results.push(...walk(full));
    else if (file.endsWith('.jsx')) results.push(full);
  }
  return results;
}

const files = walk(path.join(__dirname, '..', 'src'));
console.log(`Deep auditing ${files.length} JSX files...`);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(path.join(__dirname, '..', 'src'), file);

  // 1. Literal attributes: placeholder="...", title="...", aria-label="...", alt="..."
  const attrRegex = /(placeholder|title|aria-label|alt)=(["'])(.*?)\2/g;
  let m;
  while ((m = attrRegex.exec(content)) !== null) {
    const [_, attr, q, val] = m;
    if (val && !val.startsWith('{') && !val.startsWith('http') && val.length > 2 && /[a-zA-Z]/.test(val)) {
      if (!['image', 'logo', 'button', 'text', 'submit', 'checkbox', 'radio'].includes(val.toLowerCase())) {
        console.log(`[ATTR] ${rel}: ${attr}="${val}"`);
      }
    }
  }

  // 2. Lines with raw English text mixed with JSX (e.g. Master Artisan:, Artisan Share:, etc.)
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Look for lines containing English words outside tags or comments
    const trimmed = line.trim();
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('import ') ||
      trimmed.startsWith('export ') ||
      trimmed.startsWith('const ') ||
      trimmed.startsWith('let ') ||
      trimmed.startsWith('var ') ||
      trimmed.startsWith('return (') ||
      trimmed.startsWith('<') && trimmed.endsWith('>') && !trimmed.includes('>') // pure tag
    ) {
      return;
    }

    // Check for hardcoded currency or labels
    if (
      /Master Artisan:/i.test(trimmed) ||
      /Artisan Share:/i.test(trimmed) ||
      /Artisan Direct/i.test(trimmed) ||
      /Direct Artisan Payout/i.test(trimmed) ||
      /Registered Master Craftsmen/i.test(trimmed) ||
      /5th Gen Weaver/i.test(trimmed) ||
      /Runtime:/i.test(trimmed) ||
      /Qty:/i.test(trimmed) ||
      /₹\s*\{/.test(trimmed) ||
      /₹\d+/.test(trimmed) ||
      /toLocaleString\('en-IN'\)/.test(trimmed) ||
      /toLocaleString\('en-US'\)/.test(trimmed)
    ) {
      console.log(`[LINE ${idx + 1}] ${rel}: ${trimmed.slice(0, 100)}`);
    }
  });
}
