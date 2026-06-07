'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import Section from '../ui/Section';
import { register } from 'swiper/element/bundle';

// רישום Swiper כקומפוננטת web component
register();

const GuestFeedback = () => {
  // מידע על ביקורות האורחים
  const reviews = [
    {
      id: 1,
      name: 'משפחת לוי',
      date: 'מאי 2026',
      rating: 5,
      text: 'התארחנו בשתי היחידות עם משפחה גדולה — הכל מסודר, נקי ומרווח. הבריכה עם הנוף לגלבוע הייתה קסם, והילדים לא ירדו מהפינג פונג והמנגל.',
    },
    {
      id: 2,
      name: 'ענת וגיל',
      date: 'אפריל 2026 · פסח',
      rating: 5,
      text: 'חג פסח מושלם! המטבח מאובזר לכל מה שצריך, יש שקט אמיתי ופרטיות, והחצר מזמינה לשהות בחוץ עד הערב. אורית דאגה לנו מראש לכל פרט.',
    },
    {
      id: 3,
      name: 'דוד',
      date: 'מרץ 2026',
      rating: 5,
      text: 'בילוי סוף שבוע עם חברים — מקום מטופח, חדרים נוחים, מיזוג מעולה בכל הבית. הנוף מהבריכה בבוקר שווה כל שקל.',
    },
    {
      id: 4,
      name: 'רחל ומשה',
      date: 'ינואר 2026',
      rating: 5,
      text: 'גם בחורף הווילה נעימה וחמימה. נהנינו מהשקט של אומן, מסלול קצר בגלבוע, ובערב מנגל וישיבה בגינה. נחזור בקיץ.',
    },
    {
      id: 5,
      name: 'טל',
      date: 'נובמבר 2025',
      rating: 5,
      text: 'הזמנו לסופ"ש team building — שתי יחידות, הרבה מקום, WiFi טוב, ומתחם חוץ שעובד מצוין לקבוצה. הכל נקי ומוכן לקליטה.',
    },
    {
      id: 6,
      name: 'נועה',
      date: 'ספטמבר 2025',
      rating: 5,
      text: 'וילה יפהפייה, מרגישים בבית מהרגע שנכנסים. הבריכה פרטית ונקייה, והמיקום מושלם לטיולים בעמק המעיינות ובגלבוע.',
    },
    {
      id: 7,
      name: 'משפחת אבידן',
      date: 'אוגוסט 2025',
      rating: 5,
      text: 'שהינו שבוע עם הילדים — פינג פונג, בריכה, גינה ומנגל עשו את שלהם. הבית מאובזר ברמה גבוהה, ויש חניה נוחה ממש ליד.',
    },
    {
      id: 8,
      name: 'יואב',
      date: 'יולי 2025',
      rating: 5,
      text: 'מקום שקט ומפנק, בדיוק מה שחיפשנו לברוח מהעיר. אורית מארחת בחום, והנוף מהמרפסת והבריכה פשוט מדהים.',
    },
  ];
  
  // רפרנס לקומפוננטת הסווייפר
  const swiperRef = useRef(null);
  
  useEffect(() => {
    // הגדרת פרמטרים לסווייפר
    const swiperContainer = swiperRef.current;
    const params = {
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
      }
    };

    // הגדרת הפרמטרים והתחלת הסווייפר
    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  // קומפוננטת דירוג כוכבים
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-2" dir="ltr">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i}
            className={i < rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  // אנימציה לכרטיסי הביקורות
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <Section 
      id="reviews" 
      title="ביקורות אורחים"
      subtitle="מה אומרים עלינו האורחים שהתארחו בוילה אורית בגלבוע"
    >
      <div className="relative w-full overflow-hidden py-8">
        <swiper-container 
          ref={swiperRef} 
          init="false"
          dir="rtl"
          class="w-full h-full"
        >
          {reviews.map((review) => (
            <swiper-slide key={review.id} class="h-auto p-4">
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col"
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-[#4caf50] opacity-30 mb-3">
                  <FaQuoteRight size={24} />
                </div>
                
                <StarRating rating={review.rating} />
                
                <p className="text-gray-700 mb-4 flex-grow">"{review.text}"</p>
                
                <div className="flex items-center mt-auto">
                  <div className="flex-shrink-0 h-10 w-10 bg-[#4caf50]/20 rounded-full flex items-center justify-center text-[#4caf50] font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="mr-3">
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-gray-500 text-sm">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      
      {/* כפתורי ניווט מותאמים */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="ביקורת קודמת"
        >
          <span className="text-lg">‹</span>
        </button>
        <button
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="ביקורת הבאה"
        >
          <span className="text-lg">›</span>
        </button>
      </div>
    </Section>
  );
};

export default GuestFeedback; 