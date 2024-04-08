/** Diccionario que contiene un items que se va a descargar
 * @typedef {Object} DownloadItem
 * @property {string} name - Nombre del archivo de video
 * @property {boolean} isSelected - Está o no seleccionado
 * @property {string} link - URL del item
 */

// Define Styles
const styles = document.createElement("style");
styles.textContent = globalStyles;
document.head.appendChild(styles);

/* --------------------- Insert UI Elements in DOM --------------------- */

// Download Button
const downloadButton = document.createElement("button");
downloadButton.classList.add("download-button");
downloadButton.textContent = "📥";
downloadButton.style.display = "none";
document.body.appendChild(downloadButton);
downloadButton.addEventListener("click", startDownloads);

// Select All Button
const selectAllButton = document.createElement("button");
selectAllButton.textContent = "✅ Seleccionar todos";

// Download View
const itemsView = document.createElement("div");
itemsView.classList.add("items-view");

/* --------------------- Get Data from page --------------------- */

// Get Elements from Page
const pageTitle = document.querySelector("h1");
const allLinkElements = document.querySelectorAll("a");

// Filter All Links
const allVideoLinksToDownload = [...allLinkElements].filter((a) =>
  detectVideoFilesRegex.test(a.href)
);
const allSubsToDownload = [...allLinkElements].filter((a) => detectSubtitlesRegex.test(a.href));
const allThumbnails = [...allLinkElements].filter((a) => detectPhotoFilesRegex.test(a.href));

// Get URLs from filtered video Link Elements
const urlsToDownload = allVideoLinksToDownload.map((link) => link.href);

/** List of Subs items to download
 * @type {DownloadItem[]}
 */
const subsItemsForDownload = allSubsToDownload.map((link) => {
  return { name: link.textContent, isSelected: true, link: link.href };
});

/** List of Video items to download
 * @type {DownloadItem[]}
 */
const itemsToDownload = allVideoLinksToDownload.map((link) => {
  return { name: link.textContent, isSelected: false, link: link.href };
});

/* --------------------- UI Logic --------------------- */

// Render Thumbnails
function renderAllThumbnails() {
  allThumbnails.forEach((thumbnail) => {
    const imageURL = thumbnail.href;
    const image = document.createElement("img");
    image.src = imageURL;
    image.style.borderRadius = "20px";
    image.style.width = "300px";
    thumbnail.parentNode.replaceChild(image, thumbnail);
  });
}

/**
 * Maneja la selección de un DownloadItem
 * @param {MouseEvent} event - El evento de clic.
 */
function selectElement(event) {
  const index = event.target.getAttribute("index");
  if (index === null || index === undefined) return;
  itemsToDownload[index].isSelected = !itemsToDownload[index].isSelected;
  renderView();
}

selectAllButton.onclick = () => {
  if (itemsToDownload.some((file) => file.isSelected === true))
    itemsToDownload.forEach((file, index) => (itemsToDownload[index].isSelected = false));
  else itemsToDownload.forEach((file, index) => (itemsToDownload[index].isSelected = true));
  renderView();
};

function renderView() {
  // render HTML for Items to Download
  const itemsToDownloadHTML = itemsToDownload.map(
    (link, index) => /*html*/ `<div class="download-item ${
      link.isSelected === true ? "checked" : ""
    }" index="${index}">
    <input type="checkbox" ${link.isSelected === true ? "checked" : ""}>
    <h4>${link.name}</h4>
  </div>`
  );
  itemsView.innerHTML = itemsToDownloadHTML.join("");

  // Set all events
  document.querySelectorAll(".download-item").forEach((item) => {
    item.addEventListener("click", selectElement);
  });

  // Render or not the download button
  if (itemsToDownload.some((file) => file.isSelected === true))
    downloadButton.style.display = "block";
  else downloadButton.style.display = "none";
}

// Check for videos and render Custom View
if (urlsToDownload.length > 0) {
  pageTitle.insertAdjacentElement("afterend", itemsView);
  pageTitle.insertAdjacentElement("afterend", selectAllButton);
  document.querySelector("table").remove();
  renderView();
}

/* --------------------- Start Downloads --------------------- */

/**
 * Envía al service worker los datos del archivo a descargar
 */
function startDownloads() {
  const downloads = itemsToDownload.filter((file) => file.isSelected);
  const URL = document.querySelector("h1").textContent.split("/");
  const path = URL.pop();
  chrome.runtime.sendMessage({ action: "download", downloads: downloads, path });
  if (confirm("¿Desea descargar los subtítulos?")) {
    chrome.runtime.sendMessage({ action: "download", downloads: subsItemsForDownload, path });
  }
}
