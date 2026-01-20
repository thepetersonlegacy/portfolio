import { motion } from 'framer-motion';
import { Calendar, FileText, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { trackBookClick, trackFormClick, trackCallClick, trackTextClick } from '../utils/analytics';

interface ServiceCTABlockProps {
  headline?: string;
  subheadline?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  phoneNumber?: string;
  onBookClick: () => void;
  onQuoteClick: () => void;
  variant?: 'default' | 'compact' | 'full';
  location: string;
}

export const ServiceCTABlock = ({
  headline = "Ready to Get Started?",
  subheadline = "Let's discuss how we can help grow your business.",
  primaryLabel = "Book a 15-Min ROI Review",
  secondaryLabel = "Get a Fast Quote (No Call Needed)",
  phoneNumber = "+14096567142",
  onBookClick,
  onQuoteClick,
  variant = 'default',
  location,
}: ServiceCTABlockProps) => {
  const displayPhone = phoneNumber.replace('+1', '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  if (variant === 'compact') {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { trackBookClick(location); onBookClick(); }}
          className="flex-1 py-3 px-6 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          {primaryLabel}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { trackFormClick(location); onQuoteClick(); }}
          className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Fast Quote
        </motion.button>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-light mb-4">{headline}</h3>
          <p className="text-gray-300 mb-8">{subheadline}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { trackBookClick(location); onBookClick(); }}
              className="py-4 px-8 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              {primaryLabel}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { trackFormClick(location); onQuoteClick(); }}
              className="py-4 px-8 border-2 border-white/30 text-white rounded-lg font-medium hover:border-white/50 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              {secondaryLabel}
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <a
              href={`tel:${phoneNumber}`}
              onClick={() => trackCallClick(location)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              {displayPhone}
            </a>
            <a
              href={`sms:${phoneNumber}`}
              onClick={() => trackTextClick(location)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Text Us
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{headline}</h3>
      <p className="text-gray-600 mb-6">{subheadline}</p>
      
      <div className="flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { trackBookClick(location); onBookClick(); }}
          className="w-full py-3 px-6 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          {primaryLabel}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { trackFormClick(location); onQuoteClick(); }}
          className="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          {secondaryLabel}
        </motion.button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm">
        <a href={`tel:${phoneNumber}`} onClick={() => trackCallClick(location)} className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
          <Phone className="w-3 h-3" /> Call
        </a>
        <span className="text-gray-300">|</span>
        <a href={`sms:${phoneNumber}`} onClick={() => trackTextClick(location)} className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
          <MessageSquare className="w-3 h-3" /> Text
        </a>
      </div>
    </motion.div>
  );
};

