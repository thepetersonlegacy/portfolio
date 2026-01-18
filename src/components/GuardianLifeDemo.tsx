import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  Heart, 
  Users, 
  Calculator, 
  FileText, 
  Download, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Star, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail, 
  MessageCircle, 
  Bell, 
  Settings, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  User, 
  Home, 
  Building, 
  Car, 
  Plane, 
  Briefcase, 
  GraduationCap, 
  Baby, 
  Zap, 
  Target, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Activity, 
  Bookmark, 
  Share2, 
  Copy, 
  Check, 
  X, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  HelpCircle, 
  PlayCircle, 
  BookOpen, 
  CreditCard, 
  Wallet, 
  Receipt, 
  FileCheck, 
  UserCheck, 
  Globe, 
  MapPin, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Camera, 
  Video, 
  Mic, 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  SkipForward, 
  SkipBack, 
  Repeat, 
  Shuffle, 
  List, 
  Grid, 
  Layers, 
  Package, 
  Truck, 
  ShoppingCart, 
  Tag, 
  Percent, 
  Gift, 
  Crown, 
  Diamond, 
  Gem, 
  Sparkles, 
  Flame, 
  Snowflake, 
  Sun, 
  Moon, 
  Cloud, 
  CloudRain, 
  Umbrella, 
  Wind, 
  Thermometer, 
  Droplets, 
  Waves, 
  Mountain, 
  TreePine, 
  Flower, 
  Leaf, 
  Sunrise, 
  Sunset
} from 'lucide-react';

interface GuardianLifeDemoProps {
  onClose: () => void;
}

