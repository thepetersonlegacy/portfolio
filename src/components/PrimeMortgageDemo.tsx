import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Calculator, 
  DollarSign, 
  Home, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar, 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  User, 
  CreditCard, 
  PieChart, 
  BarChart3, 
  LineChart, 
  Target, 
  Award, 
  Zap, 
  Sparkles, 
  Heart, 
  Share2, 
  Filter, 
  Search, 
  Plus, 
  Minus, 
  X, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ChevronLeft, 
  MoreHorizontal, 
  Bell, 
  Settings, 
  HelpCircle, 
  MapPin, 
  Building, 
  Car, 
  Briefcase, 
  GraduationCap, 
  Baby, 
  Plane, 
  ShoppingBag, 
  Utensils, 
  Gamepad2, 
  Music, 
  Camera, 
  Smartphone, 
  Laptop, 
  Watch, 
  Headphones, 
  Coffee, 
  Book, 
  Palette, 
  Dumbbell, 
  Bike, 
  TreePine, 
  Sun, 
  Moon, 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer, 
  Activity, 
  Gauge, 
  Timer, 
  Flame, 
  Gem, 
  Crown, 
  Diamond
} from 'lucide-react';

interface PrimeMortgageDemoProps {
  onClose: () => void;
}

interface LoanProduct {
  id: string;
  name: string;
  type: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  rate: number;
  apr: number;
  term: number;
  downPayment: number;
  monthlyPayment: number;
  closingCosts: number;
  points: number;
  lender: {
    name: string;
    rating: number;
    reviews: number;
    logo: string;
  };
  features: string[];
  pros: string[];
  cons: string[];
  eligibility: string[];
  processing: {
    time: string;
    approval: string;
  };
  fees: {
    origination: number;
    appraisal: number;
    credit: number;
    title: number;
  };
}

interface Application {
  id: string;
  status: 'draft' | 'submitted' | 'processing' | 'underwriting' | 'approved' | 'denied' | 'closed';
  progress: number;
  loanAmount: number;
  propertyValue: number;
  loanType: string;
  submittedDate: string;
  estimatedClosing: string;
  lender: string;
  loanOfficer: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  documents: Document[];
  milestones: Milestone[];
  conditions: Condition[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'required' | 'uploaded' | 'verified' | 'approved';
  uploadedDate?: string;
  size?: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  date: string;
  estimatedDate?: string;
}

interface Condition {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'satisfied' | 'waived';
  dueDate: string;
}

interface CreditScore {
  score: number;
  range: string;
  factors: {
    paymentHistory: number;
    creditUtilization: number;
    lengthOfHistory: number;
    creditMix: number;
    newCredit: number;
  };
  recommendations: string[];
}

export const PrimeMortgageDemo: React.FC<PrimeMortgageDemoProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'home' | 'calculator' | 'rates' | 'prequalify' | 'application' | 'dashboard' | 'education'>('home');
  const [selectedLoan, setSelectedLoan] = useState<LoanProduct | null>(null);
  const [showLoanDetails, setShowLoanDetails] = useState(false);
  const [calculatorInputs, setCalculatorInputs] = useState({
    homePrice: 450000,
    downPayment: 90000,
    loanTerm: 30,
    interestRate: 6.5,
    propertyTax: 5400,
    insurance: 1200,
    pmi: 0,
    hoaFees: 0
  });
  const [prequalifyData, setPrequalifyData] = useState({
    income: '',
    debts: '',
    creditScore: '',
    downPayment: '',
    propertyType: 'primary',
    loanPurpose: 'purchase'
  });
  const [showCreditScore, setShowCreditScore] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rate');

