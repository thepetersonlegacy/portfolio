import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Heart, 
  Zap, 
  Target, 
  Trophy, 
  Calendar, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Settings, 
  Bell, 
  Plus, 
  Play, 
  Pause, 
  RotateCcw, 
  Share2, 
  Download, 
  Filter, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  Star, 
  Award, 
  Flame, 
  Moon, 
  Sun, 
  Droplets, 
  Wind, 
  Thermometer, 
  MapPin, 
  Smartphone, 
  Watch, 
  Headphones, 
  Wifi, 
  Battery, 
  Bluetooth, 
  Camera, 
  Mic, 
  Volume2, 
  Eye, 
  Brain, 
  Dumbbell, 
  Timer, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Gauge, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X, 
  Menu,
  Home,
  BarChart,
  User,
  MessageCircle,
  Navigation
} from 'lucide-react';

interface FitTrackDemoProps {
  onClose: () => void;
}

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target?: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  icon: React.ComponentType<any>;
  color: string;
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

interface WorkoutSession {
  id: string;
  type: string;
  duration: number;
  calories: number;
  heartRate: {
    avg: number;
    max: number;
  };
  date: string;
  time: string;
  intensity: 'low' | 'moderate' | 'high';
  completed: boolean;
}

interface SleepData {
  date: string;
  duration: number;
  quality: number;
  deepSleep: number;
  remSleep: number;
  lightSleep: number;
  awakenings: number;
}

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  target: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
  };
}

