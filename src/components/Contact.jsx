import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Gamepad2, Users, Zap, Mail, MessageCircle } from "lucide-react";

// Animated Title Component
const AnimatedTitle = ({ title, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <h1 
      className={`${className} ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
};

// Image Clip Box Component
const ImageClipBox = ({ src, clipClass, alt = "Gaming image" }) => (
  <div className={`${clipClass} transition-transform duration-700 hover:scale-105`}>
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover"
      onError={(e) => {
        // Fallback for missing images
        e.target.style.display = 'none';
      }}
    />
  </div>
);

// Floating particle animation
const FloatingParticle = ({ delay, size, color }) => (
  <div 
    className={`absolute w-${size} h-${size} ${color} rounded-full opacity-20 animate-float`}
    style={{ 
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }}
  />
);

const Contact = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleContactClick = () => {
    console.log("Contact Us button clicked, navigating to /contactpage");
    navigate("/contactpage");
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div id="contact" className="relative min-h-screen w-full px-4 sm:px-6 lg:px-10 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900/20" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle 
            key={i}
            delay={i * 0.5}
            size={Math.random() > 0.5 ? 1 : 2}
            color={Math.random() > 0.5 ? 'bg-blue-500' : 'bg-purple-500'}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div 
          className="relative rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl border border-white/10 py-16 lg:py-24 text-white overflow-hidden shadow-2xl"
          onMouseMove={handleMouseMove}
        >
          {/* Animated background glow */}
          <div 
            className="absolute inset-0 opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent)`
            }}
          />

          {/* Left side decorative images */}
          <div className="absolute -left-10 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-10 lg:w-96 opacity-40">
            <ImageClipBox
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop&crop=faces"
              clipClass="absolute inset-0 clip-path-polygon-1 hover:opacity-60 transition-opacity duration-500"
              alt="Gaming character 1"
            />
            <ImageClipBox
              src="https://images.unsplash.com/photo-1511512578047-dfb367c615c1?w=400&h=600&fit=crop&crop=faces"
              clipClass="absolute inset-0 clip-path-polygon-2 translate-y-32 lg:translate-y-40 hover:opacity-60 transition-opacity duration-500"
              alt="Gaming character 2"
            />
          </div>

          {/* Right side character */}
          <div className="absolute -top-20 right-0 w-60 sm:top-1/2 sm:-translate-y-1/2 md:right-10 lg:top-10 lg:w-80 opacity-30">
            <ImageClipBox
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=faces"
              clipClass="absolute transform hover:scale-110 transition-transform duration-700 filter brightness-75"
              alt="Gaming warrior"
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 lg:px-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-8">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-200 uppercase tracking-wider">
                Join Zentry
              </span>
            </div>

            {/* Animated Title */}
            <AnimatedTitle
              title="let's b<span class='text-blue-400'>u</span>ild the <br /> new era of <br /> g<span class='text-purple-400'>a</span>ming t<span class='text-pink-400'>o</span>gether."
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.9] mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
            />

            {/* Description */}
            <p className="max-w-2xl text-lg text-white/70 mb-12 leading-relaxed">
              Ready to revolutionize gaming? Join our community of innovators, creators, and gamers 
              as we build the future of interactive entertainment together.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={handleContactClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <Mail className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span>Contact Us</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>

              <button className="group flex items-center gap-3 text-white/80 hover:text-white font-medium py-4 px-6 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/5">
                <MessageCircle className="w-5 h-5" />
                <span>Join Community</span>
              </button>
            </div>

            {/* Stats or features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full max-w-2xl">
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <Gamepad2 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-white/60">Active Players</div>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-white/60">Games Integrated</div>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <Users className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">100+</div>
                <div className="text-sm text-white/60">Developers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .clip-path-polygon-1 {
          clip-path: polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 85%);
        }

        .clip-path-polygon-2 {
          clip-path: polygon(20% 0, 100% 0, 80% 100%, 0 100%);
        }
      `}</style>
    </div>
  );
};

export default Contact;