'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaWhatsapp, FaPhone, FaEnvelope, FaCheck, FaCalendarAlt } from 'react-icons/fa';
import Section from '../ui/Section';
import Button from '../ui/Button';
import BookingCountdown from './BookingCountdown';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    checkIn: '',
    checkOut: '',
    message: '',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'booking',
          ...formData
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setFormSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          guests: '2',
          checkIn: '',
          checkOut: '',
          message: '',
        });
      } else {
        setSubmissionError(result.error || 'אירעה שגיאה בשליחת ההודעה');
      }
    } catch (error) {
      console.error('שגיאה בשליחת הטופס:', error);
      setSubmissionError('אירעה שגיאה בשליחת ההודעה, אנא נסו שוב מאוחר יותר');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Section 
      id="booking" 
      title="הזמינו עכשיו"
      subtitle="בדקו זמינות ושריינו את התאריכים שלכם"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg">
          {formSubmitted ? (
            <motion.div 
              className="flex flex-col items-center justify-center h-full py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              role="status"
              aria-live="polite"
            >
              <div className="text-6xl text-[#4caf50] mb-6" aria-hidden="true">
                <FaCheck />
              </div>
              <h3 className="text-2xl font-bold mb-2">תודה על פנייתך!</h3>
              <p className="text-gray-600 text-center mb-6">
                קיבלנו את הפרטים שלך ונחזור אליך בהקדם האפשרי.
              </p>
              <Button 
                onClick={() => setFormSubmitted(false)}
                variant="secondary"
              >
                חזרה לטופס
              </Button>
            </motion.div>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-6">מלאו את הפרטים ונחזור אליכם בהקדם</h3>
              
              {submissionError && (
                <div
                  role="alert"
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-right"
                >
                  {submissionError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5" aria-busy={isSubmitting} noValidate>
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">שם מלא</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
                    placeholder="הכנס את שמך המלא"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1">טלפון</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
                    placeholder="הכנס את מספר הטלפון שלך"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">אימייל</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
                    placeholder="הכנס את כתובת האימייל שלך"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="guests" className="block text-gray-700 mb-1">מספר אורחים</label>
                    <div className="relative">
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" aria-hidden="true">
                        <FaUsers className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="checkIn" className="block text-gray-700 mb-1">תאריך הגעה</label>
                    <div className="relative">
                      <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" aria-hidden="true">
                        <FaCalendarAlt className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="checkOut" className="block text-gray-700 mb-1">תאריך עזיבה</label>
                    <div className="relative">
                      <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" aria-hidden="true">
                        <FaCalendarAlt className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1">הודעה (אופציונלי)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
                    placeholder="הוסף הודעה או שאלה..."
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                      <span className="mr-2">שולח...</span>
                    </div>
                  ) : (
                    'שלח בקשה'
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
        
        {/* Countdown & Contact Info - החלפנו את החלק של זמינות וסטטוס הזמנות */}
        <div className="flex flex-col gap-6">
          {/* Booking Countdown */}
          <BookingCountdown />
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">צרו קשר ישירות</h3>
            <p className="text-gray-600 mb-6">
              אם אתם מעדיפים ליצור קשר ישירות, אתם מוזמנים להשתמש באחת מהאפשרויות הבאות:
            </p>
            
            <div className="space-y-3">
              <a 
                href="tel:+972543199489" 
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-[#4caf50] text-white p-2 rounded-full" aria-hidden="true">
                  <FaPhone />
                </div>
                <span>התקשרו אלינו: 054-3199489</span>
              </a>
              
              <a 
                href="https://wa.me/972543199489" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-[#25D366] text-white p-2 rounded-full" aria-hidden="true">
                  <FaWhatsapp />
                </div>
                <span>שלחו הודעה בוואטסאפ</span>
              </a>
              
              <a 
                href="mailto:tsvika11@gmail.com" 
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-[#4285F4] text-white p-2 rounded-full" aria-hidden="true">
                  <FaEnvelope />
                </div>
                <span>שלחו לנו אימייל</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Booking; 