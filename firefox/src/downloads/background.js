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
async function handleDownloads(request, sender, sendResponse) {
  if (request.action === "download") {
    for (const download of request.downloads) {
      console.log(request.path);
      try {
        const result = await browser.downloads.download({
          url: download.link,
          filename: `${request.path}/${download.name}`,
        });
        console.log("Descarga iniciada:", result);
        sendResponse({ success: true });
      } catch (error) {
        console.error("Error durante la descarga:", error);
        sendResponse({ success: false });
      }
    }
  }
}

browser.runtime.onMessage.addListener(handleDownloads);
