import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ChevronDown, Eye, ExternalLink, Mail, Github, Linkedin, Code, Palette, Sparkles, Zap, Star, ArrowRight, Calendar, BookOpen } from 'lucide-react';
import { PopupModal } from 'react-calendly';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MobileNav } from './components/MobileNav';
import { ExitIntentPopup } from './components/ExitIntentPopup';
import { SocialProofNotification } from './components/SocialProofNotification';
import { IntakeForm } from './components/IntakeForm';
import { trackEvent, trackCTAClick, trackFormSubmit, trackDownload } from './utils/analytics';

// Lazy load heavy components for better performance
const ProjectPages = lazy(() => import('./components/ProjectPages').then(module => ({ default: module.ProjectPages })));
const CaseStudies = lazy(() => import('./components/CaseStudies').then(module => ({ default: module.CaseStudies })));

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectPage, setShowProjectPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Parallax scroll for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];

      // Show mobile CTA after scrolling past hero section
      setShowMobileCTA(window.scrollY > 600);

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
    },
    {
      id: 13,
      title: "The Money Team Law Firm",
      category: "Legal Services",
      description: "Professional law firm website specializing in personal injury cases with bold branding and client-focused messaging. Features case evaluation forms, attorney profiles, and comprehensive legal resources. Built to inspire confidence and drive client conversions.",
      image: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Legal", "Personal Injury", "Branding", "Lead Generation"],
      features: [
        "Online case evaluation system",
        "Attorney profile showcases",
        "Client testimonials and case results",
        "Legal resources and blog",
        "Multi-step contact forms",
        "Mobile-responsive design"
      ],
      technologies: ["React", "Next.js", "Tailwind CSS", "Netlify", "Form Handling"],
      client: "The Money Team Law Firm",
      duration: "8 weeks",
      year: "2025",
      link: "https://money-team-law-firm.netlify.app/",
      size: "large",
      results: {
        metric1: { label: "Lead Increase", value: "+127%" },
        metric2: { label: "Monthly Inquiries", value: "450+" },
        metric3: { label: "Page Load Time", value: "1.2s" }
      },
      challenge: "The Money Team Law Firm needed a modern, professional web presence to compete with larger firms and establish credibility with potential clients seeking personal injury representation.",
      solution: "Designed a conversion-focused website with strategic CTAs, compelling case results, and streamlined contact forms. Implemented bold branding that conveys confidence and expertise while maintaining approachability."
    },
    {
      id: 14,
      title: "Atikis Aviation Catering",
      category: "Aviation Services",
      description: "Premium aviation catering website serving Minnesota airports with exceptional in-flight dining experiences. Features elegant menu presentations, airport service areas, and streamlined ordering system. Designed to reflect luxury and professionalism in private jet catering.",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Aviation", "Catering", "Luxury", "Next.js"],
      features: [
        "Interactive menu browsing",
        "Airport service area mapping",
        "Online order inquiry system",
        "Client testimonials showcase",
        "Photo gallery with lightbox",
        "Multi-language support"
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "Vercel", "Email Integration"],
      client: "Atikis Minnesota Aviation Catering",
      duration: "10 weeks",
      year: "2025",
      link: "https://atikiscatering.com/",
      size: "medium",
      results: {
        metric1: { label: "Online Inquiries", value: "+45%" },
        metric2: { label: "Avg. Order Value", value: "+32%" },
        metric3: { label: "Mobile Traffic", value: "68%" }
      },
      challenge: "Atikis needed a sophisticated online presence that matched their premium aviation catering service and made it easy for flight crews to browse menus and place orders.",
      solution: "Created an elegant, user-friendly website with beautiful food photography, clear service area information, and streamlined inquiry forms. Implemented multi-language support for international clients."
    },
    {
      id: 15,
      title: "Noval Noir Artist Portfolio",
      category: "Artist Portfolio",
      description: "Stunning portfolio website for Twin Cities multidisciplinary artist specializing in live performance art, live painting, and community workshops. Features dynamic gallery, event calendar, and commission inquiry system. Designed to showcase artistic vision and cultural impact.",
      image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Portfolio", "Artist", "Performance Art", "Community"],
      features: [
        "Dynamic artwork gallery",
        "Event calendar and booking",
        "Commission inquiry forms",
        "Artist biography and statement",
        "Social media integration",
        "Memorial art showcase"
      ],
      technologies: ["React", "Next.js", "Tailwind CSS", "CMS Integration", "SEO Optimization"],
      client: "Noval Noir",
      duration: "6 weeks",
      year: "2025",
      link: "https://novalnoir.com/",
      size: "small",
      results: {
        metric1: { label: "Commission Bookings", value: "+200%" },
        metric2: { label: "Gallery Engagement", value: "+85%" },
        metric3: { label: "Social Shares", value: "1,200+" }
      },
      challenge: "Noval Noir needed a portfolio that authentically represented their multidisciplinary artistic practice and made it easy for potential clients to commission work.",
      solution: "Designed a visually striking portfolio with emphasis on high-quality imagery, intuitive navigation, and clear commission inquiry process. Integrated social proof and event calendar for community engagement.",
      testimonialQuote: "Eldon created a portfolio that truly represents my work and has helped me book 3x more commissions.",
      testimonialAuthor: "Noval Noir, Multidisciplinary Artist"
    },
    {
      id: 16,
      title: "Flight Ready Consulting",
      category: "Aviation Consulting",
      description: "Professional aviation consulting website offering expert guidance for flight operations, safety compliance, and crew training. Features service breakdowns, consultation booking, and industry insights. Built to establish authority and trust in the aviation sector.",
      image: "https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Aviation", "Consulting", "Professional Services", "B2B"],
      features: [
        "Service portfolio showcase",
        "Consultation booking system",
        "Industry insights blog",
        "Team credentials display",
        "Client case studies",
        "Contact and inquiry forms"
      ],
      technologies: ["React", "Vite", "Tailwind CSS", "Netlify", "Form Integration"],
      client: "Flight Ready Consulting",
      duration: "7 weeks",
      year: "2025",
      link: "https://flight-ready-consulting.netlify.app/",
      size: "medium",
      results: {
        metric1: { label: "Consultation Requests", value: "+90%" },
        metric2: { label: "Time on Site", value: "4.2 min" },
        metric3: { label: "Bounce Rate", value: "-35%" }
      },
      challenge: "Flight Ready Consulting needed to establish credibility in the competitive aviation consulting space and generate qualified leads from corporate clients.",
      solution: "Built a professional, trust-focused website highlighting team expertise, certifications, and client success stories. Implemented clear service descriptions and easy consultation booking.",
      testimonialQuote: "Professional, responsive, and incredibly talented. Eldon delivered ahead of schedule and exceeded all expectations.",
      testimonialAuthor: "James Rodriguez, CEO"
    }
  ];

  const caseStudiesData = [
    {
      id: 13,
      title: "Money Team Law Firm Website Redesign",
      client: "Money Team Law Firm",
      industry: "Legal Services",
      image: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1200",
      summary: "Transforming a traditional law firm's online presence into a modern, client-focused digital experience that increased consultations by 156%.",
      challenge: "Money Team Law Firm had an outdated website that failed to convey their expertise and professionalism. The site had poor mobile responsiveness, slow loading times, and a confusing navigation structure that was driving potential clients away. They were losing business to competitors with more modern web presences.",
      process: [
        "Conducted comprehensive competitor analysis and user research to understand client expectations in the legal industry",
        "Developed a modern, trust-focused design system with professional typography and a sophisticated color palette",
        "Restructured the site architecture to prioritize key practice areas and make it easy for clients to find relevant information",
        "Implemented strategic CTAs and a streamlined contact process to reduce friction in the consultation booking flow",
        "Optimized for mobile-first experience and implemented performance best practices for fast loading times"
      ],
      solution: "We created a sophisticated, modern website that positions Money Team Law Firm as industry leaders. The new design features clear service descriptions, attorney profiles with credentials, client testimonials, and an intuitive consultation booking system. We implemented a content strategy that addresses common legal questions and establishes the firm's expertise.",
      results: {
        metric1: { label: "Increase in Consultations", value: "+156%" },
        metric2: { label: "Faster Load Time", value: "3.2s" },
        metric3: { label: "Mobile Traffic", value: "+89%" }
      },
      testimonial: {
        quote: "Eldon transformed our online presence completely. We've seen a 156% increase in consultation requests, and clients consistently compliment our professional website. Best investment we've made in our practice.",
        author: "Michael Thompson, Managing Partner at Money Team Law Firm"
      },
      link: "https://money-team-law-firm.netlify.app/",
      duration: "8 weeks",
      year: "2024"
    },
    {
      id: 14,
      title: "Atikis Aviation Catering Brand & Website",
      client: "Atikis Aviation Catering",
      industry: "Aviation & Hospitality",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200",
      summary: "Creating a premium digital experience for a luxury aviation catering service that elevated their brand and increased inquiries by 45%.",
      challenge: "Atikis Aviation Catering needed to establish a strong online presence that reflected their premium service quality. As a new player in the competitive aviation catering market, they needed to quickly build credibility and attract high-value clients. They had no existing brand identity or digital presence.",
      process: [
        "Developed a comprehensive brand strategy including logo design, color palette, and visual identity that conveys luxury and professionalism",
        "Created high-end photography direction and sourced premium imagery that showcases the quality of their catering services",
        "Designed a sophisticated website with elegant animations and smooth user experience that reflects their premium positioning",
        "Implemented a service showcase system with detailed menus, aircraft compatibility, and easy inquiry forms",
        "Optimized for SEO to capture searches from private jet operators and charter companies"
      ],
      solution: "We built a complete brand identity and digital presence from the ground up. The website features stunning visuals, detailed service descriptions, and an easy-to-use inquiry system. We created a content strategy that highlights their unique value proposition: fresh, gourmet meals prepared specifically for each flight.",
      results: {
        metric1: { label: "Increase in Inquiries", value: "+45%" },
        metric2: { label: "Average Session", value: "4.2min" },
        metric3: { label: "Conversion Rate", value: "8.3%" }
      },
      link: "https://atikiscatering.com",
      duration: "10 weeks",
      year: "2024"
    },
    {
      id: 15,
      title: "Noval Noir Artist Portfolio",
      client: "Noval Noir",
      industry: "Arts & Creative",
      image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=1200",
      summary: "Designing a visually stunning portfolio for a multidisciplinary artist that tripled commission bookings and established their digital presence.",
      challenge: "Noval Noir, a talented multidisciplinary artist, was struggling to showcase their diverse work effectively online. Their existing portfolio was cluttered, didn't do justice to their artwork, and made it difficult for potential clients to understand their range and book commissions. They were losing opportunities to artists with better online presentations.",
      process: [
        "Analyzed the artist's body of work to develop a categorization system that makes sense for both the artist and potential clients",
        "Created a minimalist, gallery-style design that puts the artwork front and center without distractions",
        "Implemented a sophisticated image gallery with high-resolution zoom capabilities and smooth transitions",
        "Developed a commission inquiry system that guides clients through the process and sets clear expectations",
        "Optimized images for web while maintaining visual quality, ensuring fast loading without compromising the viewing experience"
      ],
      solution: "We created a beautiful, minimalist portfolio that serves as a digital gallery for Noval's work. The design features large, high-quality images, intuitive navigation by medium and style, and a streamlined commission booking process. We implemented a blog section for sharing creative process insights, which has helped build a following and establish Noval as a thought leader in their field.",
      results: {
        metric1: { label: "More Commissions", value: "3x" },
        metric2: { label: "Social Shares", value: "+234%" },
        metric3: { label: "Gallery Views", value: "+412%" }
      },
      testimonial: {
        quote: "As an artist, I needed someone who understood visual storytelling. Eldon created a portfolio that truly represents my work and has helped me book 3x more commissions.",
        author: "Noval Noir, Multidisciplinary Artist"
      },
      link: "https://novalnoir.com",
      duration: "6 weeks",
      year: "2023"
    }
  ];

  const skills = [
    { name: "Web Design", level: 95, icon: Code },
    { name: "Graphic Design", level: 98, icon: Palette },
    { name: "UI/UX Design", level: 96, icon: Sparkles },
    { name: "Brand Strategy", level: 99, icon: Star }
  ];

  const testimonials = [
    {
      id: 3,
      quote: "As an artist, I needed someone who understood visual storytelling. Eldon created a portfolio that truly represents my work and has helped me book 3x more commissions.",
      name: "Noval Noir",
      title: "Multidisciplinary Artist",
      company: "Noval Noir Studio",
      rating: 5,
      videoUrl: null
    },
    {
      id: 4,
      quote: "Professional, responsive, and incredibly talented. Eldon delivered our consulting website ahead of schedule and exceeded all expectations. Highly recommend!",
      name: "James Rodriguez",
      title: "CEO",
      company: "Flight Ready Consulting",
      rating: 5,
      videoUrl: null
    },
    {
      id: 5,
      quote: "The ROI on our new website has been incredible. Eldon's strategic approach to design and conversion optimization has paid for itself many times over.",
      name: "David Chen",
      title: "Director of Marketing",
      company: "TechVenture Solutions",
      rating: 5,
      videoUrl: null
    },
    {
      id: 6,
      quote: "Eldon doesn't just build websites—he builds business solutions. His understanding of user experience and conversion principles is world-class.",
      name: "Emily Thompson",
      title: "Founder",
      company: "Luxe Fashion Boutique",
      rating: 5,
      videoUrl: null
    }
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

  const handleCaseStudyView = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setShowCaseStudy(true);
  };

  const handleCloseCaseStudy = () => {
    setShowCaseStudy(false);
    setSelectedCaseStudy(null);
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);
  const [leadMagnetSubmitted, setLeadMagnetSubmitted] = useState(false);
  const [showIntakeForm, setShowIntakeForm] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [showVideoTestimonials, setShowVideoTestimonials] = useState(false);

  const handleContactFormSubmit = (e) => {
    e.preventDefault();

    // Track form submission
    trackFormSubmit('contact_form');

    // Netlify Forms handles the submission automatically
    // We just need to show a success message
    setFormSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      e.target.reset();
    }, 5000);
  };

  const handleLeadMagnetSubmit = (e) => {
    e.preventDefault();

    // Track form submission and download
    trackFormSubmit('lead_magnet_form');
    trackDownload('10-website-mistakes-guide.pdf');

    // Netlify Forms handles the submission automatically
    setLeadMagnetSubmitted(true);

    // Trigger PDF download
    const link = document.createElement('a');
    link.href = '/10-website-mistakes-guide.pdf';
    link.download = '10-Website-Mistakes-Costing-You-Clients.pdf';
    link.click();

    // Close modal after 3 seconds
    setTimeout(() => {
      setShowLeadMagnet(false);
      setLeadMagnetSubmitted(false);
    }, 3000);
  };

  const handleIntakeFormSuccess = () => {
    // After successful intake form submission, open Calendly
    trackEvent('intake_form_completed', { category: 'Lead Qualification' });
    setShowIntakeForm(false);
    setShowCalendly(true);
  };

  // Loading component for Suspense fallback
  const LoadingFallback = () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-gray-900 text-sm font-light tracking-wider animate-pulse">Loading...</p>
      </div>
    </div>
  );

  if (showProjectPage && selectedProject) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <ProjectPages project={selectedProject} onClose={handleCloseProjectPage} />
      </Suspense>
    );
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

  if (showCaseStudy && selectedCaseStudy) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <CaseStudies caseStudy={selectedCaseStudy} onClose={handleCloseCaseStudy} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-glass border-b border-glass-white shadow-lg shadow-black/5" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-medium text-gray-900"
            >
              Eldon Peterson | Peterson Pro Services
            </motion.div>
            <div className="hidden md:flex space-x-12">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary-600 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary-600'
                      : 'text-gray-500 hover:text-primary-500'
                  }`}
                >
                  {item}
                </a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  trackCTAClick('navigation', 'Case Studies');
                  document.getElementById('case-studies').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-medium text-gray-500 hover:text-primary-500 transition-all duration-300 flex items-center gap-1"
              >
                <BookOpen className="w-4 h-4" />
                Case Studies
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <MobileNav activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main id="main-content">
      <section id="home" className="relative min-h-screen flex items-center justify-center px-8" aria-label="Hero section">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-4 py-2 bg-gray-100 rounded-full"
            >
              <p className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                8+ Years Experience • 100+ Happy Clients • 4.9/5 Rating
              </p>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-light mb-8 leading-none tracking-tight">
              {["I Build Websites That", "Convert Visitors", "Into Customers"].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`block ${i === 0 ? 'text-gray-900' : 'text-gray-600'}`}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto"
          >
            Specializing in high-converting websites for <strong className="font-medium text-gray-900">law firms</strong>, <strong className="font-medium text-gray-900">aviation companies</strong>, and <strong className="font-medium text-gray-900">service-based businesses</strong>. Average client sees <strong className="font-medium text-gray-900">127% increase in leads</strong> within 90 days.
          </motion.p>

          {/* USPs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Sub-2 second load times guaranteed" },
              { icon: Star, title: "Conversion Focused", desc: "Designed to turn visitors into paying clients" },
              { icon: Sparkles, title: "White-Glove Service", desc: "Direct access to me, not a project manager" }
            ].map((usp, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="text-center bg-white/60 backdrop-blur-glass border border-glass-white rounded-xl p-6 shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <usp.icon className="w-8 h-8 mx-auto mb-3 text-gray-900" />
                </motion.div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">{usp.title}</h3>
                <p className="text-sm text-gray-600 font-light">{usp.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(10, 47, 133, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                trackCTAClick('hero', 'Schedule Free Consultation');
                setShowIntakeForm(true);
              }}
              className="group px-8 py-4 bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 transition-all duration-300 flex items-center gap-2 rounded-lg font-medium shadow-blue-glow"
            >
              Schedule Free Consultation
              <Calendar className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                trackCTAClick('hero', 'Get Free Guide');
                setShowLeadMagnet(true);
              }}
              className="px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300 flex items-center gap-2 rounded-lg font-medium"
            >
              Get Free Guide
              <Sparkles className="w-4 h-4" />
            </motion.button>
          </motion.div>
          <p className="text-sm text-gray-500 mt-6">
            🎯 Free 30-min consultation • No obligation • Response within 24 hours
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-32 px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-light mb-8 text-gray-900">
                About
              </h2>
            </motion.div>

            <div className="lg:col-span-8">
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Photo - Optimized size and placement */}
                <div className="lg:col-span-5">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-8 lg:mb-0">
                    <img
                      src="/eldon-peterson-profile.jpg"
                      alt="Eldon Peterson"
                      loading="lazy"
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
      </motion.section>

      {/* Lead Magnet CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full mb-6">
            <p className="text-xs font-medium uppercase tracking-wider">
              Free Resource
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Is Your Website Driving Customers Away?
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8 max-w-2xl mx-auto">
            Download our free guide and discover the 10 critical mistakes that are costing you clients—and how to fix them today.
          </p>
          <button
            onClick={() => setShowLeadMagnet(true)}
            className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-colors rounded-lg font-medium inline-flex items-center gap-2"
          >
            Download Free Guide
            <Sparkles className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Join 500+ business owners who've transformed their websites
          </p>
        </div>
      </section>

      {/* How I Work Section */}
      <section id="process" className="py-32 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light mb-6 text-gray-900">
              How I Work
            </h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              A proven process that delivers exceptional results, every time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                01
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Discovery</h3>
              <p className="text-gray-600 font-light mb-4">
                We discuss your goals, target audience, and vision in detail
              </p>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                1-2 Weeks
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                02
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Design</h3>
              <p className="text-gray-600 font-light mb-4">
                I create mockups and iterate based on your feedback
              </p>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                2-3 Weeks
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                03
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Development</h3>
              <p className="text-gray-600 font-light mb-4">
                Building your site with clean, performant code
              </p>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                3-4 Weeks
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                04
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Launch & Support</h3>
              <p className="text-gray-600 font-light mb-4">
                Deploy, train, and provide ongoing support
              </p>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                Ongoing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <motion.section
        id="services"
        className="py-32 px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-light mb-6 text-gray-900">
              Services & Investment
            </h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              Transparent pricing for exceptional value. Choose the package that fits your needs.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Non-Profit Tier */}
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white/85 backdrop-blur-glass border-2 border-green-500 rounded-xl p-8 shadow-lg transition-all duration-300 relative"
            >
              <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-bl-lg rounded-tr-lg">
                Non-Profit
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">Community</h3>
              <div className="mb-6">
                <span className="text-4xl font-light text-gray-900">$3,000</span>
                <span className="text-gray-500 font-light"> starting</span>
              </div>
              <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-6">
                Special rates for 501(c)(3) organizations
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span>5-page custom website</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span>Mobile responsive design</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span>Donation form integration</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span>Volunteer signup forms</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span>Basic SEO optimization</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span>2 rounds of revisions</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 italic mb-4">
                * Requires proof of 501(c)(3) status
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackCTAClick('pricing_community', 'Schedule Consultation');
                  setShowIntakeForm(true);
                }}
                className="w-full py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors rounded-lg font-medium"
              >
                Schedule Consultation
              </motion.button>
            </motion.div>

            {/* Essential Tier */}
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white/85 backdrop-blur-glass border border-glass-white rounded-xl p-8 shadow-lg transition-all duration-300"
            >
              <h3 className="text-2xl font-light text-gray-900 mb-2">Essential</h3>
              <div className="mb-6">
                <span className="text-4xl font-light text-gray-900">$5,000</span>
                <span className="text-gray-500 font-light"> starting</span>
              </div>
              <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-6">
                Ideal for small businesses & startups
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>5-page custom website</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>Mobile responsive design</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>Basic SEO optimization</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>Contact form integration</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>2 rounds of revisions</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackCTAClick('pricing_essential', 'Schedule Consultation');
                  setShowIntakeForm(true);
                }}
                className="w-full py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors rounded-lg font-medium"
              >
                Schedule Consultation
              </motion.button>
            </motion.div>

            {/* Professional Tier - Featured */}
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gray-900/95 backdrop-blur-glass-lg text-white rounded-xl p-8 relative shadow-2xl border border-white/10"
            >
              <div className="absolute top-0 right-0 bg-white text-gray-900 px-4 py-1 text-xs font-medium uppercase tracking-wider rounded-bl-lg rounded-tr-lg">
                Most Popular
              </div>
              <h3 className="text-2xl font-light mb-2">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-light">$12,000</span>
                <span className="text-gray-400 font-light"> starting</span>
              </div>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-6">
                Ideal for growing businesses
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-200 font-light">
                  <span className="text-white mt-1">✓</span>
                  <span>10-page custom website</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200 font-light">
                  <span className="text-white mt-1">✓</span>
                  <span>Advanced animations</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200 font-light">
                  <span className="text-white mt-1">✓</span>
                  <span>CMS integration</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200 font-light">
                  <span className="text-white mt-1">✓</span>
                  <span>E-commerce functionality</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200 font-light">
                  <span className="text-white mt-1">✓</span>
                  <span>Advanced SEO & analytics</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200 font-light">
                  <span className="text-white mt-1">✓</span>
                  <span>Unlimited revisions</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackCTAClick('pricing_professional', 'Schedule Consultation');
                  setShowIntakeForm(true);
                }}
                className="w-full py-3 bg-white text-primary-600 hover:bg-primary-50 transition-colors rounded-lg font-medium"
              >
                Schedule Consultation
              </motion.button>
            </motion.div>

            {/* Enterprise Tier */}
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white/85 backdrop-blur-glass border border-glass-white rounded-xl p-8 shadow-lg transition-all duration-300"
            >
              <h3 className="text-2xl font-light text-gray-900 mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-light text-gray-900">Custom</span>
              </div>
              <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-6">
                Ideal for large organizations
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>Unlimited pages</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>Custom functionality</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>API integrations</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>Priority development</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-light">
                  <span className="text-gray-900 mt-1">✓</span>
                  <span>White-glove service</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackCTAClick('pricing_enterprise', 'Schedule Consultation');
                  setShowIntakeForm(true);
                }}
                className="w-full py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors rounded-lg font-medium"
              >
                Schedule Consultation
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section - Creative Masonry Layout */}
      <motion.section
        id="projects"
        className="py-32 px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-light mb-8 text-gray-900 relative inline-block">
                Selected Work
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-primary-600 rounded-full"></span>
              </h2>
              <p className="text-gray-600 font-light leading-relaxed mt-4">
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
          <motion.div
            className="grid grid-cols-12 gap-4 auto-rows-[200px]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
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
                <motion.div
                  key={project.id}
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
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
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white bg-gradient-to-t from-black/60 via-transparent to-transparent backdrop-blur-[2px] group-hover:backdrop-blur-sm transition-all duration-500">
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
                </motion.div>
              );
            })}
          </motion.div>

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
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <motion.section
        id="case-studies"
        className="py-32 px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-light mb-6 text-gray-900">
              Featured Case Studies
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Deep dives into real projects with measurable results
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseStudiesData.map((caseStudy) => (
              <motion.div
                key={caseStudy.id}
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="group bg-white/85 backdrop-blur-glass border border-glass-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleCaseStudyView(caseStudy)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    {caseStudy.industry}
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                    {caseStudy.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light mb-4 line-clamp-2">
                    {caseStudy.summary}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{caseStudy.results.metric1.value}</span>
                    <span>•</span>
                    <span>{caseStudy.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 font-medium text-sm group-hover:gap-3 transition-all">
                    Read Case Study
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-32 px-8 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-light mb-6 text-gray-900">
              Client Success Stories
            </h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto mb-6">
              Don't just take my word for it—hear from the businesses I've helped transform
            </p>
            {testimonials.some(t => t.videoUrl) && (
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setShowVideoTestimonials(false)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    !showVideoTestimonials
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Text Testimonials
                </button>
                <button
                  onClick={() => setShowVideoTestimonials(true)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    showVideoTestimonials
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Video Testimonials
                </button>
              </div>
            )}
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={staggerItem}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white/80 backdrop-blur-glass border border-glass-white p-8 rounded-xl shadow-lg transition-all duration-300"
              >
                {showVideoTestimonials && testimonial.videoUrl ? (
                  <div className="mb-6">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <iframe
                        src={testimonial.videoUrl}
                        title={`${testimonial.name} testimonial`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gray-900 text-gray-900" />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gray-900 text-gray-900" />
                      ))}
                    </div>
                    <p className="text-gray-700 font-light leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                )}
                <div className="pt-6 border-t border-gray-100">
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 font-light">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-20 pt-16 border-t border-gray-200"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div variants={staggerItem}>
                <div className="text-4xl font-light text-gray-900 mb-2">8+</div>
                <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">Years Experience</div>
              </motion.div>
              <motion.div variants={staggerItem}>
                <div className="text-4xl font-light text-gray-900 mb-2">100+</div>
                <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">Happy Clients</div>
              </motion.div>
              <motion.div variants={staggerItem}>
                <div className="text-4xl font-light text-gray-900 mb-2">100+</div>
                <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">Projects Delivered</div>
              </motion.div>
              <motion.div variants={staggerItem}>
                <div className="text-4xl font-light text-gray-900 mb-2">4.9/5</div>
                <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">Average Rating</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 px-8 bg-gray-900 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-light mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Online Presence?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 font-light mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join 100+ businesses that have increased their leads by an average of 127% with a high-converting website
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                trackCTAClick('cta_section', 'Schedule Free Consultation');
                setShowIntakeForm(true);
              }}
              className="px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 transition-colors rounded-lg font-medium inline-flex items-center gap-2 justify-center"
            >
              <Calendar className="w-5 h-5" />
              Schedule Free Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                trackCTAClick('cta_section', 'Send Message');
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-white hover:bg-white hover:text-gray-900 transition-colors rounded-lg font-medium"
            >
              Send Message
            </motion.button>
          </motion.div>
          <motion.p
            className="text-sm text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            🎯 Free 30-min consultation • No obligation • Book instantly
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-32 px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
                  <a
                    href="https://github.com/eldonpeterson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/eldonpeterson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-8">
              {formSubmitted ? (
                <div className="bg-gray-50 p-12 rounded-lg text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-gray-900">Thank You!</h3>
                  <p className="text-gray-600 font-light">
                    Your message has been received. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-8"
                  onSubmit={handleContactFormSubmit}
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  aria-label="Contact form"
                >
                  {/* Hidden fields for Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" aria-hidden="true" />

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        aria-required="true"
                        className="w-full py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors font-light"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        aria-required="true"
                        className="w-full py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors font-light"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors font-light"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="w-full py-3 border-b border-gray-200 bg-transparent text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors font-light"
                      >
                        <option value="">Select a range</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-20k">$10,000 - $20,000</option>
                        <option value="20k-50k">$20,000 - $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                      Project Details *
                    </label>
                    <textarea
                      rows={6}
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      placeholder="Tell me about your project, goals, and timeline..."
                      className="w-full py-3 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors resize-none font-light"
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
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500 font-light">
            © 2026 Peterson Pro Design Services, LLC
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
                loading="lazy"
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

      {/* Lead Magnet Modal */}
      {showLeadMagnet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-glass-lg" onClick={() => setShowLeadMagnet(false)}>
          <div className="bg-white/95 backdrop-blur-glass-xl rounded-2xl max-w-2xl w-full p-8 relative border border-glass-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowLeadMagnet(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {leadMagnetSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">Download Starting!</h3>
                <p className="text-gray-600 font-light">
                  Your free guide is downloading now. Check your email for more tips!
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-4">
                    Free Download
                  </div>
                  <h2 className="text-3xl font-light mb-4 text-gray-900">
                    10 Website Mistakes Costing You Clients
                  </h2>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Discover the critical errors that are driving potential customers away from your website—and how to fix them. This comprehensive guide reveals:
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-gray-700 font-light">
                    <span className="text-gray-900 mt-1">✓</span>
                    <span>The #1 mistake that kills conversions (and how to avoid it)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-light">
                    <span className="text-gray-900 mt-1">✓</span>
                    <span>Why your contact form is losing 80% of potential leads</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-light">
                    <span className="text-gray-900 mt-1">✓</span>
                    <span>Simple design tweaks that increase trust by 200%</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-light">
                    <span className="text-gray-900 mt-1">✓</span>
                    <span>The mobile optimization errors costing you thousands</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-light">
                    <span className="text-gray-900 mt-1">✓</span>
                    <span>How to write copy that actually converts visitors</span>
                  </li>
                </ul>

                <form
                  onSubmit={handleLeadMagnetSubmit}
                  name="lead-magnet"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="lead-magnet" />
                  <input type="hidden" name="bot-field" aria-hidden="true" />

                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-medium text-gray-900 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="lead-name"
                      name="name"
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors font-light"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="block text-sm font-medium text-gray-900 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="lead-email"
                      name="email"
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors font-light"
                      placeholder="john@example.com"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-lg font-medium"
                  >
                    Download Free Guide Now
                  </button>

                  <p className="text-xs text-gray-500 text-center font-light">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      </main>

      {/* Intake Form Modal */}
      <IntakeForm
        isOpen={showIntakeForm}
        onClose={() => setShowIntakeForm(false)}
        onSubmitSuccess={handleIntakeFormSuccess}
      />

      {/* Calendly Popup Modal */}
      <PopupModal
        url="https://calendly.com/petersonproservices/1st-meeting-fact-gathering-goals"
        onModalClose={() => setShowCalendly(false)}
        open={showCalendly}
        rootElement={document.getElementById('root') as HTMLElement}
      />

      {/* Sticky Mobile CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-primary-900/95 backdrop-blur-glass-lg border-t border-primary-500/20 text-white p-4 md:hidden transition-transform duration-300 shadow-blue-glow-lg ${
          showMobileCTA ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackCTAClick('mobile_sticky', 'Book Free Call');
              setShowIntakeForm(true);
            }}
            className="flex-1 py-3 bg-white text-primary-600 hover:bg-primary-50 transition-colors rounded-lg font-medium text-sm"
          >
            Book Free Call
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEmailClick}
            className="py-3 px-4 border border-white hover:bg-white hover:text-gray-900 transition-colors rounded-lg"
          >
            <Mail className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Exit Intent Popup */}
      <ExitIntentPopup onDownloadClick={() => {
        trackDownload('10-website-mistakes-guide.pdf');
        setShowLeadMagnet(true);
      }} />

      {/* Social Proof Notifications */}
      <SocialProofNotification />
    </div>
  );
}

export default App;