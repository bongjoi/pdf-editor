const downloadFile = (file, saveAs) => {
  const blobUrl =
    typeof file.data === 'string'
      ? ''
      : URL.createObjectURL(new Blob([file.data], { type: '' }));
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = blobUrl || file.name;
  link.setAttribute('download', saveAs);

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
  }
};

export default downloadFile;
