import React from 'react';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Clock } from 'lucide-react';
import { EcommerceDemo } from './EcommerceDemo';
import { BrandShowcase } from './BrandShowcase';
import { MobileBankingDemo } from './MobileBankingDemo';
import { CreativeAgencyDemo } from './CreativeAgencyDemo';
import { NeonDreamsDemo } from './NeonDreamsDemo';
import { FitTrackDemo } from './FitTrackDemo';
import { SaveurCateringDemo } from './SaveurCateringDemo';
import { GrandeurEventsDemo } from './GrandeurEventsDemo';
import { PrestigePropertiesDemo } from './PrestigePropertiesDemo';
import { PrimeMortgageDemo } from './PrimeMortgageDemo';
import { GuardianLifeDemo } from './GuardianLifeDemo';
import { HeritageEventDemo } from './HeritageEventDemo';

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
}

interface ProjectPagesProps {
  project: Project;
  onClose: () => void;
}

export const ProjectPages: React.FC<ProjectPagesProps> = ({ project, onClose }) => {
  // Show live demo for the Luxe Fashion Boutique project
  if (project.id === 1) {
    return <EcommerceDemo onClose={onClose} />;
  }

  // Show brand showcase for the Zenith Corporate Identity project
  if (project.id === 2) {
    return <BrandShowcase onClose={onClose} />;
  }

  // Show mobile banking demo for the SecureBank Mobile App project
  if (project.id === 3) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
        <MobileBankingDemo onClose={onClose} />
      </div>
    );
  }

  // Show creative agency demo for the Pixel Creative Studio project
  if (project.id === 4) {
    return <CreativeAgencyDemo onClose={onClose} />;
  }

  // Show NFT collection demo for the Neon Dreams Collection project
  if (project.id === 5) {
    return <NeonDreamsDemo onClose={onClose} />;
  }

  // Show FitTrack Pro dashboard for the Health Tech project
  if (project.id === 6) {
    return <FitTrackDemo onClose={onClose} />;
  }

  // Show Saveur Elite Catering demo for the Luxury Services project
  if (project.id === 7) {
    return <SaveurCateringDemo onClose={onClose} />;
  }

  // Show Grandeur Events Management demo for the Event Planning project
  if (project.id === 8) {
    return <GrandeurEventsDemo onClose={onClose} />;
  }

  // Show Prestige Properties Portal demo for the Real Estate project
  if (project.id === 9) {
    return <PrestigePropertiesDemo onClose={onClose} />;
  }

  // Show Prime Mortgage Solutions demo for the Financial Services project
  if (project.id === 10) {
    return <PrimeMortgageDemo onClose={onClose} />;
  }

  // Show Guardian Life Insurance demo for the Insurance Platform project
  if (project.id === 11) {
    return <GuardianLifeDemo onClose={onClose} />;
  }

  // Show Heritage Event Center demo for the Venue Management project
  if (project.id === 12) {
    return <HeritageEventDemo onClose={onClose} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Portfolio
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
                {project.category}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{project.year}</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-cyan-400">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This project showcases modern web development practices with a focus on user experience, 
                  performance optimization, and scalable architecture. The implementation leverages cutting-edge 
                  technologies to deliver a seamless and engaging digital experience.
                </p>
              </div>
            </section>

            {/* Key Features */}
            {project.features && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-pink-400">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technologies */}
            {project.technologies && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-yellow-400">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-gray-300 hover:border-cyan-500/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Process */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-400">Development Process</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Research & Planning</h3>
                    <p className="text-gray-300">Conducted thorough market research and user analysis to understand requirements and define project scope.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Design & Prototyping</h3>
                    <p className="text-gray-300">Created wireframes, mockups, and interactive prototypes to visualize the user experience.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Development & Testing</h3>
                    <p className="text-gray-300">Implemented the solution using modern technologies with comprehensive testing throughout the process.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Launch & Optimization</h3>
                    <p className="text-gray-300">Deployed the project and continued optimization based on user feedback and performance metrics.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Details */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-6 text-cyan-400">Project Details</h3>
              <div className="space-y-4">
                {project.client && (
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Client</p>
                      <p className="text-white font-medium">{project.client}</p>
                    </div>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-white font-medium">{project.duration}</p>
                    </div>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Year</p>
                      <p className="text-white font-medium">{project.year}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-6 text-pink-400">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300 border border-slate-600/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold mb-4">Interested in Similar Work?</h3>
              <p className="text-gray-300 mb-6">Let's discuss how I can help bring your vision to life with a custom solution.</p>
              <button 
                onClick={() => window.location.href = 'mailto:eldon@petersonproservices.com?subject=Project Inquiry&body=Hi Eldon,%0D%0A%0D%0AI saw your work on ' + project.title + ' and would like to discuss a similar project.%0D%0A%0D%0AThank you!'}
                className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};