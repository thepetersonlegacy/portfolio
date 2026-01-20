import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
  const content = type === 'terms' ? termsContent : privacyContent;
  const title = type === 'terms' ? 'Terms of Service' : 'Privacy Policy';

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              <div className="prose prose-gray max-w-none">
                <p className="text-sm text-gray-500 mb-6">Last updated: January 2026</p>
                {content}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const termsContent = (
  <>
    <h3>1. Agreement to Terms</h3>
    <p>
      By accessing or using the services provided by Peterson Pro Services, LLC ("Company," "we," "us," or "our"), 
      you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
    </p>

    <h3>2. Services</h3>
    <p>
      Peterson Pro Services provides web design, development, and related digital services. The specific scope of work, 
      deliverables, timelines, and pricing will be outlined in a separate project agreement or proposal for each engagement.
    </p>

    <h3>3. Client Responsibilities</h3>
    <p>Clients agree to:</p>
    <ul>
      <li>Provide timely feedback and approvals as requested</li>
      <li>Supply all necessary content, images, and materials needed for the project</li>
      <li>Ensure they have the rights to use all materials provided</li>
      <li>Make payments according to the agreed-upon schedule</li>
    </ul>

    <h3>4. Payment Terms</h3>
    <p>
      Payment terms will be specified in individual project agreements. Generally, projects require a deposit before 
      work begins, with the balance due upon completion. Late payments may incur additional fees.
    </p>

    <h3>5. Intellectual Property</h3>
    <p>
      Upon full payment, clients receive ownership of the final deliverables created specifically for their project. 
      We retain the right to display completed work in our portfolio and marketing materials unless otherwise agreed in writing.
    </p>

    <h3>6. Revisions and Changes</h3>
    <p>
      The number of revision rounds included will be specified in each project agreement. Additional revisions or 
      scope changes may incur additional fees.
    </p>

    <h3>7. Limitation of Liability</h3>
    <p>
      To the maximum extent permitted by law, Peterson Pro Services shall not be liable for any indirect, incidental, 
      special, consequential, or punitive damages arising from the use of our services.
    </p>

    <h3>8. Termination</h3>
    <p>
      Either party may terminate an engagement with written notice. Upon termination, the client is responsible for 
      payment for all work completed up to the termination date.
    </p>

    <h3>9. Governing Law</h3>
    <p>
      These terms are governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Texas.
    </p>

    <h3>10. Contact</h3>
    <p>
      For questions about these Terms of Service, please contact us at:<br />
      <strong>Email:</strong> eldon@petersonproservices.com<br />
      <strong>Phone:</strong> (409) 656-7142
    </p>
  </>
);

const privacyContent = (
  <>
    <h3>1. Information We Collect</h3>
    <p>We collect information you provide directly to us, including:</p>
    <ul>
      <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
      <li><strong>Project Information:</strong> Details about your business and project requirements</li>
      <li><strong>Communication Data:</strong> Messages and correspondence with us</li>
    </ul>

    <h3>2. Automatic Information Collection</h3>
    <p>When you visit our website, we automatically collect:</p>
    <ul>
      <li>Device and browser information</li>
      <li>IP address and general location</li>
      <li>Pages visited and time spent on site</li>
      <li>Referring website information</li>
    </ul>
    <p>We use Google Analytics to collect and analyze this data to improve our website and services.</p>

    <h3>3. How We Use Your Information</h3>
    <p>We use the information we collect to:</p>
    <ul>
      <li>Respond to your inquiries and provide requested services</li>
      <li>Send project updates and communications</li>
      <li>Improve our website and services</li>
      <li>Send marketing communications (with your consent)</li>
      <li>Comply with legal obligations</li>
    </ul>

    <h3>4. Information Sharing</h3>
    <p>
      We do not sell your personal information. We may share your information with:
    </p>
    <ul>
      <li>Service providers who assist in our operations (hosting, email, analytics)</li>
      <li>Professional advisors (lawyers, accountants) as needed</li>
      <li>Law enforcement when required by law</li>
    </ul>

    <h3>5. Data Security</h3>
    <p>
      We implement appropriate technical and organizational measures to protect your personal information.
      However, no method of transmission over the Internet is 100% secure.
    </p>

    <h3>6. Your Rights</h3>
    <p>You have the right to:</p>
    <ul>
      <li>Access the personal information we hold about you</li>
      <li>Request correction of inaccurate information</li>
      <li>Request deletion of your information</li>
      <li>Opt out of marketing communications</li>
    </ul>

    <h3>7. Cookies</h3>
    <p>
      We use cookies and similar technologies to enhance your experience on our website. You can control
      cookie settings through your browser preferences.
    </p>

    <h3>8. Third-Party Links</h3>
    <p>
      Our website may contain links to third-party websites. We are not responsible for the privacy
      practices of these external sites.
    </p>

    <h3>9. Changes to This Policy</h3>
    <p>
      We may update this Privacy Policy from time to time. We will notify you of any material changes
      by posting the new policy on this page with an updated "Last Updated" date.
    </p>

    <h3>10. Contact Us</h3>
    <p>
      If you have questions about this Privacy Policy or our data practices, please contact us at:<br />
      <strong>Email:</strong> eldon@petersonproservices.com<br />
      <strong>Phone:</strong> (409) 656-7142<br />
      <strong>Address:</strong> Southeast Texas
    </p>
  </>
);

