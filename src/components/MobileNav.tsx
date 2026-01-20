import { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const MobileNav = ({ activeSection, setActiveSection }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollPositionRef = useRef(0);

  // Ensure we only render portal on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = ['Home', 'About', 'Projects', 'Contact'];

  // Close menu and restore scroll position
  const closeMenu = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollPositionRef.current);
    setIsOpen(false);
  }, []);

  // Handle navigation item click
  const handleNavClick = useCallback((item: string) => {
    // First close the menu and restore body
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    setIsOpen(false);

    // Update active section
    setActiveSection(item.toLowerCase());

    // Navigate to section after a brief delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(item.toLowerCase());
        if (element) {
          const offsetTop = element.offsetTop - 80; // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 50);
    });
  }, [setActiveSection]);

  // Open menu
  const handleOpenMenu = useCallback(() => {
    scrollPositionRef.current = window.scrollY;
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPositionRef.current}px`;
  }, []);

  // Menu content rendered via portal
  const menuContent = mounted && isOpen ? (
    <div className="md:hidden" style={{ zIndex: 100000 }}>
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        onTouchEnd={(e) => {
          e.preventDefault();
          closeMenu();
        }}
        className="fixed inset-0 bg-black/50"
        style={{
          zIndex: 100000,
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent'
        }}
      />

      {/* Menu Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-gray-200 p-8 shadow-2xl overflow-y-auto"
        style={{
          zIndex: 100001,
          WebkitOverflowScrolling: 'touch',
          transform: 'translateX(0)',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closeMenu}
          onTouchEnd={(e) => {
            e.preventDefault();
            closeMenu();
          }}
          className="absolute top-6 right-6 p-4 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
          aria-label="Close menu"
          style={{
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            cursor: 'pointer',
            minWidth: '48px',
            minHeight: '48px',
          }}
        >
          <X className="w-6 h-6" style={{ pointerEvents: 'none' }} />
        </button>

        <nav className="mt-20 space-y-2" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleNavClick(item)}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleNavClick(item);
              }}
              className={`block w-full text-left text-2xl font-light transition-colors py-4 px-4 rounded-lg ${
                activeSection === item.toLowerCase()
                  ? 'text-red-600 font-normal bg-red-50'
                  : 'text-gray-600 hover:text-red-500 active:text-red-600 active:bg-gray-100'
              }`}
              style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                cursor: 'pointer',
                minHeight: '56px',
              }}
            >
              {item}
            </button>
          ))}

          <div className="pt-8 mt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4 px-4">Get in touch</p>
            <a
              href="mailto:eldon@petersonproservices.com"
              className="text-lg text-gray-900 hover:text-gray-600 active:text-gray-800 transition-colors block py-4 px-4 rounded-lg"
              style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                cursor: 'pointer',
                minHeight: '56px',
              }}
            >
              eldon@petersonproservices.com
            </a>
          </div>
        </nav>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={handleOpenMenu}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleOpenMenu();
        }}
        className="md:hidden p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          cursor: 'pointer',
          minWidth: '48px',
          minHeight: '48px',
        }}
      >
        <Menu className="w-6 h-6" style={{ pointerEvents: 'none' }} />
      </button>

      {/* Render menu via portal to body */}
      {mounted && createPortal(menuContent, document.body)}
    </>
  );
};
