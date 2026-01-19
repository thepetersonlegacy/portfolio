import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight, Clock } from 'lucide-react';

interface SmartScrollCTAProps {
  onCtaClick: () => void;
}

export const SmartScrollCTA = ({ onCtaClick }: SmartScrollCTAProps) => {
  const [showCTA, setShowCTA] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    if (dismissed || sessionStorage.getItem('smartCTADismissed')) return;

    let triggered = false;
    let timeoutId: NodeJS.Timeout;

    // Time-based trigger: 30 seconds
    timeoutId = setTimeout(() => {
      if (!triggered && !sessionStorage.getItem('smartCTAShown')) {
        triggered = true;
        setShowCTA(true);
        sessionStorage.setItem('smartCTAShown', 'true');
      }
    }, 30000);

    // Scroll-based trigger: 30% scroll
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 30 && !triggered && !sessionStorage.getItem('smartCTAShown')) {
        triggered = true;
        setShowCTA(true);
        sessionStorage.setItem('smartCTAShown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setShowCTA(false);
    setDismissed(true);
    sessionStorage.setItem('smartCTADismissed', 'true');
  };

  const handleClick = () => {
    setShowCTA(false);
    onCtaClick();
  };
  
  return (
    <AnimatePresence>
      {showCTA && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 hidden md:block"
        >
          <div className="bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden max-w-sm border border-gold-500/30">
            {/* Urgency Banner */}
            <div className="bg-red-600 px-4 py-2 flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🔥
                </motion.span>
                Only 3 strategy sessions left this month
              </span>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-red-700 rounded transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-gold-glow">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Ready to 3X Your Leads?</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Book a free 30-min strategy session worth $500
                  </p>
                  
                  <motion.button
                    onClick={handleClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-red-glow"
                  >
                    Claim Your Free Session
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    Response within 24 hours • No obligation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

