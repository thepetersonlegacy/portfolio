import React, { useState } from 'react';
import { 
  ArrowLeft, Phone, Mail, MapPin, Clock, Star, ChevronRight, Menu, X,
  Shield, Award, Users, Check, ArrowRight, Calendar, MessageCircle,
  Facebook, Twitter, Instagram, Linkedin, Youtube, Heart, Sparkles
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  features?: string[];
  technologies?: string[];
  client?: string;
  duration?: string;
  year?: string;
  link?: string;
  results?: {
    metric1?: { label: string; value: string };
    metric2?: { label: string; value: string };
    metric3?: { label: string; value: string };
  };
  challenge?: string;
  solution?: string;
}

interface WebsiteMockupProps {
  project: Project;
  onClose: () => void;
}

// Industry-specific color schemes
const getColorScheme = (category: string, title: string) => {
  const schemes: Record<string, { primary: string; secondary: string; accent: string; bg: string; text: string }> = {
    'Legal Services': { primary: '#1e3a5f', secondary: '#c9a227', accent: '#8b0000', bg: '#f8f6f3', text: '#1a1a1a' },
    'Aviation Services': { primary: '#0c2340', secondary: '#00a3e0', accent: '#f26522', bg: '#f0f4f8', text: '#1a1a1a' },
    'Aviation Consulting': { primary: '#1a365d', secondary: '#38b2ac', accent: '#ed8936', bg: '#edf2f7', text: '#1a1a1a' },
    'Healthcare': { primary: '#0d6efd', secondary: '#20c997', accent: '#6f42c1', bg: '#f8f9fa', text: '#212529' },
    'Home Services': { primary: '#e65100', secondary: '#1565c0', accent: '#2e7d32', bg: '#fafafa', text: '#212121' },
    'Construction': { primary: '#d32f2f', secondary: '#ff6f00', accent: '#1976d2', bg: '#f5f5f5', text: '#212121' },
    'Accounting': { primary: '#1a237e', secondary: '#00695c', accent: '#c2185b', bg: '#fafafa', text: '#1a1a1a' },
    'Manufacturing': { primary: '#263238', secondary: '#ff6f00', accent: '#0277bd', bg: '#eceff1', text: '#1a1a1a' },
    'Logistics': { primary: '#1565c0', secondary: '#f57c00', accent: '#2e7d32', bg: '#e3f2fd', text: '#1a1a1a' },
    'Insurance': { primary: '#00695c', secondary: '#1976d2', accent: '#7b1fa2', bg: '#e0f2f1', text: '#1a1a1a' },
    'Nonprofit': { primary: '#7b1fa2', secondary: '#00897b', accent: '#f4511e', bg: '#f3e5f5', text: '#1a1a1a' },
    'Real Estate': { primary: '#37474f', secondary: '#ff8f00', accent: '#00897b', bg: '#eceff1', text: '#1a1a1a' },
    'Artist Portfolio': { primary: '#6a1b9a', secondary: '#00bcd4', accent: '#ff4081', bg: '#1a1a1a', text: '#ffffff' },
  };
  return schemes[category] || { primary: '#1a1a1a', secondary: '#d4af37', accent: '#c9302c', bg: '#ffffff', text: '#1a1a1a' };
};

