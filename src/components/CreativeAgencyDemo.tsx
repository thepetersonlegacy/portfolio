import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Github, 
  Instagram, 
  Twitter, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Award,
  Users,
  Briefcase,
  Star,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Zap,
  Palette,
  Code,
  Camera,
  Film,
  Layers,
  Target,
  TrendingUp,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Filter,
  Grid,
  List,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  Sparkles,
  Rocket,
  Globe,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

interface CreativeAgencyDemoProps {
  onClose: () => void;
}

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  description: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  featured: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const CreativeAgencyDemo: React.FC<CreativeAgencyDemoProps> = ({ onClose }) => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "Neon Dreams Campaign",
      category: "Branding",
      client: "TechFlow Inc.",
      year: "2024",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "A futuristic brand identity that captures the essence of innovation and digital transformation.",
      tags: ["Branding", "Digital", "Futuristic", "Neon"],
      likes: 1247,
      views: 8934,
      comments: 89,
      featured: true
    },
    {
      id: 2,
      title: "Urban Lifestyle Website",
      category: "Web Design",
      client: "Metro Living",
      year: "2024",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Modern e-commerce platform showcasing urban fashion with immersive shopping experience.",
      tags: ["Web Design", "E-commerce", "Fashion", "Urban"],
      likes: 892,
      views: 5621,
      comments: 45,
      featured: true
    },
    {
      id: 3,
      title: "Motion Graphics Reel",
      category: "Animation",
      client: "Creative Studios",
      year: "2024",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Dynamic motion graphics showcasing brand storytelling through fluid animations.",
      tags: ["Animation", "Motion", "Storytelling", "Brand"],
      likes: 1534,
      views: 12456,
      comments: 156,
      featured: false
    },
    {
      id: 4,
      title: "Sustainable Packaging",
      category: "Print Design",
      client: "EcoGoods",
      year: "2024",
      image: "https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Eco-friendly packaging design that communicates sustainability and premium quality.",
      tags: ["Print", "Packaging", "Sustainable", "Eco"],
      likes: 678,
      views: 3421,
      comments: 32,
      featured: false
    },
    {
      id: 5,
      title: "AR Experience App",
      category: "Digital",
      client: "FutureTech",
      year: "2024",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Augmented reality mobile application with intuitive interface and immersive interactions.",
      tags: ["AR", "Mobile", "Interface", "Innovation"],
      likes: 2156,
      views: 15789,
      comments: 234,
      featured: true
    },
    {
      id: 6,
      title: "Luxury Hotel Identity",
      category: "Branding",
      client: "Grand Meridian",
      year: "2024",
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Sophisticated brand identity for luxury hospitality with timeless elegance.",
      tags: ["Luxury", "Hospitality", "Elegant", "Premium"],
      likes: 945,
      views: 6234,
      comments: 67,
      featured: false
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Creative Director",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Visionary creative with 10+ years of experience in brand storytelling and digital innovation.",
      skills: ["Creative Strategy", "Brand Development", "Art Direction", "Team Leadership"],
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      id: 2,
      name: "Maya Chen",
      role: "Lead Designer",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Award-winning designer specializing in user experience and visual communication.",
      skills: ["UI/UX Design", "Visual Design", "Prototyping", "Design Systems"],
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      id: 3,
      name: "Jordan Blake",
      role: "Motion Designer",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Motion graphics expert creating compelling animations that bring brands to life.",
      skills: ["Motion Graphics", "3D Animation", "Video Editing", "After Effects"],
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      id: 4,
      name: "Sam Rodriguez",
      role: "Developer",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Full-stack developer passionate about creating seamless digital experiences.",
      skills: ["React", "Node.js", "WebGL", "Performance Optimization"],
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const categories = ["All", "Branding", "Web Design", "Animation", "Print Design", "Digital"];
  const services = [
    {
      icon: Palette,
      title: "Brand Identity",
      description: "Complete brand systems that tell your story and connect with your audience.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"]
    },
    {
      icon: Monitor,
      title: "Web Design",
      description: "Stunning websites that engage users and drive conversions.",
      features: ["Responsive Design", "User Experience", "E-commerce", "CMS Integration"]
    },
    {
      icon: Film,
      title: "Motion Graphics",
      description: "Dynamic animations that bring your brand to life.",
      features: ["2D/3D Animation", "Video Production", "Motion Branding", "Interactive Media"]
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Professional photography that captures your brand's essence.",
      features: ["Product Photography", "Brand Photography", "Event Coverage", "Retouching"]
    }
  ];

  const stats = [
    { number: "150+", label: "Projects Completed", icon: Briefcase },
    { number: "50+", label: "Happy Clients", icon: Users },
    { number: "25+", label: "Awards Won", icon: Award },
    { number: "5", label: "Years Experience", icon: Star }
  ];

  const filteredProjects = projectFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === projectFilter);

  const featuredProjects = projects.filter(project => project.featured);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-8"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-cyan-500/30 border-b-cyan-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Pixel Creative Studio</h2>
          <p className="text-gray-400 animate-pulse">Loading creative experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isMenuOpen ? 2 : 1})`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                PIXEL
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['Work', 'Services', 'About', 'Team', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:block px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Start Project
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-purple-500/20">
            <div className="px-6 py-8 space-y-6">
              {['Work', 'Services', 'About', 'Team', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-xl text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-semibold">
                Start Project
              </button>
            </div>
          </div>
        )}
      </nav>

      <div ref={containerRef} className="h-screen overflow-y-auto">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
            {/* Floating Elements */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  transform: `translateY(${scrollY * 0.5}px)`
                }}
              ></div>
            ))}
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                  CREATIVE
                </span>
                <br />
                <span className="text-white">STUDIO</span>
              </h1>
              <div className="h-1 w-48 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8 rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              We craft extraordinary digital experiences that push boundaries
              <br />
              and inspire audiences through innovative design and storytelling
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-2">
                  View Our Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="group px-8 py-4 border-2 border-purple-500 rounded-full text-purple-400 font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300">
                <span className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Reel
                </span>
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-400" />
          </div>
        </section>

        {/* Featured Work Section */}
        <section id="work" className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Featured Work
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 text-lg mt-8 max-w-2xl mx-auto">
                Discover our latest creative projects that showcase innovation, artistry, and strategic thinking
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.slice(0, 2).map((project) => (
                <div 
                  key={project.id}
                  className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex gap-4">
                        <button className="p-3 bg-purple-500/80 backdrop-blur-sm rounded-full text-white hover:bg-purple-500 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-cyan-500/80 backdrop-blur-sm rounded-full text-white hover:bg-cyan-500 transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-purple-400 font-medium">{project.category}</span>
                      <span className="text-sm text-gray-400">{project.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {project.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {project.views}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">{project.client}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Grid */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setProjectFilter(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        projectFilter === category
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <Grid className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="group relative bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-purple-400 font-medium">{project.category}</span>
                        <span className="text-xs text-gray-400">{project.year}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{project.client}</span>
                        <div className="flex gap-3">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {project.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {project.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Our Services
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
              <p className="text-gray-300 text-lg mt-8 max-w-2xl mx-auto">
                We offer comprehensive creative solutions to elevate your brand and engage your audience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={service.title}
                    className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-purple-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={stat.label}
                    className="text-center group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.number}
                    </h3>
                    <p className="text-gray-300">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 px-6 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Meet Our Team
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 text-lg mt-8 max-w-2xl mx-auto">
                Talented creatives and strategists working together to bring your vision to life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-purple-400 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.slice(0, 2).map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="p-2 bg-gray-700/50 rounded-full hover:bg-purple-500/20 transition-colors">
                          <Twitter className="w-4 h-4 text-gray-400 hover:text-purple-400" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className="p-2 bg-gray-700/50 rounded-full hover:bg-purple-500/20 transition-colors">
                          <Linkedin className="w-4 h-4 text-gray-400 hover:text-purple-400" />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a href={member.social.instagram} className="p-2 bg-gray-700/50 rounded-full hover:bg-purple-500/20 transition-colors">
                          <Instagram className="w-4 h-4 text-gray-400 hover:text-purple-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Let's Create Together
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
              <p className="text-gray-300 text-lg mt-8">
                Ready to bring your vision to life? Let's discuss your next creative project
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
                  <Mail className="w-6 h-6 text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <a 
                      href="mailto:hello@pixelcreative.studio"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      hello@pixelcreative.studio
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
                  <Phone className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <a 
                      href="tel:+1234567890"
                      className="text-gray-300 hover:text-cyan-400 transition-colors"
                    >
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
                  <MapPin className="w-6 h-6 text-pink-400" />
                  <div>
                    <h4 className="font-semibold text-lg">Studio</h4>
                    <p className="text-gray-300">
                      123 Creative District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <a href="#" className="p-4 bg-gray-800/30 rounded-full border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                    <Instagram className="w-6 h-6 text-purple-400" />
                  </a>
                  <a href="#" className="p-4 bg-gray-800/30 rounded-full border border-gray-700 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300">
                    <Twitter className="w-6 h-6 text-cyan-400" />
                  </a>
                  <a href="#" className="p-4 bg-gray-800/30 rounded-full border border-gray-700 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300">
                    <Linkedin className="w-6 h-6 text-pink-400" />
                  </a>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    className="px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Project Type"
                  className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
                <textarea 
                  rows={6}
                  placeholder="Tell us about your project..."
                  className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                ></textarea>
                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Project
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                  PIXEL CREATIVE STUDIO
                </div>
                <p className="text-gray-400">
                  © 2024 Pixel Creative Studio. Crafted with passion and pixels.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Careers</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="max-w-4xl w-full max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-purple-400 font-medium">{selectedProject.category}</span>
                <span className="text-gray-400">{selectedProject.year}</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">{selectedProject.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Project Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Client:</span>
                      <span className="text-white">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Year:</span>
                      <span className="text-white">{selectedProject.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{selectedProject.category}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">Engagement</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Likes:</span>
                      <span className="text-white">{selectedProject.likes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Views:</span>
                      <span className="text-white">{selectedProject.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Comments:</span>
                      <span className="text-white">{selectedProject.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  View Live Project
                </button>
                <button className="px-6 py-3 border border-gray-700 rounded-lg text-gray-300 hover:border-purple-500 hover:text-purple-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};