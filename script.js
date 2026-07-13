function generate() {
  const url = document.getElementById('url');
  const filename = document.getElementById('filename');
  const format = document.getElementById('format');

  const urlError = document.getElementById('url-error');
  const filenameError = document.getElementById('filename-error');

  let valid = true;

  urlError.textContent = "";
  filenameError.textContent = "";
  url.classList.remove("error-border");
  filename.classList.remove("error-border");

  if (!url.value.trim()) {
    urlError.textContent = "Questo campo è obbligatorio.";
    url.classList.add("error-border");
    valid = false;
  }

  if (!filename.value.trim()) {
    filenameError.textContent = "Questo campo è obbligatorio.";
    filename.classList.add("error-border");
    valid = false;
  }

  if (!valid) return;

  const preview = document.getElementById("preview");
  preview.innerHTML = "";

  if (format.value === "png") {
    QRCode.toDataURL(url.value, { width: 300 }, (err, dataUrl) => {
      if (err) return;

      const img = document.createElement("img");
      img.src = dataUrl;
      preview.appendChild(img);

      downloadFile(dataUrl, filename.value + ".png");
    });
  } else {
    QRCode.toString(url.value, { type: "svg" }, (err, svg) => {
      if (err) return;

      preview.innerHTML = svg;

      const blob = new Blob([svg], { type: "image/svg+xml" });
      const urlBlob = URL.createObjectURL(blob);

      downloadFile(urlBlob, filename.value + ".svg");
    });
  }
}

function downloadFile(dataUrl, filename) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
