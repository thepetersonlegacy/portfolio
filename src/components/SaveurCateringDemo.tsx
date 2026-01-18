import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ChefHat, 
  Award, 
  Heart, 
  Share2, 
  Download, 
  Filter, 
  Search, 
  Grid, 
  List, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Check, 
  X, 
  Eye, 
  Camera, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Utensils, 
  Wine, 
  Coffee, 
  Cake, 
  Leaf, 
  Flame, 
  Snowflake, 
  Globe, 
  Shield, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  Menu as MenuIcon, 
  Sparkles, 
  Crown, 
  Diamond, 
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Settings,
  Bell,
  User,
  Home,
  Bookmark,
  MessageCircle
} from 'lucide-react';

interface SaveurCateringDemoProps {
  onClose: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary: string[];
  image: string;
  chef: string;
  prepTime: number;
  servings: number;
  ingredients: string[];
  allergens: string[];
  featured: boolean;
  rating: number;
  reviews: number;
}

interface Chef {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: number;
  image: string;
  bio: string;
  awards: string[];
  signature: string[];
  rating: number;
  events: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  guests: number;
  venue: string;
  type: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  chef: string;
  menu: string[];
  total: number;
}

export const SaveurCateringDemo: React.FC<SaveurCateringDemoProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'chefs' | 'gallery' | 'booking' | 'events'>('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Truffle Risotto',
      description: 'Creamy Arborio rice with black truffle shavings, aged Parmesan, and white wine reduction',
      price: 45,
      category: 'Appetizers',
      dietary: ['Vegetarian', 'Gluten-Free'],
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
      chef: 'Chef Marcus Laurent',
      prepTime: 25,
      servings: 1,
      ingredients: ['Arborio Rice', 'Black Truffle', 'Parmesan', 'White Wine', 'Shallots', 'Vegetable Stock'],
      allergens: ['Dairy'],
      featured: true,
      rating: 4.9,
      reviews: 127
    },
    {
      id: '2',
      name: 'Wagyu Beef Tenderloin',
      description: 'Premium A5 Wagyu beef with roasted vegetables, red wine jus, and herb butter',
      price: 85,
      category: 'Main Courses',
      dietary: ['Gluten-Free'],
      image: 'https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg?auto=compress&cs=tinysrgb&w=800',
      chef: 'Chef Isabella Chen',
      prepTime: 35,
      servings: 1,
      ingredients: ['Wagyu Beef', 'Seasonal Vegetables', 'Red Wine', 'Herbs', 'Butter'],
      allergens: ['Dairy'],
      featured: true,
      rating: 4.8,
      reviews: 89
    },
    {
      id: '3',
      name: 'Lobster Thermidor',
      description: 'Fresh Maine lobster in a rich cognac cream sauce, gratinated with Gruyère cheese',
      price: 65,
      category: 'Main Courses',
      dietary: ['Gluten-Free'],
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
      chef: 'Chef Antoine Dubois',
      prepTime: 30,
      servings: 1,
      ingredients: ['Maine Lobster', 'Cognac', 'Heavy Cream', 'Gruyère Cheese', 'Shallots', 'Tarragon'],
      allergens: ['Shellfish', 'Dairy'],
      featured: false,
      rating: 4.7,
      reviews: 156
    },
    {
      id: '4',
      name: 'Chocolate Soufflé',
      description: 'Light and airy dark chocolate soufflé with vanilla bean ice cream and gold leaf',
      price: 28,
      category: 'Desserts',
      dietary: ['Vegetarian'],
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
      chef: 'Chef Sophie Martin',
      prepTime: 20,
      servings: 1,
      ingredients: ['Dark Chocolate', 'Eggs', 'Sugar', 'Vanilla Ice Cream', 'Gold Leaf'],
      allergens: ['Eggs', 'Dairy'],
      featured: true,
      rating: 4.9,
      reviews: 203
    },
    {
      id: '5',
      name: 'Seared Scallops',
      description: 'Pan-seared diver scallops with cauliflower purée, pancetta, and microgreens',
      price: 38,
      category: 'Appetizers',
      dietary: ['Gluten-Free'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      chef: 'Chef Marcus Laurent',
      prepTime: 15,
      servings: 1,
      ingredients: ['Diver Scallops', 'Cauliflower', 'Pancetta', 'Microgreens', 'Lemon'],
      allergens: ['Shellfish'],
      featured: false,
      rating: 4.6,
      reviews: 94
    },
    {
      id: '6',
      name: 'Vegan Tasting Plate',
      description: 'Seasonal vegetables, quinoa, avocado mousse, and herb-infused olive oil',
      price: 32,
      category: 'Main Courses',
      dietary: ['Vegan', 'Gluten-Free'],
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
      chef: 'Chef Elena Rodriguez',
      prepTime: 20,
      servings: 1,
      ingredients: ['Seasonal Vegetables', 'Quinoa', 'Avocado', 'Olive Oil', 'Fresh Herbs'],
      allergens: [],
      featured: false,
      rating: 4.5,
      reviews: 67
    }
  ];

  const chefs: Chef[] = [
    {
      id: '1',
      name: 'Marcus Laurent',
      title: 'Executive Chef',
      specialty: 'French Cuisine',
      experience: 15,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Trained at Le Cordon Bleu Paris, Chef Marcus brings authentic French culinary artistry to every dish. His passion for seasonal ingredients and classical techniques creates unforgettable dining experiences.',
      awards: ['Michelin Star', 'James Beard Award', 'Best Chef 2023'],
      signature: ['Truffle Risotto', 'Coq au Vin', 'Bouillabaisse'],
      rating: 4.9,
      events: 247
    },
    {
      id: '2',
      name: 'Isabella Chen',
      title: 'Head Chef',
      specialty: 'Asian Fusion',
      experience: 12,
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Chef Isabella masterfully blends traditional Asian flavors with modern techniques. Her innovative approach to fusion cuisine has earned international recognition.',
      awards: ['Rising Star Chef', 'Innovation Award', 'Best Asian Cuisine'],
      signature: ['Wagyu Beef', 'Miso Glazed Cod', 'Matcha Crème Brûlée'],
      rating: 4.8,
      events: 189
    },
    {
      id: '3',
      name: 'Antoine Dubois',
      title: 'Seafood Specialist',
      specialty: 'Seafood & Mediterranean',
      experience: 18,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'With roots in coastal France, Chef Antoine specializes in the finest seafood preparations. His Mediterranean-inspired dishes celebrate the ocean\'s bounty.',
      awards: ['Seafood Excellence', 'Mediterranean Master', 'Coastal Chef Award'],
      signature: ['Lobster Thermidor', 'Bouillabaisse', 'Grilled Branzino'],
      rating: 4.7,
      events: 156
    },
    {
      id: '4',
      name: 'Sophie Martin',
      title: 'Pastry Chef',
      specialty: 'Desserts & Pastries',
      experience: 10,
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Chef Sophie creates edible works of art that delight both the eye and palate. Her French pastry training shines through in every delicate creation.',
      awards: ['Best Pastry Chef', 'Dessert Innovation', 'Sweet Artistry Award'],
      signature: ['Chocolate Soufflé', 'Crème Brûlée', 'Macarons'],
      rating: 4.9,
      events: 134
    }
  ];

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Corporate Gala Dinner',
      date: '2024-01-15',
      time: '7:00 PM',
      guests: 150,
      venue: 'Grand Ballroom, Luxury Hotel',
      type: 'Corporate',
      status: 'upcoming',
      chef: 'Marcus Laurent',
      menu: ['Truffle Risotto', 'Wagyu Beef Tenderloin', 'Chocolate Soufflé'],
      total: 12750
    },
    {
      id: '2',
      title: 'Wedding Reception',
      date: '2024-01-18',
      time: '6:30 PM',
      guests: 80,
      venue: 'Garden Pavilion',
      type: 'Wedding',
      status: 'upcoming',
      chef: 'Isabella Chen',
      menu: ['Seared Scallops', 'Lobster Thermidor', 'Wedding Cake'],
      total: 8960
    },
    {
      id: '3',
      title: 'Private Birthday Party',
      date: '2024-01-20',
      time: '7:30 PM',
      guests: 25,
      venue: 'Private Residence',
      type: 'Private',
      status: 'upcoming',
      chef: 'Sophie Martin',
      menu: ['Appetizer Selection', 'Vegan Tasting Plate', 'Custom Birthday Cake'],
      total: 2875
    }
  ];

  const categories = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'];
  const dietaryOptions = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'];

  const galleryImages = [
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDietary = selectedDietary === 'All' || item.dietary.includes(selectedDietary);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDietary && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.item.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(cartItem => cartItem.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(prev => prev.map(cartItem =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const MenuItemCard: React.FC<{ item: MenuItem; index: number }> = ({ item, index }) => (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {item.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
            <span className="text-white text-sm font-medium flex items-center gap-1">
              <Crown className="w-4 h-4" />
              Featured
            </span>
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => setSelectedMenuItem(item)}
            className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-2 rounded-lg font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({item.reviews})</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
          {item.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">by {item.chef}</span>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {item.prepTime}m
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {item.dietary.map((diet) => (
            <span 
              key={diet}
              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
            >
              {diet}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">${item.price}</span>
            <span className="text-gray-500 text-sm ml-1">per serving</span>
          </div>
          <button 
            onClick={() => addToCart(item)}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );

  const ChefCard: React.FC<{ chef: Chef; index: number }> = ({ chef, index }) => (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setSelectedChef(chef)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={chef.image} 
          alt={chef.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{chef.name}</h3>
          <p className="text-amber-300 font-medium">{chef.title}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(chef.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({chef.events} events)</span>
          </div>
          <span className="text-sm text-gray-500">{chef.experience} years</span>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{chef.bio.substring(0, 120)}...</p>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-900 mb-1">Specialty</p>
            <p className="text-sm text-amber-600">{chef.specialty}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">Awards</p>
            <div className="flex flex-wrap gap-1">
              {chef.awards.slice(0, 2).map((award) => (
                <span 
                  key={award}
                  className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                >
                  {award}
                </span>
              ))}
              {chef.awards.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{chef.awards.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Luxury dining"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Saveur
            </span>
            <br />
            <span className="text-white">Elite</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
            Exquisite culinary experiences crafted by world-renowned chefs
            <br />
            for your most memorable occasions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => setCurrentView('menu')}
              className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => setShowBookingModal(true)}
              className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-full font-semibold hover:bg-amber-400 hover:text-black transition-all duration-300"
            >
              Book Event
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-amber-400" />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Saveur Elite</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver unparalleled culinary excellence through our commitment to quality, creativity, and service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Master Chefs</h3>
            <p className="text-gray-600 leading-relaxed">
              Our team of internationally acclaimed chefs brings decades of experience and Michelin-starred expertise to every event.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Ingredients</h3>
            <p className="text-gray-600 leading-relaxed">
              We source only the finest ingredients from trusted suppliers worldwide, ensuring exceptional quality in every dish.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Luxury Service</h3>
            <p className="text-gray-600 leading-relaxed">
              From intimate dinners to grand celebrations, we provide white-glove service that exceeds expectations.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Menu Items */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Signature Creations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most celebrated dishes, crafted with passion and presented with artistry
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.filter(item => item.featured).map((item, index) => (
            <MenuItemCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => setCurrentView('menu')}
            className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
          >
            View Full Menu
          </button>
        </div>
      </div>

      {/* Chef Showcase */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Chefs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              World-class culinary artists dedicated to creating extraordinary dining experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {chefs.map((chef, index) => (
              <ChefCard key={chef.id} chef={chef} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Client Testimonials</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied clients about their exceptional experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Event Coordinator",
              company: "Fortune 500 Corp",
              testimonial: "Saveur Elite transformed our corporate gala into an unforgettable culinary journey. The attention to detail and quality was exceptional.",
              rating: 5
            },
            {
              name: "Michael Chen",
              role: "Groom",
              company: "Wedding Client",
              testimonial: "Our wedding reception was absolutely perfect. Chef Marcus created a menu that wowed our guests and made our special day even more memorable.",
              rating: 5
            },
            {
              name: "Emma Rodriguez",
              role: "Private Client",
              company: "Anniversary Celebration",
              testimonial: "The intimate dinner for our anniversary was beyond our expectations. Every dish was a work of art, and the service was impeccable.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                "{testimonial.testimonial}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <p className="text-sm text-amber-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Perfect Event?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Let our culinary experts design a bespoke menu for your special occasion
          </p>
          <button 
            onClick={() => setShowBookingModal(true)}
            className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            Start Planning Today
          </button>
        </div>
      </div>
    </div>
  );

  const MenuView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Culinary Menu</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our exquisite collection of dishes, each crafted with passion and precision
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedDietary}
              onChange={(e) => setSelectedDietary(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {dietaryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className={`grid gap-8 ${
        viewMode === 'grid' 
          ? 'md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 max-w-4xl mx-auto'
      }`}>
        {filteredMenuItems.map((item, index) => (
          <MenuItemCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {filteredMenuItems.length === 0 && (
        <div className="text-center py-16">
          <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No dishes found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );

  const ChefsView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Master Chefs</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet the culinary artists who bring passion, creativity, and expertise to every dish
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {chefs.map((chef, index) => (
          <ChefCard key={chef.id} chef={chef} index={index} />
        ))}
      </div>
    </div>
  );

  const GalleryView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A visual journey through our culinary creations and memorable events
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div 
            key={index}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setCurrentImageIndex(index)}
          >
            <img 
              src={image} 
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full">
                <Eye className="w-6 h-6 text-gray-900" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EventsView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-xl text-gray-600">
            Manage and track your scheduled catering events
          </p>
        </div>
        <button 
          onClick={() => setShowBookingModal(true)}
          className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Event
        </button>
      </div>

      <div className="grid gap-6">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.guests} guests
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  event.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {event.status.replace('-', ' ')}
                </span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Venue</p>
                <p className="text-gray-600 mb-4">{event.venue}</p>
                
                <p className="text-sm font-medium text-gray-900 mb-2">Chef</p>
                <p className="text-amber-600 font-medium">{event.chef}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Menu</p>
                <div className="space-y-1 mb-4">
                  {event.menu.map((item, index) => (
                    <p key={index} className="text-gray-600 text-sm">• {item}</p>
                  ))}
                </div>
                
                <p className="text-sm font-medium text-gray-900 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">${event.total.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Cursor */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${selectedMenuItem || selectedChef ? 1.5 : 1})`
        }}
      />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Saveur Elite
              </div>
              
              <nav className="hidden md:flex space-x-8">
                {[
                  { id: 'home', name: 'Home' },
                  { id: 'menu', name: 'Menu' },
                  { id: 'chefs', name: 'Chefs' },
                  { id: 'gallery', name: 'Gallery' },
                  { id: 'events', name: 'Events' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as any)}
                    className={`font-medium transition-colors ${
                      currentView === item.id 
                        ? 'text-amber-600 border-b-2 border-amber-600 pb-1' 
                        : 'text-gray-600 hover:text-amber-600'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowBookingModal(true)}
                className="hidden md:block bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
              >
                Book Event
              </button>
              
              {getTotalItems() > 0 && (
                <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div ref={containerRef} className="overflow-y-auto">
        <main className="max-w-7xl mx-auto px-6 py-8">
          {currentView === 'home' && <HomeView />}
          {currentView === 'menu' && <MenuView />}
          {currentView === 'chefs' && <ChefsView />}
          {currentView === 'gallery' && <GalleryView />}
          {currentView === 'events' && <EventsView />}
        </main>
      </div>

      {/* Menu Item Detail Modal */}
      {selectedMenuItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedMenuItem.image} 
                alt={selectedMenuItem.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedMenuItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedMenuItem.name}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">{selectedMenuItem.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>by {selectedMenuItem.chef}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedMenuItem.prepTime} minutes
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedMenuItem.servings} serving
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">${selectedMenuItem.price}</p>
                  <p className="text-gray-500">per serving</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedMenuItem.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dietary Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Dietary Options</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMenuItem.dietary.map((diet) => (
                          <span key={diet} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            {diet}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {selectedMenuItem.allergens.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Allergens</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedMenuItem.allergens.map((allergen) => (
                            <span key={allergen} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    addToCart(selectedMenuItem);
                    setSelectedMenuItem(null);
                  }}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add to Order
                </button>
                <button className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chef Detail Modal */}
      {selectedChef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedChef.image} 
                alt={selectedChef.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedChef(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-3xl font-bold mb-1">{selectedChef.name}</h2>
                <p className="text-amber-300 text-lg">{selectedChef.title}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{selectedChef.bio}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Specialty</p>
                      <p className="text-amber-600 font-medium">{selectedChef.specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Experience</p>
                      <p className="text-gray-900">{selectedChef.experience} years</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(selectedChef.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({selectedChef.events} events)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Awards & Recognition</h3>
                  <div className="space-y-2 mb-6">
                    {selectedChef.awards.map((award, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                        <Award className="w-5 h-5 text-amber-600" />
                        <span className="text-gray-900 font-medium">{award}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Signature Dishes</h3>
                  <div className="space-y-2">
                    {selectedChef.signature.map((dish, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <ChefHat className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900">{dish}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedChef(null);
                  setShowBookingModal(true);
                }}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Book Chef {selectedChef.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-2xl w-full bg-white rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Book Your Event</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Corporate Event</option>
                    <option>Wedding</option>
                    <option>Private Party</option>
                    <option>Anniversary</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                  <input 
                    type="number" 
                    placeholder="50"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Time</label>
                  <input 
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                <input 
                  type="text" 
                  placeholder="Event venue or address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Chef</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Any Available Chef</option>
                  {chefs.map((chef) => (
                    <option key={chef.id} value={chef.name}>{chef.name} - {chef.specialty}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                <textarea 
                  rows={4}
                  placeholder="Dietary restrictions, special requests, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                ></textarea>
              </div>
              
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-600 font-semibold hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};