// Get industry-specific hero content
const getHeroContent = (project: Project) => {
  const heroTemplates: Record<string, { headline: string; subheadline: string; cta: string; secondaryCta: string }> = {
    'Legal Services': {
      headline: 'Fighting for Your Rights.',
      subheadline: 'Experienced attorneys dedicated to securing the justice and compensation you deserve.',
      cta: 'Free Case Review',
      secondaryCta: 'Call Now 24/7'
    },
    'Aviation Services': {
      headline: 'Excellence in Aviation.',
      subheadline: 'Premium services for discerning clients who expect nothing but the best.',
      cta: 'Request Quote',
      secondaryCta: 'View Services'
    },
    'Aviation Consulting': {
      headline: 'Navigate Aviation Excellence.',
      subheadline: 'Expert guidance for flight operations, safety compliance, and crew training.',
      cta: 'Schedule Consultation',
      secondaryCta: 'Our Expertise'
    },
    'Healthcare': {
      headline: 'Your Health, Our Priority.',
      subheadline: 'Compassionate care with cutting-edge technology for you and your family.',
      cta: 'Book Appointment',
      secondaryCta: 'Our Services'
    },
    'Home Services': {
      headline: 'Trusted Home Experts.',
      subheadline: 'Professional, reliable service when you need it most. Available 24/7.',
      cta: 'Get Free Estimate',
      secondaryCta: 'Emergency Service'
    },
    'Construction': {
      headline: 'Building Tomorrow.',
      subheadline: 'Quality craftsmanship and reliable project delivery for over 25 years.',
      cta: 'Get Free Quote',
      secondaryCta: 'View Projects'
    },
    'Accounting': {
      headline: 'Financial Clarity.',
      subheadline: 'Strategic tax planning and business advisory from certified professionals.',
      cta: 'Free Consultation',
      secondaryCta: 'Our Services'
    },
    'Manufacturing': {
      headline: 'Precision Engineering.',
      subheadline: 'Custom manufacturing solutions with uncompromising quality standards.',
      cta: 'Request Quote',
      secondaryCta: 'Capabilities'
    },
    'Logistics': {
      headline: 'Moving Business Forward.',
      subheadline: 'Reliable freight solutions with real-time tracking and competitive rates.',
      cta: 'Get Instant Quote',
      secondaryCta: 'Track Shipment'
    },
    'Insurance': {
      headline: 'Protection You Can Trust.',
      subheadline: 'Comprehensive coverage options tailored to your unique needs.',
      cta: 'Get Free Quote',
      secondaryCta: 'Compare Plans'
    },
    'Nonprofit': {
      headline: 'Together, We Make a Difference.',
      subheadline: 'Join our mission to create positive change in communities across the nation.',
      cta: 'Donate Now',
      secondaryCta: 'Get Involved'
    },
    'Real Estate': {
      headline: 'Your Property Partner.',
      subheadline: 'Professional management solutions that maximize your investment returns.',
      cta: 'Get Started',
      secondaryCta: 'View Listings'
    },
    'Artist Portfolio': {
      headline: 'Art That Moves.',
      subheadline: 'Live performance, visual art, and creative experiences that inspire.',
      cta: 'Book Performance',
      secondaryCta: 'View Gallery'
    }
  };
  return heroTemplates[project.category] || {
    headline: `Welcome to ${project.title}`,
    subheadline: project.description.substring(0, 100) + '...',
    cta: 'Get Started',
    secondaryCta: 'Learn More'
  };
};

