import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  name: string;
  action: string;
  time: string;
}

export const SocialProofNotification = () => {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  
  const notifications: Notification[] = [
    { name: "Sarah M.", action: "booked a consultation", time: "2 minutes ago" },
    { name: "John D.", action: "downloaded the guide", time: "5 minutes ago" },
    { name: "Lisa K.", action: "started a project", time: "12 minutes ago" },
    { name: "Michael R.", action: "requested a quote", time: "18 minutes ago" },
    { name: "Jennifer P.", action: "booked a consultation", time: "25 minutes ago" },
    { name: "David L.", action: "downloaded the guide", time: "32 minutes ago" },
  ];
  
  useEffect(() => {
    // Show first notification after 10 seconds
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 10000);
    
    // Then show notifications every 20 seconds
    const interval = setInterval(() => {
      showRandomNotification();
    }, 20000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
  const showRandomNotification = () => {
    const random = notifications[Math.floor(Math.random() * notifications.length)];
    setNotification(random);
    setVisible(true);
    
    // Hide after 5 seconds
    setTimeout(() => setVisible(false), 5000);
  };
  
  return (
    <AnimatePresence>
      {visible && notification && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-24 left-4 bg-white shadow-2xl rounded-lg p-4 max-w-sm z-40 border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
            >
              {notification.name[0]}
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium">
                <strong>{notification.name}</strong> {notification.action}
              </p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

