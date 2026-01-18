import { ReactNode } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const BottomSheet = ({ isOpen, onClose, children, title }: BottomSheetProps) => {
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm md:hidden"
          />
          
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[60] max-h-[90vh] overflow-y-auto md:hidden shadow-2xl"
          >
            {/* Drag handle */}
            <div className="sticky top-0 bg-white pt-4 pb-2 flex justify-center border-b border-gray-100 z-10">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>
            
            {title && (
              <div className="sticky top-[28px] bg-white px-6 py-4 border-b border-gray-100 z-10">
                <h3 className="text-xl font-light text-gray-900">{title}</h3>
              </div>
            )}
            
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

