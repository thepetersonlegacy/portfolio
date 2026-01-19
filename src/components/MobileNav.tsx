import { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const MobileNav = ({ activeSection, setActiveSection }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Ref to prevent double-firing from both touch and click
  const touchHandledRef = useRef(false);

  // Ensure we only render portal on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const menuVariants = {
    closed: { x: "100%", opacity: 1 },
    open: {
      x: 0,
      opacity: 1,
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
    document.body.style.overflow = '';
    setActiveSection(item.toLowerCase());
    // Small delay to allow menu close animation before scrolling
    setTimeout(() => {
      const element = document.getElementById(item.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  }, [setActiveSection]);

  // iOS Safari-friendly touch handler wrapper
  const createTouchHandler = (handler: () => void) => ({
    onTouchStart: () => {
      touchHandledRef.current = false;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      touchHandledRef.current = true;
      handler();
    },
    onClick: (e: React.MouseEvent) => {
      // Only handle click if touch didn't already handle it
      if (!touchHandledRef.current) {
        e.preventDefault();
        handler();
      }
      touchHandledRef.current = false;
    }
  });

  const handleOpenMenu = useCallback(() => {
    setIsOpen(true);
    // Prevent body scroll when menu is open (iOS fix)
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
  }, []);

  const handleCloseMenu = useCallback(() => {
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    setIsOpen(false);
  }, []);

  // Menu content rendered via portal to avoid z-index stacking context issues on iOS
  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - iOS optimized */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...createTouchHandler(handleCloseMenu)}
            className="fixed inset-0 bg-black/50 md:hidden"
            style={{
              zIndex: 99999,
              touchAction: 'none',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent'
            }}
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
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-gray-200 p-8 shadow-2xl overflow-y-auto overscroll-contain md:hidden"
            style={{
              zIndex: 100000,
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Close button - iOS optimized */}
            <button
              type="button"
              {...createTouchHandler(handleCloseMenu)}
              className="absolute top-6 right-6 p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors select-none"
              aria-label="Close menu"
              style={{
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                touchAction: 'manipulation',
                cursor: 'pointer'
              }}
            >
              <X className="w-6 h-6 pointer-events-none" />
            </button>

            <nav className="mt-16 space-y-4" aria-label="Mobile navigation">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  type="button"
                  custom={i}
                  variants={linkVariants}
                  {...createTouchHandler(() => handleNavClick(item))}
                  className={`block w-full text-left text-2xl font-light transition-colors py-3 px-2 rounded-lg select-none ${
                    activeSection === item.toLowerCase()
                      ? 'text-red-600 font-normal bg-red-50'
                      : 'text-gray-600 hover:text-red-500 active:text-red-600 active:bg-gray-100'
                  }`}
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    WebkitTouchCallout: 'none',
                    touchAction: 'manipulation',
                    cursor: 'pointer'
                  }}
                >
                  {item}
                </motion.button>
              ))}

              <motion.div
                custom={navItems.length}
                variants={linkVariants}
                className="pt-6 mt-4 border-t border-gray-200"
              >
                <p className="text-sm text-gray-500 mb-4">Get in touch</p>
                <a
                  href="mailto:eldon@petersonproservices.com"
                  className="text-lg text-gray-900 hover:text-gray-600 active:text-gray-800 transition-colors block py-3 px-2 rounded-lg select-none"
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    WebkitTouchCallout: 'none',
                    touchAction: 'manipulation',
                    cursor: 'pointer'
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
  );

  return (
    <>
      {/* Mobile hamburger button - optimized for iOS Safari */}
      <button
        type="button"
        {...createTouchHandler(handleOpenMenu)}
        className="md:hidden p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors select-none"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        style={{
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'manipulation',
          cursor: 'pointer'
        }}
      >
        <Menu className="w-6 h-6 pointer-events-none" />
      </button>

      {/* Render menu via portal to body to avoid z-index stacking issues on iOS */}
      {mounted && createPortal(menuContent, document.body)}
    </>
  );
};
