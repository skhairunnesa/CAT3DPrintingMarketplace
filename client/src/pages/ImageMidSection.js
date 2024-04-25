import React from 'react';
import '../assets/ImageMidSection.css';  
import Image1 from '../assets/img/image1.jpg';
import Image2 from '../assets/img/image2.jpg';
import Image3 from '../assets/img/image3.jpg';

const ImageMidSection = () => {
  const images = [
    { src: Image1, text: 'Learn More ' },
    { src: Image2, text: 'Learn More ' },
    { src: Image3, text: 'Learn More ' },
  ];

  return (
    <section className="image-mid-section">
      <div className="image-collection">
        {images.map((image, index) => (
          <div className="image-item" key={index}>
            <div className="overlay">
              <img src={image.src} alt={`Image ${index + 1}`} />
              <div className="learn-more-text">Learn More</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImageMidSection;