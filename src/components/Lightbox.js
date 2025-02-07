import React from 'react';

function Lightbox({ lightbox, closeLightbox, showPrevImage, showNextImage }) {
  if (!lightbox.isOpen) return null;
  // Extract file name without extension
  const fileName = lightbox.imgSrc.split('/').pop();
  const title = fileName.split('.')[0]; // take only the first part
  return (
    <div className="lightbox" style={{ display: 'flex' }} onClick={closeLightbox}>
      <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={lightbox.imgSrc} alt="Lightbox" />
        <span className="lightbox-nav lightbox-nav-prev" onClick={showPrevImage}>&#10094;</span>
        <span className="lightbox-nav lightbox-nav-next" onClick={showNextImage}>&#10095;</span>
        <p style={{ color: "#ccc" }}>{title}</p>
      </div>
    </div>
  );
}

export default Lightbox;
