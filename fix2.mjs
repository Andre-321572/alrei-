import fs from 'fs';
const files = ['i18n/locales/en.json', 'i18n/locales/fr.json', 'i18n/locales/pt.json', 'app/locales/en.json', 'app/locales/fr.json', 'app/locales/pt.json'];
files.forEach(f => {
  let d = fs.readFileSync(f, 'utf8');
  // replace anything that looks like \blog\: \Blog\, with "blog": "Blog",
  d = d.replace(/.*blog.*:.*Blog.*/, '  "blog": "Blog",');
  fs.writeFileSync(f, d);
});
