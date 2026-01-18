import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Clock, Users, MapPin, DollarSign, Star, Heart, Share2, Download, Upload, FileText, Image, Video, Music, Phone, Mail, MessageCircle, Bell, Settings, Filter, Search, Plus, Edit, Trash2, Eye, MoreHorizontal, ChevronDown, ChevronRight, ChevronLeft, X, Check, AlertTriangle, Info, Target, TrendingUp, BarChart3, PieChart, Activity, Zap, Award, Camera, Mic, Utensils, Car, Flower, Gift, Cake, Palette, Lightbulb, Shield, Truck, Home, Building, TreePine, Waves, Sun, Moon, Cloud, Sparkles, Crown, Diamond, Gem, Send, UserPlus, Database, BarChart, Workflow, CheckCircle, AlertCircle, Clock3, ThumbsUp as Thumbsup, ThumbsDown as Thumbsdown, TrendingDown, Play } from 'lucide-react';

interface PriceRange {
  min: number;
  max: number;
}

interface HeritageEventDemoProps {
  services: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  image: string;
  featured: boolean;
}

interface Booking {
  id: string;
  eventName: string;
  clientName: string;
  date: string;
  time: string;
  space: string;
  guests: number;
  status: 'inquiry' | 'confirmed' | 'pending' | 'completed';
  package: string;
  total: number;
  notes: string;
}

