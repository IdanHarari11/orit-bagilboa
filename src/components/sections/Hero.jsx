'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { heroBackgrounds } from '@/data/site-images';
import { shouldMountSlide } from '@/lib/slide-images';

const BLUR_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5MUZMpgAAAABJRU5ErkJggg==';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const total = heroBackgrounds.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === total - 1 ? 0 : prevIndex + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [total]);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {heroBackgrounds.map((image, index) => {
        const isActive = index === currentImageIndex;
        const mountImage = shouldMountSlide(index, currentImageIndex, total);

        return (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-1500"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 1 : 0,
            }}
          >
            {mountImage && (
              <Image
                src={image}
                alt={`וילה אורית תמונה ${index + 1}`}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : 'lazy'}
                sizes="100vw"
                quality={75}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover"
              />
            )}
          </div>
        );
      })}

      <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

      <div className="relative z-20 text-center text-white px-4 max-w-4xl">
        <h1 className="hero-fade-in text-4xl md:text-6xl font-bold mb-6">
          וילה אורית בגלבוע
        </h1>

        <p className="hero-fade-in hero-fade-in-delay-1 text-xl md:text-2xl mb-10">
          אירוח יוקרתי עם נוף עוצר נשימה, בריכה פרטית ושקט מושלם
        </p>

        <div className="hero-fade-in hero-fade-in-delay-2 flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => { window.location.href = '#booking'; }}>
            בדוק זמינות
          </Button>

          <Button
            variant="secondary"
            onClick={() => { window.location.href = 'tel:+972543199589'; }}
          >
            צור קשר עכשיו
          </Button>
        </div>
      </div>

      <div className="hero-fade-in hero-fade-in-delay-3 absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20" aria-hidden="true">
        <div className="scroll-indicator w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="scroll-indicator-dot w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
