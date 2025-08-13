import { useState, useRef } from "react";
import { ArrowUpRight, Sparkles, Zap, Users, Bot } from "lucide-react";
import Video1 from "../../public/videos/feature-1.mp4"
import Video2 from "../../public/videos/feature-2.mp4"
import Video3 from "../../public/videos/feature-3.mp4"
import Video4 from "../../public/videos/feature-4.mp4"
import Video5 from "../../public/videos/feature-5.mp4"

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 3;
    const tiltY = (relativeX - 0.5) * -3;

    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, icon: Icon, gradient }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-sm">
      {src && (
        <>
          <video
            src={src}
            loop
            muted
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </>
      )}
      
      {gradient && (
        <div className={`absolute inset-0 ${gradient}`} />
      )}
      
      <div className="relative z-10 flex flex-col justify-between w-full h-full p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {Icon && (
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <Icon className="w-6 h-6 text-white" />
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-bold font-sans text-white mb-3">
              {title}
            </h1>
            {description && (
              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-sm">
                {description}
              </p>
            )}
          </div>
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex w-fit items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium uppercase text-white border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/20"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(120px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255, 255, 255, 0.15), transparent)`,
              }}
            />
            <ArrowUpRight className="relative z-20 w-4 h-4" />
            <span className="relative z-20">Coming Soon</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-200">Into the Metagame Layer</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          The Future of
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Gaming</span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience
          on your world.
        </p>
      </div>

      {/* Main Feature Card */}
      <div className="mb-8">
        <BentoTilt className="w-full">
          <div className="h-[400px] md:h-[500px]">
            <BentoCard
              src={Video1}
              title={
                <>
                  radia<span className="text-blue-400">n</span>t
                </>
              }
              description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
              isComingSoon
              icon={Zap}
            />
          </div>
        </BentoTilt>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {/* Zigma Card */}
        <BentoTilt className="md:col-span-1 lg:col-span-2">
          <div className="h-80">
            <BentoCard
              src={Video2}
              title={
                <>
                  zig<span className="text-purple-400">m</span>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
              isComingSoon
              icon={Sparkles}
            />
          </div>
        </BentoTilt>

        {/* Nexus Card */}
        <BentoTilt>
          <div className="h-80">
            <BentoCard
              src={Video3}
              title={
                <>
                  n<span className="text-green-400">e</span>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
              isComingSoon
              icon={Users}
            />
          </div>
        </BentoTilt>

        {/* Azul Card */}
        <BentoTilt>
          <div className="h-80">
            <BentoCard
              src={Video4}
              title={
                <>
                  az<span className="text-cyan-400">u</span>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
              isComingSoon
              icon={Bot}
            />
          </div>
        </BentoTilt>

        {/* Coming Soon Card */}
        <BentoTilt>
          <div className="h-80">
            <BentoCard
              gradient="bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500"
              title={
                <>
                  M<span className="text-white">o</span>re co<span className="text-white">m</span>ing s<span className="text-white">o</span>on.
                </>
              }
              icon={ArrowUpRight}
            />
          </div>
        </BentoTilt>

        {/* Video Showcase Card */}
        <BentoTilt>
          <div className="h-80">
            <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/10">
              <video
                src={Video5}
                loop
                muted
                autoPlay
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">Live Preview</span>
                </div>
              </div>
            </div>
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;