const { downloadVideo } = require('../utils/downloader');

exports.download = async (req, res) => {
  const { url, format } = req.body;

  if (!url || !format) {
    return res.status(400).json({ error: 'Faltan parámetros.' });
  }

  try {
    const downloadUrl = await downloadVideo(url, format);
    res.json({ downloadUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error descargando el video.' });
  }
};