  const loanProducts: LoanProduct[] = [
    {
      id: '1',
      name: 'Conventional Fixed 30-Year',
      type: 'conventional',
      rate: 6.25,
      apr: 6.42,
      term: 30,
      downPayment: 20,
      monthlyPayment: 2769,
      closingCosts: 8500,
      points: 0,
      lender: {
        name: 'Prime National Bank',
        rating: 4.8,
        reviews: 2847,
        logo: 'PNB'
      },
      features: ['No PMI with 20% down', 'Rate lock for 60 days', 'Online application'],
      pros: ['Competitive rates', 'Fast approval', 'Excellent customer service'],
      cons: ['Higher down payment required', 'Strict credit requirements'],
      eligibility: ['Credit score 620+', 'DTI ratio below 43%', 'Stable employment'],
      processing: {
        time: '21-30 days',
        approval: '24-48 hours'
      },
      fees: {
        origination: 0,
        appraisal: 500,
        credit: 50,
        title: 1200
      }
    },
    {
      id: '2',
      name: 'FHA Fixed 30-Year',
      type: 'fha',
      rate: 6.125,
      apr: 6.38,
      term: 30,
      downPayment: 3.5,
      monthlyPayment: 2734,
      closingCosts: 7200,
      points: 0,
      lender: {
        name: 'Community First Lending',
        rating: 4.6,
        reviews: 1923,
        logo: 'CFL'
      },
      features: ['Low down payment', 'Flexible credit requirements', 'Gift funds allowed'],
      pros: ['Low down payment option', 'Easier qualification', 'Assumable loan'],
      cons: ['Mortgage insurance required', 'Property restrictions'],
      eligibility: ['Credit score 580+', 'DTI ratio below 57%', 'Primary residence only'],
      processing: {
        time: '30-45 days',
        approval: '3-5 days'
      },
      fees: {
        origination: 1750,
        appraisal: 500,
        credit: 50,
        title: 1200
      }
    },
    {
      id: '3',
      name: 'VA Fixed 30-Year',
      type: 'va',
      rate: 5.875,
      apr: 6.12,
      term: 30,
      downPayment: 0,
      monthlyPayment: 2663,
      closingCosts: 6800,
      points: 0,
      lender: {
        name: 'Veterans United Home Loans',
        rating: 4.9,
        reviews: 3456,
        logo: 'VU'
      },
      features: ['No down payment', 'No PMI', 'Reusable benefit'],
      pros: ['No down payment required', 'No mortgage insurance', 'Competitive rates'],
      cons: ['VA funding fee', 'Military service required'],
      eligibility: ['Military service', 'Certificate of eligibility', 'Primary residence'],
      processing: {
        time: '30-45 days',
        approval: '24-72 hours'
      },
      fees: {
        origination: 0,
        appraisal: 500,
        credit: 50,
        title: 1200
      }
    },
    {
      id: '4',
      name: 'Jumbo Fixed 30-Year',
      type: 'jumbo',
      rate: 6.75,
      apr: 6.89,
      term: 30,
      downPayment: 20,
      monthlyPayment: 2918,
      closingCosts: 12000,
      points: 0,
      lender: {
        name: 'Luxury Home Lending',
        rating: 4.7,
        reviews: 1234,
        logo: 'LHL'
      },
      features: ['High loan limits', 'Luxury property financing', 'Concierge service'],
      pros: ['Finance expensive homes', 'Flexible terms', 'Premium service'],
      cons: ['Higher rates', 'Larger down payment', 'Strict requirements'],
      eligibility: ['Credit score 700+', 'DTI ratio below 36%', 'Significant assets'],
      processing: {
        time: '45-60 days',
        approval: '5-7 days'
      },
      fees: {
        origination: 2250,
        appraisal: 750,
        credit: 75,
        title: 1500
      }
    },
    {
      id: '5',
      name: 'ARM 5/1 Adjustable',
      type: 'conventional',
      rate: 5.75,
      apr: 6.95,
      term: 30,
      downPayment: 20,
      monthlyPayment: 2625,
      closingCosts: 8000,
      points: 0,
      lender: {
        name: 'Flexible Rate Mortgage Co.',
        rating: 4.4,
        reviews: 987,
        logo: 'FRM'
      },
      features: ['Lower initial rate', '5-year rate protection', 'Rate caps'],
      pros: ['Lower initial payments', 'Good for short-term ownership', 'Rate caps protect'],
      cons: ['Rate uncertainty', 'Payment increases possible', 'Complex terms'],
      eligibility: ['Credit score 640+', 'DTI ratio below 43%', 'Rate risk tolerance'],
      processing: {
        time: '25-35 days',
        approval: '2-4 days'
      },
      fees: {
        origination: 1000,
        appraisal: 500,
        credit: 50,
        title: 1200
      }
    },
    {
      id: '6',
      name: 'USDA Rural Development',
      type: 'usda',
      rate: 6.0,
      apr: 6.25,
      term: 30,
      downPayment: 0,
      monthlyPayment: 2698,
      closingCosts: 7500,
      points: 0,
      lender: {
        name: 'Rural Home Finance',
        rating: 4.5,
        reviews: 756,
        logo: 'RHF'
      },
      features: ['No down payment', 'Rural area financing', 'Income limits'],
      pros: ['Zero down payment', 'Below market rates', 'Rural development'],
      cons: ['Geographic restrictions', 'Income limits', 'Longer processing'],
      eligibility: ['Rural area property', 'Income limits apply', 'Primary residence'],
      processing: {
        time: '45-60 days',
        approval: '7-10 days'
      },
      fees: {
        origination: 1500,
        appraisal: 500,
        credit: 50,
        title: 1200
      }
    }
  ];