export const FitTrackDemo: React.FC<FitTrackDemoProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'workouts' | 'nutrition' | 'sleep' | 'social' | 'profile'>('dashboard');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<HealthMetric | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isWorkoutActive) {
        setWorkoutTimer(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isWorkoutActive]);

  const healthMetrics: HealthMetric[] = [
    {
      id: 'steps',
      name: 'Steps',
      value: 8547,
      unit: 'steps',
      target: 10000,
      trend: 'up',
      change: 12,
      icon: Navigation,
      color: 'from-blue-500 to-blue-600',
      status: 'good'
    },
    {
      id: 'heartRate',
      name: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      trend: 'stable',
      change: 0,
      icon: Heart,
      color: 'from-red-500 to-red-600',
      status: 'excellent'
    },
    {
      id: 'calories',
      name: 'Calories Burned',
      value: 2156,
      unit: 'kcal',
      target: 2400,
      trend: 'up',
      change: 8,
      icon: Flame,
      color: 'from-orange-500 to-orange-600',
      status: 'good'
    },
    {
      id: 'sleep',
      name: 'Sleep Quality',
      value: 85,
      unit: '%',
      target: 90,
      trend: 'down',
      change: -5,
      icon: Moon,
      color: 'from-purple-500 to-purple-600',
      status: 'good'
    },
    {
      id: 'hydration',
      name: 'Water Intake',
      value: 1.8,
      unit: 'L',
      target: 2.5,
      trend: 'up',
      change: 15,
      icon: Droplets,
      color: 'from-cyan-500 to-cyan-600',
      status: 'fair'
    },
    {
      id: 'stress',
      name: 'Stress Level',
      value: 32,
      unit: '%',
      target: 25,
      trend: 'down',
      change: -8,
      icon: Brain,
      color: 'from-green-500 to-green-600',
      status: 'good'
    }
  ];

  const recentWorkouts: WorkoutSession[] = [
    {
      id: '1',
      type: 'Running',
      duration: 45,
      calories: 420,
      heartRate: { avg: 145, max: 165 },
      date: 'Today',
      time: '7:30 AM',
      intensity: 'moderate',
      completed: true
    },
    {
      id: '2',
      type: 'Strength Training',
      duration: 60,
      calories: 380,
      heartRate: { avg: 125, max: 155 },
      date: 'Yesterday',
      time: '6:00 PM',
      intensity: 'high',
      completed: true
    },
    {
      id: '3',
      type: 'Yoga',
      duration: 30,
      calories: 150,
      heartRate: { avg: 85, max: 110 },
      date: 'Dec 28',
      time: '8:00 AM',
      intensity: 'low',
      completed: true
    }
  ];

  const sleepData: SleepData[] = [
    { date: 'Mon', duration: 7.5, quality: 85, deepSleep: 2.1, remSleep: 1.8, lightSleep: 3.6, awakenings: 2 },
    { date: 'Tue', duration: 8.2, quality: 92, deepSleep: 2.4, remSleep: 2.1, lightSleep: 3.7, awakenings: 1 },
    { date: 'Wed', duration: 6.8, quality: 78, deepSleep: 1.8, remSleep: 1.5, lightSleep: 3.5, awakenings: 3 },
    { date: 'Thu', duration: 7.9, quality: 88, deepSleep: 2.2, remSleep: 2.0, lightSleep: 3.7, awakenings: 1 },
    { date: 'Fri', duration: 7.3, quality: 82, deepSleep: 2.0, remSleep: 1.7, lightSleep: 3.6, awakenings: 2 },
    { date: 'Sat', duration: 8.5, quality: 95, deepSleep: 2.6, remSleep: 2.3, lightSleep: 3.6, awakenings: 0 },
    { date: 'Sun', duration: 8.1, quality: 90, deepSleep: 2.3, remSleep: 2.1, lightSleep: 3.7, awakenings: 1 }
  ];

  const nutritionData: NutritionData = {
    calories: 1847,
    protein: 125,
    carbs: 180,
    fat: 65,
    water: 1.8,
    target: {
      calories: 2200,
      protein: 150,
      carbs: 220,
      fat: 75,
      water: 2.5
    }
  };

  const challenges = [
    { id: '1', name: '10K Steps Challenge', progress: 85, participants: 1247, reward: '50 points', icon: Navigation },
    { id: '2', name: 'Hydration Hero', progress: 72, participants: 892, reward: '30 points', icon: Droplets },
    { id: '3', name: 'Sleep Champion', progress: 90, participants: 634, reward: '75 points', icon: Moon },
    { id: '4', name: 'Workout Warrior', progress: 60, participants: 1156, reward: '100 points', icon: Dumbbell }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const MetricCard: React.FC<{ metric: HealthMetric; onClick?: () => void }> = ({ metric, onClick }) => {
    const IconComponent = metric.icon;
    const progress = metric.target ? (metric.value / metric.target) * 100 : 0;

    return (
      <div 
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-1">
            {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
            {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
            {metric.trend === 'stable' && <div className="w-4 h-1 bg-gray-400 rounded"></div>}
            <span className={`text-sm font-medium ${
              metric.trend === 'up' ? 'text-green-500' : 
              metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
            }`}>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </div>
        </div>
        
        <div className="mb-3">
          <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{metric.value.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">{metric.unit}</span>
          </div>
        </div>

        {metric.target && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Goal: {metric.target.toLocaleString()} {metric.unit}</span>
              <span className={getStatusColor(metric.status)}>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const WorkoutCard: React.FC<{ workout: WorkoutSession }> = ({ workout }) => {
    const intensityColors = {
      low: 'bg-green-100 text-green-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };

    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{workout.type}</h3>
              <p className="text-sm text-gray-500">{workout.date} • {workout.time}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${intensityColors[workout.intensity]}`}>
            {workout.intensity}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-gray-900">{workout.duration}m</p>
            <p className="text-xs text-gray-500">Duration</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{workout.calories}</p>
            <p className="text-xs text-gray-500">Calories</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{workout.heartRate.avg}</p>
            <p className="text-xs text-gray-500">Avg HR</p>
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Good morning, Alex!</h2>
            <p className="text-blue-100">You're 85% closer to your daily goals</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="text-blue-100">{currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => setIsWorkoutActive(!isWorkoutActive)}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            isWorkoutActive 
              ? 'bg-red-50 border-red-500 text-red-600' 
              : 'bg-green-50 border-green-500 text-green-600 hover:bg-green-100'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            {isWorkoutActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            <span className="font-medium">
              {isWorkoutActive ? `Stop (${formatTime(workoutTimer)})` : 'Start Workout'}
            </span>
          </div>
        </button>
        
        <button className="p-4 rounded-xl bg-blue-50 border-2 border-blue-500 text-blue-600 hover:bg-blue-100 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Target className="w-6 h-6" />
            <span className="font-medium">Set Goal</span>
          </div>
        </button>
        
        <button className="p-4 rounded-xl bg-purple-50 border-2 border-purple-500 text-purple-600 hover:bg-purple-100 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="font-medium">Challenges</span>
          </div>
        </button>
        
        <button className="p-4 rounded-xl bg-orange-50 border-2 border-orange-500 text-orange-600 hover:bg-orange-100 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Share2 className="w-6 h-6" />
            <span className="font-medium">Share</span>
          </div>
        </button>
      </div>

      {/* Health Metrics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Today's Metrics</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
            View All
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthMetrics.map((metric) => (
            <MetricCard 
              key={metric.id} 
              metric={metric} 
              onClick={() => setSelectedMetric(metric)}
            />
          ))}
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Weekly Activity</h3>
          <div className="flex items-center gap-2">
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>
        
        <div className="h-64 flex items-end justify-between gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const height = Math.random() * 80 + 20;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-sm text-gray-600">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Workouts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Recent Workouts</h3>
          <button 
            onClick={() => setCurrentView('workouts')}
            className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
          >
            View All
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Active Challenges</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
            Join More
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {challenges.slice(0, 2).map((challenge) => {
            const IconComponent = challenge.icon;
            return (
              <div key={challenge.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{challenge.name}</h4>
                    <p className="text-sm text-gray-500">{challenge.participants.toLocaleString()} participants</p>
                  </div>
                  <span className="text-sm font-medium text-purple-600">{challenge.reward}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const WorkoutsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Workouts</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Workout
        </button>
      </div>

      {/* Workout Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-gray-600 text-sm">This Week</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500">Workouts</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Flame className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-gray-600 text-sm">Calories</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">1,847</p>
          <p className="text-sm text-gray-500">Burned</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Timer className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600 text-sm">Duration</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">4.2</p>
          <p className="text-sm text-gray-500">Hours</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-gray-600 text-sm">Avg HR</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">142</p>
          <p className="text-sm text-gray-500">BPM</p>
        </div>
      </div>

      {/* Workout List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {recentWorkouts.map((workout) => (
            <div key={workout.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{workout.type}</h4>
                    <p className="text-sm text-gray-500">{workout.date} • {workout.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{workout.duration}m</p>
                    <p className="text-gray-500">Duration</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{workout.calories}</p>
                    <p className="text-gray-500">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{workout.heartRate.avg}</p>
                    <p className="text-gray-500">Avg HR</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const NutritionView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Nutrition</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Log Food
        </button>
      </div>

      {/* Daily Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Intake</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Calories</span>
              <span className="font-semibold">{nutritionData.calories} / {nutritionData.target.calories}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                style={{ width: `${(nutritionData.calories / nutritionData.target.calories) * 100}%` }}
              ></div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Protein</span>
                <span className="font-semibold">{nutritionData.protein}g / {nutritionData.target.protein}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(nutritionData.protein / nutritionData.target.protein) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Carbs</span>
                <span className="font-semibold">{nutritionData.carbs}g / {nutritionData.target.carbs}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(nutritionData.carbs / nutritionData.target.carbs) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Fat</span>
                <span className="font-semibold">{nutritionData.fat}g / {nutritionData.target.fat}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(nutritionData.fat / nutritionData.target.fat) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="8"
                  strokeDasharray={`${(nutritionData.calories / nutritionData.target.calories) * 251.2} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{Math.round((nutritionData.calories / nutritionData.target.calories) * 100)}%</p>
                  <p className="text-sm text-gray-500">Daily Goal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Water Intake */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Water Intake</h3>
          <button className="text-cyan-600 text-sm font-medium hover:text-cyan-700 transition-colors">
            Add Glass
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Today</span>
              <span className="font-semibold">{nutritionData.water}L / {nutritionData.target.water}L</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full"
                style={{ width: `${(nutritionData.water / nutritionData.target.water) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className={`w-6 h-8 rounded-full border-2 ${
                  i < Math.floor((nutritionData.water / nutritionData.target.water) * 8)
                    ? 'bg-cyan-400 border-cyan-400'
                    : 'border-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Meal Log */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Today's Meals</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {[
            { meal: 'Breakfast', time: '8:00 AM', calories: 420, items: ['Oatmeal with berries', 'Greek yogurt', 'Coffee'] },
            { meal: 'Lunch', time: '12:30 PM', calories: 650, items: ['Grilled chicken salad', 'Quinoa', 'Avocado'] },
            { meal: 'Snack', time: '3:00 PM', calories: 180, items: ['Apple', 'Almonds'] },
            { meal: 'Dinner', time: '7:00 PM', calories: 597, items: ['Salmon', 'Sweet potato', 'Broccoli'] }
          ].map((meal, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{meal.meal}</h4>
                  <p className="text-sm text-gray-500">{meal.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{meal.calories} cal</p>
                  <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.items.map((item, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SleepView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Sleep Analysis</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Moon className="w-4 h-4" />
          Sleep Mode
        </button>
      </div>

      {/* Last Night's Sleep */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Last Night's Sleep</h3>
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5" />
            <span className="text-sm">Dec 29, 2024</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold">8h 12m</p>
            <p className="text-purple-100 text-sm">Total Sleep</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">90%</p>
            <p className="text-purple-100 text-sm">Sleep Quality</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">10:45 PM</p>
            <p className="text-purple-100 text-sm">Bedtime</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">6:57 AM</p>
            <p className="text-purple-100 text-sm">Wake Time</p>
          </div>
        </div>
      </div>

      {/* Sleep Stages */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sleep Stages</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Deep Sleep</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-16">2h 18m</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">REM Sleep</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-16">2h 3m</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700">Light Sleep</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-16">3h 42m</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">Awake</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '2%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-16">9m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Sleep Trends</h3>
        
        <div className="h-64 flex items-end justify-between gap-2">
          {sleepData.map((day, index) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full space-y-1">
                <div 
                  className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg"
                  style={{ height: `${(day.duration / 10) * 200}px` }}
                ></div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">{day.duration}h</p>
                  <p className="text-xs text-gray-500">{day.quality}%</p>
                </div>
              </div>
              <span className="text-sm text-gray-600">{day.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sleep Insights</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Great sleep consistency!</p>
              <p className="text-sm text-green-700">You've maintained a regular sleep schedule for 5 days in a row.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Optimal bedtime window</p>
              <p className="text-sm text-blue-700">Based on your sleep patterns, try going to bed between 10:30-11:00 PM for best results.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">Screen time before bed</p>
              <p className="text-sm text-yellow-700">Consider reducing screen time 1 hour before bedtime to improve sleep quality.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BottomNavigation = () => {
    const navItems = [
      { id: 'dashboard', name: 'Dashboard', icon: Home },
      { id: 'workouts', name: 'Workouts', icon: Dumbbell },
      { id: 'nutrition', name: 'Nutrition', icon: Droplets },
      { id: 'sleep', name: 'Sleep', icon: Moon },
      { id: 'social', name: 'Social', icon: Users }
    ];

    return (
      <div className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  currentView === item.id ? 'text-blue-600' : 'text-gray-500'
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
                <h1 className="text-2xl font-bold text-gray-900">FitTrack Pro</h1>
                <p className="text-gray-600">Your personal health companion</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'workouts' && <WorkoutsView />}
        {currentView === 'nutrition' && <NutritionView />}
        {currentView === 'sleep' && <SleepView />}
        {currentView === 'social' && (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Features</h2>
            <p className="text-gray-600">Connect with friends, join challenges, and share your progress!</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomNavigation />
      </div>

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-md w-full bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedMetric.name}</h3>
              <button 
                onClick={() => setSelectedMetric(null)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {selectedMetric.value.toLocaleString()} {selectedMetric.unit}
                </p>
                {selectedMetric.target && (
                  <p className="text-gray-600">
                    Goal: {selectedMetric.target.toLocaleString()} {selectedMetric.unit}
                  </p>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Today's Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Status</span>
                    <span className={getStatusColor(selectedMetric.status)}>
                      {selectedMetric.status.charAt(0).toUpperCase() + selectedMetric.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trend</span>
                    <span className={`flex items-center gap-1 ${
                      selectedMetric.trend === 'up' ? 'text-green-500' : 
                      selectedMetric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {selectedMetric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                      {selectedMetric.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                      {selectedMetric.change > 0 ? '+' : ''}{selectedMetric.change}%
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedMetric(null)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View Detailed Analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};