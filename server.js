const express = require('express');
// Importa la lógica de scraping que ya tienes.
// Asegúrate de que la ruta al archivo sea correcta.
const { scrapeOktaStatusLogic } = require('./scrapeOktaStatusLogic'); // <-- CAMBIA ESTO SI TU ARCHIVO SE LLAMA DIFERENTE

const app = express();
// Render te asignará un puerto, o usaremos el 3000 para pruebas locales.
const PORT = process.env.PORT || 3000;

// Endpoint principal de la API
app.get('/', async (req, res) => {
  console.log('Request received, starting scrape...');
  try {
    const data = await scrapeOktaStatusLogic();
    console.log('Scraping successful.');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error during scraping process:', error);
    res.status(500).json({ error: 'Failed to scrape Okta status.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});