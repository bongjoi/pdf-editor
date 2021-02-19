import { useRef, useState, useEffect } from 'react';
import { Spinner } from '../core';

const ThumbnailItem = ({
  page,
  pageWidth,
  pageHeight,
  rotation,
  thumbnailHeight,
  thumbnailWidth
}) => {
  const renderTask = useRef();
  const [src, setSrc] = useState('');

  useEffect(() => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }

    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d', { alpha: false });

    const w = thumbnailWidth;
    const h = w / (pageWidth / pageHeight);
    const scale = w / pageWidth;

    canvas.height = h;
    canvas.width = w;
    canvas.style.height = `${h}px`;
    canvas.style.width = `${w}px`;

    const viewport = page.getViewport({ rotation, scale });
    renderTask.current = page.render({ canvasContext, viewport });
    renderTask.current.promise
      .then(
        () => setSrc(canvas.toDataURL()),
        () => {}
      )
      .catch((err) => console.log(err));
  }, [rotation]);

  return !src ? (
    <Spinner />
  ) : (
    <img
      src={src}
      width={`${thumbnailWidth}px`}
      height={`${thumbnailHeight}px`}
      alt=""
    />
  );
};

export default ThumbnailItem;
