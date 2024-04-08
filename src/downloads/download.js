// Define Styles
const styles = document.createElement("style");
styles.textContent = globalStyles;
document.head.appendChild(styles);

// Utils
const pageTitle = document.querySelector("h1");
const currentURL = window.location.href;

// Get Elements from Page
const allLinkElements = document.querySelectorAll("a");
const allLinksToDownload = [...allLinkElements].filter((a) => detectVideoFilesRegex.test(a.href));
const allSubsToDownload = [...allLinkElements].filter((a) => detectSubtitlesRegex.test(a.href));
const allThumbnails = [...allLinkElements].filter((a) => detectPhotoFilesRegex.test(a.href));

// Get metadata
const filesToDownload = allLinksToDownload.map((link) => link.href);
const fileNamesToDownload = allLinksToDownload.map((link) => {
  return { name: link.textContent, isSelected: false, link: link.href };
});

// Render Thumbnails
allThumbnails.forEach((thumbnail) => {
  const imageURL = thumbnail.href;
  const image = document.createElement("img");
  image.src = imageURL;
  image.style.borderRadius = "20px";
  image.style.width = "300px";
  thumbnail.parentNode.replaceChild(image, thumbnail);
});

function selectElement(event) {
  const index = event.target.getAttribute("index");
  console.log("Index", index);
  if (index === null || index === undefined) return;
  fileNamesToDownload[index].isSelected = !fileNamesToDownload[index].isSelected;
  renderView();
}

const selectAllButton = document.createElement("button");
selectAllButton.textContent = "✅ Seleccionar todos";

selectAllButton.onclick = () => {
  if (fileNamesToDownload.some((file) => file.isSelected === true))
    fileNamesToDownload.forEach((file, index) => (fileNamesToDownload[index].isSelected = false));
  else fileNamesToDownload.forEach((file, index) => (fileNamesToDownload[index].isSelected = true));
  renderView();
};

// Download Button
const downloadButton = document.createElement("button");
downloadButton.classList.add("download-button");
downloadButton.textContent = "📥";
downloadButton.style.display = "none";
document.body.appendChild(downloadButton);

downloadButton.addEventListener("click", startDownloads);

// Download View
const itemsView = document.createElement("div");
itemsView.classList.add("items-view");

function renderView() {
  console.log("Rendering...");
  const itemsToDownload = fileNamesToDownload.map(
    (link, index) => /*html*/ `<div class="download-item ${
      link.isSelected === true ? "checked" : ""
    }" index="${index}">
    <input type="checkbox" ${link.isSelected === true ? "checked" : ""}>
    <h4>${link.name}</h4>
  </div>`
  );
  itemsView.innerHTML = itemsToDownload.join("");

  document.querySelectorAll(".download-item").forEach((item) => {
    item.addEventListener("click", selectElement);
  });

  if (fileNamesToDownload.some((file) => file.isSelected === true))
    downloadButton.style.display = "block";
  else downloadButton.style.display = "none";
}

if (filesToDownload.length > 0) {
  pageTitle.insertAdjacentElement("afterend", itemsView);
  pageTitle.insertAdjacentElement("afterend", selectAllButton);
  document.querySelector("table").remove();
  renderView();
}

function startDownloads() {
  const downloads = fileNamesToDownload.filter((file) => file.isSelected);
  const URL = document.querySelector("h1").textContent.split("/");
  const path = URL.pop();
  chrome.runtime.sendMessage({ action: "download", downloads: downloads, path });
}
