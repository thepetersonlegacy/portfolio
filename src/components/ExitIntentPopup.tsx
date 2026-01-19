import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, AlertTriangle, CheckCircle2, Zap, TrendingUp, Clock } from 'lucide-react';

interface ExitIntentPopupProps {
  onDownloadClick: () => void;
}

export const ExitIntentPopup = ({ onDownloadClick }: ExitIntentPopupProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowPopup(false);
    onDownloadClick();
  };

  const auditPoints = [
    { icon: Search, text: 'SEO & visibility issues' },
    { icon: TrendingUp, text: 'Conversion blockers' },
    { icon: Zap, text: 'Performance problems' },
  ];

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl relative overflow-hidden"
          >
            {/* Urgency Banner */}
            <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-medium">
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ⚡ Only 3 FREE audits remaining this month
              </motion.span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPopup(false)}
              className="absolute top-12 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="p-8">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-gold-glow"
                >
                  <AlertTriangle className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Wait! Is Your Website Leaking Money?
                </h3>
                <p className="text-gray-600">
                  Get a <span className="font-semibold text-red-600">FREE Website Audit</span> worth $497 and discover exactly what's costing you leads.
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">Your FREE audit includes:</p>
                <div className="space-y-2">
                  {auditPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <point.icon className="w-4 h-4 text-gold-700" />
                      </div>
                      <span className="text-sm text-gray-700">{point.text}</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for instant access"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-all outline-none text-gray-900"
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-red-glow disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  />
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : '🎁 Get My FREE Website Audit'}
                  </span>
                </motion.button>
              </form>

              {/* Trust Elements */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Results in 24-48 hours
                </span>
                <span>•</span>
                <span>No spam, ever</span>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors mt-4"
              >
                No thanks, my website is perfect
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

