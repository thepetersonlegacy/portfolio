import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, CheckCircle2, Calendar, FileText, Star } from 'lucide-react';

interface Notification {
  name: string;
  action: string;
  detail?: string;
  location: string;
  time: string;
  icon: 'calendar' | 'file' | 'trending' | 'star' | 'check';
  highlight?: string;
}

export const SocialProofNotification = () => {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const notifications: Notification[] = [
    {
      name: "Michael H.",
      action: "just booked a strategy session",
      detail: "Law Firm Owner",
      location: "Dallas, TX",
      time: "2 minutes ago",
      icon: 'calendar',
      highlight: "$12K project"
    },
    {
      name: "Sarah M.",
      action: "increased leads by",
      detail: "156%",
      location: "Atlanta, GA",
      time: "Yesterday",
      icon: 'trending',
      highlight: "90 days"
    },
    {
      name: "Jennifer K.",
      action: "started her website project",
      detail: "Aviation Company",
      location: "Phoenix, AZ",
      time: "5 minutes ago",
      icon: 'check'
    },
    {
      name: "Robert L.",
      action: "downloaded the free audit",
      detail: "Real Estate",
      location: "Miami, FL",
      time: "8 minutes ago",
      icon: 'file'
    },
    {
      name: "David W.",
      action: "left a 5-star review",
      detail: '"Best decision for our firm"',
      location: "Chicago, IL",
      time: "1 hour ago",
      icon: 'star'
    },
    {
      name: "Amanda P.",
      action: "just signed up for",
      detail: "Professional tier",
      location: "Seattle, WA",
      time: "12 minutes ago",
      icon: 'check',
      highlight: "$12K value"
    },
    {
      name: "James T.",
      action: "conversion rate increased",
      detail: "3.2x",
      location: "Austin, TX",
      time: "This week",
      icon: 'trending',
      highlight: "60 days"
    },
    {
      name: "Lisa R.",
      action: "booked remaining spot",
      detail: "2 of 3 left",
      location: "Denver, CO",
      time: "Just now",
      icon: 'calendar',
      highlight: "Limited availability"
    },
  ];

  const iconMap = {
    calendar: Calendar,
    file: FileText,
    trending: TrendingUp,
    star: Star,
    check: CheckCircle2
  };

  useEffect(() => {
    // Show first notification after 8 seconds
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 8000);

    // Then show notifications every 25 seconds
    const interval = setInterval(() => {
      showRandomNotification();
    }, 25000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const showRandomNotification = () => {
    const random = notifications[Math.floor(Math.random() * notifications.length)];
    setNotification(random);
    setVisible(true);

    // Hide after 6 seconds
    setTimeout(() => setVisible(false), 6000);
  };

  const IconComponent = notification ? iconMap[notification.icon] : CheckCircle2;

  return (
    <AnimatePresence>
      {visible && notification && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-24 left-4 bg-white shadow-2xl rounded-xl p-4 max-w-xs z-40 border border-gray-100 hidden md:block"
        >
          {/* Verified badge */}
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Verified
          </div>

          <div className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center text-white text-lg font-semibold flex-shrink-0 shadow-gold-glow"
            >
              <IconComponent className="w-6 h-6" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <strong className="font-semibold">{notification.name}</strong> {notification.action}
                {notification.detail && (
                  <span className="font-semibold text-gold-700"> {notification.detail}</span>
                )}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-gray-500">{notification.location}</p>
                <span className="text-gray-300">•</span>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              {notification.highlight && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block mt-2 text-xs bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full font-medium"
                >
                  {notification.highlight}
                </motion.span>
              )}
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

