import React from 'react';
import { ArrowLeft, ExternalLink, TrendingUp, Users, Clock, Star } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  client: string;
  industry: string;
  image: string;
  summary: string;
  challenge: string;
  process: string[];
  solution: string;
  results: {
    metric1: { label: string; value: string };
    metric2: { label: string; value: string };
    metric3: { label: string; value: string };
  };
  testimonial: {
    quote: string;
    author: string;
  };
  link: string;
  duration: string;
  year: string;
}

interface CaseStudiesProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ caseStudy, onClose }) => {
  if (!caseStudy) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Portfolio</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-medium uppercase tracking-wider rounded-full">
              Case Study
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-gray-900">
            {caseStudy.title}
          </h1>
          <p className="text-xl text-gray-600 font-light mb-8">
            {caseStudy.summary}
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{caseStudy.client}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{caseStudy.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>{caseStudy.industry}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-8 -mt-10">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-gray-900 text-center">
            Results That Matter
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {caseStudy.results.metric1.value}
              </div>
              <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                {caseStudy.results.metric1.label}
              </div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {caseStudy.results.metric2.value}
              </div>
              <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                {caseStudy.results.metric2.label}
              </div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {caseStudy.results.metric3.value}
              </div>
              <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                {caseStudy.results.metric3.label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-6 text-gray-900">
            The Challenge
          </h2>
          <p className="text-lg text-gray-700 font-light leading-relaxed">
            {caseStudy.challenge}
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-gray-900">
            Our Process
          </h2>
          <div className="space-y-6">
            {caseStudy.process.map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-light text-lg">
                  {index + 1}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-lg text-gray-700 font-light leading-relaxed">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-6 text-gray-900">
            The Solution
          </h2>
          <p className="text-lg text-gray-700 font-light leading-relaxed">
            {caseStudy.solution}
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 text-white p-12 rounded-lg">
            <div className="flex gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-white text-white" />
              ))}
            </div>
            <p className="text-2xl font-light mb-8 leading-relaxed italic">
              "{caseStudy.testimonial.quote}"
            </p>
            <p className="text-gray-300 font-light">
              — {caseStudy.testimonial.author}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6 text-gray-900">
            Ready for Similar Results?
          </h2>
          <p className="text-lg text-gray-600 font-light mb-8">
            Let's discuss how we can transform your online presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={caseStudy.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-lg font-medium inline-flex items-center gap-2 justify-center"
            >
              View Live Site
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="px-8 py-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors rounded-lg font-medium"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

