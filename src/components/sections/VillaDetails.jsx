'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaBed, FaBath, FaUsers, FaSwimmingPool, FaUtensils, FaWifi, FaTemperatureHigh } from 'react-icons/fa';
import Section from '../ui/Section';
import Card from '../ui/Card';
import { villaUnits } from '@/data/site-images';

const VillaDetails = () => {
  const units = [
    {
      name: 'יחידה 1 - הסוויטה המפוארת',
      image: villaUnits.unit1.src,
      alt: villaUnits.unit1.alt,
      desc: 'יחידה מרווחת המתאימה למשפחות עם נוף מדהים לגלבוע, בריכה פרטית וחצר מפנקת.',
      capacity: 12,
      bedrooms: 3,
      bathrooms: 2,
      features: [
        { icon: <FaBed />, text: '3 חדרי שינה מפוארים' },
        { icon: <FaBath />, text: '2 חדרי רחצה מאובזרים' },
        { icon: <FaSwimmingPool />, text: 'בריכה עם נוף' },
        { icon: <FaUtensils />, text: 'מטבח מאובזר במלואו' },
        { icon: <FaTemperatureHigh />, text: 'מזגן בכל חדר' },
        { icon: <FaWifi />, text: 'WiFi חופשי' },
      ]
    },
    {
      name: 'יחידה 2 - הסוויטה המשפחתית',
      image: villaUnits.unit2.src,
      alt: villaUnits.unit2.alt,
      desc: 'יחידה אינטימית וייחודית, מושלמת לזוגות, עם מרפסת פרטית ונוף פתוח לטבע.',
      capacity: 12,
      bedrooms: 3,
      bathrooms: 2,
      features: [
        { icon: <FaBed />, text: '3 חדרי שינה נעימים' },
        { icon: <FaBath />, text: '2 חדרי רחצה מאובזרים' },
        { icon: <FaSwimmingPool />, text: 'גישה לבריכה משותפת' },
        { icon: <FaUtensils />, text: 'מטבחון מאובזר' },
        { icon: <FaTemperatureHigh />, text: 'מזגן בכל חדר' },
        { icon: <FaWifi />, text: 'WiFi חופשי' },
      ]
    },
  ];

  return (
    <Section 
      id="villa-details" 
      title="היחידות שלנו"
      subtitle="בחרו את היחידה המתאימה לצרכים שלכם"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xl md:text-2xl font-bold text-[#4caf50] mb-3">
          ביחד זה ל-24 אנשים!
        </p>

        <div
          className="hidden md:block w-full max-w-4xl mx-auto mb-5 px-4 text-slate-800"
          aria-hidden="true"
        >
          <svg
            className="w-full h-8"
            viewBox="0 0 800 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 28V14C28 6 400 4 400 4C400 4 772 6 772 14V28"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 md:px-6">
        {units.map((unit, index) => (
          <motion.div
            key={unit.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="h-full flex flex-col">
              <div className="relative h-64 mb-4 overflow-hidden rounded-xl">
                <Image
                  src={unit.image}
                  alt={unit.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={70}
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-[#4caf50] shadow-md z-10">
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    <span>עד {unit.capacity} אנשים</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-[#4caf50]">{unit.name}</h3>
              <p className="text-gray-600 mb-4">{unit.desc}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <FaBed className="text-[#4caf50]" />
                  <span>{unit.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBath className="text-[#4caf50]" />
                  <span>{unit.bathrooms}</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <h4 className="font-bold text-lg mb-2">מה מקבלים?</h4>
                <ul className="space-y-2">
                  {unit.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#4caf50]">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        ))}
        </div>
      </div>
    </Section>
  );
};

export default VillaDetails; 