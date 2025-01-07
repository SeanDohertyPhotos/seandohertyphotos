import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import LazyLoad from 'react-lazyload';
import Footer from './Footer';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../public/images', false, /\.(webp)$/));

function App() {
  const [lightbox, setLightbox] = useState({ isOpen: false, imgSrc: '' });

  useEffect(() => {
    if (lightbox.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [lightbox.isOpen]);

  const openLightbox = (imgSrc) => {
    setLightbox({ isOpen: true, imgSrc });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, imgSrc: '' });
  };

  return (
    <div className="App">
      <Header />
      <div className="gallery">
        {images.map((image, index) => (
          <LazyLoad key={index} height={200} offset={100} once>
            <img src={image} alt={`Gallery image ${index + 1}`} onClick={() => openLightbox(image)} />
          </LazyLoad>
        ))}
      </div>

      {lightbox.isOpen && (
        <div className="lightbox" style={{ display: 'flex' }} onClick={closeLightbox}>
          <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
          <div className="lightbox-content">
            <img src={lightbox.imgSrc} alt="Lightbox" />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;