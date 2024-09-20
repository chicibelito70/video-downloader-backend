const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const videoRoutes = require('./routes/videoRoutes');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta raíz ("/")
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de descarga de videos');
});

// Rutas
app.use('/api/videos', videoRoutes);

// Servir archivos descargados
app.use('/download', express.static(path.join(__dirname)));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
