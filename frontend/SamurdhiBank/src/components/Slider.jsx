import React, { useState, useEffect } from 'react';

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic: every 6 seconds, move to the next slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // 6 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [slides.length]);

  // Function to go to the next slide manually
  const nextSlide = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  // Function to go to the previous slide manually
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-[49rem] flex"> {/* Increased height */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-10 bg-black bg-opacity-50 text-white p-4 rounded-md">
              {slide.text}
            </div>
          </div>
        ))}

        {/* Previous Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 transform -translate-y-1/2 left-5 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
        >
          &#10094; {/* Left Arrow */}
        </button>

        {/* Next Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 transform -translate-y-1/2 right-5 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
        >
          &#10095; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default Slider;
