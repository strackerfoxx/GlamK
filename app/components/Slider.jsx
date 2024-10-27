"use client";
import { useState, useRef } from 'react';
import '../css/slider.css';

const Slider = ({items}) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef(null);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      wrapperRef.current.style.transition = 'none';
      setCurrentIndex(items.length);
      setTimeout(() => {
        wrapperRef.current.style.transition = 'transform 0.5s ease-in-out';
        setCurrentIndex(items.length - 1);
      }, 0);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length * 2 - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      wrapperRef.current.style.transition = 'none';
      setCurrentIndex(items.length - 1);
      setTimeout(() => {
        wrapperRef.current.style.transition = 'transform 0.5s ease-in-out';
        setCurrentIndex(items.length);
      }, 0);
    }
  };

  return (
    <div className='center'>
        <div className="slider-container">
            <div
              className="slider-wrapper"
              ref={wrapperRef}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {items?.concat(items)?.map((item, index) => (
                <div key={index} className="slide">
                  {item}
                </div>
              ))}
            </div>
            <button onClick={handlePrev} className="slider-button prev-button">&lt;</button>
            <button onClick={handleNext} className="slider-button next-button">&gt;</button>
        </div>
    </div>
  );
};

export default Slider;
