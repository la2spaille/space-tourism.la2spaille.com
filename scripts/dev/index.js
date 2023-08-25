const fs = require('fs');
const filePath = 'src/public/index.php';
const constantName = 'IS_PROD';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const regex = new RegExp(`(\\$${constantName}\\s*=\\s*)(false|true);`);
  const updatedContent = data.replace(regex, `$1${false};`);

  fs.writeFile(filePath, updatedContent, 'utf8', err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`La constante ${constantName} a été mise à jour dans le fichier ${filePath}.`);
  });
});

