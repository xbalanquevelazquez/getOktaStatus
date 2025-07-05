const express = require('express');
const axios = require('axios');
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

    const bin_ID = '686879fe8a456b7966bb89fb';

    //https://api.jsonbin.io/v3/b/686879fe8a456b7966bb89fb/latest
    //requiere X-Master-Key or X-Access-Key in the header to read a private bin

    await axios.put('https://api.jsonbin.io/v3/b/'+bin_ID, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$3iRNcmntH4jH.OYcEARxhua.ErD0TuzsHy/ygVje1uNCvoyiPX/..'
      }
    });


    res.status(200).json(data);
  } catch (error) {
    console.error('Error during scraping process:', error);
    res.status(500).json({ error: 'Failed to scrape Okta status.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});