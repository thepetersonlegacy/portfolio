import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Users, Target, ArrowRight, Calendar, FileText } from 'lucide-react';
import { trackBookClick, trackFormClick } from '../utils/analytics';

type Mode = 'ecommerce' | 'leadgen';

interface ROICalculatorProps {
  mode?: Mode;
  onBookClick: () => void;
  onQuoteClick: () => void;
}

function pct(n: number) {
  return n / 100;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export const ROICalculator = ({ mode = 'leadgen', onBookClick, onQuoteClick }: ROICalculatorProps) => {
  const [visitors, setVisitors] = useState(5000);
  const [cr0, setCr0] = useState(1.2);
  const [cr1, setCr1] = useState(2.0);
  const [aov, setAov] = useState(150);
  const [leadValue, setLeadValue] = useState(1200);
  const [closeRate, setCloseRate] = useState(20);
  const [grossMargin, setGrossMargin] = useState(60);
  const [showResults, setShowResults] = useState(false);
  const [activeMode, setActiveMode] = useState<Mode>(mode);

  const V = Math.max(0, visitors);
  const CR0 = pct(Math.max(0, cr0));
  const CR1 = pct(Math.max(0, cr1));
  const GM = pct(Math.max(0, grossMargin));

  let r0 = 0;
  let r1 = 0;

  if (activeMode === 'ecommerce') {
    const AOV = Math.max(0, aov);
    r0 = V * CR0 * AOV;
    r1 = V * CR1 * AOV;
  } else {
    const LV = Math.max(0, leadValue);
    const Close = pct(Math.max(0, closeRate));
    r0 = V * CR0 * Close * LV;
    r1 = V * CR1 * Close * LV;
  }

  const gapMonthly = Math.max(0, r1 - r0);
  const gapAnnual = gapMonthly * 12;
  const profitMonthly = gapMonthly * GM;
  const profitAnnual = profitMonthly * 12;

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <section id="roi-calculator" className="py-24 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            Revenue Gap Calculator
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Calculate Your Website's <span className="text-red-600 font-medium">Revenue Gap</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how much revenue you're leaving on the table with your current website conversion rate.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Mode Toggle */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveMode('leadgen')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                activeMode === 'leadgen' ? 'bg-red-50 text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Lead Generation
            </button>
            <button
              onClick={() => setActiveMode('ecommerce')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                activeMode === 'ecommerce' ? 'bg-red-50 text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <DollarSign className="w-4 h-4 inline mr-2" />
              E-commerce
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input Fields */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" /> Monthly Website Visitors
                  </label>
                  <input
                    type="number"
                    value={visitors}
                    onChange={e => setVisitors(+e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Conv. Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={cr0}
                      onChange={e => setCr0(+e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Conv. Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={cr1}
                      onChange={e => setCr1(+e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                {activeMode === 'ecommerce' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" /> Average Order Value ($)
                    </label>
                    <input
                      type="number"
                      value={aov}
                      onChange={e => setAov(+e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Target className="w-4 h-4 inline mr-1" /> Lead Close Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={closeRate}
                        onChange={e => setCloseRate(+e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-1" /> Revenue Per New Client ($)
                      </label>
                      <input
                        type="number"
                        value={leadValue}
                        onChange={e => setLeadValue(+e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gross Margin (%) <span className="text-gray-400 font-normal">optional</span></label>
                  <input
                    type="number"
                    step="0.1"
                    value={grossMargin}
                    onChange={e => setGrossMargin(+e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCalculate}
                  className="w-full py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Run the Revenue Gap Report
                </motion.button>
              </div>

              {/* Results */}
              <div className={`bg-gray-50 rounded-xl p-6 ${showResults ? '' : 'flex items-center justify-center'}`}>
                {showResults ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Your Results
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Current Monthly Revenue</span>
                        <span className="font-medium text-gray-900">{formatCurrency(r0)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Potential Monthly Revenue</span>
                        <span className="font-medium text-green-600">{formatCurrency(r1)}</span>
                      </div>
                      <div className="flex justify-between py-3 bg-red-50 rounded-lg px-3 -mx-3">
                        <span className="font-medium text-red-700">Revenue Gap (Monthly)</span>
                        <span className="font-bold text-red-600">{formatCurrency(gapMonthly)}</span>
                      </div>
                      <div className="flex justify-between py-3 bg-red-100 rounded-lg px-3 -mx-3">
                        <span className="font-medium text-red-800">Revenue Gap (Annual)</span>
                        <span className="font-bold text-red-700 text-lg">{formatCurrency(gapAnnual)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Profit Impact (Monthly)</span>
                        <span className="font-medium text-gray-900">{formatCurrency(profitMonthly)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Profit Impact (Annual)</span>
                        <span className="font-medium text-gray-900">{formatCurrency(profitAnnual)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                      *Estimates based on your inputs. Actual results may vary.
                    </p>

                    <div className="pt-4 space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { trackBookClick('roi_calculator'); onBookClick(); }}
                        className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Book a 15-Min ROI Review
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { trackFormClick('roi_calculator'); onQuoteClick(); }}
                        className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Get a Fast Quote
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Enter your numbers and click<br />"Run the Revenue Gap Report"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

