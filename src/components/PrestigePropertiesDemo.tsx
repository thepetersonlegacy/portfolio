import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Filter, MapPin, Bed, Bath, Square, Car, Heart, Share2, Phone, Mail, Calendar, Eye, Camera, Video, Map, Navigation, Home, Building, TreePine, Waves, Mountain, Sun, Star, TrendingUp, TrendingDown, DollarSign, Calculator, CreditCard, FileText, Download, Upload, User, Users, Clock, CheckCircle, AlertCircle, Info, X, Plus, Minus, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, MoreHorizontal, Settings, Bell, Menu, Grid, List, Maximize, Minimize, Play, Pause, Volume2, VolumeX, RotateCcw, ZoomIn, ZoomOut, Move, Compass, Ruler, Layers, Target, Bookmark, Flag, Award, Shield, Zap, Wifi, Thermometer, Droplets, Wind, Lightbulb, Lock, Unlock, Key, Gauge as Garage, Award as Garden, CookingPot as SwimmingPool, Dumbbell, Coffee, Utensils, ShoppingBag, GraduationCap, Stethoscope, Plane, Train, Bus, Bike } from 'lucide-react';

interface PrestigePropertiesDemoProps {
  onClose: () => void;
}

interface Property {
  id: string;
  title: string;
  type: 'house' | 'condo' | 'townhouse' | 'penthouse' | 'villa' | 'estate';
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    neighborhood: string;
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    lotSize?: number;
    yearBuilt: number;
    parking: number;
  };
  images: string[];
  virtualTour?: string;
  video?: string;
  description: string;
  features: string[];
  amenities: string[];
  agent: {
    name: string;
    photo: string;
    phone: string;
    email: string;
    rating: number;
    reviews: number;
  };
  location: {
    lat: number;
    lng: number;
  };
  status: 'for-sale' | 'sold' | 'pending' | 'off-market';
  listingDate: string;
  daysOnMarket: number;
  priceHistory: Array<{
    date: string;
    price: number;
    event: string;
  }>;
  marketAnalysis: {
    pricePerSqft: number;
    neighborhoodAvg: number;
    appreciation: number;
    walkScore: number;
    schoolRating: number;
  };
  nearbyPlaces: Array<{
    name: string;
    type: string;
    distance: number;
    rating: number;
  }>;
  isFavorite: boolean;
  isNew: boolean;
  isPremium: boolean;
}

interface SearchFilters {
  priceMin: number;
  priceMax: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  sqftMin: number;
  sqftMax: number;
  features: string[];
  neighborhood: string;
  sortBy: string;
}

