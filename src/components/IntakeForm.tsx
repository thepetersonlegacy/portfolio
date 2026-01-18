import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, DollarSign, Target, Clock, Users, Briefcase } from 'lucide-react';

interface IntakeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const IntakeForm = ({ isOpen, onClose, onSubmitSuccess }: IntakeFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    industry: '',
    companySize: '',
    projectType: '',
    budget: '',
    timeline: '',
    goals: '',
    challenges: '',
    decisionMaker: '',
    referralSource: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create form data for Netlify
    const netlifyFormData = new FormData();
    netlifyFormData.append('form-name', 'intake-form');
    Object.keys(formData).forEach(key => {
      netlifyFormData.append(key, formData[key as keyof typeof formData]);
    });

    try {
      await fetch('/', {
        method: 'POST',
        body: netlifyFormData
      });
      
      setSubmitted(true);
      setTimeout(() => {
        onSubmitSuccess();
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-glass-lg" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-glass-xl rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative border border-glass-white shadow-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {submitted ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Calendar className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">Thank You!</h3>
                <p className="text-gray-600 font-light mb-2">
                  Your intake form has been submitted successfully.
                </p>
                <p className="text-gray-600 font-light">
                  Redirecting you to schedule your consultation...
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-light text-gray-900">Project Intake Form</h2>
                      <p className="text-sm text-gray-600">Help us understand your needs better</p>
                    </div>
                  </div>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Please take 2-3 minutes to share details about your project. This helps us prepare for a productive consultation and ensure we're the right fit for your needs.
                  </p>
                </div>

                <form onSubmit={handleSubmit} name="intake-form" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="intake-form" />
                  
                  {/* Contact Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company/Organization *
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Acme Corporation"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Website (if applicable)
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="https://www.yourwebsite.com"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry *
                        </label>
                        <select
                          name="industry"
                          required
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="">Select industry</option>
                          <option value="technology">Technology/Software</option>
                          <option value="healthcare">Healthcare/Medical</option>
                          <option value="finance">Finance/Banking</option>
                          <option value="legal">Legal Services</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="ecommerce">E-commerce/Retail</option>
                          <option value="hospitality">Hospitality/Food Service</option>
                          <option value="education">Education</option>
                          <option value="nonprofit">Non-profit</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="consulting">Consulting/Professional Services</option>
                          <option value="creative">Creative/Design Agency</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Size *
                        </label>
                        <select
                          name="companySize"
                          required
                          value={formData.companySize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="">Select company size</option>
                          <option value="solo">Solo/Freelancer (1)</option>
                          <option value="small">Small (2-10 employees)</option>
                          <option value="medium">Medium (11-50 employees)</option>
                          <option value="large">Large (51-200 employees)</option>
                          <option value="enterprise">Enterprise (200+ employees)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Project Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What type of project are you looking for? *
                        </label>
                        <select
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="">Select a project type</option>
                          <option value="new-website">New Website Design & Development</option>
                          <option value="redesign">Website Redesign</option>
                          <option value="ecommerce">E-commerce Platform</option>
                          <option value="web-app">Web Application</option>
                          <option value="mobile-app">Mobile App</option>
                          <option value="branding">Branding & Graphic Design</option>
                          <option value="seo-marketing">SEO & Digital Marketing</option>
                          <option value="maintenance">Website Maintenance & Support</option>
                          <option value="other">Other (please specify in goals)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What are your primary goals for this project? *
                        </label>
                        <textarea
                          name="goals"
                          required
                          value={formData.goals}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="e.g., Increase online leads by 50%, modernize brand image, launch e-commerce store..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What challenges are you currently facing? *
                        </label>
                        <textarea
                          name="challenges"
                          required
                          value={formData.challenges}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="e.g., Low conversion rates, outdated design, slow website, not mobile-friendly..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Budget & Timeline
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What is your budget range? *
                        </label>
                        <select
                          name="budget"
                          required
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-3k">Under $3,000</option>
                          <option value="3k-5k">$3,000 - $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-20k">$10,000 - $20,000</option>
                          <option value="20k-50k">$20,000 - $50,000</option>
                          <option value="50k-plus">$50,000+</option>
                          <option value="flexible">Flexible - depends on value</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          When do you need this completed? *
                        </label>
                        <select
                          name="timeline"
                          required
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP (within 2-4 weeks)</option>
                          <option value="1-2-months">1-2 months</option>
                          <option value="2-3-months">2-3 months</option>
                          <option value="3-6-months">3-6 months</option>
                          <option value="6-plus-months">6+ months</option>
                          <option value="flexible">Flexible - quality over speed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Decision Making */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Decision Making
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Are you the primary decision-maker for this project? *
                        </label>
                        <select
                          name="decisionMaker"
                          required
                          value={formData.decisionMaker}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="">Select an option</option>
                          <option value="yes-sole">Yes, I make the final decision</option>
                          <option value="yes-team">Yes, but I need team input</option>
                          <option value="influencer">I'm an influencer, but not the final decision-maker</option>
                          <option value="no">No, someone else decides</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          How did you hear about us?
                        </label>
                        <select
                          name="referralSource"
                          value={formData.referralSource}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="">Select a source</option>
                          <option value="google">Google Search</option>
                          <option value="referral">Referral from a friend/colleague</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="portfolio">Saw your portfolio</option>
                          <option value="case-study">Read a case study</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Submit & Schedule Consultation
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to be contacted about your project inquiry.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


