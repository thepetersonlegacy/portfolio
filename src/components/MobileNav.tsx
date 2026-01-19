import { useState, useCallback } from 'react';
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

  const handleNavClick = useCallback((item: string) => {
    setIsOpen(false);
    setActiveSection(item.toLowerCase());
    // Small delay to allow menu close animation before scrolling
    setTimeout(() => {
      const element = document.getElementById(item.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [setActiveSection]);

  const handleOpenMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Mobile hamburger button - using native button for better touch support */}
      <button
        type="button"
        onClick={handleOpenMenu}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleOpenMenu();
        }}
        className="md:hidden p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-manipulation"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation'
        }}
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - higher z-index to ensure it's above other elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseMenu}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleCloseMenu();
              }}
              className="fixed inset-0 bg-black/50 z-[100] md:hidden"
              style={{ touchAction: 'none' }}
              id="mobile-menu-backdrop"
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-gray-200 z-[101] p-8 shadow-2xl overflow-y-auto"
            >
              {/* Close button - native button for better touch support */}
              <button
                type="button"
                onClick={handleCloseMenu}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleCloseMenu();
                }}
                className="absolute top-6 right-6 p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-manipulation"
                aria-label="Close menu"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <X className="w-6 h-6" />
              </button>

              <nav className="mt-16 space-y-6" aria-label="Mobile navigation">
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
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}
                    className={`block text-2xl font-light transition-colors py-2 touch-manipulation ${
                      activeSection === item.toLowerCase()
                        ? 'text-red-600 font-normal'
                        : 'text-gray-600 hover:text-red-500 active:text-red-600'
                    }`}
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
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
                    className="text-lg text-gray-900 hover:text-gray-600 active:text-gray-800 transition-colors block mb-2 py-2 touch-manipulation"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
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
