const fs = require('fs');
const path = require('path');

const hdPath = 'e:/Sanmora_web/NB/N.B-corporation/client/public/product/HD Images';

function scanSubfolders(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      const filesInFolder = fs.readdirSync(full).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ext === '.jpeg' || ext === '.jpg' || ext === '.png' || ext === '.webp';
      });
      if (filesInFolder.length > 1) {
        console.log(`MULTI-PHOTO FOLDER (${filesInFolder.length} photos):`);
        console.log(`  Folder: ${full}`);
        filesInFolder.forEach(f => {
          const rel = path.relative('e:/Sanmora_web/NB/N.B-corporation/client/public', path.join(full, f)).replace(/\\/g, '/');
          console.log(`    - /${rel}`);
        });
      }
      scanSubfolders(full);
    }
  });
}

scanSubfolders(hdPath);
