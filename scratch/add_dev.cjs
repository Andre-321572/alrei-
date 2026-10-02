const fs = require('fs');

['app/locales', 'i18n/locales'].forEach(dir => {
  const fr = JSON.parse(fs.readFileSync(dir + '/fr.json', 'utf8'));
  const en = JSON.parse(fs.readFileSync(dir + '/en.json', 'utf8'));
  const pt = JSON.parse(fs.readFileSync(dir + '/pt.json', 'utf8'));

  fr.developed_by = 'Développé par';
  en.developed_by = 'Developed by';
  pt.developed_by = 'Desenvolvido por';

  fs.writeFileSync(dir + '/fr.json', JSON.stringify(fr, null, 2), 'utf8');
  fs.writeFileSync(dir + '/en.json', JSON.stringify(en, null, 2), 'utf8');
  fs.writeFileSync(dir + '/pt.json', JSON.stringify(pt, null, 2), 'utf8');
});
console.log('Added developed_by key to all locale files.');
