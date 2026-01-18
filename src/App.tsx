import React, { useState, useEffect } from 'react';
import { ChevronDown, Eye, ExternalLink, Mail, Github, Linkedin, Code, Palette, Sparkles, Zap, Star, ArrowRight } from 'lucide-react';
import { ProjectPages } from './components/ProjectPages';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectPage, setShowProjectPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Luxe Fashion Boutique",
      category: "E-Commerce",
      description: "Premium fashion e-commerce platform featuring AI-powered styling recommendations, virtual try-on technology, and seamless checkout experience. Built with React and Node.js, integrated with Stripe payments and inventory management.",
      image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Node.js", "Stripe", "AI"],
      features: [
        "AI-powered product recommendations",
        "Virtual try-on using AR technology",
        "Advanced filtering and search",
        "Real-time inventory tracking",
        "Multi-currency support",
        "Social media integration"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "TensorFlow.js", "WebRTC"],
      client: "Luxe Fashion Group",
      duration: "4 months",
      year: "2024",
      link: "#",
      size: "large"
    },
    {
      id: 2,
      title: "Zenith Corporate Identity",
      category: "Brand Design",
      description: "Complete brand identity system for a tech startup including logo design, color palette, typography, business cards, letterheads, and comprehensive brand guidelines. Created cohesive visual language across all touchpoints.",
      image: "https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Branding", "Logo Design", "Print", "Guidelines"],
      features: [
        "Logo design and variations",
        "Color palette and typography system",
        "Business card and stationery design",
        "Brand guidelines document",
        "Social media templates",
        "Presentation templates"
      ],
      technologies: ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop", "Figma"],
      client: "Zenith Technologies",
      duration: "6 weeks",
      year: "2024",
      link: "#",
      size: "medium"
    },
    {
      id: 3,
      title: "SecureBank Mobile App",
      category: "Mobile Design",
      description: "Intuitive mobile banking application with biometric authentication, real-time transaction monitoring, and advanced security features. Designed with focus on accessibility and user experience for all age groups.",
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Mobile", "Fintech", "UX", "Security"],
      features: [
        "Biometric authentication (Face ID, Touch ID)",
        "Real-time transaction notifications",
        "Budget tracking and analytics",
        "Bill payment and transfers",
        "Investment portfolio management",
        "24/7 customer support chat"
      ],
      technologies: ["React Native", "Node.js", "PostgreSQL", "AWS", "Plaid API"],
      client: "SecureBank Financial",
      duration: "8 months",
      year: "2024",
      link: "#",
      size: "medium"
    },
    {
      id: 4,
      title: "Pixel Creative Studio",
      category: "Agency Website",
      description: "Bold and dynamic website for a creative agency featuring stunning animations, interactive portfolio showcase, and immersive storytelling. Built with modern web technologies and optimized for performance.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Creative", "Animation", "Portfolio", "WebGL"],
      features: [
        "Interactive 3D animations",
        "Parallax scrolling effects",
        "Dynamic portfolio filtering",
        "Team member profiles",
        "Client testimonials carousel",
        "Contact form with validation"
      ],
      technologies: ["React", "Three.js", "GSAP", "Framer Motion", "Sanity CMS"],
      client: "Pixel Creative Studio",
      duration: "3 months",
      year: "2024",
      link: "#",
      size: "large"
    },
    {
      id: 5,
      title: "Neon Dreams Collection",
      category: "Digital Art",
      description: "Series of 50 unique digital artworks exploring cyberpunk and futuristic themes. Created for NFT marketplace with interactive elements and animated variations. Each piece tells a story of digital transformation.",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Digital Art", "NFT", "Cyberpunk", "Animation"],
      features: [
        "50 unique digital artworks",
        "Animated variations for each piece",
        "Interactive hover effects",
        "Blockchain integration",
        "Rarity system implementation",
        "Community voting features"
      ],
      technologies: ["Blender", "After Effects", "Photoshop", "Solidity", "IPFS"],
      client: "CryptoArt Collective",
      duration: "5 months",
      year: "2024",
      link: "#",
      size: "small"
    },
    {
      id: 6,
      title: "FitTrack Pro Dashboard",
      category: "Health Tech",
      description: "Comprehensive fitness tracking dashboard with advanced data visualization, personalized workout plans, and social features. Integrates with popular fitness devices and provides AI-powered insights.",
      image: "https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Dashboard", "Health", "Analytics", "AI"],
      features: [
        "Real-time health metrics tracking",
        "Personalized workout recommendations",
        "Social challenges and leaderboards",
        "Nutrition tracking and meal planning",
        "Sleep pattern analysis",
        "Integration with wearable devices"
      ],
      technologies: ["Vue.js", "D3.js", "Python", "TensorFlow", "Firebase"],
      client: "FitTech Solutions",
      duration: "6 months",
      year: "2024",
      link: "#",
      size: "small"
    },
    {
      id: 7,
      title: "Saveur Elite Catering",
      category: "Luxury Services",
      description: "Elegant catering website featuring sophisticated menu presentations, chef profiles, and seamless booking system. Designed to reflect the premium nature of the service with beautiful food photography and smooth interactions.",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Luxury", "Catering", "Booking", "Photography"],
      features: [
        "Interactive menu builder",
        "Chef profile showcases",
        "Event booking calendar",
        "Photo gallery with lightbox",
        "Customer testimonials",
        "Real-time availability checking"
      ],
      technologies: ["Next.js", "Sanity CMS", "Stripe", "Calendly API", "Cloudinary"],
      client: "Saveur Elite Catering",
      duration: "10 weeks",
      year: "2024",
      link: "#",
      size: "medium"
    },
    {
      id: 8,
      title: "Grandeur Events Management",
      category: "Event Planning",
      description: "Professional events management platform with comprehensive vendor coordination, client portal, and project timeline management. Features real-time collaboration tools and automated workflow systems.",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Events", "Management", "CRM", "Workflow"],
      features: [
        "Vendor management system",
        "Client portal with real-time updates",
        "Project timeline visualization",
        "Budget tracking and reporting",
        "Document sharing and approval",
        "Automated email notifications"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "AWS S3"],
      client: "Grandeur Events",
      duration: "7 months",
      year: "2024",
      link: "#",
      size: "large"
    },
    {
      id: 9,
      title: "Prestige Properties Portal",
      category: "Real Estate",
      description: "Luxury real estate platform with advanced property search, virtual tours, and agent management system. Features interactive maps, mortgage calculators, and comprehensive property analytics.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Real Estate", "Virtual Tours", "Maps", "Analytics"],
      features: [
        "Advanced property search filters",
        "360° virtual property tours",
        "Interactive neighborhood maps",
        "Mortgage calculator integration",
        "Agent profile and rating system",
        "Property comparison tools"
      ],
      technologies: ["React", "Mapbox", "Three.js", "Node.js", "MLS API"],
      client: "Prestige Properties Group",
      duration: "9 months",
      year: "2024",
      link: "#",
      size: "small"
    },
    {
      id: 10,
      title: "Prime Mortgage Solutions",
      category: "Financial Services",
      description: "Comprehensive mortgage platform with intelligent loan matching, application processing, and rate comparison tools. Features automated underwriting and real-time status tracking for applicants.",
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Mortgage", "Finance", "Automation", "Analytics"],
      features: [
        "Intelligent loan matching algorithm",
        "Automated application processing",
        "Real-time rate comparisons",
        "Document upload and verification",
        "Application status tracking",
        "Credit score monitoring"
      ],
      technologies: ["Angular", "Spring Boot", "MySQL", "Apache Kafka", "AWS"],
      client: "Prime Mortgage Corp",
      duration: "12 months",
      year: "2024",
      link: "#",
      size: "medium"
    },
    {
      id: 11,
      title: "Guardian Life Insurance",
      category: "Insurance Platform",
      description: "Professional life insurance platform with policy comparison engine, quote generation system, and educational resources. Features personalized recommendations and streamlined application process.",
      image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Insurance", "Quotes", "Education", "Comparison"],
      features: [
        "Policy comparison engine",
        "Instant quote generation",
        "Educational resource library",
        "Risk assessment calculator",
        "Beneficiary management",
        "Claims tracking system"
      ],
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Stripe"],
      client: "Guardian Life Insurance",
      duration: "8 months",
      year: "2024",
      link: "#",
      size: "small"
    },
    {
      id: 12,
      title: "Event Center",
      category: "Venue Management",
      description: "Luxury event venue website with immersive virtual tours, comprehensive booking system, and event planning tools. Features 3D venue visualization and integrated vendor coordination.",
      image: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Venue", "Virtual Tours", "3D", "Booking"],
      features: [
        "3D venue visualization",
        "Virtual reality tour experience",
        "Capacity planning tools",
        "Integrated catering menus",
        "Vendor coordination system",
        "Event timeline management"
      ],
      technologies: ["React", "Three.js", "WebXR", "Node.js", "MongoDB"],
      client: "Event Center",
      duration: "6 months",
      year: "2024",
      link: "#",
      size: "medium"
    }
  ];

  const skills = [
    { name: "Web Design", level: 95, icon: Code },
    { name: "Graphic Design", level: 90, icon: Palette },
    { name: "UI/UX Design", level: 88, icon: Sparkles },
    { name: "Brand Strategy", level: 85, icon: Star }
  ];

  const handleProjectView = (project) => {
    setSelectedProject(project);
    setShowProjectPage(true);
  };

  const handleCloseProjectPage = () => {
    setShowProjectPage(false);
    setSelectedProject(null);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:eldon@petersonproservices.com?subject=Project Inquiry&body=Hi Eldon,%0D%0A%0D%0AI would like to discuss a project with you.%0D%0A%0D%0AThank you!';
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = `Project Inquiry from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    window.location.href = `mailto:eldon@petersonproservices.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  if (showProjectPage && selectedProject) {
    return <ProjectPages project={selectedProject} onClose={handleCloseProjectPage} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-900 text-sm font-light tracking-wider animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium text-gray-900">
              Eldon Peterson
            </div>
            <div className="hidden md:flex space-x-12">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-all duration-300 hover:text-gray-600 ${
                    activeSection === item.toLowerCase()
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-7xl md:text-9xl font-light mb-8 leading-none tracking-tight">
              <span className="text-gray-900">Eldon</span>
              <br />
              <span className="text-gray-900">Peterson</span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 mb-16 leading-relaxed font-light max-w-2xl mx-auto">
            Software Engineer and Graphic, Web, and App Designer dedicated to bringing visions to life through clean, modern, and impactful digital experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="group text-sm font-medium text-gray-900 hover:text-gray-600 transition-all duration-300 flex items-center gap-2"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleEmailClick}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-light mb-8 text-gray-900">
                About
              </h2>
            </div>

            <div className="lg:col-span-8">
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Photo - Optimized size and placement */}
                <div className="lg:col-span-5">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-8 lg:mb-0">
                    <img 
                      src="/5FB296E5-FBE0-4CC5-9EE4-13DDC1B0675F_1_105_c.jpeg" 
                      alt="Eldon Peterson"
                      className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                    />
                  </div>
                </div>

                {/* Content - Adjusted to work with new photo size */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed font-light">
                      I'm Eldon Peterson, a software engineer and graphic, web, and app designer dedicated to bringing visions to life through clean, modern, and impactful digital experiences. With a keen eye for design and a passion for functionality, I create websites and graphics that not only look stunning but also drive results for brands and businesses.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed font-light">
                      From custom websites to cohesive branding, I combine creativity with strategy to ensure every project communicates its message clearly and powerfully. Whether you're looking to establish your online presence or elevate your existing brand, I'm here to design solutions that work seamlessly and leave a lasting impression.
                    </p>
                    <p className="text-lg text-gray-900 font-medium leading-relaxed">
                      Let's build something extraordinary together.
                    </p>
                  </div>
                  
                  <div className="pt-8">
                    <div className="grid grid-cols-2 gap-8">
                      {skills.map((skill) => (
                        <div key={skill.name} className="text-center">
                          <div className="text-2xl font-light text-gray-900 mb-2">{skill.level}%</div>
                          <div className="text-sm text-gray-600 font-medium">{skill.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Creative Masonry Layout */}
      <section id="projects" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-light mb-8 text-gray-900">
                Selected Work
              </h2>
              <p className="text-gray-600 font-light leading-relaxed">
                A showcase of my latest work spanning web design, brand identity, and digital experiences
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                  {projects.length} Projects
                </p>
              </div>
            </div>
          </div>

          {/* Creative Masonry Grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            {projects.map((project, index) => {
              // Define dynamic grid spans and row spans for creative layout
              const getGridClass = () => {
                switch (project.size) {
                  case 'large':
                    return 'col-span-12 md:col-span-8 row-span-3';
                  case 'medium':
                    return 'col-span-12 md:col-span-6 row-span-2';
                  case 'small':
                    return 'col-span-12 md:col-span-4 row-span-2';
                  default:
                    return 'col-span-12 md:col-span-6 row-span-2';
                }
              };

              return (
                <div 
                  key={project.id}
                  className={`group cursor-pointer relative overflow-hidden bg-gray-100 ${getGridClass()}`}
                  onClick={() => handleProjectView(project)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    {/* Top: Project Number */}
                    <div className="flex justify-between items-start">
                      <div className="text-xs font-medium uppercase tracking-wider opacity-70">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="text-xs font-medium uppercase tracking-wider opacity-70">
                        {project.year}
                      </div>
                    </div>

                    {/* Bottom: Project Info */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="mb-2">
                        <div className="text-xs font-medium uppercase tracking-wider opacity-70 mb-1">
                          {project.category}
                        </div>
                        <h3 className="text-lg md:text-xl font-medium leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Description - only show on hover for larger cards */}
                      {project.size === 'large' && (
                        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed max-w-md">
                          {project.description.substring(0, 120)}...
                        </p>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Interactive Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                </div>
              );
            })}
          </div>

          {/* Featured Project Spotlight */}
          <div className="mt-32 pt-16 border-t border-gray-100">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-4">
                  Featured Project
                </div>
                <h3 className="text-3xl font-light mb-6 text-gray-900">
                  Luxe Fashion Boutique
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-8">
                  A premium e-commerce platform that revolutionizes online fashion retail through AI-powered recommendations and virtual try-on technology. This project showcases the perfect blend of cutting-edge technology and elegant design.
                </p>
                <button 
                  onClick={() => handleProjectView(projects[0])}
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors flex items-center gap-2"
                >
                  Explore Case Study
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src={projects[0].image} 
                  alt={projects[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-light mb-8 text-gray-900">
                Let's Connect
              </h2>
              <p className="text-gray-600 font-light leading-relaxed mb-8">
                Ready to bring your vision to life? Let's discuss your next project
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">Email</h4>
                  <a 
                    href="mailto:eldon@petersonproservices.com"
                    className="text-gray-600 hover:text-gray-900 transition-colors font-light"
                  >
                    eldon@petersonproservices.com
                  </a>
                </div>
                
                <div className="flex gap-6 pt-4">
                  <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <form className="space-y-8" onSubmit={handleContactFormSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                      Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                      Email
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none transition-colors font-light"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea 
                    rows={6}
                    name="message"
                    required
                    className="w-full py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none transition-colors resize-none font-light"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-all duration-300 flex items-center gap-2"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500 font-light">
            © 2025 Peterson Pro Services, LLC
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && !showProjectPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-white/95 backdrop-blur-sm">
          <div className="max-w-4xl w-full max-h-[90vh] bg-white overflow-y-auto">
            <div className="relative mb-8">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="px-8 pb-8">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  <div className="mb-6">
                    <h3 className="text-3xl font-light mb-2 text-gray-900">{selectedProject.title}</h3>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-6">{selectedProject.category}</p>
                    <p className="text-gray-600 font-light leading-relaxed">{selectedProject.description}</p>
                  </div>
                  
                  {selectedProject.features && (
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">Key Features</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {selectedProject.features.map((feature, index) => (
                          <div key={index} className="text-sm text-gray-600 font-light">
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="lg:col-span-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">Client</h4>
                      <p className="text-gray-600 font-light">{selectedProject.client}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">Duration</h4>
                      <p className="text-gray-600 font-light">{selectedProject.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">Year</h4>
                      <p className="text-gray-600 font-light">{selectedProject.year}</p>
                    </div>
                    {selectedProject.technologies && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">Technologies</h4>
                        <div className="space-y-1">
                          {selectedProject.technologies.map((tech) => (
                            <div key={tech} className="text-sm text-gray-600 font-light">
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleProjectView(selectedProject)}
                    className="mt-8 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors flex items-center gap-2"
                  >
                    View Full Case Study
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;