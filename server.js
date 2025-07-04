const express = require('express');
const fs = require('fs');
const path = require('path');
const scrapeOktaStatusLogic = require('./scrapeOktaStatusLogic');


// Importa la lógica de scraping que ya tienes.
// Asegúrate de que la ruta al archivo sea correcta.

const app = express();
// Render te asignará un puerto, o usaremos el 3000 para pruebas locales.
const PORT = process.env.PORT || 3000;

const OUTPUT_PATH = path.join(__dirname, 'public', 'oktaStatus.json');

// Crear carpeta 'public' si no existe
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'));
}

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Endpoint opcional para ver el archivo generado
app.get('/okta-status', (req, res) => {
  res.sendFile(OUTPUT_PATH);
});


// Función que actualiza el archivo JSON
async function updateStatusJson() {
  try {
    const data = await scrapeOktaStatusLogic();
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
    console.log(`[${new Date().toISOString()}] Archivo actualizado correctamente.`);
  } catch (error) {
    console.error('Error durante el scraping:', error);
  }
}

// Ejecutar al inicio y luego cada 10 minutos
updateStatusJson();
setInterval(updateStatusJson, 10 * 60 * 1000); // 10 minutos

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});