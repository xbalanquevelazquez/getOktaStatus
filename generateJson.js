const fs = require('fs');
const path = require('path');

async function main() {
  const data = {
    updatedAt: new Date().toISOString(),
    message: "Contenido generado automáticamente"
  };

  const outputPath = path.join(__dirname, 'public', 'data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log("Archivo JSON actualizado:", outputPath);
}

main().catch(console.error);