export const PrestigePropertiesDemo: React.FC<PrestigePropertiesDemoProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'search' | 'property' | 'map' | 'favorites' | 'agent'>('search');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    priceMin: 0,
    priceMax: 10000000,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: 'all',
    sqftMin: 0,
    sqftMax: 10000,
    features: [],
    neighborhood: 'all',
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showMortgageCalculator, setShowMortgageCalculator] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 34.0522, lng: -118.2437 });
  const [mapZoom, setMapZoom] = useState(12);
  const [showContactForm, setShowContactForm] = useState(false);

  const properties: Property[] = [
    {
      id: '1',
      title: 'Luxury Modern Estate in Beverly Hills',
      type: 'estate',
      price: 8500000,
      address: {
        street: '1234 Sunset Boulevard',
        city: 'Beverly Hills',
        state: 'CA',
        zipCode: '90210',
        neighborhood: 'Beverly Hills'
      },
      specs: {
        bedrooms: 6,
        bathrooms: 8,
        sqft: 7500,
        lotSize: 1.2,
        yearBuilt: 2020,
        parking: 4
      },
      images: [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      virtualTour: 'https://example.com/virtual-tour',
      video: 'https://example.com/property-video',
      description: 'Stunning contemporary estate featuring floor-to-ceiling windows, open-concept living, and breathtaking city views. This architectural masterpiece combines luxury with modern convenience.',
      features: [
        'Gourmet Kitchen',
        'Home Theater',
        'Wine Cellar',
        'Smart Home Technology',
        'Infinity Pool',
        'Guest House',
        'Panoramic Views',
        'Private Gym'
      ],
      amenities: [
        'Concierge Service',
        'Valet Parking',
        'Security System',
        'Landscaped Gardens',
        'Outdoor Kitchen',
        'Spa',
        'Tennis Court',
        'Elevator'
      ],
      agent: {
        name: 'Sarah Mitchell',
        photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+1 (310) 555-0123',
        email: 'sarah.mitchell@prestigeproperties.com',
        rating: 4.9,
        reviews: 127
      },
      location: {
        lat: 34.0736,
        lng: -118.4004
      },
      status: 'for-sale',
      listingDate: '2024-01-15',
      daysOnMarket: 45,
      priceHistory: [
        { date: '2024-01-15', price: 8500000, event: 'Listed' },
        { date: '2024-02-01', price: 8750000, event: 'Price Increase' }
      ],
      marketAnalysis: {
        pricePerSqft: 1133,
        neighborhoodAvg: 1250,
        appreciation: 8.5,
        walkScore: 85,
        schoolRating: 9
      },
      nearbyPlaces: [
        { name: 'Rodeo Drive', type: 'Shopping', distance: 0.8, rating: 4.8 },
        { name: 'Beverly Hills High School', type: 'School', distance: 1.2, rating: 4.7 },
        { name: 'Cedars-Sinai Medical Center', type: 'Hospital', distance: 2.1, rating: 4.6 }
      ],
      isFavorite: false,
      isNew: true,
      isPremium: true
    },
    {
      id: '2',
      title: 'Oceanfront Penthouse in Malibu',
      type: 'penthouse',
      price: 12500000,
      address: {
        street: '5678 Pacific Coast Highway',
        city: 'Malibu',
        state: 'CA',
        zipCode: '90265',
        neighborhood: 'Malibu Beach'
      },
      specs: {
        bedrooms: 4,
        bathrooms: 5,
        sqft: 4200,
        yearBuilt: 2019,
        parking: 3
      },
      images: [
        'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Breathtaking oceanfront penthouse with unobstructed Pacific Ocean views. Features include a private rooftop terrace, floor-to-ceiling windows, and direct beach access.',
      features: [
        'Ocean Views',
        'Private Terrace',
        'Beach Access',
        'Floor-to-Ceiling Windows',
        'Gourmet Kitchen',
        'Master Suite',
        'Smart Home',
        'Private Elevator'
      ],
      amenities: [
        'Concierge',
        'Valet Parking',
        'Fitness Center',
        'Spa Services',
        'Beach Club',
        'Restaurant',
        'Pool Deck',
        'Security'
      ],
      agent: {
        name: 'Michael Chen',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+1 (310) 555-0456',
        email: 'michael.chen@prestigeproperties.com',
        rating: 4.8,
        reviews: 89
      },
      location: {
        lat: 34.0259,
        lng: -118.7798
      },
      status: 'for-sale',
      listingDate: '2024-02-01',
      daysOnMarket: 28,
      priceHistory: [
        { date: '2024-02-01', price: 12500000, event: 'Listed' }
      ],
      marketAnalysis: {
        pricePerSqft: 2976,
        neighborhoodAvg: 2800,
        appreciation: 12.3,
        walkScore: 65,
        schoolRating: 8
      },
      nearbyPlaces: [
        { name: 'Malibu Pier', type: 'Attraction', distance: 0.5, rating: 4.5 },
        { name: 'Nobu Malibu', type: 'Restaurant', distance: 0.3, rating: 4.7 },
        { name: 'Malibu Country Mart', type: 'Shopping', distance: 1.1, rating: 4.4 }
      ],
      isFavorite: false,
      isNew: false,
      isPremium: true
    },
    {
      id: '3',
      title: 'Contemporary Villa in Hollywood Hills',
      type: 'villa',
      price: 6750000,
      address: {
        street: '9876 Mulholland Drive',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        neighborhood: 'Hollywood Hills'
      },
      specs: {
        bedrooms: 5,
        bathrooms: 6,
        sqft: 5800,
        lotSize: 0.8,
        yearBuilt: 2018,
        parking: 3
      },
      images: [
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Architectural masterpiece nestled in the Hollywood Hills with stunning city and canyon views. Features modern design, premium finishes, and resort-style amenities.',
      features: [
        'City Views',
        'Canyon Views',
        'Infinity Pool',
        'Home Theater',
        'Wine Cellar',
        'Chef\'s Kitchen',
        'Master Retreat',
        'Guest Suite'
      ],
      amenities: [
        'Pool & Spa',
        'Outdoor Kitchen',
        'Fire Pit',
        'Landscaped Grounds',
        'Security System',
        'Smart Home',
        'Garage',
        'Storage'
      ],
      agent: {
        name: 'Emma Rodriguez',
        photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+1 (323) 555-0789',
        email: 'emma.rodriguez@prestigeproperties.com',
        rating: 4.9,
        reviews: 156
      },
      location: {
        lat: 34.1184,
        lng: -118.3570
      },
      status: 'for-sale',
      listingDate: '2024-01-20',
      daysOnMarket: 40,
      priceHistory: [
        { date: '2024-01-20', price: 6750000, event: 'Listed' }
      ],
      marketAnalysis: {
        pricePerSqft: 1164,
        neighborhoodAvg: 1100,
        appreciation: 6.8,
        walkScore: 72,
        schoolRating: 7
      },
      nearbyPlaces: [
        { name: 'Hollywood Bowl', type: 'Entertainment', distance: 2.3, rating: 4.6 },
        { name: 'Runyon Canyon Park', type: 'Recreation', distance: 1.8, rating: 4.5 },
        { name: 'Sunset Strip', type: 'Entertainment', distance: 3.1, rating: 4.4 }
      ],
      isFavorite: false,
      isNew: false,
      isPremium: false
    },
    {
      id: '4',
      title: 'Luxury Condo in Downtown LA',
      type: 'condo',
      price: 2850000,
      address: {
        street: '1111 Grand Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90015',
        neighborhood: 'Downtown LA'
      },
      specs: {
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2400,
        yearBuilt: 2021,
        parking: 2
      },
      images: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Ultra-modern luxury condominium in the heart of downtown LA. Floor-to-ceiling windows offer spectacular city views, while premium amenities provide resort-style living.',
      features: [
        'City Views',
        'Floor-to-Ceiling Windows',
        'Modern Kitchen',
        'Master Suite',
        'Balcony',
        'In-Unit Laundry',
        'Storage',
        'High Ceilings'
      ],
      amenities: [
        'Rooftop Pool',
        'Fitness Center',
        'Concierge',
        'Valet Parking',
        'Business Center',
        'Lounge',
        'Security',
        'Pet Friendly'
      ],
      agent: {
        name: 'David Park',
        photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+1 (213) 555-0321',
        email: 'david.park@prestigeproperties.com',
        rating: 4.7,
        reviews: 94
      },
      location: {
        lat: 34.0522,
        lng: -118.2437
      },
      status: 'for-sale',
      listingDate: '2024-02-10',
      daysOnMarket: 19,
      priceHistory: [
        { date: '2024-02-10', price: 2850000, event: 'Listed' }
      ],
      marketAnalysis: {
        pricePerSqft: 1188,
        neighborhoodAvg: 1150,
        appreciation: 9.2,
        walkScore: 95,
        schoolRating: 6
      },
      nearbyPlaces: [
        { name: 'Walt Disney Concert Hall', type: 'Entertainment', distance: 0.4, rating: 4.8 },
        { name: 'Grand Central Market', type: 'Dining', distance: 0.2, rating: 4.5 },
        { name: 'MOCA', type: 'Museum', distance: 0.3, rating: 4.6 }
      ],
      isFavorite: false,
      isNew: true,
      isPremium: false
    },
    {
      id: '5',
      title: 'Beachfront House in Manhattan Beach',
      type: 'house',
      price: 9200000,
      address: {
        street: '2222 The Strand',
        city: 'Manhattan Beach',
        state: 'CA',
        zipCode: '90266',
        neighborhood: 'Manhattan Beach'
      },
      specs: {
        bedrooms: 4,
        bathrooms: 4,
        sqft: 3800,
        lotSize: 0.15,
        yearBuilt: 2017,
        parking: 2
      },
      images: [
        'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Stunning beachfront home directly on the sand in Manhattan Beach. This contemporary residence offers unparalleled ocean views and direct beach access.',
      features: [
        'Beachfront',
        'Ocean Views',
        'Direct Beach Access',
        'Rooftop Deck',
        'Gourmet Kitchen',
        'Master Suite',
        'Guest Rooms',
        'Outdoor Shower'
      ],
      amenities: [
        'Beach Access',
        'Outdoor Living',
        'Rooftop Terrace',
        'Fire Pit',
        'BBQ Area',
        'Storage',
        'Garage',
        'Security'
      ],
      agent: {
        name: 'Lisa Thompson',
        photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+1 (310) 555-0654',
        email: 'lisa.thompson@prestigeproperties.com',
        rating: 4.8,
        reviews: 112
      },
      location: {
        lat: 33.8847,
        lng: -118.4109
      },
      status: 'for-sale',
      listingDate: '2024-01-25',
      daysOnMarket: 35,
      priceHistory: [
        { date: '2024-01-25', price: 9200000, event: 'Listed' }
      ],
      marketAnalysis: {
        pricePerSqft: 2421,
        neighborhoodAvg: 2300,
        appreciation: 11.5,
        walkScore: 78,
        schoolRating: 9
      },
      nearbyPlaces: [
        { name: 'Manhattan Beach Pier', type: 'Recreation', distance: 0.3, rating: 4.7 },
        { name: 'The Strand House', type: 'Restaurant', distance: 0.1, rating: 4.6 },
        { name: 'Manhattan Beach Volleyball', type: 'Recreation', distance: 0.2, rating: 4.5 }
      ],
      isFavorite: false,
      isNew: false,
      isPremium: true
    },
    {
      id: '6',
      title: 'Modern Townhouse in West Hollywood',
      type: 'townhouse',
      price: 3450000,
      address: {
        street: '3333 Melrose Avenue',
        city: 'West Hollywood',
        state: 'CA',
        zipCode: '90069',
        neighborhood: 'West Hollywood'
      },
      specs: {
        bedrooms: 3,
        bathrooms: 4,
        sqft: 2800,
        yearBuilt: 2020,
        parking: 2
      },
      images: [
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'Sleek and sophisticated townhouse in the heart of West Hollywood. Features contemporary design, premium finishes, and a private rooftop terrace.',
      features: [
        'Rooftop Terrace',
        'Modern Design',
        'Gourmet Kitchen',
        'Master Suite',
        'Guest Bedrooms',
        'Private Garage',
        'Storage',
        'Smart Home'
      ],
      amenities: [
        'Rooftop Access',
        'Private Entrance',
        'Garage Parking',
        'Storage Space',
        'Security System',
        'Modern Appliances',
        'Outdoor Space',
        'Central AC'
      ],
      agent: {
        name: 'Alex Johnson',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+1 (323) 555-0987',
        email: 'alex.johnson@prestigeproperties.com',
        rating: 4.6,
        reviews: 78
      },
      location: {
        lat: 34.0900,
        lng: -118.3617
      },
      status: 'for-sale',
      listingDate: '2024-02-05',
      daysOnMarket: 24,
      priceHistory: [
        { date: '2024-02-05', price: 3450000, event: 'Listed' }
      ],
      marketAnalysis: {
        pricePerSqft: 1232,
        neighborhoodAvg: 1200,
        appreciation: 7.8,
        walkScore: 88,
        schoolRating: 7
      },
      nearbyPlaces: [
        { name: 'Melrose Avenue Shopping', type: 'Shopping', distance: 0.1, rating: 4.5 },
        { name: 'West Hollywood Park', type: 'Recreation', distance: 0.8, rating: 4.4 },
        { name: 'The Abbey', type: 'Entertainment', distance: 0.5, rating: 4.3 }
      ],
      isFavorite: false,
      isNew: true,
      isPremium: false
    }
  ];

  const neighborhoods = [
    'Beverly Hills',
    'Malibu Beach',
    'Hollywood Hills',
    'Downtown LA',
    'Manhattan Beach',
    'West Hollywood',
    'Santa Monica',
    'Bel Air',
    'Brentwood',
    'Venice'
  ];

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'villa', label: 'Villa' },
    { value: 'estate', label: 'Estate' }
  ];

  const availableFeatures = [
    'Pool',
    'Gym',
    'Garage',
    'Garden',
    'Balcony',
    'Fireplace',
    'Walk-in Closet',
    'Hardwood Floors',
    'Stainless Steel Appliances',
    'Central Air',
    'Security System',
    'Smart Home',
    'Ocean View',
    'City View',
    'Mountain View'
  ];

  const filteredProperties = properties.filter(property => {
    const matchesPrice = property.price >= searchFilters.priceMin && property.price <= searchFilters.priceMax;
    const matchesBedrooms = searchFilters.bedrooms === 0 || property.specs.bedrooms >= searchFilters.bedrooms;
    const matchesBathrooms = searchFilters.bathrooms === 0 || property.specs.bathrooms >= searchFilters.bathrooms;
    const matchesType = searchFilters.propertyType === 'all' || property.type === searchFilters.propertyType;
    const matchesSqft = property.specs.sqft >= searchFilters.sqftMin && property.specs.sqft <= searchFilters.sqftMax;
    const matchesNeighborhood = searchFilters.neighborhood === 'all' || property.address.neighborhood === searchFilters.neighborhood;
    const matchesSearch = searchQuery === '' || 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPrice && matchesBedrooms && matchesBathrooms && matchesType && matchesSqft && matchesNeighborhood && matchesSearch;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (searchFilters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'sqft-large':
        return b.specs.sqft - a.specs.sqft;
      case 'sqft-small':
        return a.specs.sqft - b.specs.sqft;
      case 'newest':
        return new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime();
      case 'oldest':
        return new Date(a.listingDate).getTime() - new Date(b.listingDate).getTime();
      default:
        return 0;
    }
  });

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'house': return Home;
      case 'condo': return Building;
      case 'townhouse': return Building;
      case 'penthouse': return Building;
      case 'villa': return Home;
      case 'estate': return Home;
      default: return Home;
    }
  };

  const PropertyCard: React.FC<{ property: Property; onClick: () => void }> = ({ property, onClick }) => {
    const TypeIcon = getPropertyTypeIcon(property.type);
    const isFav = favorites.has(property.id);

    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
        <div className="relative" onClick={onClick}>
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {property.isNew && (
              <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                New
              </span>
            )}
            {property.isPremium && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-medium">
                Premium
              </span>
            )}
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium capitalize">
              {property.status.replace('-', ' ')}
            </span>
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Virtual Tour Badge */}
          {property.virtualTour && (
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Virtual Tour
              </span>
            </div>
          )}

          {/* Image Count */}
          <div className="absolute bottom-4 right-4">
            <span className="px-3 py-1 bg-black/50 text-white rounded-full text-sm flex items-center gap-1">
              <Camera className="w-4 h-4" />
              {property.images.length}
            </span>
          </div>
        </div>

        <div className="p-6" onClick={onClick}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {property.title}
              </h3>
              <p className="text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {property.address.neighborhood}, {property.address.city}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</p>
              <p className="text-sm text-gray-500">${formatNumber(property.marketAnalysis.pricePerSqft)}/sqft</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Bed className="w-4 h-4" />
                <span className="font-semibold">{property.specs.bedrooms}</span>
              </div>
              <p className="text-xs text-gray-500">Bedrooms</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Bath className="w-4 h-4" />
                <span className="font-semibold">{property.specs.bathrooms}</span>
              </div>
              <p className="text-xs text-gray-500">Bathrooms</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Square className="w-4 h-4" />
                <span className="font-semibold">{formatNumber(property.specs.sqft)}</span>
              </div>
              <p className="text-xs text-gray-500">Sq Ft</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Car className="w-4 h-4" />
                <span className="font-semibold">{property.specs.parking}</span>
              </div>
              <p className="text-xs text-gray-500">Parking</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={property.agent.photo} 
                alt={property.agent.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{property.agent.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-500">{property.agent.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{property.daysOnMarket} days on market</p>
              <p className="text-xs text-gray-400">Listed {new Date(property.listingDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PropertyDetail: React.FC = () => {
    if (!selectedProperty) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentView('search')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Search
              </button>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleFavorite(selectedProperty.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${favorites.has(selectedProperty.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                  Save
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                  Share
                </button>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="relative">
                  <img 
                    src={selectedProperty.images[selectedImageIndex]} 
                    alt={selectedProperty.title}
                    className="w-full h-96 object-cover cursor-pointer"
                    onClick={() => setShowImageGallery(true)}
                  />
                  
                  {/* Navigation */}
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button 
                        onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : selectedProperty.images.length - 1)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setSelectedImageIndex(prev => prev < selectedProperty.images.length - 1 ? prev + 1 : 0)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {selectedProperty.virtualTour && (
                      <button 
                        onClick={() => setShowVirtualTour(true)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Virtual Tour
                      </button>
                    )}
                    {selectedProperty.video && (
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Video
                      </button>
                    )}
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 bg-black/50 text-white rounded-full text-sm">
                      {selectedImageIndex + 1} / {selectedProperty.images.length}
                    </span>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProperty.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === selectedImageIndex ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProperty.title}</h1>
                    <p className="text-lg text-gray-600 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {selectedProperty.address.street}, {selectedProperty.address.city}, {selectedProperty.address.state} {selectedProperty.address.zipCode}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">{formatPrice(selectedProperty.price)}</p>
                    <p className="text-lg text-gray-500">${formatNumber(selectedProperty.marketAnalysis.pricePerSqft)}/sqft</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Bed className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.specs.bedrooms}</p>
                    <p className="text-gray-600">Bedrooms</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Bath className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.specs.bathrooms}</p>
                    <p className="text-gray-600">Bathrooms</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Square className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(selectedProperty.specs.sqft)}</p>
                    <p className="text-gray-600">Square Feet</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.specs.parking}</p>
                    <p className="text-gray-600">Parking</p>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProperty.description}</p>
                </div>
              </div>

              {/* Features & Amenities */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProperty.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProperty.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Analysis */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Market Analysis</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">${formatNumber(selectedProperty.marketAnalysis.pricePerSqft)}</p>
                    <p className="text-gray-600">Price per Sq Ft</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.marketAnalysis.appreciation}%</p>
                    <p className="text-gray-600">Appreciation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Navigation className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.marketAnalysis.walkScore}</p>
                    <p className="text-gray-600">Walk Score</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="w-8 h-8 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedProperty.marketAnalysis.schoolRating}/10</p>
                    <p className="text-gray-600">School Rating</p>
                  </div>
                </div>
              </div>

              {/* Nearby Places */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Nearby Places</h3>
                <div className="space-y-4">
                  {selectedProperty.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{place.name}</h4>
                          <p className="text-sm text-gray-600">{place.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{place.distance} mi</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{place.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <img 
                    src={selectedProperty.agent.photo} 
                    alt={selectedProperty.agent.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{selectedProperty.agent.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{selectedProperty.agent.rating}</span>
                    <span className="text-gray-500">({selectedProperty.agent.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Agent
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    {selectedProperty.agent.phone}
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Tour
                  </button>
                </div>
              </div>

              {/* Mortgage Calculator */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Mortgage Calculator</h3>
                  <button 
                    onClick={() => setShowMortgageCalculator(true)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Calculator className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Price</label>
                    <input 
                      type="text" 
                      value={formatPrice(selectedProperty.price)}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (20%)</label>
                    <input 
                      type="text" 
                      value={formatPrice(selectedProperty.price * 0.2)}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Monthly Payment</label>
                    <input 
                      type="text" 
                      value={formatPrice((selectedProperty.price * 0.8 * 0.007) + (selectedProperty.price * 0.012 / 12))}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium capitalize">{selectedProperty.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-medium">{selectedProperty.specs.yearBuilt}</span>
                  </div>
                  {selectedProperty.specs.lotSize && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lot Size</span>
                      <span className="font-medium">{selectedProperty.specs.lotSize} acres</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days on Market</span>
                    <span className="font-medium">{selectedProperty.daysOnMarket} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium capitalize">{selectedProperty.status.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>

              {/* Price History */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price History</h3>
                <div className="space-y-3">
                  {selectedProperty.priceHistory.map((entry, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{entry.event}</p>
                        <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
                      </div>
                      <span className="font-semibold text-gray-900">{formatPrice(entry.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="max-w-md w-full bg-white rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Contact Agent</h3>
                <button 
                  onClick={() => setShowContactForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="I'm interested in this property..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Virtual Tour Modal */}
        {showVirtualTour && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
            <div className="max-w-6xl w-full h-[80vh] bg-white rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold">Virtual Tour - {selectedProperty.title}</h3>
                <button 
                  onClick={() => setShowVirtualTour(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="h-full bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Virtual Tour</h3>
                  <p className="text-gray-600">Interactive 360° tour would be embedded here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Gallery Modal */}
        {showImageGallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
            <div className="max-w-6xl w-full h-[80vh] relative">
              <button 
                onClick={() => setShowImageGallery(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <img 
                src={selectedProperty.images[selectedImageIndex]} 
                alt=""
                className="w-full h-full object-contain"
              />
              
              {selectedProperty.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : selectedProperty.images.length - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setSelectedImageIndex(prev => prev < selectedProperty.images.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-2 bg-black/50 text-white rounded-full text-sm">
                  {selectedImageIndex + 1} / {selectedProperty.images.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SearchView = () => (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by location, property type, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="border-t pt-6 space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={searchFilters.priceMin || ''}
                    onChange={(e) => setSearchFilters(prev => ({ ...prev, priceMin: Number(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={searchFilters.priceMax === 10000000 ? '' : searchFilters.priceMax}
                    onChange={(e) => setSearchFilters(prev => ({ ...prev, priceMax: Number(e.target.value) || 10000000 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  value={searchFilters.bedrooms}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, bedrooms: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                  <option value={5}>5+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <select
                  value={searchFilters.bathrooms}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, bathrooms: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  value={searchFilters.propertyType}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Square Feet</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={searchFilters.sqftMin || ''}
                    onChange={(e) => setSearchFilters(prev => ({ ...prev, sqftMin: Number(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={searchFilters.sqftMax === 10000 ? '' : searchFilters.sqftMax}
                    onChange={(e) => setSearchFilters(prev => ({ ...prev, sqftMax: Number(e.target.value) || 10000 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
                <select
                  value={searchFilters.neighborhood}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, neighborhood: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Neighborhoods</option>
                  {neighborhoods.map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-gray-600">
            {sortedProperties.length} properties found
          </p>
          <select
            value={searchFilters.sortBy}
            onChange={(e) => setSearchFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="sqft-large">Largest First</option>
            <option value="sqft-small">Smallest First</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 max-w-4xl mx-auto'
      }`}>
        {sortedProperties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            onClick={() => {
              setSelectedProperty(property);
              setCurrentView('property');
            }}
          />
        ))}
      </div>

      {sortedProperties.length === 0 && (
        <div className="text-center py-12">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
          <button 
            onClick={() => {
              setSearchFilters({
                priceMin: 0,
                priceMax: 10000000,
                bedrooms: 0,
                bathrooms: 0,
                propertyType: 'all',
                sqftMin: 0,
                sqftMax: 10000,
                features: [],
                neighborhood: 'all',
                sortBy: 'newest'
              });
              setSearchQuery('');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Prestige Properties
                </h1>
                <p className="text-gray-600">Luxury Real Estate Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center space-x-6">
                {['Search', 'Map', 'Favorites', 'Agents'].map((item) => (
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

              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">PP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'search' && <SearchView />}
        {currentView === 'property' && <PropertyDetail />}
        {currentView === 'map' && (
          <div className="text-center py-20">
            <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Map View</h2>
            <p className="text-gray-600">Explore properties on an interactive map with neighborhood insights</p>
          </div>
        )}
        {currentView === 'favorites' && (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Saved Properties</h2>
            <p className="text-gray-600">Your favorite properties and saved searches</p>
          </div>
        )}
        {currentView === 'agent' && (
          <div className="text-center py-20">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Find an Agent</h2>
            <p className="text-gray-600">Connect with top-rated real estate professionals</p>
          </div>
        )}
      </div>
    </div>
  );
};