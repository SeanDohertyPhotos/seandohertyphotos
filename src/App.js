import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import LazyLoad from 'react-lazyload';
import Footer from './Footer';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./images', false, /\.(webp)$/));

function App() {
  const [lightbox, setLightbox] = useState({ isOpen: false, imgSrc: '', currentIndex: 0 });

  useEffect(() => {
    const handleScroll = (e) => {
      if (lightbox.isOpen) {
        if (e.deltaY < 0) {
          showPrevImage(e);
        } else if (e.deltaY > 0) {
          showNextImage(e);
        }
      }
    };

    if (lightbox.isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', handleScroll);
    } else {
      document.body.style.overflow = 'unset';
      window.removeEventListener('wheel', handleScroll);
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [lightbox.isOpen]);

  const openLightbox = (imgSrc, index) => {
    setLightbox({ isOpen: true, imgSrc, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, imgSrc: '', currentIndex: 0 });
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    const newIndex = (lightbox.currentIndex - 1 + images.length) % images.length;
    setLightbox({ isOpen: true, imgSrc: images[newIndex], currentIndex: newIndex });
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    const newIndex = (lightbox.currentIndex + 1) % images.length;
    setLightbox({ isOpen: true, imgSrc: images[newIndex], currentIndex: newIndex });
  };

  return (
    <div className="App">
      <Header />
      <div className="gallery">
        {images.map((image, index) => (
          <LazyLoad key={index} height={200} offset={100} once>
            <img src={image} alt={`Gallery image ${index + 1}`} onClick={() => openLightbox(image, index)} />
          </LazyLoad>
        ))}
      </div>

      {lightbox.isOpen && (
        <div className="lightbox" style={{ display: 'flex' }} onClick={closeLightbox}>
          <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.imgSrc} alt="Lightbox" />
            <span className="lightbox-nav lightbox-nav-prev" onClick={showPrevImage}>&#10094;</span>
            <span className="lightbox-nav lightbox-nav-next" onClick={showNextImage}>&#10095;</span>
            <p style={{ color: "#ccc" }}>{lightbox.imgSrc.split('/').pop()}</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;