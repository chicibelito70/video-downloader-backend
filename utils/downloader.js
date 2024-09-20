const { exec } = require('child_process');
const path = require('path');

exports.downloadVideo = (url, format) => {
  return new Promise((resolve, reject) => {
    const tempOutputPath = path.join(__dirname, 'video_temp.mp4'); // Descarga temporal en MP4
    const finalOutputPath = path.join(__dirname, `video.${format}`); // Archivo final convertido

    // Comando para descargar el video usando yt-dlp
    const downloadCommand = `yt-dlp -f best -o "${tempOutputPath}" ${url}`;
    
    exec(downloadCommand, (error, stderr) => {
      if (error) {
        console.error(`Error descargando el video: ${stderr}`);
        return reject(`Error descargando el video: ${stderr}`);
      }

      // Comando de conversión dependiendo del formato solicitado
      let convertCommand;
      
      switch (format) {
        case 'avi':
          convertCommand = `ffmpeg -i "${tempOutputPath}" -c:v libxvid -qscale:v 3 -c:a libmp3lame "${finalOutputPath}"`;
          break;
        case 'mkv':
          convertCommand = `ffmpeg -i "${tempOutputPath}" -c:v libx264 -c:a aac "${finalOutputPath}"`;
          break;
        case 'mp4':
          convertCommand = `ffmpeg -i "${tempOutputPath}" -c:v libx264 -c:a aac "${finalOutputPath}"`;
          break;
        default:
          return reject(`Formato no soportado: ${format}`);
      }

      // Ejecutar la conversión
      exec(convertCommand, (convertError, convertStderr) => {
        if (convertError) {
          console.error(`Error convirtiendo el video: ${convertStderr}`);
          return reject(`Error convirtiendo el video: ${convertStderr}`);
        }

        // Devolver la URL del archivo convertido
        const downloadUrl = `http://localhost:5000/download/video.${format}`;
        resolve(downloadUrl);
      });
    });
  });
};
