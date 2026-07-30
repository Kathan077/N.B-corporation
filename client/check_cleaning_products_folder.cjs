const fs = require('fs');
const path = require('path');

const dir = 'e:/Sanmora_web/NB/N.B-corporation/client/public/product/HD Images/CLEANING PRODUCTS';

function walk(d) {
  let results = [];
  const list = fs.readdirSync(d);
  list.forEach(file => {
    const fullPath = path.join(d, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      const rel = path.relative('e:/Sanmora_web/NB/N.B-corporation/client/public', fullPath).replace(/\\/g, '/');
      results.push('/' + rel);
    }
  });
  return results;
}

const all = walk(dir);
console.log('=== FILES IN CLEANING PRODUCTS ===');
all.forEach((f, i) => console.log(`${i+1}: ${f}`));