  const applications: Application[] = [
    {
      id: 'APP001',
      status: 'underwriting',
      progress: 75,
      loanAmount: 360000,
      propertyValue: 450000,
      loanType: 'Conventional 30-Year Fixed',
      submittedDate: '2024-01-15',
      estimatedClosing: '2024-02-28',
      lender: 'Prime National Bank',
      loanOfficer: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        email: 'sarah.johnson@primenational.com',
        photo: 'SJ'
      },
      documents: [
        { id: 'd1', name: 'W-2 Forms (2 years)', type: 'Income', status: 'approved', uploadedDate: '2024-01-16', size: '2.4 MB' },
        { id: 'd2', name: 'Pay Stubs (Recent)', type: 'Income', status: 'approved', uploadedDate: '2024-01-16', size: '1.2 MB' },
        { id: 'd3', name: 'Bank Statements', type: 'Assets', status: 'verified', uploadedDate: '2024-01-17', size: '3.1 MB' },
        { id: 'd4', name: 'Purchase Agreement', type: 'Property', status: 'approved', uploadedDate: '2024-01-18', size: '856 KB' },
        { id: 'd5', name: 'Appraisal Report', type: 'Property', status: 'required' }
      ],
      milestones: [
        { id: 'm1', title: 'Application Submitted', description: 'Initial application received', status: 'completed', date: '2024-01-15' },
        { id: 'm2', title: 'Document Review', description: 'All required documents collected', status: 'completed', date: '2024-01-20' },
        { id: 'm3', title: 'Credit Check', description: 'Credit report and score verified', status: 'completed', date: '2024-01-22' },
        { id: 'm4', title: 'Appraisal Ordered', description: 'Property appraisal scheduled', status: 'completed', date: '2024-01-25' },
        { id: 'm5', title: 'Underwriting Review', description: 'Loan file under review', status: 'in-progress', date: '2024-01-28' },
        { id: 'm6', title: 'Final Approval', description: 'Loan approved for closing', status: 'pending', date: '', estimatedDate: '2024-02-15' },
        { id: 'm7', title: 'Closing Scheduled', description: 'Closing date confirmed', status: 'pending', date: '', estimatedDate: '2024-02-28' }
      ],
      conditions: [
        { id: 'c1', title: 'Updated Pay Stub', description: 'Provide most recent pay stub dated within 30 days', priority: 'high', status: 'pending', dueDate: '2024-02-05' },
        { id: 'c2', title: 'Homeowners Insurance', description: 'Provide proof of homeowners insurance policy', priority: 'critical', status: 'pending', dueDate: '2024-02-20' },
        { id: 'c3', title: 'Gift Letter', description: 'Provide gift letter for down payment funds', priority: 'medium', status: 'satisfied', dueDate: '2024-01-30' }
      ]
    }
  ];

  const creditScore: CreditScore = {
    score: 742,
    range: 'Very Good',
    factors: {
      paymentHistory: 95,
      creditUtilization: 15,
      lengthOfHistory: 85,
      creditMix: 75,
      newCredit: 90
    },
    recommendations: [
      'Keep credit utilization below 10% for excellent score',
      'Continue making all payments on time',
      'Consider keeping older accounts open',
      'Avoid opening new credit accounts before applying'
    ]
  };

  const marketTrends = {
    currentRate: 6.25,
    weeklyChange: -0.125,
    monthlyChange: 0.25,
    yearlyChange: 1.75,
    forecast: 'Rates expected to stabilize in Q2 2024'
  };

  const calculateMonthlyPayment = () => {
    const { homePrice, downPayment, loanTerm, interestRate, propertyTax, insurance, pmi, hoaFees } = calculatorInputs;
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    const monthlyPrincipalInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPMI = pmi / 12;
    const monthlyHOA = hoaFees / 12;
    
    return {
      principalInterest: monthlyPrincipalInterest,
      tax: monthlyTax,
      insurance: monthlyInsurance,
      pmi: monthlyPMI,
      hoa: monthlyHOA,
      total: monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'completed': case 'satisfied': return 'text-green-600 bg-green-100';
      case 'processing': case 'underwriting': case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': case 'required': return 'text-yellow-600 bg-yellow-100';
      case 'denied': case 'delayed': return 'text-red-600 bg-red-100';
      case 'verified': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLoanTypeIcon = (type: string) => {
    switch (type) {
      case 'conventional': return Home;
      case 'fha': return Shield;
      case 'va': return Award;
      case 'usda': return TreePine;
      case 'jumbo': return Crown;
      default: return Home;
    }
  };

  const filteredLoans = loanProducts.filter(loan => {
    if (filterType === 'all') return true;
    return loan.type === filterType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rate': return a.rate - b.rate;
      case 'payment': return a.monthlyPayment - b.monthlyPayment;
      case 'downPayment': return a.downPayment - b.downPayment;
      default: return 0;
    }
  });

  const LoanCard: React.FC<{ loan: LoanProduct; onClick: () => void }> = ({ loan, onClick }) => {
    const TypeIcon = getLoanTypeIcon(loan.type);
    
    return (
      <div 
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <TypeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{loan.name}</h3>
              <p className="text-gray-600">{loan.lender.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{loan.lender.rating}</span>
            <span className="text-sm text-gray-500">({loan.lender.reviews})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Interest Rate</p>
            <p className="text-2xl font-bold text-blue-600">{loan.rate}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">APR</p>
            <p className="text-lg font-semibold text-gray-900">{loan.apr}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Payment</p>
            <p className="text-lg font-semibold text-gray-900">${loan.monthlyPayment.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Down Payment</p>
            <p className="text-lg font-semibold text-gray-900">{loan.downPayment}%</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {loan.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span>Approval: {loan.processing.approval}</span>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    );
  };

  const LoanDetailsModal: React.FC = () => {
    if (!selectedLoan) return null;

    const TypeIcon = getLoanTypeIcon(selectedLoan.type);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <TypeIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedLoan.name}</h2>
                  <p className="text-blue-100">{selectedLoan.lender.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLoan(null)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Rate Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Interest Rate</p>
                      <p className="text-3xl font-bold text-blue-600">{selectedLoan.rate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">APR</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedLoan.apr}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Loan Term</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedLoan.term} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Points</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedLoan.points}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment</span>
                      <span className="font-semibold">${selectedLoan.monthlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment ({selectedLoan.downPayment}%)</span>
                      <span className="font-semibold">${(450000 * selectedLoan.downPayment / 100).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Closing Costs</span>
                      <span className="font-semibold">${selectedLoan.closingCosts.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Fees */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Fees</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origination Fee</span>
                      <span className="font-semibold">${selectedLoan.fees.origination.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Appraisal Fee</span>
                      <span className="font-semibold">${selectedLoan.fees.appraisal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credit Report</span>
                      <span className="font-semibold">${selectedLoan.fees.credit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title Insurance</span>
                      <span className="font-semibold">${selectedLoan.fees.title.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {selectedLoan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3">Pros</h4>
                    <div className="space-y-2">
                      {selectedLoan.pros.map((pro, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Plus className="w-4 h-4 text-green-500 mt-0.5" />
                          <span className="text-sm text-gray-700">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3">Cons</h4>
                    <div className="space-y-2">
                      {selectedLoan.cons.map((con, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Minus className="w-4 h-4 text-red-500 mt-0.5" />
                          <span className="text-sm text-gray-700">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Requirements</h3>
                  <div className="space-y-3">
                    {selectedLoan.eligibility.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Processing Time */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">Approval Time</p>
                        <p className="text-sm text-gray-600">{selectedLoan.processing.approval}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">Closing Time</p>
                        <p className="text-sm text-gray-600">{selectedLoan.processing.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
              <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Get Pre-Qualified
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">Find Your Perfect Mortgage</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Intelligent loan matching powered by AI. Compare rates from top lenders, 
            get pre-qualified in minutes, and track your application in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setCurrentView('rates')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Compare Rates
            </button>
            <button 
              onClick={() => setCurrentView('prequalify')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Get Pre-Qualified
            </button>
          </div>
        </div>
      </div>

      {/* Quick Calculator */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Quick Payment Calculator</h2>
          <button 
            onClick={() => setCurrentView('calculator')}
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Advanced Calculator
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Price</label>
              <input
                type="number"
                value={calculatorInputs.homePrice}
                onChange={(e) => setCalculatorInputs({...calculatorInputs, homePrice: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment</label>
              <input
                type="number"
                value={calculatorInputs.downPayment}
                onChange={(e) => setCalculatorInputs({...calculatorInputs, downPayment: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={calculatorInputs.interestRate}
                onChange={(e) => setCalculatorInputs({...calculatorInputs, interestRate: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Estimated Monthly Payment</p>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                ${calculateMonthlyPayment().total.toLocaleString()}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Principal & Interest:</span>
                  <span>${calculateMonthlyPayment().principalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Property Tax:</span>
                  <span>${calculateMonthlyPayment().tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance:</span>
                  <span>${calculateMonthlyPayment().insurance.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Trends */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Market Trends</h2>
        
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Current Average Rate</p>
            <p className="text-3xl font-bold text-blue-600">{marketTrends.currentRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Weekly Change</p>
            <div className="flex items-center justify-center gap-1">
              <TrendingDown className="w-5 h-5 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{Math.abs(marketTrends.weeklyChange)}%</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Monthly Change</p>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <p className="text-2xl font-bold text-red-500">+{marketTrends.monthlyChange}%</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Yearly Change</p>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <p className="text-2xl font-bold text-red-500">+{marketTrends.yearlyChange}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-600" />
            <p className="text-blue-800 font-medium">{marketTrends.forecast}</p>
          </div>
        </div>
      </div>

      {/* Featured Loans */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Loan Products</h2>
          <button 
            onClick={() => setCurrentView('rates')}
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View All Rates
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanProducts.slice(0, 3).map((loan) => (
            <LoanCard 
              key={loan.id} 
              loan={loan} 
              onClick={() => {
                setSelectedLoan(loan);
                setShowLoanDetails(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Prime Mortgage Solutions</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Matching</h3>
            <p className="text-gray-600">Our intelligent algorithm finds the best loan options based on your unique financial profile.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Trusted</h3>
            <p className="text-gray-600">Bank-level security and encryption protect your personal and financial information.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Processing</h3>
            <p className="text-gray-600">Get pre-qualified in minutes and close your loan faster with our streamlined process.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const RatesView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Compare Mortgage Rates</h2>
          <p className="text-gray-600 mt-2">Find the best rates from our network of trusted lenders</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
          Get Pre-Qualified
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="conventional">Conventional</option>
              <option value="fha">FHA</option>
              <option value="va">VA</option>
              <option value="usda">USDA</option>
              <option value="jumbo">Jumbo</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rate">Interest Rate</option>
              <option value="payment">Monthly Payment</option>
              <option value="downPayment">Down Payment</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Rate Comparison Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Lender</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Loan Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">APR</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Monthly Payment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Down Payment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLoans.map((loan) => {
                const TypeIcon = getLoanTypeIcon(loan.type);
                return (
                  <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">{loan.lender.logo}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{loan.lender.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500">{loan.lender.rating} ({loan.lender.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-900">{loan.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-blue-600">{loan.rate}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{loan.apr}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">${loan.monthlyPayment.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{loan.downPayment}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setSelectedLoan(loan);
                            setShowLoanDetails(true);
                          }}
                          className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                        <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
                          Apply
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loan Cards for Mobile */}
      <div className="md:hidden space-y-4">
        {filteredLoans.map((loan) => (
          <LoanCard 
            key={loan.id} 
            loan={loan} 
            onClick={() => {
              setSelectedLoan(loan);
              setShowLoanDetails(true);
            }}
          />
        ))}
      </div>
    </div>
  );

  const CalculatorView = () => {
    const payment = calculateMonthlyPayment();
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mortgage Calculator</h2>
          <p className="text-gray-600">Calculate your monthly mortgage payment and see how different factors affect your costs</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Loan Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Home Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={calculatorInputs.homePrice}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, homePrice: Number(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={calculatorInputs.downPayment}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, downPayment: Number(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {((calculatorInputs.downPayment / calculatorInputs.homePrice) * 100).toFixed(1)}% of home price
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term</label>
                <select
                  value={calculatorInputs.loanTerm}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, loanTerm: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={25}>25 years</option>
                  <option value={30}>30 years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={calculatorInputs.interestRate}
                  onChange={(e) => setCalculatorInputs({...calculatorInputs, interestRate: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Property Tax</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={calculatorInputs.propertyTax}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, propertyTax: Number(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Home Insurance</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={calculatorInputs.insurance}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, insurance: Number(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual PMI</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={calculatorInputs.pmi}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, pmi: Number(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly HOA Fees</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={calculatorInputs.hoaFees}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, hoaFees: Number(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Monthly Payment */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Monthly Payment Breakdown</h3>
              <div className="text-center mb-6">
                <p className="text-sm text-blue-100 mb-2">Total Monthly Payment</p>
                <p className="text-5xl font-bold">${payment.total.toLocaleString()}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-100">Principal & Interest</span>
                  <span className="font-semibold">${payment.principalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Property Tax</span>
                  <span className="font-semibold">${payment.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Home Insurance</span>
                  <span className="font-semibold">${payment.insurance.toLocaleString()}</span>
                </div>
                {payment.pmi > 0 && (
                  <div className="flex justify-between">
                    <span className="text-blue-100">PMI</span>
                    <span className="font-semibold">${payment.pmi.toLocaleString()}</span>
                  </div>
                )}
                {payment.hoa > 0 && (
                  <div className="flex justify-between">
                    <span className="text-blue-100">HOA Fees</span>
                    <span className="font-semibold">${payment.hoa.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Loan Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Loan Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-semibold text-gray-900">
                    ${(calculatorInputs.homePrice - calculatorInputs.downPayment).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment</span>
                  <span className="font-semibold text-gray-900">
                    ${calculatorInputs.downPayment.toLocaleString()} 
                    ({((calculatorInputs.downPayment / calculatorInputs.homePrice) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest Paid</span>
                  <span className="font-semibold text-gray-900">
                    ${((payment.principalInterest * calculatorInputs.loanTerm * 12) - (calculatorInputs.homePrice - calculatorInputs.downPayment)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cost of Loan</span>
                  <span className="font-semibold text-gray-900">
                    ${(payment.principalInterest * calculatorInputs.loanTerm * 12).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={() => setCurrentView('prequalify')}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Pre-Qualified with These Numbers
              </button>
              <button 
                onClick={() => setCurrentView('rates')}
                className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Compare Rates
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PrequalifyView = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Pre-Qualified</h2>
        <p className="text-gray-600">Answer a few questions to see how much you can borrow and get personalized rate quotes</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={prequalifyData.income}
                  onChange={(e) => setPrequalifyData({...prequalifyData, income: e.target.value})}
                  placeholder="75,000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Debt Payments</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={prequalifyData.debts}
                  onChange={(e) => setPrequalifyData({...prequalifyData, debts: e.target.value})}
                  placeholder="1,200"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Include car loans, credit cards, student loans, etc.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Credit Score Range</label>
              <select
                value={prequalifyData.creditScore}
                onChange={(e) => setPrequalifyData({...prequalifyData, creditScore: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your credit score range</option>
                <option value="excellent">Excellent (740+)</option>
                <option value="very-good">Very Good (670-739)</option>
                <option value="good">Good (580-669)</option>
                <option value="fair">Fair (300-579)</option>
                <option value="unknown">I don't know</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment Available</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={prequalifyData.downPayment}
                  onChange={(e) => setPrequalifyData({...prequalifyData, downPayment: e.target.value})}
                  placeholder="50,000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={prequalifyData.propertyType}
                onChange={(e) => setPrequalifyData({...prequalifyData, propertyType: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="primary">Primary Residence</option>
                <option value="secondary">Secondary Home</option>
                <option value="investment">Investment Property</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
              <select
                value={prequalifyData.loanPurpose}
                onChange={(e) => setPrequalifyData({...prequalifyData, loanPurpose: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="purchase">Purchase</option>
                <option value="refinance">Refinance</option>
                <option value="cash-out">Cash-Out Refinance</option>
              </select>
            </div>
          </div>

          {/* Credit Score Display */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Credit Score</h3>
                <button 
                  onClick={() => setShowCreditScore(!showCreditScore)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  {showCreditScore ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">
                  {showCreditScore ? creditScore.score : '•••'}
                </p>
                <p className="text-green-100">{showCreditScore ? creditScore.range : 'Hidden'}</p>
              </div>
              
              {showCreditScore && (
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-100">Payment History</span>
                    <span>{creditScore.factors.paymentHistory}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-100">Credit Utilization</span>
                    <span>{creditScore.factors.creditUtilization}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-100">Length of History</span>
                    <span>{creditScore.factors.lengthOfHistory}%</span>
                  </div>
                </div>
              )}
            </div>

            {showCreditScore && (
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3">Recommendations</h4>
                <div className="space-y-2">
                  {creditScore.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span className="text-sm text-blue-800">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Estimated Qualification</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Loan Amount</span>
                  <span className="font-semibold text-gray-900">$425,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Home Price</span>
                  <span className="font-semibold text-gray-900">$531,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Rate</span>
                  <span className="font-semibold text-green-600">6.25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-semibold text-gray-900">$2,618</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Get My Pre-Qualification Letter
          </button>
          <p className="text-center text-sm text-gray-500 mt-3">
            Soft credit check - won't affect your credit score
          </p>
        </div>
      </div>
    </div>
  );

  const ApplicationDashboard = () => {
    const app = applications[0];
    
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Application Dashboard</h2>
            <p className="text-gray-600">Track your mortgage application progress</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageCircle className="w-4 h-4" />
              Message Lender
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Phone className="w-4 h-4" />
              Call {app.loanOfficer.name}
            </button>
          </div>
        </div>

        {/* Application Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Application ID</p>
              <p className="text-lg font-semibold text-gray-900">{app.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Loan Amount</p>
              <p className="text-lg font-semibold text-gray-900">${app.loanAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Property Value</p>
              <p className="text-lg font-semibold text-gray-900">${app.propertyValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Estimated Closing</p>
              <p className="text-lg font-semibold text-gray-900">{new Date(app.estimatedClosing).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Application Progress</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${app.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{app.progress}% complete</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Loan Officer</h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{app.loanOfficer.photo}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{app.loanOfficer.name}</p>
                  <p className="text-sm text-gray-600">{app.loanOfficer.phone}</p>
                  <p className="text-sm text-gray-600">{app.loanOfficer.email}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Loan Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Type</span>
                  <span className="font-medium text-gray-900">{app.loanType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lender</span>
                  <span className="font-medium text-gray-900">{app.lender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted</span>
                  <span className="font-medium text-gray-900">{new Date(app.submittedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Application Milestones</h3>
          <div className="space-y-6">
            {app.milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    milestone.status === 'completed' ? 'bg-green-500' :
                    milestone.status === 'in-progress' ? 'bg-blue-500' :
                    milestone.status === 'delayed' ? 'bg-red-500' : 'bg-gray-300'
                  }`}></div>
                  {index < app.milestones.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                      {milestone.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                  <p className="text-xs text-gray-500">
                    {milestone.date ? new Date(milestone.date).toLocaleDateString() : 
                     milestone.estimatedDate ? `Est. ${new Date(milestone.estimatedDate).toLocaleDateString()}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Documents */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Documents</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
            
            <div className="space-y-4">
              {app.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                      {doc.uploadedDate && (
                        <p className="text-xs text-gray-400">Uploaded {new Date(doc.uploadedDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    {doc.status !== 'required' && (
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Outstanding Conditions</h3>
            
            <div className="space-y-4">
              {app.conditions.filter(c => c.status === 'pending').map((condition) => (
                <div key={condition.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{condition.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(condition.priority)}`}>
                      {condition.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{condition.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Due: {new Date(condition.dueDate).toLocaleDateString()}</p>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
              
              {app.conditions.filter(c => c.status === 'satisfied').length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-3">Completed Conditions</p>
                  {app.conditions.filter(c => c.status === 'satisfied').map((condition) => (
                    <div key={condition.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-800">{condition.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Prime Mortgage Solutions
                </h1>
                <p className="text-gray-600">Intelligent Loan Matching & Processing</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center space-x-6">
                {['Home', 'Rates', 'Calculator', 'Pre-Qualify', 'Dashboard'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setCurrentView(item.toLowerCase().replace('-', '') as any)}
                    className={`font-medium transition-colors ${
                      currentView === item.toLowerCase().replace('-', '') 
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'home' && <HomeView />}
        {currentView === 'rates' && <RatesView />}
        {currentView === 'calculator' && <CalculatorView />}
        {currentView === 'prequalify' && <PrequalifyView />}
        {currentView === 'application' && <ApplicationDashboard />}
        {currentView === 'dashboard' && <ApplicationDashboard />}
        {currentView === 'education' && (
          <div className="text-center py-20">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mortgage Education Center</h2>
            <p className="text-gray-600">Learn about mortgages, rates, and the home buying process</p>
          </div>
        )}
      </div>

      {/* Loan Details Modal */}
      {selectedLoan && <LoanDetailsModal />}
    </div>
  );
};