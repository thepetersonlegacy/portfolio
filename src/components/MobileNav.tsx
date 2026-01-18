import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const MobileNav = ({ activeSection, setActiveSection }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuVariants = {
    closed: { x: "100%" },
    open: { 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
  
  const linkVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 }
    })
  };
  
  const navItems = ['Home', 'About', 'Projects', 'Contact'];
  
  const handleNavClick = (item: string) => {
    setIsOpen(false);
    setActiveSection(item.toLowerCase());
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-50 md:hidden backdrop-blur-glass"
            />

            {/* Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-80 bg-white/90 backdrop-blur-glass-lg border-l border-glass-white z-50 p-8 shadow-2xl overflow-y-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </motion.button>
              
              <nav className="mt-16 space-y-6">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item}
                    custom={i}
                    variants={linkVariants}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}
                    className={`block text-2xl font-light transition-colors ${
                      activeSection === item.toLowerCase()
                        ? 'text-gray-900 font-normal'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item}
                  </motion.a>
                ))}
                
                <motion.div
                  custom={navItems.length}
                  variants={linkVariants}
                  className="pt-6 border-t border-gray-200"
                >
                  <p className="text-sm text-gray-500 mb-4">Get in touch</p>
                  <a 
                    href="mailto:eldon@petersonproservices.com"
                    className="text-lg text-gray-900 hover:text-gray-600 transition-colors block mb-2"
                  >
                    eldon@petersonproservices.com
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

