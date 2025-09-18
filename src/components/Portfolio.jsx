
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, ExternalLink, Mail, Linkedin, Twitter, Code, Database, Globe, Smartphone, ArrowRight, Download, Star, Zap, Users, Trophy, Target, Play, CheckCircle, Calendar, MessageSquare, Heart } from 'lucide-react';

// Advanced 3D Card with Tilt Effect
const TiltCard = ({ children, className = "" }) => {
  const [transform, setTransform] = useState("");
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// Premium Project Showcase
const ProjectShowcase = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <TiltCard className="group relative">
      <div 
        className="relative bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-900/50 backdrop-blur-xl border border-slate-600/30 rounded-3xl overflow-hidden transition-all duration-700 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animation: `slideInUp 0.8s ease-out ${index * 0.15}s both`
        }}
      >
        {/* Project Preview */}
        <div className="relative h-64 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 overflow-hidden">
          <div className={`absolute inset-0 flex items-center justify-center text-6xl transition-all duration-700 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
            {project.preview}
          </div>
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-80' : 'opacity-40'}`} />
          
          {/* Live Demo Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-green-300 text-sm font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live
            </div>
          </div>
          
          {/* Play Button Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110">
              <Play className="w-6 h-6 text-white ml-1" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{project.rating}</span>
            </div>
          </div>
          
          <p className="text-slate-300 mb-6 leading-relaxed">
            {project.description}
          </p>
          
          {/* Key Features */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-cyan-300 mb-3 uppercase tracking-wider">Key Features</h4>
            <div className="space-y-2">
              {project.features.slice(0, 3).map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, i) => (
              <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-slate-500/30 rounded-full text-sm text-cyan-300 font-medium">
                {tech}
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
              <ExternalLink size={16} />
              View Live
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700/50 border border-slate-600/50 rounded-2xl text-slate-300 font-semibold hover:bg-slate-600/50 hover:text-white transition-all duration-300">
              <Github size={16} />
            </button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(80px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </TiltCard>
  );
};

// Service Card Component
const ServiceCard = ({ service, index }) => (
  <TiltCard>
    <div 
      className="group relative bg-gradient-to-br from-slate-800/40 via-slate-700/20 to-slate-900/40 backdrop-blur-xl border border-slate-600/30 rounded-3xl p-8 text-center transition-all duration-500 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
          <service.badge className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
        {service.name}
      </h3>
      <p className="text-slate-400 mb-4 leading-relaxed">{service.description}</p>
      
      <div className="text-cyan-400 font-semibold text-lg mb-4">
        {service.price}
      </div>
      
      <button className="w-full py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl text-purple-300 font-medium hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-300/50 transition-all duration-300">
        Learn More
      </button>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  </TiltCard>
);

// Testimonial Card
const TestimonialCard = ({ testimonial, index }) => (
  <TiltCard>
    <div 
      className="bg-gradient-to-br from-slate-800/40 via-slate-700/20 to-slate-900/40 backdrop-blur-xl border border-slate-600/30 rounded-3xl p-8 transition-all duration-500 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/20"
      style={{
        animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`
      }}
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
        ))}
      </div>
      
      <p className="text-slate-300 mb-6 leading-relaxed text-lg">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {testimonial.avatar}
        </div>
        <div>
          <div className="text-white font-semibold">{testimonial.name}</div>
          <div className="text-slate-400 text-sm">{testimonial.role}</div>
        </div>
      </div>
    </div>
  </TiltCard>
);

// Stats Counter
const StatsCounter = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCount(prev => {
          const increment = Math.ceil(stat.value / 100);
          return prev + increment >= stat.value ? stat.value : prev + increment;
        });
      }, 30);
      
      setTimeout(() => clearInterval(timer), 2000);
      return () => clearInterval(timer);
    }
  }, [isVisible, stat.value]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-slate-400 font-medium">{stat.label}</div>
    </div>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "Enterprise SaaS Platform",
      description: "Complete business management solution with advanced analytics, team collaboration, and automated workflows. Serving 10,000+ active users with 99.9% uptime.",
      preview: "💼",
      rating: "4.9",
      tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
      features: [
        "Real-time collaboration with 50+ team members",
        "Advanced analytics dashboard with 30+ metrics",
        "Automated workflow builder with 100+ templates"
      ]
    },
    {
      title: "AI-Powered E-Commerce",
      description: "Next-generation shopping experience with AI recommendations, voice search, and AR try-on features. Increased conversion rates by 340%.",
      preview: "🛒",
      rating: "4.8",
      tech: ["Next.js", "Python", "TensorFlow", "Stripe", "Docker"],
      features: [
        "AI product recommendations with 95% accuracy",
        "Voice search in 12+ languages",
        "AR virtual try-on for fashion items"
      ]
    },
    {
      title: "FinTech Mobile App",
      description: "Revolutionary banking app with biometric security, cryptocurrency support, and smart investment advisor. Featured in App Store.",
      preview: "💳",
      rating: "4.9",
      tech: ["React Native", "Node.js", "MongoDB", "Blockchain", "ML"],
      features: [
        "Biometric authentication with Face ID",
        "Real-time crypto trading with 0.1% fees",
        "AI investment advisor with proven returns"
      ]
    },
    {
      title: "Healthcare Platform",
      description: "Comprehensive telemedicine platform connecting patients with specialists. HIPAA compliant with end-to-end encryption.",
      preview: "🏥",
      rating: "4.7",
      tech: ["Vue.js", "Django", "WebRTC", "PostgreSQL", "HIPAA"],
      features: [
        "HD video consultations with specialists",
        "Secure patient record management",
        "Prescription management system"
      ]
    }
  ];

  const services = [
    {
      name: "Full Stack Development",
      description: "Complete web applications from concept to deployment with modern technologies and best practices.",
      icon: <Code className="w-8 h-8 text-cyan-400" />,
      badge: Zap,
      price: "Starting at $5,000"
    },
    {
      name: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android with stunning user experiences.",
      icon: <Smartphone className="w-8 h-8 text-purple-400" />,
      badge: Target,
      price: "Starting at $8,000"
    },
    {
      name: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that convert visitors into customers and delight users.",
      icon: <Globe className="w-8 h-8 text-pink-400" />,
      badge: Heart,
      price: "Starting at $3,000"
    },
    {
      name: "Technical Consulting",
      description: "Strategic guidance on technology decisions, architecture planning, and team leadership.",
      icon: <Users className="w-8 h-8 text-green-400" />,
      badge: Trophy,
      price: "Starting at $200/hr"
    }
  ];

  const testimonials = [
    {
      quote: "Absolutely phenomenal work! The platform exceeded all our expectations and delivered incredible ROI within the first quarter.",
      name: "Sarah Chen",
      role: "CEO, TechCorp",
      avatar: "SC"
    },
    {
      quote: "The attention to detail and technical expertise is outstanding. Our conversion rates increased by 340% after the redesign.",
      name: "Marcus Johnson",
      role: "CTO, StartupXYZ",
      avatar: "MJ"
    },
    {
      quote: "Professional, reliable, and incredibly talented. The best developer we've ever worked with. Highly recommended!",
      name: "Elena Rodriguez",
      role: "Founder, InnovateAI",
      avatar: "ER"
    }
  ];

  const stats = [
    { value: 150, suffix: "+", label: "Projects Completed" },
    { value: 50, suffix: "+", label: "Happy Clients" },
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 99, suffix: "%", label: "Client Satisfaction" }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Animated Cursor */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-screen transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }} />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-2xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DevMaster
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Services', 'Projects', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 hover:scale-105">
                Hire Me
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-300 font-medium mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for new projects
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                Premium
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Full Stack Developer
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              I craft <span className="text-cyan-400 font-semibold">exceptional digital experiences</span> that drive business growth and delight users. 
              From concept to deployment, I deliver solutions that exceed expectations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-400 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-3 px-8 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-slate-300 font-semibold hover:bg-slate-700/50 hover:text-white transition-all duration-300 hover:scale-105">
                <Calendar className="w-5 h-5" />
                Schedule Call
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <StatsCounter key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Premium Services
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive solutions tailored to elevate your business to the next level
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.name} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Award-winning solutions that transformed businesses and delighted millions of users
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectShowcase key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Client Success Stories
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Hear what industry leaders say about working with me
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Let's discuss your project and create something extraordinary together.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-400 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
              <MessageSquare className="w-5 h-5" />
              Start Project
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-slate-300 font-semibold hover:bg-slate-700/50 hover:text-white transition-all duration-300 hover:scale-105">
              <Mail className="w-5 h-5" />
              Download Resume
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-8">
            <a href="#" className="group w-14 h-14 bg-slate-800/50 border border-slate-600/50 rounded-2xl flex items-center justify-center hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:scale-110">
              <Github className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </a>
            <a href="#" className="group w-14 h-14 bg-slate-800/50 border border-slate-600/50 rounded-2xl flex items-center justify-center hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:scale-110">
              <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </a>
            <a href="#" className="group w-14 h-14 bg-slate-800/50 border border-slate-600/50 rounded-2xl flex items-center justify-center hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:scale-110">
              <Twitter className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </a>
            <a href="#" className="group w-14 h-14 bg-slate-800/50 border border-slate-600/50 rounded-2xl flex items-center justify-center hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:scale-110">
              <Mail className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DevMaster
              </span>
            </div>
            <p className="text-slate-500 text-center md:text-right">
              © 2025 DevMaster. Crafted with passion and precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio