'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaBed, FaBath, FaUsers, FaUserFriends, FaSwimmingPool, FaUtensils, FaWifi, FaTemperatureHigh } from 'react-icons/fa';
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
        <div className="flex justify-center mb-8">
          <p
            className="inline-flex items-center gap-3 rounded-2xl border-2 border-white/25 bg-gradient-to-l from-[#388e3c] via-[#4caf50] to-[#66bb6a] px-6 py-3.5 md:px-10 md:py-4 text-white font-bold text-lg md:text-xl shadow-[0_8px_24px_rgba(76,175,80,0.35)] ring-4 ring-[#4caf50]/20"
            role="note"
          >
            <span className="flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-white/20" aria-hidden="true">
              <FaUserFriends className="text-xl md:text-2xl" />
            </span>
            <span>יחד עד 24 אנשים</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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