interface Policy {
  id: string;
  name: string;
  type: 'term' | 'whole' | 'universal' | 'variable';
  description: string;
  features: string[];
  pros: string[];
  cons: string[];
  ageRange: string;
  coverageRange: string;
  premiumStructure: string;
  flexibility: 'Low' | 'Medium' | 'High';
  cashValue: boolean;
  investmentOptions: boolean;
  popular: boolean;
  recommended: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

interface Quote {
  id: string;
  policyType: string;
  coverage: number;
  term: number;
  monthlyPremium: number;
  annualPremium: number;
  totalPremiums: number;
  savings: number;
  features: string[];
  riders: string[];
  underwriting: 'Simplified' | 'Medical Exam' | 'Full Underwriting';
  approval: 'Instant' | '24-48 Hours' | '2-4 Weeks';
}

interface EducationalContent {
  id: string;
  title: string;
  type: 'article' | 'video' | 'calculator' | 'guide';
  category: 'basics' | 'planning' | 'comparison' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: string;
  featured: boolean;
  views: number;
  rating: number;
  icon: React.ComponentType<any>;
}

interface Application {
  id: string;
  policyType: string;
  coverage: number;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'declined';
  progress: number;
  submittedDate: string;
  estimatedDecision: string;
  requirements: Requirement[];
  documents: Document[];
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

interface Requirement {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'completed' | 'in-review' | 'approved';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const GuardianLifeDemo: React.FC<GuardianLifeDemoProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'policies' | 'quotes' | 'education' | 'application' | 'profile'>('dashboard');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [quoteParams, setQuoteParams] = useState({
    age: 35,
    gender: 'male',
    health: 'excellent',
    smoking: false,
    coverage: 500000,
    term: 20,
    state: 'CA'
  });
  const [generatedQuotes, setGeneratedQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [educationFilter, setEducationFilter] = useState({
    type: 'all',
    category: 'all',
    difficulty: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorInputs, setCalculatorInputs] = useState({
    age: 35,
    income: 75000,
    debt: 250000,
    dependents: 2,
    expenses: 60000,
    savings: 50000
  });

  const policies: Policy[] = [
    {
      id: 'term-life',
      name: 'Term Life Insurance',
      type: 'term',
      description: 'Affordable coverage for a specific period, ideal for temporary needs like mortgage protection or income replacement.',
      features: ['Fixed premiums', 'Level death benefit', 'Convertible options', 'Renewable terms'],
      pros: ['Lowest cost', 'Simple structure', 'High coverage amounts', 'Flexible terms'],
      cons: ['No cash value', 'Temporary coverage', 'Premiums increase with age'],
      ageRange: '18-75',
      coverageRange: '$50K - $10M',
      premiumStructure: 'Level for term period',
      flexibility: 'Medium',
      cashValue: false,
      investmentOptions: false,
      popular: true,
      recommended: false,
      icon: Shield,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'whole-life',
      name: 'Whole Life Insurance',
      type: 'whole',
      description: 'Permanent coverage with guaranteed cash value growth, providing lifelong protection and savings.',
      features: ['Guaranteed cash value', 'Fixed premiums', 'Dividends eligible', 'Loan options'],
      pros: ['Permanent coverage', 'Cash value growth', 'Tax advantages', 'Predictable returns'],
      cons: ['Higher premiums', 'Lower returns', 'Less flexibility'],
      ageRange: '0-85',
      coverageRange: '$25K - $5M',
      premiumStructure: 'Level for life',
      flexibility: 'Low',
      cashValue: true,
      investmentOptions: false,
      popular: false,
      recommended: true,
      icon: Heart,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'universal-life',
      name: 'Universal Life Insurance',
      type: 'universal',
      description: 'Flexible permanent coverage allowing premium and death benefit adjustments with cash value accumulation.',
      features: ['Flexible premiums', 'Adjustable death benefit', 'Cash value growth', 'Policy loans'],
      pros: ['Premium flexibility', 'Death benefit options', 'Cash accumulation', 'Tax benefits'],
      cons: ['Complex structure', 'Market risk', 'Fees and charges'],
      ageRange: '18-80',
      coverageRange: '$100K - $10M',
      premiumStructure: 'Flexible',
      flexibility: 'High',
      cashValue: true,
      investmentOptions: true,
      popular: false,
      recommended: false,
      icon: Zap,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'variable-life',
      name: 'Variable Life Insurance',
      type: 'variable',
      description: 'Investment-linked permanent coverage where cash value depends on investment performance in sub-accounts.',
      features: ['Investment sub-accounts', 'Variable cash value', 'Death benefit options', 'Tax-deferred growth'],
      pros: ['Investment control', 'Growth potential', 'Tax advantages', 'Estate planning'],
      cons: ['Investment risk', 'Complex management', 'Higher fees'],
      ageRange: '21-75',
      coverageRange: '$250K - $25M',
      premiumStructure: 'Fixed or flexible',
      flexibility: 'High',
      cashValue: true,
      investmentOptions: true,
      popular: false,
      recommended: false,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    }
  ];

  const educationalContent: EducationalContent[] = [
    {
      id: '1',
      title: 'Life Insurance Basics: What You Need to Know',
      type: 'article',
      category: 'basics',
      difficulty: 'beginner',
      duration: '5 min read',
      description: 'Understanding the fundamentals of life insurance and why it matters for your financial security.',
      featured: true,
      views: 15420,
      rating: 4.8,
      icon: BookOpen
    },
    {
      id: '2',
      title: 'How Much Life Insurance Do I Need?',
      type: 'calculator',
      category: 'planning',
      difficulty: 'beginner',
      duration: '3 min',
      description: 'Interactive calculator to determine your optimal life insurance coverage amount.',
      featured: true,
      views: 12350,
      rating: 4.9,
      icon: Calculator
    },
    {
      id: '3',
      title: 'Term vs Whole Life: Complete Comparison',
      type: 'video',
      category: 'comparison',
      difficulty: 'intermediate',
      duration: '12 min',
      description: 'Detailed video comparison of term and whole life insurance policies.',
      featured: false,
      views: 8940,
      rating: 4.7,
      icon: PlayCircle
    },
    {
      id: '4',
      title: 'Estate Planning with Life Insurance',
      type: 'guide',
      category: 'advanced',
      difficulty: 'advanced',
      duration: '20 min read',
      description: 'Comprehensive guide on using life insurance for estate planning and wealth transfer.',
      featured: false,
      views: 5670,
      rating: 4.6,
      icon: Crown
    },
    {
      id: '5',
      title: 'Understanding Policy Riders and Add-ons',
      type: 'article',
      category: 'basics',
      difficulty: 'intermediate',
      duration: '8 min read',
      description: 'Learn about optional riders that can enhance your life insurance coverage.',
      featured: false,
      views: 7230,
      rating: 4.5,
      icon: Plus
    },
    {
      id: '6',
      title: 'Life Insurance for Young Families',
      type: 'video',
      category: 'planning',
      difficulty: 'beginner',
      duration: '15 min',
      description: 'Special considerations and strategies for young families buying life insurance.',
      featured: true,
      views: 9850,
      rating: 4.8,
      icon: Baby
    }
  ];

  const sampleQuotes: Quote[] = [
    {
      id: 'quote-1',
      policyType: 'Term Life - 20 Year',
      coverage: 500000,
      term: 20,
      monthlyPremium: 42,
      annualPremium: 504,
      totalPremiums: 10080,
      savings: 156,
      features: ['Level premiums', 'Convertible', 'Renewable', 'Accelerated benefits'],
      riders: ['Accidental Death', 'Waiver of Premium'],
      underwriting: 'Medical Exam',
      approval: '2-4 Weeks'
    },
    {
      id: 'quote-2',
      policyType: 'Whole Life',
      coverage: 500000,
      term: 0,
      monthlyPremium: 385,
      annualPremium: 4620,
      totalPremiums: 92400,
      savings: 0,
      features: ['Guaranteed cash value', 'Dividends', 'Loan options', 'Paid-up additions'],
      riders: ['Long-term Care', 'Disability Income'],
      underwriting: 'Full Underwriting',
      approval: '2-4 Weeks'
    },
    {
      id: 'quote-3',
      policyType: 'Universal Life',
      coverage: 500000,
      term: 0,
      monthlyPremium: 285,
      annualPremium: 3420,
      totalPremiums: 68400,
      savings: 540,
      features: ['Flexible premiums', 'Cash accumulation', 'Death benefit options', 'Policy loans'],
      riders: ['Critical Illness', 'Return of Premium'],
      underwriting: 'Simplified',
      approval: '24-48 Hours'
    }
  ];

  const sampleApplication: Application = {
    id: 'app-001',
    policyType: 'Term Life - 20 Year',
    coverage: 500000,
    status: 'under-review',
    progress: 75,
    submittedDate: '2024-01-15',
    estimatedDecision: '2024-01-29',
    requirements: [
      {
        id: 'req-1',
        name: 'Medical Exam',
        description: 'Complete medical examination with approved provider',
        status: 'completed',
        priority: 'high',
        dueDate: '2024-01-20'
      },
      {
        id: 'req-2',
        name: 'Financial Documents',
        description: 'Provide income verification and financial statements',
        status: 'approved',
        priority: 'medium',
        dueDate: '2024-01-18'
      },
      {
        id: 'req-3',
        name: 'Beneficiary Information',
        description: 'Complete beneficiary designation forms',
        status: 'in-review',
        priority: 'high',
        dueDate: '2024-01-22'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        name: 'Application Form.pdf',
        type: 'Application',
        size: '2.4 MB',
        uploadedDate: '2024-01-15',
        status: 'approved'
      },
      {
        id: 'doc-2',
        name: 'Medical_Records.pdf',
        type: 'Medical',
        size: '1.8 MB',
        uploadedDate: '2024-01-18',
        status: 'approved'
      },
      {
        id: 'doc-3',
        name: 'Income_Statement.pdf',
        type: 'Financial',
        size: '856 KB',
        uploadedDate: '2024-01-20',
        status: 'pending'
      }
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@guardianlife.com',
      avatar: 'SJ'
    }
  };

  const generateQuotes = () => {
    // Simulate quote generation based on parameters
    const baseRate = quoteParams.smoking ? 1.5 : 1.0;
    const ageMultiplier = Math.max(1, quoteParams.age / 30);
    const healthMultiplier = quoteParams.health === 'excellent' ? 0.9 : 
                           quoteParams.health === 'good' ? 1.0 : 1.2;
    
    const quotes = sampleQuotes.map(quote => ({
      ...quote,
      coverage: quoteParams.coverage,
      term: quote.policyType.includes('Term') ? quoteParams.term : 0,
      monthlyPremium: Math.round(quote.monthlyPremium * baseRate * ageMultiplier * healthMultiplier),
      annualPremium: Math.round(quote.annualPremium * baseRate * ageMultiplier * healthMultiplier * 12),
      totalPremiums: quote.policyType.includes('Term') ? 
        Math.round(quote.annualPremium * baseRate * ageMultiplier * healthMultiplier * 12 * quoteParams.term) :
        Math.round(quote.annualPremium * baseRate * ageMultiplier * healthMultiplier * 12 * 20)
    }));

    setGeneratedQuotes(quotes);
    setShowQuoteModal(false);
  };

  const calculateCoverage = () => {
    const { income, debt, dependents, expenses, savings } = calculatorInputs;
    const incomeReplacement = income * 10; // 10x annual income rule
    const debtCoverage = debt;
    const educationCosts = dependents * 100000; // $100k per child
    const finalExpenses = 25000;
    const emergencyFund = expenses * 0.5; // 6 months expenses
    
    const totalNeeded = incomeReplacement + debtCoverage + educationCosts + finalExpenses + emergencyFund;
    const recommendedCoverage = Math.max(0, totalNeeded - savings);
    
    return Math.round(recommendedCoverage / 50000) * 50000; // Round to nearest $50k
  };

  const filteredEducation = educationalContent.filter(content => {
    const matchesType = educationFilter.type === 'all' || content.type === educationFilter.type;
    const matchesCategory = educationFilter.category === 'all' || content.category === educationFilter.category;
    const matchesDifficulty = educationFilter.difficulty === 'all' || content.difficulty === educationFilter.difficulty;
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'text-green-500 bg-green-100';
      case 'pending':
      case 'draft':
        return 'text-yellow-500 bg-yellow-100';
      case 'in-review':
      case 'under-review':
      case 'submitted':
        return 'text-blue-500 bg-blue-100';
      case 'declined':
      case 'rejected':
        return 'text-red-500 bg-red-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-100';
      case 'medium':
        return 'text-yellow-500 bg-yellow-100';
      case 'low':
        return 'text-green-500 bg-green-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const PolicyCard: React.FC<{ policy: Policy }> = ({ policy }) => {
    const IconComponent = policy.icon;
    
    return (
      <div 
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer relative"
        onClick={() => setSelectedPolicy(policy)}
      >
        {policy.popular && (
          <div className="absolute -top-3 left-6 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        )}
        {policy.recommended && (
          <div className="absolute -top-3 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Recommended
          </div>
        )}
        
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${policy.color} rounded-xl flex items-center justify-center`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{policy.name}</h3>
            <p className="text-gray-600 capitalize">{policy.type} Life Insurance</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 leading-relaxed">{policy.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Age Range</p>
            <p className="font-semibold text-gray-900">{policy.ageRange}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Coverage</p>
            <p className="font-semibold text-gray-900">{policy.coverageRange}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Flexibility</p>
            <p className="font-semibold text-gray-900">{policy.flexibility}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Cash Value</p>
            <p className="font-semibold text-gray-900">{policy.cashValue ? 'Yes' : 'No'}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {policy.features.slice(0, 3).map((feature) => (
            <span key={feature} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {feature}
            </span>
          ))}
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowQuoteModal(true);
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Quote
        </button>
      </div>
    );
  };

  const QuoteCard: React.FC<{ quote: Quote }> = ({ quote }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{quote.policyType}</h3>
          <p className="text-gray-600">${quote.coverage.toLocaleString()} Coverage</p>
        </div>
        {quote.savings > 0 && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Save ${quote.savings}/year
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Monthly Premium</p>
          <p className="text-2xl font-bold text-gray-900">${quote.monthlyPremium}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Annual Premium</p>
          <p className="text-xl font-bold text-gray-900">${quote.annualPremium.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Underwriting:</span>
          <span className="font-medium text-gray-900">{quote.underwriting}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Approval Time:</span>
          <span className="font-medium text-gray-900">{quote.approval}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {quote.features.slice(0, 3).map((feature) => (
          <span key={feature} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {feature}
          </span>
        ))}
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={() => setSelectedQuote(quote)}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
        <button 
          onClick={() => setShowApplicationModal(true)}
          className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Apply Now
        </button>
      </div>
    </div>
  );

  const EducationCard: React.FC<{ content: EducationalContent }> = ({ content }) => {
    const IconComponent = content.icon;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-gray-900">{content.title}</h3>
              {content.featured && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
              <span className="capitalize">{content.type}</span>
              <span>{content.duration}</span>
              <span className="capitalize">{content.difficulty}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 leading-relaxed">{content.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {content.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              {content.rating}
            </span>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            {content.type === 'video' ? 'Watch' : content.type === 'calculator' ? 'Use Tool' : 'Read'}
          </button>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to Guardian Life</h2>
            <p className="text-blue-100 text-lg">Protecting what matters most to you and your family</p>
          </div>
          <div className="text-right">
            <Shield className="w-16 h-16 text-white/80 mb-2" />
            <p className="text-blue-100">Your trusted partner</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button 
          onClick={() => setShowQuoteModal(true)}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Get Quote</h3>
          <p className="text-gray-600 text-sm">Compare policies and get instant quotes</p>
        </button>
        
        <button 
          onClick={() => setCurrentView('policies')}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Compare Policies</h3>
          <p className="text-gray-600 text-sm">Find the right coverage for your needs</p>
        </button>
        
        <button 
          onClick={() => setShowCalculator(true)}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Coverage Calculator</h3>
          <p className="text-gray-600 text-sm">Determine how much coverage you need</p>
        </button>
        
        <button 
          onClick={() => setCurrentView('education')}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-left"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Learn More</h3>
          <p className="text-gray-600 text-sm">Educational resources and guides</p>
        </button>
      </div>

      {/* Featured Policies */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Popular Policies</h3>
          <button 
            onClick={() => setCurrentView('policies')}
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View All Policies
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {policies.filter(p => p.popular || p.recommended).map((policy) => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      </div>

      {/* Recent Quotes */}
      {generatedQuotes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Your Recent Quotes</h3>
            <button 
              onClick={() => setCurrentView('quotes')}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              View All Quotes
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedQuotes.slice(0, 3).map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
        </div>
      )}

      {/* Educational Content */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Featured Resources</h3>
          <button 
            onClick={() => setCurrentView('education')}
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View All Resources
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationalContent.filter(c => c.featured).map((content) => (
            <EducationCard key={content.id} content={content} />
          ))}
        </div>
      </div>
    </div>
  );

  const PoliciesView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Life Insurance Policies</h2>
          <p className="text-gray-600 mt-2">Compare different types of life insurance to find the right fit for your needs</p>
        </div>
        <button 
          onClick={() => setShowQuoteModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Quotes
        </button>
      </div>

      {/* Policy Comparison */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Policy Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                {policies.map((policy) => (
                  <th key={policy.id} className="text-center py-4 px-4 font-semibold text-gray-900">
                    {policy.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">Coverage Type</td>
                {policies.map((policy) => (
                  <td key={policy.id} className="text-center py-4 px-4 text-gray-600">
                    {policy.type === 'term' ? 'Temporary' : 'Permanent'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">Cash Value</td>
                {policies.map((policy) => (
                  <td key={policy.id} className="text-center py-4 px-4">
                    {policy.cashValue ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">Investment Options</td>
                {policies.map((policy) => (
                  <td key={policy.id} className="text-center py-4 px-4">
                    {policy.investmentOptions ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">Premium Structure</td>
                {policies.map((policy) => (
                  <td key={policy.id} className="text-center py-4 px-4 text-gray-600">
                    {policy.premiumStructure}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-gray-700">Flexibility</td>
                {policies.map((policy) => (
                  <td key={policy.id} className="text-center py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      policy.flexibility === 'High' ? 'bg-green-100 text-green-800' :
                      policy.flexibility === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {policy.flexibility}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Policy Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );

  const QuotesView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Quotes</h2>
          <p className="text-gray-600 mt-2">Compare quotes and find the best coverage for your needs</p>
        </div>
        <button 
          onClick={() => setShowQuoteModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Quote
        </button>
      </div>

      {generatedQuotes.length === 0 ? (
        <div className="text-center py-16">
          <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No quotes yet</h3>
          <p className="text-gray-600 mb-6">Get started by generating your first quote</p>
          <button 
            onClick={() => setShowQuoteModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Your First Quote
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );

  const EducationView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Educational Resources</h2>
          <p className="text-gray-600 mt-2">Learn about life insurance and make informed decisions</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={educationFilter.type}
            onChange={(e) => setEducationFilter(prev => ({ ...prev, type: e.target.value }))}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="article">Articles</option>
            <option value="video">Videos</option>
            <option value="calculator">Calculators</option>
            <option value="guide">Guides</option>
          </select>
          
          <select
            value={educationFilter.category}
            onChange={(e) => setEducationFilter(prev => ({ ...prev, category: e.target.value }))}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="basics">Basics</option>
            <option value="planning">Planning</option>
            <option value="comparison">Comparison</option>
            <option value="advanced">Advanced</option>
          </select>
          
          <select
            value={educationFilter.difficulty}
            onChange={(e) => setEducationFilter(prev => ({ ...prev, difficulty: e.target.value }))}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Featured Content */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationalContent.filter(c => c.featured).map((content) => (
            <EducationCard key={content.id} content={content} />
          ))}
        </div>
      </div>

      {/* All Content */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">All Resources</h3>
          <p className="text-gray-600">{filteredEducation.length} resources found</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEducation.map((content) => (
            <EducationCard key={content.id} content={content} />
          ))}
        </div>
      </div>
    </div>
  );

  const ApplicationView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Application Status</h2>
          <p className="text-gray-600 mt-2">Track your life insurance application progress</p>
        </div>
      </div>

      {/* Application Overview */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{sampleApplication.policyType}</h3>
            <p className="text-gray-600">${sampleApplication.coverage.toLocaleString()} Coverage</p>
          </div>
          <div className="text-right">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(sampleApplication.status)}`}>
              {sampleApplication.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">Submitted</p>
            <p className="font-semibold text-gray-900">{new Date(sampleApplication.submittedDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Estimated Decision</p>
            <p className="font-semibold text-gray-900">{new Date(sampleApplication.estimatedDecision).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Progress</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${sampleApplication.progress}%` }}
                ></div>
              </div>
              <span className="font-semibold text-gray-900">{sampleApplication.progress}%</span>
            </div>
          </div>
        </div>

        {/* Agent Contact */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Your Agent</h4>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{sampleApplication.agent.avatar}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{sampleApplication.agent.name}</p>
              <p className="text-gray-600 text-sm">Licensed Insurance Agent</p>
            </div>
            <div className="flex gap-3">
              <button className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Requirements</h3>
        <div className="space-y-4">
          {sampleApplication.requirements.map((req) => (
            <div key={req.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                req.status === 'completed' ? 'bg-green-500' :
                req.status === 'approved' ? 'bg-green-500' :
                req.status === 'in-review' ? 'bg-blue-500' :
                'bg-gray-300'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-semibold text-gray-900">{req.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(req.priority)}`}>
                    {req.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{req.description}</p>
                <p className="text-gray-500 text-xs mt-1">Due: {new Date(req.dueDate).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(req.status)}`}>
                {req.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Documents</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        </div>
        <div className="space-y-4">
          {sampleApplication.documents.map((doc) => (
            <div key={doc.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <FileText className="w-8 h-8 text-gray-500" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{doc.type}</span>
                  <span>{doc.size}</span>
                  <span>Uploaded {new Date(doc.uploadedDate).toLocaleDateString()}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doc.status)}`}>
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
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
                  Guardian Life Insurance
                </h1>
                <p className="text-gray-600">Protecting your family's future</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center space-x-6">
                {['Dashboard', 'Policies', 'Quotes', 'Education', 'Application'].map((item) => (
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
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'policies' && <PoliciesView />}
        {currentView === 'quotes' && <QuotesView />}
        {currentView === 'education' && <EducationView />}
        {currentView === 'application' && <ApplicationView />}
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-2xl w-full bg-white rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Get Your Quote</h3>
              <button 
                onClick={() => setShowQuoteModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={quoteParams.age}
                    onChange={(e) => setQuoteParams(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={quoteParams.gender}
                    onChange={(e) => setQuoteParams(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Health Status</label>
                  <select
                    value={quoteParams.health}
                    onChange={(e) => setQuoteParams(prev => ({ ...prev, health: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Status</label>
                  <select
                    value={quoteParams.smoking ? 'yes' : 'no'}
                    onChange={(e) => setQuoteParams(prev => ({ ...prev, smoking: e.target.value === 'yes' }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="no">Non-smoker</option>
                    <option value="yes">Smoker</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coverage Amount: ${quoteParams.coverage.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="50000"
                  value={quoteParams.coverage}
                  onChange={(e) => setQuoteParams(prev => ({ ...prev, coverage: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>$50K</span>
                  <span>$2M</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Term Length: {quoteParams.term} years
                </label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="5"
                  value={quoteParams.term}
                  onChange={(e) => setQuoteParams(prev => ({ ...prev, term: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>10 years</span>
                  <span>30 years</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={quoteParams.state}
                  onChange={(e) => setQuoteParams(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                </select>
              </div>
              
              <button 
                onClick={generateQuotes}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Generate Quotes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coverage Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-2xl w-full bg-white rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Coverage Calculator</h3>
              <button 
                onClick={() => setShowCalculator(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={calculatorInputs.age}
                    onChange={(e) => setCalculatorInputs(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
                  <input
                    type="number"
                    value={calculatorInputs.income}
                    onChange={(e) => setCalculatorInputs(prev => ({ ...prev, income: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Debt</label>
                  <input
                    type="number"
                    value={calculatorInputs.debt}
                    onChange={(e) => setCalculatorInputs(prev => ({ ...prev, debt: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependents</label>
                  <input
                    type="number"
                    value={calculatorInputs.dependents}
                    onChange={(e) => setCalculatorInputs(prev => ({ ...prev, dependents: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Expenses</label>
                  <input
                    type="number"
                    value={calculatorInputs.expenses}
                    onChange={(e) => setCalculatorInputs(prev => ({ ...prev, expenses: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Savings</label>
                  <input
                    type="number"
                    value={calculatorInputs.savings}
                    onChange={(e) => setCalculatorInputs(prev => ({ ...prev, savings: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommended Coverage</h4>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 mb-2">
                    ${calculateCoverage().toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Based on your financial situation and family needs
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setQuoteParams(prev => ({ ...prev, coverage: calculateCoverage() }));
                    setShowCalculator(false);
                    setShowQuoteModal(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Quote for This Amount
                </button>
                <button 
                  onClick={() => setShowCalculator(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy Detail Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${selectedPolicy.color} rounded-xl flex items-center justify-center`}>
                    <selectedPolicy.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedPolicy.name}</h3>
                    <p className="text-gray-600">{selectedPolicy.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPolicy(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedPolicy.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Policy Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age Range:</span>
                      <span className="font-medium text-gray-900">{selectedPolicy.ageRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coverage Range:</span>
                      <span className="font-medium text-gray-900">{selectedPolicy.coverageRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Premium Structure:</span>
                      <span className="font-medium text-gray-900">{selectedPolicy.premiumStructure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flexibility:</span>
                      <span className="font-medium text-gray-900">{selectedPolicy.flexibility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cash Value:</span>
                      <span className="font-medium text-gray-900">{selectedPolicy.cashValue ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Options:</span>
                      <span className="font-medium text-gray-900">{selectedPolicy.investmentOptions ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-4">Advantages</h4>
                  <ul className="space-y-2">
                    {selectedPolicy.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Plus className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-red-600 mb-4">Considerations</h4>
                  <ul className="space-y-2">
                    {selectedPolicy.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => {
                    setSelectedPolicy(null);
                    setShowQuoteModal(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Quote
                </button>
                <button 
                  onClick={() => setSelectedPolicy(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};