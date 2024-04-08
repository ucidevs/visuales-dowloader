/**
 * @typedef {Object} DownloadRequest
 * @property {DownloadItem[]} downloads - Los archivos a descargar.
 * @property {string} path - La ruta donde se guardarán los archivos descargados.
 */

/**
 * Maneja las descargas enviadas por mensajes
 * @param {DownloadRequest} request - El mensaje recibido.
 * @param {any} sender - El objeto que envió el mensaje.
 * @param {function} sendResponse - La función para responder al mensaje.
 */
function handleDownloads(request, sender, sendResponse) {
  request.downloads.forEach((download) => {
    chrome.downloads.download(
      {
        url: download.link,
        filename: `${request.path}/${download.name}`,
      },
      (downloadId) => console.log("Descarga iniciada:", downloadId)
    );
  });
}

chrome.runtime.onMessage.addListener(handleDownloads);