export const HeritageEventDemo: React.FC<HeritageEventDemoProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'home' | 'spaces' | 'packages' | 'vendors' | 'booking' | 'virtual-tour' | 'gallery' | 'contact'>('home');
  const [selectedSpace, setSelectedSpace] = useState<VenueSpace | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<EventPackage | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [guestCount, setGuestCount] = useState(100);
  const [eventType, setEventType] = useState('wedding');
  const [tourMode, setTourMode] = useState<'360' | '3d' | 'walkthrough'>('360');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const venueSpaces: VenueSpace[] = [
    {
      id: '1',
      name: 'Grand Ballroom',
      type: 'Ballroom',
      capacity: {
        seated: 300,
        standing: 500,
        cocktail: 400
      },
      size: '4,500 sq ft',
      features: ['Crystal Chandeliers', 'Hardwood Dance Floor', 'Built-in Bar', 'Stage Area', 'Bridal Suite'],
      pricing: {
        base: 8500,
        weekend: 10500,
        holiday: 12500
      },
      images: [
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      virtualTour: 'grand-ballroom-tour',
      availability: {
        '2024-06-15': false,
        '2024-06-22': true,
        '2024-06-29': true,
        '2024-07-06': false
      },
      amenities: ['Climate Control', 'Professional Lighting', 'Sound System', 'WiFi', 'Parking'],
      layout: 'Open Floor Plan',
      description: 'Our flagship venue featuring soaring ceilings, elegant crystal chandeliers, and a spacious hardwood dance floor. Perfect for weddings, galas, and corporate events.'
    },
    {
      id: '2',
      name: 'Garden Pavilion',
      type: 'Outdoor',
      capacity: {
        seated: 150,
        standing: 250,
        cocktail: 200
      },
      size: '3,000 sq ft',
      features: ['Garden Views', 'Covered Pavilion', 'String Lights', 'Fire Pit', 'Outdoor Bar'],
      pricing: {
        base: 5500,
        weekend: 7000,
        holiday: 8500
      },
      images: [
        'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      virtualTour: 'garden-pavilion-tour',
      availability: {
        '2024-06-15': true,
        '2024-06-22': true,
        '2024-06-29': false,
        '2024-07-06': true
      },
      amenities: ['Weather Protection', 'Garden Access', 'Outdoor Heating', 'Scenic Views', 'Photography Areas'],
      layout: 'Covered Outdoor Space',
      description: 'A romantic outdoor venue surrounded by manicured gardens and featuring a covered pavilion with rustic charm and modern amenities.'
    },
    {
      id: '3',
      name: 'Heritage Library',
      type: 'Indoor',
      capacity: {
        seated: 80,
        standing: 120,
        cocktail: 100
      },
      size: '1,800 sq ft',
      features: ['Historic Architecture', 'Built-in Bookshelves', 'Fireplace', 'Vintage Furniture', 'Private Entrance'],
      pricing: {
        base: 3500,
        weekend: 4500,
        holiday: 5500
      },
      images: [
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      virtualTour: 'heritage-library-tour',
      availability: {
        '2024-06-15': true,
        '2024-06-22': false,
        '2024-06-29': true,
        '2024-07-06': true
      },
      amenities: ['Historic Charm', 'Intimate Setting', 'Natural Light', 'Unique Architecture', 'Quiet Location'],
      layout: 'Historic Library',
      description: 'An intimate venue with historic charm, featuring original architecture, built-in bookshelves, and a cozy fireplace perfect for smaller gatherings.'
    },
    {
      id: '4',
      name: 'Rooftop Terrace',
      type: 'Rooftop',
      capacity: {
        seated: 120,
        standing: 200,
        cocktail: 180
      },
      size: '2,500 sq ft',
      features: ['City Views', 'Open Air', 'Lounge Areas', 'Bar Setup', 'Sunset Views'],
      pricing: {
        base: 6500,
        weekend: 8000,
        holiday: 9500
      },
      images: [
        'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      virtualTour: 'rooftop-terrace-tour',
      availability: {
        '2024-06-15': true,
        '2024-06-22': true,
        '2024-06-29': true,
        '2024-07-06': false
      },
      amenities: ['Panoramic Views', 'Open Air', 'Modern Amenities', 'Elevator Access', 'Weather Contingency'],
      layout: 'Open Rooftop',
      description: 'A stunning rooftop venue offering panoramic city views and modern amenities, perfect for cocktail receptions and contemporary celebrations.'
    }
  ];

  const eventPackages: EventPackage[] = [
    {
      id: '1',
      name: 'Elegant Wedding Package',
      type: 'Wedding',
      price: 15000,
      duration: '8 hours',
      includes: [
        'Venue rental for 8 hours',
        'Bridal suite access',
        'Ceremony and reception setup',
        'Basic lighting and sound',
        'Tables, chairs, and linens',
        'Dedicated event coordinator',
        'Security service',
        'Cleanup service'
      ],
      addOns: [
        'Premium bar service',
        'Upgraded lighting package',
        'Floral arrangements',
        'Photography services',
        'Live music coordination',
        'Transportation coordination'
      ],
      popular: true,
      description: 'Our most popular wedding package includes everything needed for your perfect day.',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      name: 'Corporate Gala Package',
      type: 'Corporate',
      price: 12000,
      duration: '6 hours',
      includes: [
        'Venue rental for 6 hours',
        'Professional AV equipment',
        'Stage and podium setup',
        'Networking areas',
        'Registration desk',
        'Event management',
        'Technical support',
        'Catering coordination'
      ],
      addOns: [
        'Live streaming setup',
        'Professional photography',
        'Custom branding',
        'VIP reception area',
        'Award ceremony setup',
        'Entertainment booking'
      ],
      popular: false,
      description: 'Perfect for corporate events, galas, and professional gatherings.',
      image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      name: 'Intimate Celebration Package',
      type: 'Private',
      price: 8000,
      duration: '5 hours',
      includes: [
        'Venue rental for 5 hours',
        'Intimate space setup',
        'Basic bar service',
        'Sound system',
        'Furniture and decor',
        'Event coordination',
        'Parking included',
        'Basic cleanup'
      ],
      addOns: [
        'Custom menu planning',
        'Specialty cocktails',
        'Live acoustic music',
        'Floral centerpieces',
        'Photography package',
        'Gift coordination'
      ],
      popular: false,
      description: 'Ideal for anniversaries, birthdays, and intimate family celebrations.',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const preferredVendors: Vendor[] = [
    {
      id: '1',
      name: 'Artisan Catering Co.',
      category: 'Catering',
      rating: 4.9,
      reviews: 156,
      priceRange: '$$$',
      services: ['Full Service Catering', 'Custom Menus', 'Dietary Accommodations', 'Bar Service'],
      contact: {
        phone: '(555) 123-4567',
        email: 'info@artisancatering.com',
        website: 'www.artisancatering.com'
      },
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: '2',
      name: 'Bloom & Blossom Florals',
      category: 'Florist',
      rating: 4.8,
      reviews: 89,
      priceRange: '$$',
      services: ['Bridal Bouquets', 'Centerpieces', 'Ceremony Decor', 'Event Styling'],
      contact: {
        phone: '(555) 234-5678',
        email: 'hello@bloomblossom.com',
        website: 'www.bloomblossom.com'
      },
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: '3',
      name: 'Harmony Entertainment',
      category: 'Entertainment',
      rating: 4.7,
      reviews: 124,
      priceRange: '$$',
      services: ['DJ Services', 'Live Bands', 'Lighting Design', 'Sound Engineering'],
      contact: {
        phone: '(555) 345-6789',
        email: 'bookings@harmonyent.com',
        website: 'www.harmonyentertainment.com'
      },
      image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: '4',
      name: 'Lens & Light Photography',
      category: 'Photography',
      rating: 4.9,
      reviews: 203,
      priceRange: '$$$',
      services: ['Wedding Photography', 'Event Coverage', 'Videography', 'Photo Booths'],
      contact: {
        phone: '(555) 456-7890',
        email: 'studio@lenslight.com',
        website: 'www.lenslightphoto.com'
      },
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    }
  ];

  const recentBookings: Booking[] = [
    {
      id: '1',
      eventName: 'Sarah & Michael Wedding',
      clientName: 'Sarah Johnson',
      date: '2024-06-15',
      time: '4:00 PM',
      space: 'Grand Ballroom',
      guests: 200,
      status: 'confirmed',
      package: 'Elegant Wedding Package',
      total: 18500,
      notes: 'Outdoor ceremony weather backup needed'
    },
    {
      id: '2',
      eventName: 'TechCorp Annual Gala',
      clientName: 'David Chen',
      date: '2024-07-20',
      time: '6:00 PM',
      space: 'Grand Ballroom',
      guests: 300,
      status: 'pending',
      package: 'Corporate Gala Package',
      total: 15000,
      notes: 'AV requirements for presentations'
    },
    {
      id: '3',
      eventName: 'Golden Anniversary',
      clientName: 'Robert & Mary Smith',
      date: '2024-08-10',
      time: '2:00 PM',
      space: 'Garden Pavilion',
      guests: 80,
      status: 'inquiry',
      package: 'Intimate Celebration Package',
      total: 9500,
      notes: 'Family-style celebration'
    }
  ];

  const SpaceCard: React.FC<{ space: VenueSpace; onClick: () => void }> = ({ space, onClick }) => (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={space.images[0]} 
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-900">{space.type}</span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSpace(space);
              setShowVirtualTour(true);
            }}
            className="w-full bg-blue-600/90 backdrop-blur-sm text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Virtual Tour
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{space.name}</h3>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-600">From ${space.pricing.base.toLocaleString()}</p>
            <p className="text-sm text-gray-500">per event</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{space.description}</p>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-lg font-bold text-gray-900">{space.capacity.seated}</p>
            <p className="text-sm text-gray-500">Seated</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{space.capacity.standing}</p>
            <p className="text-sm text-gray-500">Standing</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{space.size}</p>
            <p className="text-sm text-gray-500">Size</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {space.features.slice(0, 3).map((feature) => (
            <span key={feature} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              {feature}
            </span>
          ))}
          {space.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              +{space.features.length - 3} more
            </span>
          )}
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSpace(space);
            setShowBookingModal(true);
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Check Availability
        </button>
      </div>
    </div>
  );

  const PackageCard: React.FC<{ pkg: EventPackage; onClick: () => void }> = ({ pkg, onClick }) => (
    <div 
      className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {pkg.popular && (
        <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{pkg.name}</h3>
          <p className="text-sm opacity-90">{pkg.duration}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {pkg.type}
          </span>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">${pkg.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">starting from</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        
        <div className="space-y-2 mb-6">
          <h4 className="font-semibold text-gray-900">Includes:</h4>
          <ul className="space-y-1">
            {pkg.includes.slice(0, 4).map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                {item}
              </li>
            ))}
            {pkg.includes.length > 4 && (
              <li className="text-sm text-blue-600">
                +{pkg.includes.length - 4} more included items
              </li>
            )}
          </ul>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Learn More
        </button>
      </div>
    </div>
  );

  const VendorCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img 
          src={vendor.image} 
          alt={vendor.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900">{vendor.name}</h3>
              <p className="text-sm text-gray-600">{vendor.category}</p>
            </div>
            {vendor.featured && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{vendor.rating}</span>
              <span className="text-sm text-gray-500">({vendor.reviews})</span>
            </div>
            <span className="text-sm text-gray-600">{vendor.priceRange}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {vendor.services.slice(0, 2).map((service) => (
              <span key={service} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                {service}
              </span>
            ))}
            {vendor.services.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                +{vendor.services.length - 2}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Contact
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const VirtualTourModal: React.FC = () => {
    if (!showVirtualTour || !selectedSpace) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Tour Controls */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowVirtualTour(false)}
              className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <h3 className="text-white font-semibold">{selectedSpace.name}</h3>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTourMode('360')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tourMode === '360' ? 'bg-blue-600 text-white' : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              360° View
            </button>
            <button
              onClick={() => setTourMode('3d')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tourMode === '3d' ? 'bg-blue-600 text-white' : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              3D Model
            </button>
            <button
              onClick={() => setTourMode('walkthrough')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tourMode === 'walkthrough' ? 'bg-blue-600 text-white' : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              Walkthrough
            </button>
          </div>
        </div>

        {/* Tour Content */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <img 
              src={selectedSpace.images[currentImageIndex]} 
              alt={selectedSpace.name}
              className="w-full h-full object-cover"
            />
            
            {/* Tour Mode Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  {tourMode === '360' && <Move3D className="w-10 h-10" />}
                  {tourMode === '3d' && <Layers className="w-10 h-10" />}
                  {tourMode === 'walkthrough' && <Navigation className="w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {tourMode === '360' && '360° Virtual Tour'}
                  {tourMode === '3d' && '3D Model View'}
                  {tourMode === 'walkthrough' && 'Interactive Walkthrough'}
                </h3>
                <p className="text-white/80 mb-6">
                  {tourMode === '360' && 'Drag to look around and explore every angle'}
                  {tourMode === '3d' && 'Navigate through the 3D model of the space'}
                  {tourMode === 'walkthrough' && 'Take a guided tour through the venue'}
                </p>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? 'Pause Tour' : 'Start Tour'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedSpace.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={() => {
              setShowVirtualTour(false);
              setShowBookingModal(true);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book This Space
          </button>
        </div>
      </div>
    );
  };

  const BookingModal: React.FC = () => {
    if (!showBookingModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="max-w-2xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Book Your Event</h2>
                <p className="text-blue-100">
                  {selectedSpace ? selectedSpace.name : 'Heritage Event Center'}
                </p>
              </div>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select 
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests: {guestCount}
                </label>
                <input
                  type="range"
                  min="20"
                  max="500"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>20</span>
                  <span>500</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about any special requirements or preferences..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              {selectedSpace && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Estimated Pricing</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Venue Rental</span>
                      <span>${selectedSpace.pricing.base.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>$500</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Estimated Total</span>
                      <span>${(selectedSpace.pricing.base + 500).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Event Center
                </h1>
                <p className="text-gray-600">Luxury Venue & Event Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center space-x-6">
                {['Home', 'Spaces', 'Packages', 'Vendors', 'Gallery', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setCurrentView(item.toLowerCase() as any)}
                    className={`font-medium transition-colors ${
                      currentView === item.toLowerCase() 
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Book Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative h-96 rounded-3xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Heritage Event Center"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-2xl px-12 text-white">
                  <h2 className="text-5xl font-bold mb-6">Where Memories Begin</h2>
                  <p className="text-xl mb-8 text-gray-200">
                    Experience luxury and elegance at Heritage Event Center. Our stunning venues and exceptional service create unforgettable moments for your special occasions.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCurrentView('spaces')}
                      className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Explore Venues
                    </button>
                    <button 
                      onClick={() => setShowVirtualTour(true)}
                      className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-colors font-semibold border border-white/30"
                    >
                      Virtual Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">4</h3>
                <p className="text-gray-600">Unique Venues</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">500</h3>
                <p className="text-gray-600">Max Capacity</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9</h3>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
                <p className="text-gray-600">Events Hosted</p>
              </div>
            </div>

            {/* Featured Spaces */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Venues</h2>
                  <p className="text-gray-600">Discover our most popular event spaces</p>
                </div>
                <button 
                  onClick={() => setCurrentView('spaces')}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  View All Spaces
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {venueSpaces.slice(0, 3).map((space) => (
                  <SpaceCard 
                    key={space.id} 
                    space={space} 
                    onClick={() => {
                      setSelectedSpace(space);
                      setCurrentView('spaces');
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Event Packages */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Event Packages</h2>
                  <p className="text-gray-600">Comprehensive packages for every occasion</p>
                </div>
                <button 
                  onClick={() => setCurrentView('packages')}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  View All Packages
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {eventPackages.map((pkg) => (
                  <PackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setCurrentView('packages');
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Clients Say</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600 mb-4 italic">
                    "Heritage Event Center made our wedding absolutely perfect. The staff was incredible and the venue was stunning."
                  </p>
                  <h4 className="font-semibold">Sarah & Michael</h4>
                  <p className="text-sm text-gray-500">Wedding Reception</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600 mb-4 italic">
                    "Professional service and beautiful venues. Our corporate gala was a huge success thanks to their team."
                  </p>
                  <h4 className="font-semibold">David Chen</h4>
                  <p className="text-sm text-gray-500">Corporate Event</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600 mb-4 italic">
                    "The Garden Pavilion was perfect for our anniversary celebration. Couldn't have asked for more."
                  </p>
                  <h4 className="font-semibold">Robert & Mary</h4>
                  <p className="text-sm text-gray-500">Anniversary Party</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'spaces' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Venues</h2>
                <p className="text-gray-600">Choose from our collection of stunning event spaces</p>
              </div>
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Check Availability
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {venueSpaces.map((space) => (
                <SpaceCard 
                  key={space.id} 
                  space={space} 
                  onClick={() => setSelectedSpace(space)}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'packages' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Event Packages</h2>
              <p className="text-gray-600">Comprehensive packages designed for every type of celebration</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {eventPackages.map((pkg) => (
                <PackageCard 
                  key={pkg.id} 
                  pkg={pkg} 
                  onClick={() => setSelectedPackage(pkg)}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'vendors' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Preferred Vendors</h2>
              <p className="text-gray-600">Our trusted partners to make your event perfect</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {preferredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'contact' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">Ready to plan your perfect event? Get in touch with our team</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">events@heritagecenter.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">123 Heritage Lane<br />Elegant City, EC 12345</p>
                  </div>
                </div>
              </div>

              <form className="bg-white rounded-xl p-8 shadow-sm space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Virtual Tour Modal */}
      <VirtualTourModal />

      {/* Booking Modal */}
      <BookingModal />
    </div>
  );
};