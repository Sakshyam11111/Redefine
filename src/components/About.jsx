import { useEffect, useRef } from "react";

const AnimatedTitle = ({ title, containerClass }) => {
  return (
    <h2 
      className={containerClass}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
};

const About = () => {
  const clipRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!clipRef.current || !imageContainerRef.current) return;
      
      const rect = clipRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress when element is in view
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      
      if (progress > 0) {
        // Animate the container expansion
        const scale = 0.5 + (progress * 0.5); // From 50% to 100% scale
        const borderRadius = Math.max(0, 20 - (progress * 20)); // From 20px to 0px
        
        imageContainerRef.current.style.transform = `scale(${Math.min(scale, 1)})`;
        imageContainerRef.current.style.borderRadius = `${borderRadius}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="about" className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Header Section */}
      <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-36 pb-12 flex flex-col items-center gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Welcome Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200/50">
          <p className="font-sans font-semibold text-sm sm:text-base uppercase text-purple-700 tracking-wider">
            Welcome to Zentry
          </p>
        </div>

        {/* Main Title */}
        <AnimatedTitle
          title="Disc<b class='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600'>o</b>ver the world's <br /> largest shared <b class='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>a</b>dventure"
          containerClass="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight"
        />

        {/* Description Section */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-2xl text-center space-y-4">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold leading-relaxed">
            The Game of Games begins—your life, now an epic MMORPG
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-3xl">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified{" "}
            <span className="font-semibold text-purple-600">Play Economy</span>
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["Cross-Platform", "Unified Economy", "Global Community", "Epic Adventures"].map((feature, index) => (
              <div 
                key={index}
                className="px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Section with Scroll Animation */}
      <div 
        ref={clipRef}
        className="relative h-screen w-full flex items-center justify-center"
        id="clip"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-40" />
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-30 animation-delay-500" />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse opacity-50 animation-delay-1000" />
        </div>

        {/* Main Image Container */}
        <div 
          ref={imageContainerRef}
          className="relative w-full h-full rounded-none overflow-hidden shadow-2xl transition-all duration-300 ease-out"
          style={{ 
            transform: 'scale(0.5)',
            borderRadius: '20px'
          }}
        >
          {/* Image with Overlay Effects */}
          <img
            src="img/about.webp"
            alt="Zentry Gaming World"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-purple/20" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-end justify-center p-6 sm:p-8">
            <div className="text-center space-y-2">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg">
                Your Adventure Awaits
              </h3>
              <p className="text-white/90 text-sm sm:text-base drop-shadow-md">
                Step into the ultimate gaming experience
              </p>
            </div>
          </div>

          {/* Border Glow Effect */}
          <div className="absolute inset-0 rounded-none border-2 border-gradient-to-r from-purple-400/50 to-blue-400/50 pointer-events-none" />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #8B5CF6 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #3B82F6 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }} />
        </div>
      </div>

      {/* Bottom Call to Action */}
      <div className="relative py-16 px-4 text-center bg-gradient-to-t from-gray-100 to-transparent">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Ready to Begin Your Journey?
          </h3>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join millions of players in the most immersive gaming experience ever created.
          </p>

          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span>Explore Zentry</span>
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;