import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  Clock3, 
  Star, 
  Heart, 
  Share2, 
  Download, 
  Upload, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Phone, 
  Mail, 
  MessageCircle, 
  Bell, 
  Settings, 
  Filter, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  Target, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity, 
  Zap, 
  Award, 
  Camera, 
  Mic, 
  Utensils, 
  Car, 
  Flower, 
  Gift, 
  Cake, 
  Palette, 
  Lightbulb, 
  Shield, 
  Truck, 
  Home, 
  Building, 
  TreePine, 
  Waves, 
  Sun, 
  Moon, 
  Cloud, 
  Sparkles, 
  Crown, 
  Diamond, 
  Gem
} from 'lucide-react';

interface GrandeurEventsDemoProps {
  onClose: () => void;
}

interface Event {
  id: string;
  title: string;
  type: 'wedding' | 'corporate' | 'birthday' | 'anniversary' | 'conference' | 'gala';
  client: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
    capacity: number;
    type: string;
  };
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
  guests: number;
  status: 'planning' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
  vendors: Vendor[];
  timeline: TimelineItem[];
  documents: Document[];
  notes: string;
  tags: string[];
}

interface Vendor {
  id: string;
  name: string;
  category: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  rating: number;
  cost: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  services: string[];
  notes: string;
}

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'invoice' | 'proposal' | 'image' | 'video' | 'other';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const GrandeurEventsDemo: React.FC<GrandeurEventsDemoProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'events' | 'vendors' | 'calendar' | 'clients' | 'reports'>('dashboard');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const events: Event[] = [
    {
      id: '1',
      title: 'Sarah & Michael\'s Wedding',
      type: 'wedding',
      client: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        avatar: 'SJ'
      },
      date: '2024-06-15',
      time: '4:00 PM',
      venue: {
        name: 'Grand Ballroom at The Ritz',
        address: '123 Luxury Ave, Beverly Hills, CA',
        capacity: 200,
        type: 'Hotel Ballroom'
      },
      budget: {
        total: 75000,
        spent: 52000,
        remaining: 23000
      },
      guests: 150,
      status: 'confirmed',
      priority: 'high',
      progress: 75,
      vendors: [
        {
          id: 'v1',
          name: 'Elegant Florals',
          category: 'Florist',
          contact: { name: 'Maria Garcia', email: 'maria@elegantflorals.com', phone: '+1 (555) 234-5678' },
          rating: 4.9,
          cost: 8500,
          status: 'confirmed',
          services: ['Bridal Bouquet', 'Centerpieces', 'Ceremony Arch'],
          notes: 'Specializes in romantic garden-style arrangements'
        },
        {
          id: 'v2',
          name: 'Gourmet Catering Co.',
          category: 'Catering',
          contact: { name: 'Chef Robert', email: 'robert@gourmetcatering.com', phone: '+1 (555) 345-6789' },
          rating: 4.8,
          cost: 25000,
          status: 'confirmed',
          services: ['Cocktail Hour', 'Dinner Service', 'Wedding Cake'],
          notes: 'Farm-to-table cuisine with dietary accommodations'
        }
      ],
      timeline: [
        {
          id: 't1',
          title: 'Final Venue Walkthrough',
          description: 'Meet with venue coordinator for final details',
          date: '2024-06-10',
          time: '2:00 PM',
          status: 'pending',
          assignee: 'Event Coordinator',
          priority: 'high',
          category: 'Venue'
        },
        {
          id: 't2',
          title: 'Floral Delivery',
          description: 'Flowers arrive and setup begins',
          date: '2024-06-15',
          time: '10:00 AM',
          status: 'pending',
          assignee: 'Elegant Florals',
          priority: 'medium',
          category: 'Decor'
        }
      ],
      documents: [
        {
          id: 'd1',
          name: 'Venue Contract.pdf',
          type: 'contract',
          size: '2.4 MB',
          uploadedBy: 'Sarah Johnson',
          uploadedAt: '2024-01-15',
          status: 'approved'
        },
        {
          id: 'd2',
          name: 'Catering Menu.pdf',
          type: 'proposal',
          size: '1.8 MB',
          uploadedBy: 'Gourmet Catering Co.',
          uploadedAt: '2024-02-20',
          status: 'approved'
        }
      ],
      notes: 'Bride prefers blush and ivory color scheme. Groom has nut allergy - ensure catering is aware.',
      tags: ['Luxury', 'Garden Theme', 'Evening Reception']
    },
    {
      id: '2',
      title: 'TechCorp Annual Conference',
      type: 'corporate',
      client: {
        name: 'David Chen',
        email: 'david.chen@techcorp.com',
        phone: '+1 (555) 987-6543',
        avatar: 'DC'
      },
      date: '2024-05-20',
      time: '9:00 AM',
      venue: {
        name: 'Convention Center West',
        address: '456 Business Blvd, Downtown, CA',
        capacity: 500,
        type: 'Convention Center'
      },
      budget: {
        total: 120000,
        spent: 85000,
        remaining: 35000
      },
      guests: 400,
      status: 'planning',
      priority: 'medium',
      progress: 60,
      vendors: [
        {
          id: 'v3',
          name: 'AV Solutions Pro',
          category: 'Audio/Visual',
          contact: { name: 'Mike Thompson', email: 'mike@avsolutions.com', phone: '+1 (555) 456-7890' },
          rating: 4.7,
          cost: 35000,
          status: 'confirmed',
          services: ['Stage Setup', 'Sound System', 'Live Streaming'],
          notes: 'Experienced with large corporate events'
        }
      ],
      timeline: [
        {
          id: 't3',
          title: 'Speaker Confirmation',
          description: 'Confirm all keynote speakers and their requirements',
          date: '2024-05-15',
          time: '5:00 PM',
          status: 'in-progress',
          assignee: 'Event Manager',
          priority: 'high',
          category: 'Speakers'
        }
      ],
      documents: [
        {
          id: 'd3',
          name: 'Speaker Lineup.xlsx',
          type: 'other',
          size: '856 KB',
          uploadedBy: 'David Chen',
          uploadedAt: '2024-03-10',
          status: 'approved'
        }
      ],
      notes: 'Focus on innovation and technology trends. Need live streaming for remote attendees.',
      tags: ['Corporate', 'Technology', 'Networking']
    },
    {
      id: '3',
      title: 'Emma\'s Sweet 16',
      type: 'birthday',
      client: {
        name: 'Jennifer Martinez',
        email: 'jennifer.martinez@email.com',
        phone: '+1 (555) 321-9876',
        avatar: 'JM'
      },
      date: '2024-07-08',
      time: '6:00 PM',
      venue: {
        name: 'Sunset Terrace',
        address: '789 Garden View Dr, Malibu, CA',
        capacity: 100,
        type: 'Outdoor Venue'
      },
      budget: {
        total: 15000,
        spent: 8500,
        remaining: 6500
      },
      guests: 75,
      status: 'planning',
      priority: 'medium',
      progress: 45,
      vendors: [
        {
          id: 'v4',
          name: 'Party Perfect DJ',
          category: 'Entertainment',
          contact: { name: 'Alex Rivera', email: 'alex@partyperfect.com', phone: '+1 (555) 567-8901' },
          rating: 4.6,
          cost: 2500,
          status: 'pending',
          services: ['DJ Services', 'Lighting', 'Photo Booth'],
          notes: 'Specializes in teen parties and current music trends'
        }
      ],
      timeline: [
        {
          id: 't4',
          title: 'Theme Finalization',
          description: 'Confirm party theme and decoration requirements',
          date: '2024-06-20',
          time: '3:00 PM',
          status: 'pending',
          assignee: 'Party Planner',
          priority: 'medium',
          category: 'Planning'
        }
      ],
      documents: [
        {
          id: 'd4',
          name: 'Theme Inspiration.jpg',
          type: 'image',
          size: '3.2 MB',
          uploadedBy: 'Jennifer Martinez',
          uploadedAt: '2024-04-05',
          status: 'pending'
        }
      ],
      notes: 'Emma loves pink and gold theme. Wants a memorable photo booth experience.',
      tags: ['Teen Party', 'Outdoor', 'Photo Booth']
    }
  ];

  const vendorCategories = [
    { name: 'Catering', icon: Utensils, count: 24 },
    { name: 'Photography', icon: Camera, count: 18 },
    { name: 'Florist', icon: Flower, count: 15 },
    { name: 'Entertainment', icon: Music, count: 12 },
    { name: 'Audio/Visual', icon: Mic, count: 8 },
    { name: 'Transportation', icon: Car, count: 6 },
    { name: 'Decor', icon: Palette, count: 20 },
    { name: 'Venue', icon: Building, count: 10 }
  ];

  const recentActivities = [
    { id: '1', type: 'vendor_confirmed', message: 'Elegant Florals confirmed for Sarah\'s Wedding', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
    { id: '2', type: 'payment_received', message: 'Payment received from TechCorp Conference', time: '4 hours ago', icon: DollarSign, color: 'text-blue-500' },
    { id: '3', type: 'document_uploaded', message: 'New contract uploaded for Emma\'s Sweet 16', time: '6 hours ago', icon: FileText, color: 'text-purple-500' },
    { id: '4', type: 'deadline_approaching', message: 'Venue walkthrough due in 2 days', time: '1 day ago', icon: AlertTriangle, color: 'text-yellow-500' }
  ];

  const stats = [
    { label: 'Active Events', value: '12', change: '+3', trend: 'up', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Revenue', value: '$485K', change: '+12%', trend: 'up', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { label: 'Happy Clients', value: '98%', change: '+2%', trend: 'up', icon: Heart, color: 'from-pink-500 to-pink-600' },
    { label: 'Vendor Partners', value: '156', change: '+8', trend: 'up', icon: Users, color: 'from-purple-500 to-purple-600' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.client.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'wedding': return Heart;
      case 'corporate': return Building;
      case 'birthday': return Cake;
      case 'anniversary': return Crown;
      case 'conference': return Users;
      case 'gala': return Diamond;
      default: return Calendar;
    }
  };

  const EventCard: React.FC<{ event: Event; onClick: () => void }> = ({ event, onClick }) => {
    const TypeIcon = getEventTypeIcon(event.type);
    const progressColor = event.progress >= 75 ? 'from-green-500 to-green-600' : 
                         event.progress >= 50 ? 'from-blue-500 to-blue-600' : 
                         'from-yellow-500 to-yellow-600';

    return (
      <div 
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <TypeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
              <p className="text-gray-600">{event.client.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(event.priority)}`}>
              {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{event.venue.name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">{event.guests} guests</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-bold text-gray-900">{event.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${progressColor} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${event.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-600">Budget: </span>
            <span className="font-semibold text-gray-900">
              ${event.budget.spent.toLocaleString()} / ${event.budget.total.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{event.vendors.length} vendors</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    );
  };

  const EventDetailModal: React.FC = () => {
    if (!selectedEvent) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                <p className="text-purple-100">{selectedEvent.client.name} • {new Date(selectedEvent.date).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex h-[calc(90vh-120px)]">
            {/* Sidebar */}
            <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Event Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{new Date(selectedEvent.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium">{selectedEvent.venue.name}</p>
                        <p className="text-gray-500">{selectedEvent.venue.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedEvent.guests} guests</span>
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Budget Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Budget</span>
                      <span className="text-sm font-medium">${selectedEvent.budget.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Spent</span>
                      <span className="text-sm font-medium text-red-600">${selectedEvent.budget.spent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Remaining</span>
                      <span className="text-sm font-medium text-green-600">${selectedEvent.budget.remaining.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${(selectedEvent.budget.spent / selectedEvent.budget.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Client Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{selectedEvent.client.avatar}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{selectedEvent.client.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedEvent.client.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedEvent.client.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Timeline */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Timeline</h3>
                      <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                        Add Task
                      </button>
                    </div>
                    <div className="space-y-4">
                      {selectedEvent.timeline.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className={`w-3 h-3 rounded-full mt-2 ${
                            item.status === 'completed' ? 'bg-green-500' :
                            item.status === 'in-progress' ? 'bg-blue-500' :
                            item.status === 'overdue' ? 'bg-red-500' : 'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{new Date(item.date).toLocaleDateString()} at {item.time}</span>
                              <span>Assigned to: {item.assignee}</span>
                              <span className={`px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                                {item.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vendors */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Vendors</h3>
                      <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                        Add Vendor
                      </button>
                    </div>
                    <div className="space-y-4">
                      {selectedEvent.vendors.map((vendor) => (
                        <div key={vendor.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(vendor.status)}`}>
                              {vendor.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{vendor.rating}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">${vendor.cost.toLocaleString()}</span>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">{vendor.services.join(', ')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                      <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                        Upload
                      </button>
                    </div>
                    <div className="space-y-3">
                      {selectedEvent.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                          <FileText className="w-5 h-5 text-gray-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size} • {doc.uploadedBy}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">{selectedEvent.notes}</p>
                    </div>
                    <button className="mt-3 text-purple-600 text-sm font-medium hover:text-purple-700">
                      Edit Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-3 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
          >
            <Plus className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-700">New Event</span>
          </button>
          <button 
            onClick={() => setShowVendorModal(true)}
            className="flex items-center gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-700">Add Vendor</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 transition-colors">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-700">Schedule Meeting</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl hover:bg-orange-100 transition-colors">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-orange-700">View Reports</span>
          </button>
        </div>
      </div>

      {/* Recent Events */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            <button 
              onClick={() => setCurrentView('events')}
              className="text-purple-600 text-sm font-medium hover:text-purple-700"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} • {event.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color} bg-opacity-10`}>
                    <IconComponent className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vendor Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Vendor Categories</h3>
          <button 
            onClick={() => setCurrentView('vendors')}
            className="text-purple-600 text-sm font-medium hover:text-purple-700"
          >
            Manage Vendors
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vendorCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.name} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.count} vendors</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const EventsView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
          <p className="text-gray-600">Manage all your events and track their progress</p>
        </div>
        <button 
          onClick={() => setShowEventModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Types</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
          </select>
          
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or create a new event</p>
          <button 
            onClick={() => setShowEventModal(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Create New Event
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Grandeur Events
                </h1>
                <p className="text-gray-600">Professional Event Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center space-x-6">
                {['Dashboard', 'Events', 'Vendors', 'Calendar', 'Reports'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setCurrentView(item.toLowerCase() as any)}
                    className={`font-medium transition-colors ${
                      currentView === item.toLowerCase() 
                        ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">GM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'events' && <EventsView />}
        {currentView === 'vendors' && (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vendor Management</h2>
            <p className="text-gray-600">Manage your vendor network and partnerships</p>
          </div>
        )}
        {currentView === 'calendar' && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Calendar</h2>
            <p className="text-gray-600">View all events in calendar format</p>
          </div>
        )}
        {currentView === 'reports' && (
          <div className="text-center py-20">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Reports</h2>
            <p className="text-gray-600">Track performance and generate insights</p>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && <EventDetailModal />}

      {/* New Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-2xl w-full bg-white rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Create New Event</h3>
              <button 
                onClick={() => setShowEventModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Conference</option>
                    <option>Gala</option>
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter client name"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guest Count</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Number of guests"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Total budget"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Venue name and address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Additional notes and requirements"
                ></textarea>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color} bg-opacity-10`}>
                      <IconComponent className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full text-center text-purple-600 text-sm font-medium hover:text-purple-700">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};