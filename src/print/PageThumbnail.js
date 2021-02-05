import { useRef, useState, useEffect } from 'react';
import { Spinner } from '@react-pdf-viewer/core';

const PageThumbnail = ({ page, pageHeight, pageWidth, rotation, onLoad }) => {
  const renderTask = useRef();
  const [src, setSrc] = useState('');

  useEffect(() => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }

    const canvas = document.createElement('canvas');
    const printUnit = 150 / 72;
    canvas.height = Math.floor(pageHeight * printUnit);
    canvas.width = Math.floor(pageWidth * printUnit);

    const canvasContext = canvas.getContext('2d');
    canvasContext.save();
    canvasContext.fillStyle = 'rgb(255, 255, 255)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();

    const viewport = page.getViewport({ rotation, scale: 1 });
    renderTask.current = page.render({
      canvasContext,
      intent: 'print',
      transform: [printUnit, 0, 0, printUnit, 0, 0],
      viewport
    });
    renderTask.current.promise.then(
      () => {
        'toBlob' in canvas
          ? canvas.toBlob((blob) => {
              setSrc(URL.createObjectURL(blob));
            })
          : setSrc(canvas.toDataURL());
      },
      () => {}
    );
  }, []);

  return !src ? (
    <Spinner />
  ) : (
    <div
      className="pdf-editor-print-page-thumbnail"
      style={{
        height: `${Math.floor((pageHeight * 96) / 72)}px`,
        width: `${Math.floor((pageWidth * 96) / 72)}px`
      }}
    >
      <img
        src={src}
        style={{
          height: `${Math.floor((pageHeight * 96) / 72)}px`,
          width: `${Math.floor((pageWidth * 96) / 72)}px`
        }}
        onLoad={onLoad}
        alt=""
      />
    </div>
  );
};

export default PageThumbnail;
