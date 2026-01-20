import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, FileText } from 'lucide-react';
import { trackLeadFormSubmit } from '../utils/analytics';

interface FastQuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FastQuoteForm = ({ isOpen, onClose }: FastQuoteFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    businessType: '',
    serviceNeeded: '',
    ninetyDayGoal: '',
    wantsPhoneCall: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const netlifyFormData = new FormData();
    netlifyFormData.append('form-name', 'fast-quote');
    Object.entries(formData).forEach(([key, value]) => {
      netlifyFormData.append(key, String(value));
    });

    try {
      await fetch('/', {
        method: 'POST',
        body: netlifyFormData
      });
      trackLeadFormSubmit('fast-quote', 'fast_quote_modal');
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setFormData({
      name: '', email: '', company: '', website: '', businessType: '',
      serviceNeeded: '', ninetyDayGoal: '', wantsPhoneCall: false
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={resetAndClose}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl"
          >
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">Request Received!</h3>
                <p className="text-gray-600 mb-4">We'll get back to you within 24 hours with your custom quote.</p>
                <button onClick={resetAndClose} className="text-red-600 hover:text-red-700 font-medium">
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Get a Fast Quote</h2>
                    <p className="text-sm text-gray-500">No call needed • Response within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} name="fast-quote" method="POST" data-netlify="true" className="space-y-4">
                  <input type="hidden" name="form-name" value="fast-quote" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                      <input type="text" name="company" required value={formData.company} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Acme Inc" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                      <input type="url" name="website" value={formData.website} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="https://..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
                      <select name="businessType" required value={formData.businessType} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                        <option value="">Select...</option>
                        <option value="law-firm">Law Firm</option>
                        <option value="aviation">Aviation</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed *</label>
                      <select name="serviceNeeded" required value={formData.serviceNeeded} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                        <option value="">Select...</option>
                        <option value="new-website">New Website</option>
                        <option value="redesign">Website Redesign</option>
                        <option value="conversion-optimization">Conversion Optimization</option>
                        <option value="landing-page">Landing Page</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What's your #1 goal in the next 90 days? *</label>
                    <textarea name="ninetyDayGoal" required value={formData.ninetyDayGoal} onChange={handleChange} rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="e.g., Get more leads, launch new service, improve conversions..." />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="wantsPhoneCall" checked={formData.wantsPhoneCall} onChange={handleChange}
                      className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                    <span className="text-sm text-gray-700">I'm open to a quick call if it helps clarify the quote</span>
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send My Request</>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

