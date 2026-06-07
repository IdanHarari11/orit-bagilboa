'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Section from '../ui/Section';
import Image from 'next/image';
import { galleryCarousel, galleryGrid } from '@/data/site-images';
import { shouldMountGallerySlide } from '@/lib/slide-images';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = galleryCarousel.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === total - 1 ? 0 : prevIndex + 1));
  }, [total]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? total - 1 : prevIndex - 1));
  }, [total]);

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <Section
      id="gallery"
      title="גלריה"
      subtitle="התרשמו מהנוף, החדרים והאירוח היוקרתי בוילה אורית"
      bgColor="bg-[#f5f5dc]"
    >
      <div
        className="relative overflow-hidden rounded-2xl shadow-xl w-full h-[300px] md:h-[500px]"
        role="region"
        aria-roledescription="קרוסלת תמונות"
        aria-label="גלריית תמונות ראשית"
      >
        <div className="relative w-full h-full" aria-live="polite" aria-atomic="true">
          {galleryCarousel.map((image, index) => {
            const isActive = index === currentIndex;
            const mountImage = shouldMountGallerySlide(index, currentIndex, total);

            return (
              <div
                key={image.src}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                <div className="relative w-full h-full">
                  {mountImage && (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? undefined : 'lazy'}
                      sizes="(max-width: 768px) 100vw, 90vw"
                      quality={70}
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-0 inset-x-0 bg-gradient-to-t from-transparent to-white p-4 text-black">
                    <p className="text-lg md:text-xl">{image.alt}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 p-3 rounded-full text-gray-800 hover:bg-opacity-70 transition-all focus-visible:ring-2 focus-visible:ring-[#4caf50]"
          aria-label="תמונה קודמת"
        >
          <FaArrowRight aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 p-3 rounded-full text-gray-800 hover:bg-opacity-70 transition-all focus-visible:ring-2 focus-visible:ring-[#4caf50]"
          aria-label="תמונה הבאה"
        >
          <FaArrowLeft aria-hidden="true" />
        </button>

        <div
          className="absolute gap-[3rem] bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2"
          role="tablist"
          aria-label="בחירת תמונה בגלריה"
        >
          {galleryCarousel.map((image, index) => (
            <button
              type="button"
              key={image.src}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#4caf50] focus-visible:ring-offset-2 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`${image.alt} — תמונה ${index + 1} מתוך ${total}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8 text-center">תמונות נוספות</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryGrid.map((img) => (
            <button
              type="button"
              key={img.src}
              className="gallery-grid-item relative aspect-square overflow-hidden rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4caf50] focus-visible:ring-offset-2"
              aria-label={`הצג בגלריה: ${img.alt}`}
              onClick={() => {
                const carouselIndex = galleryCarousel.findIndex((image) => image.src === img.src);
                setCurrentIndex(carouselIndex !== -1 ? carouselIndex : 0);
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={60}
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Gallery;
