'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FaBed, FaBath, FaWifi, FaParking, FaTv, FaWater, 
  FaSnowflake, FaUtensils, FaCoffee, FaSwimmingPool, 
  FaWalking, FaTree, FaMountain, FaTableTennis, FaFire
} from 'react-icons/fa';
import Section from '../ui/Section';
import Card from '../ui/Card';
import { outdoorSpaces, villaVideo } from '@/data/site-images';

const amenities = [
  { icon: <FaBed />, title: 'מיטות נוחות', description: 'מיטות איכותיות עם מזרנים אורתופדיים ומצעים רכים' },
  { icon: <FaWifi />, title: 'WiFi חופשי', description: 'אינטרנט מהיר וחזק בכל רחבי הווילה' },
  { icon: <FaSnowflake />, title: 'מיזוג אוויר', description: 'בכל החדרים והאזורים המשותפים' },
  { icon: <FaTv />, title: 'טלוויזיה חכמה', description: 'מסכי Smart TV עם נטפליקס וערוצי כבלים' },
  { icon: <FaSwimmingPool />, title: 'בריכה פרטית', description: 'בריכת שחייה עם נוף מרהיב להרים' },
  { icon: <FaUtensils />, title: 'מטבח מאובזר', description: 'מטבח מלא עם כל הציוד הנדרש לבישול ואירוח' },
  { icon: <FaCoffee />, title: 'מכונת קפה', description: 'מכונת אספרסו וקפסולות קפה מובחרות' },
  { icon: <FaBath />, title: 'מגבות ומוצרי טיפוח', description: 'מגבות רכות ומוצרי טיפוח איכותיים' },
  { icon: <FaParking />, title: 'חניה פרטית', description: 'חניה פרטית וצמודה ללא עלות' },
  { icon: <FaWater />, title: 'מים חמים 24/7', description: 'מים חמים זמינים תמיד במקלחות ובכיורים' },
  { icon: <FaWalking />, title: 'מסלולי טיול', description: 'גישה קלה למסלולי טיול נפלאים באזור' },
  { icon: <FaMountain />, title: 'נוף מרהיב', description: 'נוף פנורמי עוצר נשימה אל הרי הגלבוע' },
  { icon: <FaTableTennis />, title: 'פינג פונג', description: 'שולחן פינג פונג תחת פרגולה מוצלת בחצר' },
  { icon: <FaFire />, title: 'פינת מנגל', description: 'אזור מנגל מצויד לצד פינות ישיבה בחוץ' },
  { icon: <FaTree />, title: 'מתחם חוץ', description: 'גינה מטופחת, פינות ישיבה ואירוח בחוץ' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 } 
  }
};

const Amenities = () => {
  return (
    <Section 
      id="amenities" 
      title="מתקנים ושירותים"
      subtitle="כל מה שתצטרכו לחופשה מושלמת ב״וילה אורית״"
      bgColor="bg-[#f5f5f5]"
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {amenities.map((amenity, index) => (
          <motion.div key={index} variants={item}>
            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl text-[#4caf50] mb-4">{amenity.icon}</div>
                <h3 className="text-xl font-bold mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Outdoor Spaces */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-2 text-center">מתחם החוץ</h3>
        <p className="text-gray-600 text-center mb-8">מנגל, פינות ישיבה ופינג פונג בחוץ</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outdoorSpaces.map((space) => (
            <div key={space.src} className="rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="relative h-56 md:h-64">
                <Image
                  src={space.src}
                  alt={space.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  quality={70}
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="text-lg font-bold mb-1">{space.title}</h4>
                <p className="text-gray-600 text-sm">{space.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Video Section */}
      <motion.div 
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-center">התרשמו מהוילה</h3>
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <video
            controls
            preload="none"
            playsInline
            className="w-full h-auto"
            poster={villaVideo.poster}
          >
            <source src={villaVideo.src} type="video/mp4" />
            הדפדפן שלך אינו תומך בתגית וידאו.
          </video>
        </div>
      </motion.div>
    </Section>
  );
};

export default Amenities; 