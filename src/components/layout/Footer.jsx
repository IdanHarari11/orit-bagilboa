'use client';

import { FaPhone, FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';
import Container from '../ui/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">וילה אורית בגלבוע</h3>
            <p className="text-gray-300 mb-4">
              אירוח יוקרתי עם נוף עוצר נשימה, בריכה פרטית ושקט מושלם.
              שתי יחידות אירוח מפוארות לחופשה בלתי נשכחת בגלבוע.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">צרו קשר</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 space-x-reverse">
                <FaPhone className="text-[#4caf50]" aria-hidden="true" />
                <a href="tel:+972543199489" className="text-gray-300 hover:text-white">
                  054-3199489
                </a>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <FaWhatsapp className="text-[#4caf50]" aria-hidden="true" />
                <a 
                  href="https://wa.me/972543199489" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  שלחו הודעת וואטסאפ
                </a>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <FaMapMarkerAlt className="text-[#4caf50]" aria-hidden="true" />
                <span className="text-gray-300">
                  מושב אומן, ישראל
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">עקבו אחרינו</h3>
            <div className="flex space-x-4 space-x-reverse mb-6">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl"
                aria-label="עקבו אחרינו באינסטגרם"
              >
                <FaInstagram />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl"
                aria-label="עקבו אחרינו בפייסבוק"
              >
                <FaFacebook />
              </a>
            </div>
            <div className="space-y-2">
              <a href="#gallery" className="block text-gray-300 hover:text-white">גלריה</a>
              <a href="#booking" className="block text-gray-300 hover:text-white">בדיקת זמינות</a>
              <a href="#location" className="block text-gray-300 hover:text-white">איך מגיעים</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>© {currentYear} וילה אורית בגלבוע. כל הזכויות שמורות.</p>
          <div className="mt-2 flex justify-center space-x-4 space-x-reverse text-sm">
            <a href="#" className="hover:text-white">תנאי שימוש</a>
            <a href="#" className="hover:text-white">מדיניות פרטיות</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 