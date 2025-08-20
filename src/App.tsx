import { useState, useEffect, useRef } from 'react';
import newLogo from 'figma:asset/bf884ace129e09e829b430f239b73741c1e49645.png';
import logoConstruction from 'figma:asset/8760d11bdfa061b27dec4453fe1b3e9a1f7404de.png';
import molecularStructure from 'figma:asset/848922857c54a54de89edfbe2bd03b454e37479d.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('buttons');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive 3D Logo Component
  const Interactive3DLogo = ({ size = "h-14 w-14", className = "", onClick }: { 
    size?: string; 
    className?: string;
    onClick?: () => void;
  }) => {
    const logoRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!logoRef.current) return;
      
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / 10;
      const rotateY = (centerX - e.clientX) / 10;
      
      setMousePosition({ x: rotateY, y: rotateX });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    return (
      <div
        ref={logoRef}
        className={`${size} relative cursor-pointer transition-all duration-300 ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(${isHovered ? 1.1 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main Logo */}
        <img 
          src={newLogo} 
          alt="Infinite Forge" 
          className="w-full h-full relative z-10 drop-shadow-2xl transition-all duration-300"
          style={{
            filter: `brightness(${isHovered ? 1.2 : 1}) contrast(${isHovered ? 1.1 : 1}) saturate(${isHovered ? 1.2 : 1})`
          }}
        />
        
        {/* Enhanced Glow Effects */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-violet-500/40 to-blue-400/20 rounded-full blur-xl transition-all duration-300"
          style={{
            transform: 'translateZ(-10px)',
            opacity: isHovered ? 0.8 : 0.4,
            scale: isHovered ? 1.3 : 1.1,
          }}
        />
        
        {/* Secondary Glow */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-violet-600/30 rounded-full blur-2xl animate-pulse transition-all duration-300"
          style={{
            transform: 'translateZ(-20px)',
            opacity: isHovered ? 0.6 : 0.3,
            scale: isHovered ? 1.5 : 1.2,
          }}
        />
        
        {/* Reflection Effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-full transition-all duration-300"
          style={{
            transform: `translateZ(5px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
            opacity: isHovered ? 0.3 : 0.1,
          }}
        />
      </div>
    );
  };

  // Simple SVG icons as components
  const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );

  const Download = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  );

  const Layout = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M9 3v18"/>
      <path d="m16 15-3-3 3-3"/>
    </svg>
  );

  const Grid3X3 = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M9 9h6v6H9z"/>
      <path d="m9 3 6 6"/>
      <path d="m3 9 6 6"/>
      <path d="m9 21 6-6"/>
      <path d="m21 9-6 6"/>
    </svg>
  );

  const MessageCircle = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  );

  const Palette = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  );

  const Type = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,7 4,4 20,4 20,7"/>
      <line x1="9" x2="15" y1="20" y2="20"/>
      <line x1="12" x2="12" y1="4" y2="20"/>
    </svg>
  );

  const Image = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  );

  const Zap = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  );

  const Shield = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  );

  const Layers = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  );

  const Building = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M12 6h.01"/>
      <path d="M12 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M16 10h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 10h.01"/>
      <path d="M8 14h.01"/>
    </svg>
  );

  const ArrowRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  );

  const Cpu = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="16" x="4" y="4" rx="2"/>
      <rect width="6" height="6" x="9" y="9" rx="1"/>
      <path d="M15 2v2"/>
      <path d="M15 20v2"/>
      <path d="M2 15h2"/>
      <path d="M2 9h2"/>
      <path d="M20 15h2"/>
      <path d="M20 9h2"/>
      <path d="M9 2v2"/>
      <path d="M9 20v2"/>
    </svg>
  );

  const Ruler = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
      <path d="m14.5 12.5 2-2"/>
      <path d="m11.5 9.5 2-2"/>
      <path d="m8.5 6.5 2-2"/>
      <path d="m17.5 15.5 2-2"/>
    </svg>
  );

  const Button = ({ 
    children, 
    className = "", 
    size = "default", 
    variant = "default",
    ...props 
  }: { 
    children: React.ReactNode; 
    className?: string; 
    size?: string; 
    variant?: string;
    [key: string]: any;
  }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105";
    
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      lg: "h-12 px-8 py-3"
    };
    
    const variantClasses = {
      default: "bg-violet-500 text-white hover:bg-violet-600 shadow-lg hover:shadow-violet-500/25",
      outline: "border border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800 hover:border-violet-500/50",
      ghost: "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-violet-300"
    };
    
    return (
      <button 
        className={`${baseClasses} ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Card = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
    <div className={`rounded-xl border text-white shadow-2xl transition-all duration-500 hover:shadow-violet-500/10 hover:transform hover:scale-105 ${className}`} {...props}>
      {children}
    </div>
  );

  const Badge = ({ children, className = "", variant = "default", ...props }: { children: React.ReactNode; className?: string; variant?: string; [key: string]: any }) => {
    const variantClasses = {
      default: "bg-violet-500/20 text-violet-300 border-violet-500/30 shadow-lg",
      secondary: "bg-slate-800 text-slate-300",
      outline: "bg-transparent text-slate-300 border-slate-600"
    };
    
    return (
      <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${className}`} {...props}>
        {children}
      </div>
    );
  };

  const TabButton = ({ value, isActive, onClick, children }: { 
    value: string; 
    isActive: boolean; 
    onClick: () => void; 
    children: React.ReactNode; 
  }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
        isActive 
          ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' 
          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:shadow-lg'
      }`}
    >
      {children}
    </button>
  );

  // Floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-violet-400/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );

  // Geometric shapes
  const GeometricShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-violet-500/10 rounded-full animate-spin"
        style={{ 
          animationDuration: '20s',
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      />
      <div 
        className="absolute top-1/3 right-1/3 w-24 h-24 border border-blue-400/10 animate-pulse"
        style={{ 
          animationDuration: '4s',
          transform: `rotate(45deg) translateY(${scrollY * 0.15}px)`
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-40 h-40 border border-violet-300/5 rounded-full animate-spin"
        style={{ 
          animationDuration: '30s',
          animationDirection: 'reverse',
          transform: `translateY(${scrollY * 0.08}px)`
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden scroll-smooth">
      {/* Custom animations using CSS-in-JS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(139, 69, 255, 0.3); }
            50% { box-shadow: 0 0 40px rgba(139, 69, 255, 0.6); }
          }
          @keyframes rotate3d {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            25% { transform: rotateX(5deg) rotateY(90deg); }
            50% { transform: rotateX(0deg) rotateY(180deg); }
            75% { transform: rotateX(-5deg) rotateY(270deg); }
            100% { transform: rotateX(0deg) rotateY(360deg); }
          }
          .float-animation {
            animation: float 6s ease-in-out infinite;
          }
          .glow-animation {
            animation: glow 4s ease-in-out infinite;
          }
          .rotate-3d {
            animation: rotate3d 20s linear infinite;
            transform-style: preserve-3d;
          }
        `
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Interactive3DLogo />
            <span className="text-2xl font-semibold text-white">Infinite Forge</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#identity" className="text-slate-300 hover:text-violet-300 transition-all duration-300 hover:scale-105">Identity</a>
            <a href="#colors" className="text-slate-300 hover:text-violet-300 transition-all duration-300 hover:scale-105">Colors</a>
            <a href="#typography" className="text-slate-300 hover:text-violet-300 transition-all duration-300 hover:scale-105">Typography</a>
            <a href="#components" className="text-slate-300 hover:text-violet-300 transition-all duration-300 hover:scale-105">Components</a>
            <a href="#applications" className="text-slate-300 hover:text-violet-300 transition-all duration-300 hover:scale-105">Applications</a>
          </div>
          <Button className="bg-violet-500 hover:bg-violet-600 text-white shadow-lg hover:shadow-violet-500/25">
            <div className="mr-2 h-4 w-4"><Download /></div>
            Download Assets
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-20 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,69,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,rgba(139,69,255,0.05)_60deg,transparent_120deg)]" />
        
        {/* Animated Elements */}
        <FloatingParticles />
        <GeometricShapes />
        
        {/* Background molecular structure with parallax */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img 
            src={molecularStructure} 
            alt="Molecular Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Massive Interactive 3D Logo */}
          <div className="mb-16 flex justify-center">
            <Interactive3DLogo 
              size="h-96 w-96 lg:h-[32rem] lg:w-[32rem]" 
              className="float-animation rotate-3d"
            />
          </div>
          
          <Badge className="mb-8 bg-violet-500/20 text-violet-300 border-violet-500/30 px-8 py-4 text-xl shadow-2xl">
            Brand Guidelines v1.0
          </Badge>
          
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold mb-12 bg-gradient-to-r from-white via-slate-200 to-violet-300 bg-clip-text text-transparent leading-tight">
            Infinite Forge<br />
            <span className="text-6xl md:text-8xl lg:text-9xl bg-gradient-to-r from-violet-400 via-blue-400 to-violet-300 bg-clip-text text-transparent">
              Brand Guidelines
            </span>
          </h1>
          
          <p className="text-3xl md:text-4xl text-slate-300 mb-12 max-w-5xl mx-auto leading-relaxed opacity-90">
            A comprehensive guide to our visual identity, voice, and design principles. 
            <span className="text-violet-300">Built for consistency, forged for impact.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white px-12 py-5 text-xl shadow-2xl hover:shadow-violet-500/50 transform hover:scale-110 transition-all duration-500">
              Explore Guidelines
              <div className="ml-4 h-7 w-7"><ChevronRight /></div>
            </Button>
          </div>
        </div>

        {/* Cinematic Light Rays */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </section>

      {/* Brand Identity */}
      <section id="identity" className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Badge className="mb-8 bg-violet-500/20 text-violet-300 border-violet-500/30 px-6 py-3 text-lg">
              Brand Identity
            </Badge>
            <h2 className="text-6xl md:text-7xl font-bold mb-10 text-white">
              Our Brand Essence
            </h2>
            <p className="text-3xl text-slate-400 max-w-5xl mx-auto leading-relaxed">
              Infinite Forge embodies grand, celestial, and visionary qualities that inspire planetary transformation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 mb-24">
            {/* Logo Section */}
            <div className="space-y-8">
              <h3 className="text-4xl font-bold mb-12 flex items-center text-white">
                <div className="mr-6 h-10 w-10 text-violet-400"><Layout /></div>
                Logo Philosophy
              </h3>
              
              <div className="bg-slate-800/50 rounded-3xl p-12 mb-12 backdrop-blur-sm border border-slate-700/50">
                <div className="flex justify-center items-center min-h-[400px] bg-slate-950/50 rounded-2xl mb-10 relative overflow-hidden">
                  <Interactive3DLogo size="h-80 w-80" className="float-animation" />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                </div>
                <p className="text-slate-300 text-center text-xl">
                  Interactive 3D Logo - Premium Metallic Finish
                </p>
              </div>

              <div className="space-y-8 text-slate-300 text-xl">
                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
                  <strong className="text-white text-2xl">Form:</strong> Clean infinite loop forming a seamless path — symbolizing continuous innovation and limitless potential.
                </div>
                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
                  <strong className="text-white text-2xl">Material:</strong> Premium chrome-like finish with blue accents representing molecular precision and scientific elegance.
                </div>
                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
                  <strong className="text-white text-2xl">Interactivity:</strong> 3D perspective transforms create depth and engagement, responding to user interaction.
                </div>
                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
                  <strong className="text-white text-2xl">Technology:</strong> Advanced visual effects with dynamic lighting and shadows for premium brand experience.
                </div>
              </div>
            </div>

            {/* Logo Construction */}
            <div className="space-y-8">
              <h3 className="text-4xl font-bold mb-12 flex items-center text-white">
                <div className="mr-6 h-10 w-10 text-violet-400"><Grid3X3 /></div>
                3D Logo Specifications
              </h3>
              
              <div className="bg-slate-800/50 rounded-3xl p-12 mb-12 backdrop-blur-sm border border-slate-700/50">
                <div className="bg-slate-950/70 rounded-2xl p-10 mb-10 flex justify-center">
                  <Interactive3DLogo size="h-64 w-64" />
                </div>
                <p className="text-slate-300 text-center text-xl">
                  3D Interactive Logo with Real-time Lighting
                </p>
              </div>

              <div className="space-y-8 text-slate-300 text-xl">
                <div className="p-6 bg-violet-500/10 rounded-2xl border border-violet-500/30">
                  <strong className="text-violet-300 text-xl">Interactivity:</strong> Mouse-responsive 3D rotation and scaling effects with enhanced lighting.
                </div>
                <div className="p-6 bg-violet-500/10 rounded-2xl border border-violet-500/30">
                  <strong className="text-violet-300 text-xl">Minimum Size:</strong> Never scale below 32px to preserve 3D effect clarity.
                </div>
                <div className="p-6 bg-violet-500/10 rounded-2xl border border-violet-500/30">
                  <strong className="text-violet-300 text-xl">Performance:</strong> Optimized transforms using hardware acceleration and CSS perspective.
                </div>
              </div>
            </div>
          </div>

          {/* Voice & Messaging */}
          <div className="grid lg:grid-cols-2 gap-16">
            <Card className="bg-slate-800/50 border-slate-700 p-12 text-white backdrop-blur-sm">
              <h4 className="text-3xl font-semibold mb-8 text-violet-300 flex items-center">
                <div className="mr-4 h-8 w-8"><MessageCircle /></div>
                Primary Messaging
              </h4>
              <p className="text-4xl font-bold mb-10 text-white leading-tight">Built for Strength, Forged for Giga-scale</p>
              
              <h5 className="text-2xl font-semibold mb-6 text-violet-300">Campaign Alternatives</h5>
              <ul className="space-y-4 text-slate-300 text-xl">
                <li>• "Where Matter Meets Infinity"</li>
                <li>• "Strength Beyond Steel"</li>
                <li>• "Forging the Future at the Molecular Scale"</li>
              </ul>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-12 text-white backdrop-blur-sm">
              <h4 className="text-3xl font-semibold mb-8 text-violet-300">Brand Personality</h4>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-4 bg-violet-500/10 rounded-xl">
                  <strong className="text-white text-xl">Visionary</strong>
                  <p className="text-slate-400 text-lg">We imagine and shape the future</p>
                </div>
                <div className="p-4 bg-violet-500/10 rounded-xl">
                  <strong className="text-white text-xl">Precise</strong>
                  <p className="text-slate-400 text-lg">Every atom has purpose</p>
                </div>
                <div className="p-4 bg-violet-500/10 rounded-xl">
                  <strong className="text-white text-xl">Interactive</strong>
                  <p className="text-slate-400 text-lg">Engaging and responsive</p>
                </div>
                <div className="p-4 bg-violet-500/10 rounded-xl">
                  <strong className="text-white text-xl">Resilient</strong>
                  <p className="text-slate-400 text-lg">Engineered for endurance</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section id="colors" className="py-32 bg-slate-950 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Badge className="mb-8 bg-violet-500/20 text-violet-300 border-violet-500/30 px-6 py-3 text-lg">
              Color System
            </Badge>
            <h2 className="text-6xl md:text-7xl font-bold mb-10 text-white">
              Color Palette
            </h2>
            <p className="text-3xl text-slate-400 max-w-5xl mx-auto leading-relaxed">
              Our colors reflect strength, innovation, and scientific precision with celestial elegance.
            </p>
          </div>

          {/* Color Grid with Visual Example */}
          <div className="grid lg:grid-cols-3 gap-10 mb-20">
            {/* Primary Colors */}
            <Card className="bg-slate-900/50 border-slate-700 p-12 text-white backdrop-blur-sm">
              <h3 className="text-3xl font-semibold mb-10 flex items-center text-white">
                <div className="mr-6 h-8 w-8 text-violet-400"><Palette /></div>
                Primary Colors
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-slate-950 rounded-xl border border-slate-700 shadow-xl"></div>
                  <div>
                    <p className="font-semibold text-xl text-white">Graphite Black</p>
                    <p className="text-slate-400 text-lg">#020617</p>
                    <p className="text-slate-500">Strength, stability, trust</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-slate-800 rounded-xl shadow-xl"></div>
                  <div>
                    <p className="font-semibold text-xl text-white">Deep Charcoal</p>
                    <p className="text-slate-400 text-lg">#1e293b</p>
                    <p className="text-slate-500">Industrial sophistication</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-violet-500 rounded-xl shadow-xl ring-4 ring-violet-400/50 glow-animation"></div>
                  <div>
                    <p className="font-semibold text-xl text-white">Silica Blue-Violet</p>
                    <p className="text-slate-400 text-lg">#8b5cf6</p>
                    <p className="text-slate-500">Innovation, molecular energy</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Secondary Colors */}
            <Card className="bg-slate-900/50 border-slate-700 p-12 text-white backdrop-blur-sm">
              <h3 className="text-3xl font-semibold mb-10 text-white">
                Secondary Colors
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-slate-400 rounded-xl shadow-xl"></div>
                  <div>
                    <p className="font-semibold text-xl text-white">Platinum Silver</p>
                    <p className="text-slate-400 text-lg">#94a3b8</p>
                    <p className="text-slate-500">Precision, refinement</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-white rounded-xl border border-slate-300 shadow-xl"></div>
                  <div>
                    <p className="font-semibold text-xl text-white">Luminescent White</p>
                    <p className="text-slate-400 text-lg">#ffffff</p>
                    <p className="text-slate-500">Clarity, purity of science</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-blue-400 rounded-xl shadow-xl"></div>
                  <div>
                    <p className="font-semibold text-xl text-white">Accent Blue</p>
                    <p className="text-slate-400 text-lg">#60a5fa</p>
                    <p className="text-slate-500">Supporting highlights</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Usage Guidelines */}
            <Card className="bg-slate-900/50 border-slate-700 p-12 text-white backdrop-blur-sm">
              <h3 className="text-3xl font-semibold mb-10 text-white">
                Usage Guidelines
              </h3>
              
              <div className="space-y-8">
                <div className="p-6 bg-violet-500/10 rounded-xl border border-violet-500/20">
                  <strong className="text-violet-300 text-xl">Primary Actions</strong>
                  <p className="text-slate-400 text-lg">Use Silica Blue-Violet for CTAs and key interactive elements</p>
                </div>
                
                <div className="p-6 bg-slate-800/30 rounded-xl">
                  <strong className="text-violet-300 text-xl">Backgrounds</strong>
                  <p className="text-slate-400 text-lg">Graphite Black and Deep Charcoal for depth and sophistication</p>
                </div>
                
                <div className="p-6 bg-slate-800/30 rounded-xl">
                  <strong className="text-violet-300 text-xl">Text Hierarchy</strong>
                  <p className="text-slate-400 text-lg">White for headers, Silver for body text, Charcoal for captions</p>
                </div>
                
                <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <strong className="text-violet-300 text-xl">Accents</strong>
                  <p className="text-slate-400 text-lg">Use sparingly for molecular activity indicators and energy</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Color in Context */}
          <div className="bg-slate-800/30 rounded-3xl p-16 backdrop-blur-sm border border-slate-700/50">
            <h3 className="text-4xl font-bold mb-12 text-center text-white">Colors in Context</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 rounded-3xl p-12 text-center transform hover:scale-105 transition-all duration-500">
                <Interactive3DLogo size="h-32 w-32" className="mx-auto mb-6" />
                <p className="text-white font-semibold text-xl">Dark Theme Application</p>
                <p className="text-slate-400">Primary usage on dark backgrounds</p>
              </div>
              <div className="bg-gradient-to-br from-white to-slate-100 rounded-3xl p-12 text-center transform hover:scale-105 transition-all duration-500">
                <div className="filter brightness-0">
                  <Interactive3DLogo size="h-32 w-32" className="mx-auto mb-6" />
                </div>
                <p className="text-slate-700 font-semibold text-xl">Light Theme Application</p>
                <p className="text-slate-500">Alternative usage on light backgrounds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section id="typography" className="py-32 bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Badge className="mb-8 bg-violet-500/20 text-violet-300 border-violet-500/30 px-6 py-3 text-lg">
              Typography System
            </Badge>
            <h2 className="text-6xl md:text-7xl font-bold mb-10 text-white">
              Typography & Hierarchy
            </h2>
            <p className="text-3xl text-slate-400 max-w-5xl mx-auto leading-relaxed">
              Clean, scientific typography that balances technical precision with elegant readability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20">
            {/* Typography Scale */}
            <div>
              <h3 className="text-4xl font-bold mb-12 flex items-center text-white">
                <div className="mr-6 h-10 w-10 text-violet-400"><Type /></div>
                Type Scale
              </h3>
              
              <div className="space-y-10">
                <div className="border-b border-slate-700 pb-8">
                  <h1 className="text-7xl font-bold mb-4 text-white">Heading 1</h1>
                  <p className="text-slate-400 text-xl">7xl / Bold / 1.2 line-height</p>
                  <p className="text-slate-500 text-lg">Hero headlines and main titles</p>
                </div>
                
                <div className="border-b border-slate-700 pb-8">
                  <h2 className="text-5xl font-bold mb-4 text-white">Heading 2</h2>
                  <p className="text-slate-400 text-xl">5xl / Bold / 1.3 line-height</p>
                  <p className="text-slate-500 text-lg">Section headers</p>
                </div>
                
                <div className="border-b border-slate-700 pb-8">
                  <h3 className="text-3xl font-semibold mb-4 text-white">Heading 3</h3>
                  <p className="text-slate-400 text-xl">3xl / Semibold / 1.4 line-height</p>
                  <p className="text-slate-500 text-lg">Subsection headers</p>
                </div>
                
                <div className="border-b border-slate-700 pb-8">
                  <p className="text-xl mb-4 text-white">Body Text Large</p>
                  <p className="text-slate-400 text-xl">xl / Regular / 1.6 line-height</p>
                  <p className="text-slate-500 text-lg">Important content text</p>
                </div>
                
                <div>
                  <p className="text-lg text-slate-400 mb-4">Caption Text</p>
                  <p className="text-slate-400 text-xl">lg / Regular / 1.5 line-height</p>
                  <p className="text-slate-500 text-lg">Supporting information</p>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h3 className="text-4xl font-bold mb-12 text-white">
                Usage Examples
              </h3>
              
              <Card className="bg-slate-800/50 border-slate-700 p-12 mb-10 text-white backdrop-blur-sm">
                <h4 className="text-2xl font-semibold mb-8 text-violet-300">Technical Content</h4>
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-white">Polymer Chemistry Innovation</h3>
                  <p className="text-slate-300 text-xl leading-relaxed">
                    Advanced molecular bonding techniques that create unprecedented material properties 
                    through precision engineering at the atomic level.
                  </p>
                  <p className="text-slate-400 text-lg">
                    Performance metrics: 3.2x tensile strength compared to steel alloys
                  </p>
                </div>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 p-12 text-white backdrop-blur-sm">
                <h4 className="text-2xl font-semibold mb-8 text-violet-300">Marketing Copy</h4>
                <div className="space-y-6">
                  <h2 className="text-5xl font-bold text-white leading-tight">Built for Strength, Forged for Giga-scale</h2>
                  <p className="text-slate-300 text-xl leading-relaxed">
                    Where matter meets infinity. Our ultra-high-performance composite sheets 
                    surpass steel's strength while achieving superior cost-efficiency.
                  </p>
                  <Button className="bg-violet-500 hover:bg-violet-600 text-white mt-8 text-lg px-8 py-4">
                    Explore Technology
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section id="components" className="py-32 bg-slate-950 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Badge className="mb-8 bg-violet-500/20 text-violet-300 border-violet-500/30 px-6 py-3 text-lg">
              Component Library
            </Badge>
            <h2 className="text-6xl md:text-7xl font-bold mb-10 text-white">
              UI Components
            </h2>
            <p className="text-3xl text-slate-400 max-w-5xl mx-auto leading-relaxed">
              Consistent, reusable components that embody our brand's scientific precision and celestial elegance.
            </p>
          </div>

          {/* Custom Tab Navigation */}
          <div className="w-full">
            <div className="flex justify-center mb-20">
              <div className="grid grid-cols-4 gap-6 max-w-4xl">
                <TabButton 
                  value="buttons" 
                  isActive={activeTab === 'buttons'} 
                  onClick={() => setActiveTab('buttons')}
                >
                  Buttons
                </TabButton>
                <TabButton 
                  value="cards" 
                  isActive={activeTab === 'cards'} 
                  onClick={() => setActiveTab('cards')}
                >
                  Cards
                </TabButton>
                <TabButton 
                  value="badges" 
                  isActive={activeTab === 'badges'} 
                  onClick={() => setActiveTab('badges')}
                >
                  Badges
                </TabButton>
                <TabButton 
                  value="icons" 
                  isActive={activeTab === 'icons'} 
                  onClick={() => setActiveTab('icons')}
                >
                  Icons
                </TabButton>
              </div>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'buttons' && (
              <div className="space-y-16">
                <div className="grid md:grid-cols-3 gap-12">
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-white backdrop-blur-sm">
                    <h4 className="text-2xl font-semibold mb-8 text-white">Primary Button</h4>
                    <Button className="bg-violet-500 hover:bg-violet-600 text-white w-full mb-8 h-14 text-xl">
                      Primary Action
                    </Button>
                    <p className="text-slate-400 text-lg">
                      Use for main actions like "Explore Technology" or "Contact Us"
                    </p>
                  </Card>
                  
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-white backdrop-blur-sm">
                    <h4 className="text-2xl font-semibold mb-8 text-white">Secondary Button</h4>
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 w-full mb-8 h-14 text-xl">
                      Secondary Action
                    </Button>
                    <p className="text-slate-400 text-lg">
                      Use for supporting actions like "Learn More" or "Documentation"
                    </p>
                  </Card>
                  
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-white backdrop-blur-sm">
                    <h4 className="text-2xl font-semibold mb-8 text-white">Ghost Button</h4>
                    <Button variant="ghost" className="text-violet-400 hover:text-violet-300 w-full mb-8 h-14 text-xl">
                      Ghost Action <div className="ml-3 h-6 w-6 inline-block"><ArrowRight /></div>
                    </Button>
                    <p className="text-slate-400 text-lg">
                      Use for tertiary actions and inline links
                    </p>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === 'cards' && (
              <div className="space-y-16">
                <div className="grid md:grid-cols-2 gap-12">
                  <Card className="bg-slate-800/30 border-slate-700 p-12 text-white backdrop-blur-sm">
                    <div className="w-24 h-24 bg-violet-500/20 rounded-xl flex items-center justify-center mb-10">
                      <div className="h-12 w-12 text-violet-400"><Building /></div>
                    </div>
                    <h3 className="text-3xl font-semibold mb-8 text-white">Feature Card</h3>
                    <p className="text-slate-400 mb-10 text-xl leading-relaxed">
                      Use for showcasing applications, features, or capabilities with icons and descriptions.
                    </p>
                    <Button variant="ghost" className="text-violet-400 hover:text-violet-300 p-0 text-xl">
                      Learn More <div className="ml-3 h-6 w-6 inline-block"><ArrowRight /></div>
                    </Button>
                  </Card>
                  
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-center text-white backdrop-blur-sm">
                    <div className="text-7xl font-bold text-violet-400 mb-6">3.2x</div>
                    <div className="text-3xl font-semibold mb-6 text-white">Metric Card</div>
                    <p className="text-slate-400 text-xl">Use for displaying key performance metrics and statistics</p>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === 'badges' && (
              <div className="space-y-16">
                <div className="grid md:grid-cols-3 gap-12">
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-center text-white backdrop-blur-sm">
                    <Badge className="mb-8 bg-violet-500/20 text-violet-300 border-violet-500/30 px-6 py-3 text-xl">
                      Primary Badge
                    </Badge>
                    <p className="text-slate-400 text-lg">Section labels and categories</p>
                  </Card>
                  
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-center text-white backdrop-blur-sm">
                    <Badge variant="secondary" className="mb-8 px-6 py-3 text-xl">
                      Secondary Badge
                    </Badge>
                    <p className="text-slate-400 text-lg">Status indicators and tags</p>
                  </Card>
                  
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-center text-white backdrop-blur-sm">
                    <Badge variant="outline" className="mb-8 border-slate-600 px-6 py-3 text-xl">
                      Outline Badge
                    </Badge>
                    <p className="text-slate-400 text-lg">Subtle classifications</p>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === 'icons' && (
              <div className="space-y-16">
                <div className="grid md:grid-cols-4 gap-12">
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-center text-white backdrop-blur-sm">
                    <div className="w-20 h-20 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-8">
                      <div className="h-10 w-10 text-violet-400"><Zap /></div>
                    </div>
                    <p className="text-slate-400 text-xl">Innovation</p>
                  </Card>
                  
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-center text-white backdrop-blur-sm">
                    <div className="w-20 h-20 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-8">
                      <div className="h-10 w-10 text-violet-400"><Shield /></div>
                    </div>
                    <p className="text-slate-400 text-xl">Strength</p>
                  </Card>
                  
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-center text-white backdrop-blur-sm">
                    <div className="w-20 h-20 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-8">
                      <div className="h-10 w-10 text-violet-400"><Layers /></div>
                    </div>
                    <p className="text-slate-400 text-xl">Materials</p>
                  </Card>
                  
                  <Card className="bg-slate-900/50 border-slate-700 p-12 text-center text-white backdrop-blur-sm">
                    <div className="w-20 h-20 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-8">
                      <div className="h-10 w-10 text-violet-400"><Cpu /></div>
                    </div>
                    <p className="text-slate-400 text-xl">Technology</p>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section id="applications" className="py-32 bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Badge className="mb-8 bg-violet-500/20 text-violet-300 border-violet-500/30 px-6 py-3 text-lg">
              Brand Applications
            </Badge>
            <h2 className="text-6xl md:text-7xl font-bold mb-10 text-white">
              Design Principles
            </h2>
            <p className="text-3xl text-slate-400 max-w-5xl mx-auto leading-relaxed">
              Core principles that guide how we apply our brand across all touchpoints and communications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h3 className="text-4xl font-bold mb-10 flex items-center text-white">
                <div className="mr-6 h-10 w-10 text-violet-400"><Image /></div>
                Visual Style
              </h3>
              
              <div className="space-y-10">
                <div className="p-8 bg-violet-500/10 rounded-2xl border border-violet-500/20">
                  <strong className="text-violet-300 text-2xl">Imagery Style</strong>
                  <p className="text-slate-400 text-xl leading-relaxed mt-4">
                    Hyper-detailed macro photography of fibers, polymers, and molecular lattices; 
                    futuristic lab environments; cinematic industrial close-ups.
                  </p>
                </div>
                
                <div className="p-8 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <strong className="text-violet-300 text-2xl">Lighting</strong>
                  <p className="text-slate-400 text-xl leading-relaxed mt-4">
                    Soft, diffused light with deep shadows for drama; occasional cool blue-violet 
                    glow accents to symbolize energy and molecular activity.
                  </p>
                </div>
                
                <div className="p-8 bg-slate-800/30 rounded-2xl border border-slate-700/30">
                  <strong className="text-violet-300 text-2xl">Composition</strong>
                  <p className="text-slate-400 text-xl leading-relaxed mt-4">
                    Bold negative space to convey scale; focal points on material structures; 
                    cinematic framing with depth-of-field for premium feel.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={molecularStructure} 
                alt="Molecular Structure Example" 
                className="w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 to-transparent rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl" />
              <div className="absolute top-8 left-8">
                <Badge className="bg-slate-900/70 text-white border-slate-700/50 px-6 py-3 text-lg">
                  Molecular Lattice Photography
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <Card className="bg-slate-800/50 border-slate-700 p-12 text-white backdrop-blur-sm">
              <div className="w-20 h-20 bg-violet-500/20 rounded-xl flex items-center justify-center mb-8">
                <div className="h-10 w-10 text-violet-400"><Zap /></div>
              </div>
              <h4 className="text-3xl font-semibold mb-8 text-violet-300">Celestial</h4>
              <p className="text-slate-400 mb-8 text-xl leading-relaxed">
                Grand scale thinking with cosmic perspective. Use expansive layouts, 
                ethereal gradients, and floating elements.
              </p>
              <ul className="text-slate-500 space-y-3 text-lg">
                <li>• Radial gradients</li>
                <li>• Particle effects</li>
                <li>• Expansive white space</li>
              </ul>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 p-12 text-white backdrop-blur-sm">
              <div className="w-20 h-20 bg-violet-500/20 rounded-xl flex items-center justify-center mb-8">
                <div className="h-10 w-10 text-violet-400"><Ruler /></div>
              </div>
              <h4 className="text-3xl font-semibold mb-8 text-violet-300">Scientific</h4>
              <p className="text-slate-400 mb-8 text-xl leading-relaxed">
                Precision and accuracy in every detail. Use structured grids, 
                technical imagery, and data visualization.
              </p>
              <ul className="text-slate-500 space-y-3 text-lg">
                <li>• Grid-based layouts</li>
                <li>• Technical illustrations</li>
                <li>• Performance metrics</li>
              </ul>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 p-12 text-white backdrop-blur-sm">
              <div className="w-20 h-20 bg-violet-500/20 rounded-xl flex items-center justify-center mb-8">
                <div className="h-10 w-10 text-violet-400"><ArrowRight /></div>
              </div>
              <h4 className="text-3xl font-semibold mb-8 text-violet-300">Transformative</h4>
              <p className="text-slate-400 mb-8 text-xl leading-relaxed">
                Emphasize change and evolution. Use dynamic transitions, 
                progressive disclosure, and before/after comparisons.
              </p>
              <ul className="text-slate-500 space-y-3 text-lg">
                <li>• Animated transitions</li>
                <li>• Progressive reveals</li>
                <li>• Comparison visuals</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-950 border-t border-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <Interactive3DLogo size="h-24 w-24" className="mx-auto mb-6 float-animation" />
            <h3 className="text-3xl font-semibold mb-6 text-white">Ready to implement our brand?</h3>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
              Download the complete brand asset package including logos, fonts, and templates.
            </p>
            <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white px-12 py-5 text-xl shadow-2xl hover:shadow-violet-500/50">
              <div className="mr-4 h-7 w-7"><Download /></div>
              Download Complete Guidelines
            </Button>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p className="text-xl">© 2025 Infinite Forge. Brand Guidelines v1.0 - Forging consistent experiences.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}