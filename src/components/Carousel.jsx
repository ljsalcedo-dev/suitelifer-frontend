import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Carousel = ({ images, isButtonOutside }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden flex items-center">
      {images.length > 1 && (
        <button
          type="button"
          className={`flex items-center justify-center z-50 p-1 md:p-2 lg:p-4 self-stretch ${
            !isButtonOutside
              ? "absolute left-0 h-full bg-transparent"
              : "bg-white"
          }`}
        >
          <ChevronLeftIcon
            onClick={prevSlide}
            className="w-6 h-6 md:w-8 md:h-8 opacity-30 bg-black cursor-pointer text-white hover:text-white hover:bg-primary hover:opacity-100 rounded-full"
          />
        </button>
      )}
      <div
        className="flex transition-transform duration-700 ease-in-out w-full"
        style={{
          transform:
            images.length > 1 ? `translateX(-${currentIndex * 100}%)` : "none",
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            className="w-full flex-shrink-0 rounded-lg"
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-primary" : "bg-gray-200"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <button
            type="button"
            className={`flex items-center justify-center z-50 p-1 md:p-2 lg:p-4 self-stretch ${
              !isButtonOutside
                ? "absolute right-0 h-full bg-transparent"
                : "bg-white"
            }`}
          >
            <ChevronRightIcon
              onClick={nextSlide}
              className="w-6 h-6 md:w-8 md:h-8 opacity-30 bg-black cursor-pointer text-white hover:text-white hover:bg-primary hover:opacity-100 rounded-full"
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
