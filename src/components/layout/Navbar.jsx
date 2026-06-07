'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import Container from '../ui/Container';
import Button from '../ui/Button';

const navLinks = [
  { name: 'בית', href: '#hero' },
  { name: 'גלריה', href: '#gallery' },
  { name: 'היחידות', href: '#villa-details' },
  { name: 'מתקנים', href: '#amenities' },
  { name: 'מיקום', href: '#location' },
  { name: 'הזמנה', href: '#booking' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="ניווט ראשי"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <Container className="flex justify-between items-center">
        <div className="flex-1">
          <a href="#hero" className="text-2xl font-bold text-[#4caf50]">
            וילה אורית בגלבוע
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 space-x-reverse">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-800 hover:text-[#4caf50] transition-colors px-2"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button 
            onClick={() => window.location.href = '#booking'}
            className="mr-4"
          >
            הזמינו עכשיו
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#4caf50] p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-[#4caf50] focus-visible:ring-offset-2"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <Container className="py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-800 hover:text-[#4caf50] transition-colors py-2 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <Button 
                  onClick={() => {
                    window.location.href = '#booking';
                    setIsMobileMenuOpen(false);
                  }}
                >
                  הזמינו עכשיו
                </Button>
                <a 
                  href="tel:+972543199489" 
                  className="flex items-center justify-center space-x-2 space-x-reverse text-[#4caf50] py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaPhone />
                  <span>התקשרו אלינו</span>
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 