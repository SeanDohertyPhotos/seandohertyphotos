import React from 'react';
import './App.css';
import Header from './Header';
import LazyLoad from 'react-lazyload';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../public/images', false, /\.(webp)$/));

function App() {
  return (
    <div className="App">
      <Header />
      <div className="gallery">
        {images.map((image, index) => (
          <LazyLoad key={index} height={200} offset={100} once>
            <img src={image} alt={`Gallery image ${index + 1}`} />
          </LazyLoad>
        ))}
      </div>
    </div>
  );
}

export default App;