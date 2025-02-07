import React from 'react';
import LazyLoad from 'react-lazyload';

function Gallery({ images, onImageClick }) {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <LazyLoad key={index} height={200} offset={100} once>
          <img
            src={image}
            alt={`Gallery image ${index + 1}`}
            onClick={() => onImageClick(image, index, images)}
          />
        </LazyLoad>
      ))}
    </div>
  );
}

export default Gallery;
