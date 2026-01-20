import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { trackCallClick, trackTextClick, trackBookClick } from '../utils/analytics';

interface StickyMobileBarProps {
  isVisible: boolean;
  onBookClick: () => void;
  phoneNumber?: string;
}

export const StickyMobileBar = ({ 
  isVisible, 
  onBookClick, 
  phoneNumber = '+18005551234' // Replace with actual phone number
}: StickyMobileBarProps) => {
  
  const handleCallClick = () => {
    trackCallClick('sticky_mobile_bar');
  };

  const handleTextClick = () => {
    trackTextClick('sticky_mobile_bar');
  };

  const handleBookClick = () => {
    trackBookClick('sticky_mobile_bar');
    onBookClick();
  };

  // Format phone for tel: and sms: links (remove non-digits)
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{ 
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          {/* Background with blur */}
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              {/* Call Button */}
              <a
                href={`tel:${cleanPhone}`}
                onClick={handleCallClick}
                className="flex flex-col items-center justify-center py-3 px-2 active:bg-gray-100 transition-colors"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  minHeight: '64px',
                }}
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-1">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-900">Call Now</span>
              </a>

              {/* Text Button */}
              <a
                href={`sms:${cleanPhone}`}
                onClick={handleTextClick}
                className="flex flex-col items-center justify-center py-3 px-2 active:bg-gray-100 transition-colors"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  minHeight: '64px',
                }}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-1">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-900">Text Us</span>
              </a>

              {/* Book Button */}
              <button
                onClick={handleBookClick}
                className="flex flex-col items-center justify-center py-3 px-2 active:bg-gray-100 transition-colors"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  minHeight: '64px',
                }}
              >
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mb-1">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-900">Book</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

