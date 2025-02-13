import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox'; // new import

function importAll(r) {
  return r.keys().map(r);
}

const bigBendImages = importAll(require.context('./images/Big Bend', false, /\.(webp)$/));
const Starbase = importAll(require.context('./images/Starbase', false, /\.(webp)$/));

function App() {
  // Include gallery images inside lightbox state
  const [lightbox, setLightbox] = useState({ isOpen: false, imgSrc: '', currentIndex: 0, images: [] });

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

  const openLightbox = (imgSrc, index, galleryImages) => {
    setLightbox({ isOpen: true, imgSrc, currentIndex: index, images: galleryImages });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, imgSrc: '', currentIndex: 0, images: [] });
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    const galleryImages = lightbox.images;
    const newIndex = (lightbox.currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setLightbox({ ...lightbox, imgSrc: galleryImages[newIndex], currentIndex: newIndex });
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    const galleryImages = lightbox.images;
    const newIndex = (lightbox.currentIndex + 1) % galleryImages.length;
    setLightbox({ ...lightbox, imgSrc: galleryImages[newIndex], currentIndex: newIndex });
  };

  return (
    <div className="App">
      <Header/>
      <h2>STARBASE</h2>
      <Gallery images={Starbase} onImageClick={(imgSrc, index) => openLightbox(imgSrc, index, Starbase)} />

      {/* Embedded video section */}
      <h2>2024 STARBASE REEL</h2>
      <div className="video-container">
        <iframe 
          width="800"
          height="450"
          src="https://www.youtube.com/embed/6leWkoZmYps" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <h2>BIG BEND NATIONAL PARK</h2>
      <Gallery images={bigBendImages} onImageClick={(imgSrc, index) => openLightbox(imgSrc, index, bigBendImages)} />
      <section className="about-me" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>About Me</h1>
        <p>I'm Sean Doherty, a photographer obsessed with the intersection of art and technologly. My work celebrates the space industry and contrasts that with the beauty of our natual world. I often shoot on a film, on a mission to pay homage to the great photographers who captured our most inconic images durring the 1960s space race.</p>
      </section>

      <Lightbox
        lightbox={lightbox}
        closeLightbox={closeLightbox}
        showPrevImage={showPrevImage}
        showNextImage={showNextImage}
      />
      <Footer />
    </div>
  );
}

export default App;