export const WebsiteMockup: React.FC<WebsiteMockupProps> = ({ project, onClose }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const colors = getColorScheme(project.category, project.title);
  const hero = getHeroContent(project);

  // Get nav items based on industry
  const getNavItems = () => {
    const navTemplates: Record<string, string[]> = {
      'Legal Services': ['Home', 'Practice Areas', 'Attorneys', 'Results', 'Resources', 'Contact'],
      'Aviation Services': ['Home', 'Services', 'Fleet', 'About', 'Testimonials', 'Contact'],
      'Aviation Consulting': ['Home', 'Services', 'About', 'Team', 'Insights', 'Contact'],
      'Healthcare': ['Home', 'Services', 'Providers', 'Patient Portal', 'About', 'Contact'],
      'Home Services': ['Home', 'Services', 'About', 'Reviews', 'Service Areas', 'Contact'],
      'Construction': ['Home', 'Services', 'Projects', 'About', 'Safety', 'Contact'],
      'Accounting': ['Home', 'Services', 'About', 'Resources', 'Client Portal', 'Contact'],
      'Manufacturing': ['Home', 'Products', 'Capabilities', 'About', 'Resources', 'Contact'],
      'Logistics': ['Home', 'Services', 'Track', 'Quote', 'About', 'Contact'],
      'Insurance': ['Home', 'Products', 'Get Quote', 'Claims', 'About', 'Contact'],
      'Nonprofit': ['Home', 'Programs', 'Impact', 'Get Involved', 'About', 'Donate'],
      'Real Estate': ['Home', 'Properties', 'Services', 'Owners', 'Tenants', 'Contact'],
      'Artist Portfolio': ['Home', 'Gallery', 'Performances', 'About', 'Commission', 'Contact']
    };
    return navTemplates[project.category] || ['Home', 'Services', 'About', 'Portfolio', 'Contact'];
  };

  // Get services based on industry
  const getServices = () => {
    const servicesMap: Record<string, { icon: string; title: string; desc: string }[]> = {
      'Legal Services': [
        { icon: '⚖️', title: 'Personal Injury', desc: 'Aggressive representation for accident victims' },
        { icon: '🚗', title: 'Auto Accidents', desc: 'Maximum compensation for crash injuries' },
        { icon: '👷', title: 'Workers Comp', desc: 'Protecting your rights after workplace injuries' },
        { icon: '🏥', title: 'Medical Malpractice', desc: 'Holding healthcare providers accountable' }
      ],
      'Healthcare': [
        { icon: '🦷', title: 'General Care', desc: 'Comprehensive health services for all ages' },
        { icon: '💉', title: 'Preventive Care', desc: 'Stay healthy with regular checkups' },
        { icon: '🩺', title: 'Specialized Care', desc: 'Expert treatment for specific conditions' },
        { icon: '📱', title: 'Telehealth', desc: 'Virtual appointments from anywhere' }
      ],
      'Home Services': [
        { icon: '🔧', title: '24/7 Emergency', desc: 'Round-the-clock emergency service' },
        { icon: '🏠', title: 'Residential', desc: 'Complete home service solutions' },
        { icon: '🏢', title: 'Commercial', desc: 'Professional business services' },
        { icon: '📋', title: 'Maintenance Plans', desc: 'Preventive care to avoid costly repairs' }
      ],
      'Construction': [
        { icon: '🏗️', title: 'New Construction', desc: 'Ground-up building excellence' },
        { icon: '🔨', title: 'Renovations', desc: 'Transform your existing space' },
        { icon: '🏠', title: 'Restoration', desc: 'Expert damage repair services' },
        { icon: '📐', title: 'Design-Build', desc: 'Seamless planning to completion' }
      ]
    };
    return servicesMap[project.category] || project.features?.slice(0, 4).map((f, i) => ({
      icon: ['✨', '🎯', '⚡', '🛡️'][i],
      title: f.split(' ').slice(0, 3).join(' '),
      desc: f
    })) || [];
  };

  const navItems = getNavItems();
  const services = getServices();

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg, color: colors.text }}>
      {/* Back Button - Fixed */}
      <button
        onClick={onClose}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
        style={{ color: colors.primary }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Portfolio</span>
      </button>

      {/* Top Bar */}
      <div className="w-full py-2 px-4 text-white text-sm" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> (555) 123-4567</span>
            <span className="hidden sm:flex items-center gap-1"><Mail className="w-3 h-3" /> info@{project.title.toLowerCase().replace(/\s+/g, '')}.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Facebook className="w-4 h-4 cursor-pointer hover:opacity-80" />
            <Twitter className="w-4 h-4 cursor-pointer hover:opacity-80" />
            <Instagram className="w-4 h-4 cursor-pointer hover:opacity-80" />
            <Linkedin className="w-4 h-4 cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: colors.primary }}>
              {project.title.charAt(0)}
            </div>
            <span className="font-bold text-lg hidden sm:block" style={{ color: colors.primary }}>{project.title}</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, i) => (
              <a key={i} href="#" className="text-gray-700 hover:opacity-80 font-medium transition-colors" style={{ '--hover-color': colors.secondary } as React.CSSProperties}>
                {item}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2.5 rounded-lg text-white font-semibold transition-transform hover:scale-105" style={{ backgroundColor: colors.secondary }}>
              {hero.cta}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t py-4 px-4">
            {navItems.map((item, i) => (
              <a key={i} href="#" className="block py-3 text-gray-700 border-b border-gray-100">{item}</a>
            ))}
            <button className="w-full mt-4 px-6 py-3 rounded-lg text-white font-semibold" style={{ backgroundColor: colors.secondary }}>
              {hero.cta}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: colors.secondary, color: 'white' }}>
              {project.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              {hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-lg text-white font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2" style={{ backgroundColor: colors.secondary }}>
                {hero.cta} <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold text-lg border border-white/30 hover:bg-white/30 transition-all">
                {hero.secondaryCta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-b" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8" style={{ color: colors.secondary }} />
              <div className="text-sm">
                <div className="font-semibold" style={{ color: colors.primary }}>Licensed & Insured</div>
                <div className="text-gray-500">Full Protection</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8" style={{ color: colors.secondary }} />
              <div className="text-sm">
                <div className="font-semibold" style={{ color: colors.primary }}>5-Star Rated</div>
                <div className="text-gray-500">500+ Reviews</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8" style={{ color: colors.secondary }} />
              <div className="text-sm">
                <div className="font-semibold" style={{ color: colors.primary }}>Award Winning</div>
                <div className="text-gray-500">Industry Leader</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8" style={{ color: colors.secondary }} />
              <div className="text-sm">
                <div className="font-semibold" style={{ color: colors.primary }}>10,000+</div>
                <div className="text-gray-500">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}>
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your unique needs. Experience excellence at every step.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform" style={{ color: colors.primary }}>
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
                <a href="#" className="flex items-center gap-1 text-sm font-medium" style={{ color: colors.secondary }}>
                  Learn More <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results/Stats Section */}
      {project.results && (
        <section className="py-16 text-white" style={{ backgroundColor: colors.primary }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Results That Speak</h2>
              <p className="text-white/80 max-w-2xl mx-auto">Our track record demonstrates our commitment to excellence.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[project.results.metric1, project.results.metric2, project.results.metric3].filter(Boolean).map((metric, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: colors.secondary }}>
                    {metric?.value}
                  </div>
                  <div className="text-white/80">{metric?.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About/Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}>
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.primary }}>
                Experience the {project.title} Difference
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.challenge || project.description}
              </p>
              <div className="space-y-4">
                {(project.features || []).slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: colors.secondary }}>
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 px-8 py-3 rounded-lg text-white font-semibold transition-transform hover:scale-105" style={{ backgroundColor: colors.primary }}>
                Learn More About Us
              </button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl opacity-20" style={{ backgroundColor: colors.secondary }}></div>
              <img src={project.image} alt="About" className="relative rounded-xl shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}>
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: colors.primary }}>What Our Clients Say</h2>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex justify-center mb-6">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-6 h-6 fill-current" style={{ color: colors.secondary }} />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed">
              "{project.solution || `${project.title} exceeded all our expectations. Their professional team delivered exceptional results that transformed our business.`}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.primary }}>
                JD
              </div>
              <div className="text-left">
                <div className="font-semibold" style={{ color: colors.primary }}>John Davis</div>
                <div className="text-gray-500 text-sm">Satisfied Client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 text-white relative overflow-hidden" style={{ backgroundColor: colors.primary }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. Let's discuss how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-lg font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2" style={{ backgroundColor: colors.secondary }}>
              <Calendar className="w-5 h-5" /> Schedule Consultation
            </button>
            <button className="px-8 py-4 rounded-lg bg-white/20 backdrop-blur-sm font-bold text-lg border border-white/30 hover:bg-white/30 transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Call (555) 123-4567
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: colors.secondary }}>
                  {project.title.charAt(0)}
                </div>
                <span className="font-bold text-lg">{project.title}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{project.description.substring(0, 100)}...</p>
              <div className="flex gap-3">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {navItems.slice(0, 5).map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {services.slice(0, 4).map((s, i) => (
                  <li key={i}><a href="#" className="hover:text-white transition-colors">{s.title}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Business Ave, Suite 100</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 123-4567</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@{project.title.toLowerCase().replace(/\s+/g, '')}.com</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> Mon-Fri: 9AM-5PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 {project.title}. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform" style={{ backgroundColor: colors.secondary }}>
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

