import { useState, useRef, useEffect } from "react";
import { Play, Sparkles, Eye, ArrowRight, Volume2 } from "lucide-react";

// AnimatedTitle Component
const AnimatedTitle = ({ title, containerClass = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 
      className={`${containerClass} transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
};

// Button Component
const Button = ({ id, title, containerClass, onClick, icon: Icon = ArrowRight }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      id={id}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${containerClass} group relative overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <span className="relative z-10 flex items-center gap-2 font-medium">
        {title}
        <Icon className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
      </span>
    </button>
  );
};

// Floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float-slow"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${8 + Math.random() * 4}s`
        }}
      />
    ))}
  </div>
);

// Parallax Background
const ParallaxBackground = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="relative"
      style={{ transform: `translateY(${scrollY * 0.1}px)` }}
    >
      {children}
    </div>
  );
};

const FloatingImage = () => {
  const frameRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -8;
    const rotateY = ((xPos - centerX) / centerX) * 8;

    // Smooth CSS transitions instead of GSAP
    if (element) {
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    setMousePosition({ x: xPos, y: yPos });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (element) {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      element.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    setShowPlayButton(false);
  };

  const handleMouseEnter = () => {
    setShowPlayButton(true);
  };

  const handleDiscoverClick = () => {
    console.log("Discover prologue clicked");
    // Add your navigation logic here
  };

  const handlePlayVideo = () => {
    console.log("Play video clicked");
    // Add video play logic here
  };

  return (
    <div id="story" className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-blue-900/10" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" 
             style={{ animationDuration: '4s' }} />
      </div>

      <FloatingParticles />

      <div className="relative flex flex-col items-center w-full min-h-screen py-8 md:py-12">
        {/* Top badge */}
        <div className="absolute top-8 z-30 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-200 uppercase tracking-wider">
              The Multiversal IP World
            </span>
          </div>
        </div>

        {/* Main content wrapper */}
        <div className="relative w-full h-screen flex flex-col">
          {/* Animated title */}
          <AnimatedTitle
            title="the st<span class='text-blue-400'>o</span>ry of <br /> a hidden real<span class='text-purple-400'>m</span>"
            containerClass="absolute top-24 md:top-32 left-1/2 transform -translate-x-1/2 text-white text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight z-30 mix-blend-difference pointer-events-none"
          />

          {/* Image container with enhanced effects */}
          <div className="relative flex-1 mx-4 md:mx-8 lg:mx-16 mt-32 md:mt-40 mb-32">
            <div 
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
            >
              {/* Loading state */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-2xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-gray-600 animate-pulse" />
                </div>
              )}

              {/* Main image */}
              <img
                ref={frameRef}
                src="/img/entrance.webp"
                alt="Hidden Realm Entrance"
                className="w-full h-full object-cover transition-all duration-300"
                onLoad={() => setIsImageLoaded(true)}
                onError={(e) => {
                  // Keep the original image path as fallback
                  e.target.src = "/img/entrance.webp";
                }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 rounded-2xl" />

              {/* Interactive glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent)`
                }}
              />

              {/* Play button overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                showPlayButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}>
                <button
                  onClick={handlePlayVideo}
                  className="group/play flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
                >
                  <Play className="w-8 h-8 text-white ml-1 group-hover/play:scale-110 transition-transform duration-300" />
                </button>
              </div>

              {/* Corner decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-pink-400/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50 rounded-br-lg" />
            </div>
          </div>

          {/* Bottom content */}
          <ParallaxBackground>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6 z-30">
              <div className="text-center space-y-6">
                {/* Description with enhanced styling */}
                <div className="relative p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
                  <p className="text-white/90 text-base md:text-lg leading-relaxed font-medium">
                    Where realms converge, lies <span className="text-blue-400 font-bold">Zentry</span> and the boundless pillar.
                    Discover its secrets and shape your fate amidst infinite opportunities.
                  </p>
                  
                  {/* Ambient sound toggle */}
                  <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300">
                    <Volume2 className="w-4 h-4 text-white/70" />
                  </button>
                </div>

                {/* Enhanced CTA button */}
                <Button
                  id="realm-btn"
                  title="Discover Prologue"
                  onClick={handleDiscoverClick}
                  icon={Eye}
                  containerClass="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-blue-500/25 border border-white/20"
                />

                {/* Additional info */}
                <div className="flex items-center justify-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Interactive Experience
                  </span>
                  <span>•</span>
                  <span>4K Quality</span>
                </div>
              </div>
            </div>
          </ParallaxBackground>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
        }

        .animate-float-slow {
          animation: float-slow linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingImage;