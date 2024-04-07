chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  request.downloads.forEach((download) => {
    chrome.downloads.download(
      {
        url: download.link,
        filename: download.name,
      },
      (downloadId) => console.log("Descarga iniciada:", downloadId)
    );
  });
});
