import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Bell, 
  Settings, 
  CreditCard, 
  Send, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Smartphone, 
  Shield, 
  Fingerprint, 
  Lock, 
  User, 
  Home, 
  PieChart, 
  History, 
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
  Coffee,
  Car,
  ShoppingBag,
  Wifi,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Wallet
} from 'lucide-react';

interface MobileBankingDemoProps {
  onClose: () => void;
}

interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  category: string;
  date: string;
  time: string;
  icon: React.ComponentType<any>;
  merchant?: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  accountNumber: string;
  color: string;
}

export const MobileBankingDemo: React.FC<MobileBankingDemoProps> = ({ onClose }) => {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'biometric' | 'dashboard' | 'accounts' | 'transactions' | 'transfer' | 'budget' | 'profile'>('login');
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedContact, setSelectedContact] = useState('');

  const accounts: Account[] = [
    {
      id: '1',
      name: 'Primary Checking',
      type: 'Checking',
      balance: 12847.32,
      accountNumber: '****4521',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '2',
      name: 'Savings Account',
      type: 'Savings',
      balance: 45230.18,
      accountNumber: '****7892',
      color: 'from-green-500 to-green-600'
    },
    {
      id: '3',
      name: 'Investment Portfolio',
      type: 'Investment',
      balance: 89456.75,
      accountNumber: '****3456',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'debit',
      amount: 4.85,
      description: 'Coffee Shop',
      category: 'Food & Dining',
      date: 'Today',
      time: '2:30 PM',
      icon: Coffee,
      merchant: 'Starbucks',
      status: 'completed'
    },
    {
      id: '2',
      type: 'credit',
      amount: 2500.00,
      description: 'Salary Deposit',
      category: 'Income',
      date: 'Today',
      time: '9:00 AM',
      icon: DollarSign,
      merchant: 'TechCorp Inc.',
      status: 'completed'
    },
    {
      id: '3',
      type: 'debit',
      amount: 89.99,
      description: 'Online Shopping',
      category: 'Shopping',
      date: 'Yesterday',
      time: '6:45 PM',
      icon: ShoppingBag,
      merchant: 'Amazon',
      status: 'completed'
    },
    {
      id: '4',
      type: 'debit',
      amount: 45.00,
      description: 'Gas Station',
      category: 'Transportation',
      date: 'Yesterday',
      time: '3:20 PM',
      icon: Car,
      merchant: 'Shell',
      status: 'completed'
    },
    {
      id: '5',
      type: 'debit',
      amount: 120.00,
      description: 'Internet Bill',
      category: 'Utilities',
      date: 'Dec 28',
      time: '11:30 AM',
      icon: Wifi,
      merchant: 'Comcast',
      status: 'pending'
    }
  ];

  const quickActions = [
    { name: 'Transfer', icon: Send, color: 'bg-blue-500' },
    { name: 'Pay Bills', icon: CreditCard, color: 'bg-green-500' },
    { name: 'Deposit', icon: Plus, color: 'bg-purple-500' },
    { name: 'Budget', icon: PieChart, color: 'bg-orange-500' }
  ];

  const contacts = [
    { name: 'Sarah Johnson', avatar: 'SJ', account: '****2341' },
    { name: 'Mike Chen', avatar: 'MC', account: '****5678' },
    { name: 'Emma Davis', avatar: 'ED', account: '****9012' },
    { name: 'Alex Rodriguez', avatar: 'AR', account: '****3456' }
  ];

  const budgetCategories = [
    { name: 'Food & Dining', spent: 485, budget: 600, color: 'bg-red-500' },
    { name: 'Transportation', spent: 320, budget: 400, color: 'bg-blue-500' },
    { name: 'Shopping', spent: 890, budget: 1000, color: 'bg-purple-500' },
    { name: 'Utilities', spent: 245, budget: 300, color: 'bg-green-500' },
    { name: 'Entertainment', spent: 180, budget: 250, color: 'bg-yellow-500' }
  ];

  const handleBiometricAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setCurrentScreen('dashboard');
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTransactionIcon = (transaction: Transaction) => {
    const IconComponent = transaction.icon;
    return (
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        transaction.type === 'credit' ? 'bg-green-100' : 'bg-gray-100'
      }`}>
        <IconComponent className={`w-5 h-5 ${
          transaction.type === 'credit' ? 'text-green-600' : 'text-gray-600'
        }`} />
      </div>
    );
  };

  // Login Screen
  const LoginScreen = () => (
    <div className="h-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">SecureBank</h1>
          <p className="text-blue-100 mb-12">Your trusted banking partner</p>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40"
              />
            </div>
            <button
              onClick={() => setCurrentScreen('biometric')}
              className="w-full bg-white text-blue-600 py-4 rounded-xl font-semibold hover:bg-white/90 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-8 text-center">
        <button
          onClick={() => setCurrentScreen('biometric')}
          className="flex items-center justify-center gap-3 mx-auto text-white/80 hover:text-white transition-colors"
        >
          <Fingerprint className="w-6 h-6" />
          <span>Use Biometric Login</span>
        </button>
      </div>
    </div>
  );

  // Biometric Authentication Screen
  const BiometricScreen = () => (
    <div className="h-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center px-8">
      <div className="text-center text-white">
        <div className={`w-32 h-32 mx-auto mb-8 rounded-full border-4 border-white/30 flex items-center justify-center transition-all duration-1000 ${
          isAuthenticating ? 'border-white scale-110' : ''
        }`}>
          <Fingerprint className={`w-16 h-16 transition-all duration-1000 ${
            isAuthenticating ? 'text-white scale-110' : 'text-white/70'
          }`} />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          {isAuthenticating ? 'Authenticating...' : 'Touch ID'}
        </h2>
        <p className="text-blue-100 mb-8">
          {isAuthenticating ? 'Verifying your identity' : 'Place your finger on the sensor'}
        </p>
        
        {!isAuthenticating && (
          <button
            onClick={handleBiometricAuth}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-colors"
          >
            Authenticate
          </button>
        )}
        
        {isAuthenticating && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );

  // Dashboard Screen
  const DashboardScreen = () => (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Good morning, John</h1>
            <p className="text-gray-600 text-sm">Welcome back to SecureBank</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Account Balance Card */}
        <div className={`bg-gradient-to-r ${accounts[selectedAccount].color} rounded-2xl p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">{accounts[selectedAccount].type}</p>
              <p className="text-white/90 text-lg font-medium">{accounts[selectedAccount].name}</p>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-white/80 text-sm mb-1">Available Balance</p>
            <p className="text-3xl font-bold">
              {showBalance ? formatCurrency(accounts[selectedAccount].balance) : '••••••'}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-white/80 text-sm">{accounts[selectedAccount].accountNumber}</p>
            <div className="flex gap-1">
              {accounts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAccount(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedAccount ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={action.name}
                  onClick={() => action.name === 'Transfer' && setCurrentScreen('transfer')}
                  className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <button
              onClick={() => setCurrentScreen('transactions')}
              className="text-blue-600 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm">
            {transactions.slice(0, 3).map((transaction, index) => (
              <div key={transaction.id} className={`flex items-center gap-4 p-4 ${index !== 2 ? 'border-b border-gray-100' : ''}`}>
                {getTransactionIcon(transaction)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date} • {transaction.time}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">This Month's Spending</h2>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-2xl font-bold text-gray-900">$2,847</p>
              <p className="text-sm text-green-600">12% less than last month</p>
            </div>
            <button
              onClick={() => setCurrentScreen('budget')}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
            >
              View Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Transactions Screen
  const TransactionsScreen = () => (
    <div className="h-full bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Transactions</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm">
          {transactions.map((transaction, index) => (
            <div key={transaction.id} className={`flex items-center gap-4 p-4 ${index !== transactions.length - 1 ? 'border-b border-gray-100' : ''}`}>
              {getTransactionIcon(transaction)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  {transaction.status === 'pending' && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Pending
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{transaction.merchant}</p>
                <p className="text-sm text-gray-500">{transaction.date} • {transaction.time}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Transfer Screen
  const TransferScreen = () => (
    <div className="h-full bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Send Money</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Amount Input */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Amount</h2>
          <div className="text-center">
            <input
              type="text"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="$0.00"
              className="text-4xl font-bold text-gray-900 text-center bg-transparent border-none outline-none w-full"
            />
            <p className="text-gray-500 mt-2">Available: {formatCurrency(accounts[selectedAccount].balance)}</p>
          </div>
        </div>

        {/* Recent Contacts */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h2>
          <div className="grid grid-cols-4 gap-4">
            {contacts.map((contact) => (
              <button
                key={contact.name}
                onClick={() => setSelectedContact(contact.name)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
                  selectedContact === contact.name ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white border-2 border-transparent'
                }`}
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{contact.avatar}</span>
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{contact.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Transfer Button */}
        <button
          disabled={!transferAmount || !selectedContact}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Send {transferAmount ? `$${transferAmount}` : 'Money'}
        </button>
      </div>
    </div>
  );

  // Budget Screen
  const BudgetScreen = () => (
    <div className="h-full bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Budget Tracker</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Monthly Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">December 2024</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">$2,550</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Spent</p>
              <p className="text-2xl font-bold text-red-600">$2,120</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-600">83%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '83%' }}></div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="space-y-4">
            {budgetCategories.map((category) => (
              <div key={category.name} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${category.color} rounded-full`}></div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ${category.spent} / ${category.budget}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${category.color} h-2 rounded-full`}
                    style={{ width: `${(category.spent / category.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Bottom Navigation
  const BottomNavigation = () => {
    const navItems = [
      { id: 'dashboard', name: 'Home', icon: Home },
      { id: 'accounts', name: 'Accounts', icon: Wallet },
      { id: 'transactions', name: 'History', icon: History },
      { id: 'budget', name: 'Budget', icon: PieChart },
      { id: 'profile', name: 'Profile', icon: User }
    ];

    return (
      <div className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id as any)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  currentScreen === item.id ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden h-[800px] relative">
      {/* Status Bar */}
      <div className="bg-black text-white px-6 py-2 flex items-center justify-between text-sm">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span className="ml-2">100%</span>
        </div>
      </div>

      {/* Back Button for Demo */}
      {currentScreen !== 'login' && (
        <div className="absolute top-12 left-4 z-50">
          <button 
            onClick={onClose}
            className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {currentScreen === 'login' && <LoginScreen />}
          {currentScreen === 'biometric' && <BiometricScreen />}
          {currentScreen === 'dashboard' && <DashboardScreen />}
          {currentScreen === 'transactions' && <TransactionsScreen />}
          {currentScreen === 'transfer' && <TransferScreen />}
          {currentScreen === 'budget' && <BudgetScreen />}
        </div>

        {/* Bottom Navigation - only show after login */}
        {!['login', 'biometric'].includes(currentScreen) && <BottomNavigation />}
      </div>
    </div>
  );
};