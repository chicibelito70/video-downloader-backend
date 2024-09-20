const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Ruta para manejar la descarga de videos
router.post('/download', videoController.download);

module.exports = router;
