const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.vue')) {
      files.push(name);
    }
  }
  return files;
}

const vueFiles = getFiles('app');
console.log('Total Vue files:', vueFiles.length);

const frenchWords = [
  'Accueil', 'Connexion', 'Inscription', 'Formations', 'Rechercher', 'Découvrez',
  'Tableau de bord', 'Étudiant', 'Instructeur', 'Soumettre', 'Valider', 'Enregistrer',
  'Annuler', 'Modifier', 'Supprimer', 'Travailleurs', 'Syndicat', 'Présentation',
  'Objectifs', 'Méthodologie', 'Tarification', 'À propos', 'Notice'
];

const findings = [];

for (const file of vueFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const templateMatch = content.match(/<template>([\s\S]*)<\/template>/);
  if (!templateMatch) continue;
  const template = templateMatch[1];
  
  // Remove $t call instances in template
  const cleanTemplate = template
    .replace(/\{\{\s*\$t\([^\)]+\)\s*\}\}/g, '')
    .replace(/:\w+="\$t\([^\)]+\)"/g, '')
    .replace(/v-html="\$t\([^\)]+\)"/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  for (const word of frenchWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    let match;
    while ((match = regex.exec(cleanTemplate)) !== null) {
      const lineNo = cleanTemplate.substring(0, match.index).split('\n').length;
      findings.push({ file: path.relative(process.cwd(), file), lineNo, word: match[0] });
    }
  }
}

console.log('Total potential hardcoded French findings in templates:', findings.length);
findings.forEach(f => console.log(`${f.file}:${f.lineNo} -> ${f.word}`));
