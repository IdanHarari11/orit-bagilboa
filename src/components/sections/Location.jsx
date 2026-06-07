'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections, FaMountain, FaWater, FaTree, FaLandmark } from 'react-icons/fa';
import Section from '../ui/Section';
import Button from '../ui/Button';
import Image from 'next/image';
import { locationImages } from '@/data/site-images';

const attractions = [
  { 
    icon: <FaMountain />, 
    title: 'הרי הגלבוע', 
    distance: '5 דקות נסיעה',
    description: 'מסלולי הליכה מרהיבים, פריחת האירוסים באביב, ונופים עוצרי נשימה.'
  },
  {
    icon: <FaLandmark />,
    title: 'תל מגידו (גן לאומי)',
    distance: '10 דקות נסיעה',
    description: 'אתר מורשת עולמית בלב חבל תענך — שרידי עיר מקראית, ארמון מלכותי ותצפית על עמק יזרעאל.',
  },
  { 
    icon: <FaWater />, 
    title: 'מעיין חרוד', 
    distance: '15 דקות נסיעה',
    description: 'פארק טבע יפהפה עם מעיין טבעי, מוזיאון, ומסלולי הליכה קלים לכל המשפחה.'
  },
  {
    icon: <FaTree />,
    title: 'עמק המעיינות',
    distance: '20 דקות נסיעה',
    description: 'עמק ירוק ומושלם לטיולים, עם מעיינות טבעיים, בריכות מים, מסלולי הליכה ואופניים, וחוויות לכל המשפחה.',
  }
];

const Location = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <Section 
      id="location" 
      title="המיקום שלנו"
      subtitle="וילה אורית ממוקמת בנקודה מושלמת לטיולים ובילויים באזור"
      bgColor="bg-[#e8f5e9]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Map */}
        <div className="order-2 lg:order-1">
          <div className="bg-white p-2 rounded-2xl shadow-lg overflow-hidden h-[350px] lg:h-full">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4caf50]"></div>
                </div>
              )}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.1471392279717!2d35.5364223!3d32.5952775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c47e0e64a0ba1%3A0x8f99d7b9ae7c96c3!2z157Xldep15Eg15DXldee158!5e0!3m2!1siw!2sil!4v1711438888899!5m2!1siw!2sil" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
                title="מפת מיקום וילה אורית במושב אומן"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Info */}
        <div className="order-1 lg:order-2">
          <div className="flex items-center gap-2 text-xl mb-4">
            <FaMapMarkerAlt className="text-[#4caf50] text-2xl" />
            <h3 className="font-bold">מושב אומן, ישראל</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            וילה אורית ממוקמת במושב אומן, באזור הגלבוע והעמקים. הוילה שוכנת במיקום פסטורלי מושלם, המשלב נוף מרהיב, אוויר צלול ושקט וקרבה למגוון אטרקציות ומסלולי טיול טבעיים.
          </p>
          
          <Button 
            onClick={() => window.open('https://maps.google.com/?q=מושב+אומן+ישראל', '_blank')}
            className="mb-8"
          >
            <div className="flex items-center gap-2">
              <FaDirections />
              <span>קבל הוראות הגעה</span>
            </div>
          </Button>
          
          <h3 className="text-xl font-bold mb-4">אטרקציות בסביבה</h3>
          
          <div className="space-y-4">
            {attractions.map((attraction, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow h-[120px] flex"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="text-[#4caf50] text-2xl mt-1">{attraction.icon}</div>
                  <div className="w-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">{attraction.title}</h4>
                        <span className="text-sm text-gray-500 mr-auto ml-2">{attraction.distance}</span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{attraction.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Location Images */}
          <div className="grid grid-cols-2 gap-3 pt-6">
            <motion.div
              className="rounded-xl overflow-hidden aspect-[4/3]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-full">
                <Image 
                  src={locationImages.entrance.src} 
                  alt={locationImages.entrance.alt} 
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  quality={70}
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </motion.div>
            <motion.div
              className="rounded-xl overflow-hidden aspect-[4/3]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative w-full h-full">
                <Image 
                  src={locationImages.landscape.src} 
                  alt={locationImages.landscape.alt} 
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  quality={70}
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Location; 