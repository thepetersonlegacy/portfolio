import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ExitIntentPopupProps {
  onDownloadClick: () => void;
}

export const ExitIntentPopup = ({ onDownloadClick }: ExitIntentPopupProps) => {
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitIntentShown')) {
        setShowPopup(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);
  
  const handleDownload = () => {
    setShowPopup(false);
    onDownloadClick();
  };
  
  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-glass-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-glass-white relative"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </motion.button>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-3xl">📚</span>
              </motion.div>
              
              <h3 className="text-2xl font-light mb-2">Wait! Before You Go...</h3>
              <p className="text-gray-600 mb-6">
                Get our free guide: <strong>"10 Website Mistakes Costing You Clients"</strong>
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium mb-3 hover:bg-gray-800 transition-colors"
              >
                Download Free Guide
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPopup(false)}
                className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                No thanks, I'll pass
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

