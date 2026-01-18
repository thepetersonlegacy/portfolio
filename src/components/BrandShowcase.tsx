import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  Palette, 
  Type, 
  FileText, 
  Briefcase,
  Monitor,
  Smartphone,
  Printer,
  Share2,
  Grid,
  Layers,
  Target,
  Award,
  Zap,
  Heart,
  Star
} from 'lucide-react';

interface BrandShowcaseProps {
  onClose: () => void;
}

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedLogo, setSelectedLogo] = useState('primary');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const brandColors = {
    primary: { name: 'Zenith Blue', hex: '#1E40AF', rgb: '30, 64, 175' },
    secondary: { name: 'Electric Cyan', hex: '#06B6D4', rgb: '6, 182, 212' },
    accent: { name: 'Vibrant Orange', hex: '#F97316', rgb: '249, 115, 22' },
    neutral: { name: 'Charcoal Gray', hex: '#374151', rgb: '55, 65, 81' },
    light: { name: 'Pure White', hex: '#FFFFFF', rgb: '255, 255, 255' },
    dark: { name: 'Deep Black', hex: '#111827', rgb: '17, 24, 39' }
  };

  const logoVariations = {
    primary: { name: 'Primary Logo', bg: 'bg-white', textColor: 'text-gray-900' },
    white: { name: 'White Version', bg: 'bg-gray-900', textColor: 'text-white' },
    monogram: { name: 'Monogram', bg: 'bg-blue-600', textColor: 'text-white' },
    horizontal: { name: 'Horizontal Layout', bg: 'bg-gray-100', textColor: 'text-gray-900' }
  };

  const typography = {
    primary: { name: 'Montserrat', weight: 'Bold', usage: 'Headlines & Logos' },
    secondary: { name: 'Inter', weight: 'Regular/Medium', usage: 'Body Text & UI' },
    accent: { name: 'Playfair Display', weight: 'Italic', usage: 'Elegant Accents' }
  };

  const applications = [
    {
      category: 'Business Cards',
      items: [
        { name: 'Executive Card', image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Standard Card', image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800' }
      ]
    },
    {
      category: 'Stationery',
      items: [
        { name: 'Letterhead', image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Envelope', image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800' }
      ]
    },
    {
      category: 'Digital',
      items: [
        { name: 'Website Header', image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Social Media', image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800' }
      ]
    }
  ];

  const sections = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'logo', name: 'Logo System', icon: Zap },
    { id: 'colors', name: 'Color Palette', icon: Palette },
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'applications', name: 'Applications', icon: Briefcase },
    { id: 'guidelines', name: 'Guidelines', icon: FileText }
  ];

  const LogoDisplay = () => (
    <div className={`${logoVariations[selectedLogo].bg} rounded-2xl p-12 flex items-center justify-center transition-all duration-500 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
      <div className={`text-center ${logoVariations[selectedLogo].textColor}`}>
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">Z</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">ZENITH</h1>
        <p className="text-lg font-light tracking-widest mt-2">TECHNOLOGIES</p>
      </div>
    </div>
  );

  const ColorSwatch = ({ colorKey, color }) => (
    <div 
      className={`group cursor-pointer transition-all duration-300 ${selectedColor === colorKey ? 'scale-105 shadow-2xl' : 'hover:scale-102'}`}
      onClick={() => setSelectedColor(colorKey)}
    >
      <div 
        className="w-full h-32 rounded-t-xl"
        style={{ backgroundColor: color.hex }}
      ></div>
      <div className="bg-white p-4 rounded-b-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-1">{color.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{color.hex}</p>
        <p className="text-xs text-gray-500">RGB: {color.rgb}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Portfolio
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Zenith Corporate Identity</h1>
                <p className="text-gray-600">Complete Brand System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Brand Guidelines
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {section.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-12 text-white">
                  <div className="max-w-2xl">
                    <h2 className="text-4xl font-bold mb-6">Zenith Technologies</h2>
                    <p className="text-xl mb-8 text-blue-100">
                      A comprehensive brand identity system designed to position Zenith Technologies as a forward-thinking, innovative leader in the tech industry.
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <Award className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Award-Winning Design</p>
                      </div>
                      <div className="text-center">
                        <Zap className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Modern & Dynamic</p>
                      </div>
                      <div className="text-center">
                        <Heart className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">User-Centered</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Goals</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">Create a memorable and distinctive brand identity</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">Establish trust and credibility in the tech market</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">Ensure scalability across all touchpoints</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">Differentiate from competitors</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-sm border">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Deliverables</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Logo System</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Palette className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Color Palette</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Type className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Typography</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Business Cards</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Stationery</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Monitor className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Digital Assets</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Logo System Section */}
            {activeSection === 'logo' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Logo System</h2>
                  <p className="text-gray-600 text-lg">
                    The Zenith logo combines modern typography with a dynamic symbol representing growth, innovation, and technological advancement.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <LogoDisplay />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Logo Variations</h3>
                    {Object.entries(logoVariations).map(([key, variation]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedLogo(key)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedLogo === key
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <h4 className="font-semibold text-gray-900">{variation.name}</h4>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Logo Construction</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Grid className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Grid System</h4>
                      <p className="text-gray-600 text-sm">Built on a precise geometric grid for perfect proportions</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Layers className="w-8 h-8 text-cyan-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Clear Space</h4>
                      <p className="text-gray-600 text-sm">Minimum clear space equals the height of the 'Z' character</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Minimum Size</h4>
                      <p className="text-gray-600 text-sm">Never reproduce smaller than 24px in digital or 0.5" in print</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Color Palette Section */}
            {activeSection === 'colors' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Color Palette</h2>
                  <p className="text-gray-600 text-lg">
                    A sophisticated color system that conveys trust, innovation, and energy while maintaining professional appeal.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(brandColors).map(([key, color]) => (
                    <ColorSwatch key={key} colorKey={key} color={color} />
                  ))}
                </div>

                {selectedColor && (
                  <div className="bg-white rounded-2xl p-8 shadow-sm border">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {brandColors[selectedColor].name}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">HEX</p>
                            <p className="text-lg font-mono">{brandColors[selectedColor].hex}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">RGB</p>
                            <p className="text-lg font-mono">{brandColors[selectedColor].rgb}</p>
                          </div>
                        </div>
                      </div>
                      <div 
                        className="rounded-xl h-48"
                        style={{ backgroundColor: brandColors[selectedColor].hex }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-8 shadow-sm border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Color Usage Guidelines</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Primary Applications</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Zenith Blue: Main brand color, logos, headers</li>
                        <li>• Electric Cyan: Accents, highlights, CTAs</li>
                        <li>• Vibrant Orange: Energy, innovation, warnings</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Supporting Colors</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Charcoal Gray: Body text, secondary elements</li>
                        <li>• Pure White: Backgrounds, negative space</li>
                        <li>• Deep Black: High contrast text, emphasis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Typography Section */}
            {activeSection === 'typography' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Typography System</h2>
                  <p className="text-gray-600 text-lg">
                    A carefully curated type system that balances readability with personality across all brand touchpoints.
                  </p>
                </div>

                <div className="space-y-6">
                  {Object.entries(typography).map(([key, font]) => (
                    <div key={key} className="bg-white rounded-2xl p-8 shadow-sm border">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{font.name}</h3>
                          <p className="text-gray-600 mb-4">{font.usage}</p>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Weight: {font.weight}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-4xl font-bold text-gray-900 mb-2 ${key === 'primary' ? 'font-sans' : key === 'secondary' ? 'font-sans' : 'font-serif'}`}>
                            Aa Bb Cc
                          </div>
                          <p className={`text-lg text-gray-600 ${key === 'primary' ? 'font-sans' : key === 'secondary' ? 'font-sans' : 'font-serif'}`}>
                            The quick brown fox jumps over the lazy dog
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Typography Hierarchy</h3>
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 mb-2">Heading 1 - 36px Bold</h1>
                      <p className="text-gray-600">Used for main page titles and hero headlines</p>
                    </div>
                    <div>
                      <h2 className="text-3xl font-semibold text-gray-900 mb-2">Heading 2 - 30px Semibold</h2>
                      <p className="text-gray-600">Section headers and important subheadings</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Heading 3 - 20px Medium</h3>
                      <p className="text-gray-600">Subsection titles and card headers</p>
                    </div>
                    <div>
                      <p className="text-base text-gray-900 mb-2">Body Text - 16px Regular</p>
                      <p className="text-gray-600">Standard body text for paragraphs and content</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Caption - 14px Regular</p>
                      <p className="text-gray-600">Small text, captions, and metadata</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Section */}
            {activeSection === 'applications' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Brand Applications</h2>
                  <p className="text-gray-600 text-lg">
                    See how the Zenith brand comes to life across various touchpoints and materials.
                  </p>
                </div>

                {applications.map((category) => (
                  <div key={category.category} className="bg-white rounded-2xl p-8 shadow-sm border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{category.category}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.items.map((item) => (
                        <div key={item.name} className="group cursor-pointer">
                          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
                    <Monitor className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Digital Assets</h3>
                    <p className="text-gray-600 text-sm">Website headers, social media templates, email signatures</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
                    <Printer className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Print Materials</h3>
                    <p className="text-gray-600 text-sm">Business cards, letterheads, brochures, presentations</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
                    <Smartphone className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Mobile Applications</h3>
                    <p className="text-gray-600 text-sm">App icons, splash screens, UI elements</p>
                  </div>
                </div>
              </div>
            )}

            {/* Guidelines Section */}
            {activeSection === 'guidelines' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Brand Guidelines</h2>
                  <p className="text-gray-600 text-lg">
                    Essential guidelines to maintain brand consistency across all applications and touchpoints.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Do's</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Use the logo on clean, uncluttered backgrounds</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Maintain proper clear space around the logo</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Use approved color combinations only</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Scale proportionally to maintain integrity</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-sm border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Don'ts</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Don't stretch or distort the logo</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Don't use unauthorized color variations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Don't place on busy or low-contrast backgrounds</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">Don't recreate or modify the logo elements</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Download Brand Assets</h3>
                  <p className="text-gray-600 mb-6">
                    Access the complete brand package including logos, color swatches, fonts, and templates.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-900">Logo Package</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-900">Color Swatches</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-900">Font Files</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};