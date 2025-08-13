import { useEffect, useRef, useState } from "react";

// Custom SVG Icons
const LocationArrowIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L13.09 8.26L22 12L13.09 15.74L12 22L10.91 15.74L2 12L10.91 8.26L12 2Z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const Button = ({ id, title, leftIcon, containerClass, onClick }) => (
  <button
    id={id}
    onClick={onClick}
    className={`rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${containerClass}`}
  >
    <span className="flex items-center justify-center gap-2">
      {leftIcon}
      {title}
    </span>
  </button>
);

const VideoPreview = ({ children }) => (
  <div className="relative w-full h-full group">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300" />
    <div className="absolute inset-0 flex items-center justify-center">
      <PlayIcon />
    </div>
    {children}
  </div>
);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const currentVideoRef = useRef(null);
  const frameRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    const nextIndex = (currentIndex % totalVideos) + 1;
    setCurrentIndex(nextIndex);
    
    // Simple transition without GSAP
    if (nextVdRef.current && currentVideoRef.current) {
      nextVdRef.current.style.opacity = '0';
      nextVdRef.current.style.transform = 'scale(0.8)';
      nextVdRef.current.style.visibility = 'visible';
      
      // Animate in
      setTimeout(() => {
        nextVdRef.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        nextVdRef.current.style.opacity = '1';
        nextVdRef.current.style.transform = 'scale(1)';
        nextVdRef.current.play();
      }, 50);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (frameRef.current) {
        const scrollY = window.scrollY;
        const progress = Math.min(scrollY / (window.innerHeight * 0.5), 1);
        
        // Simple border radius animation on scroll
        const borderRadius = `${progress * 20}px`;
        frameRef.current.style.borderRadius = `0 0 ${borderRadius} ${borderRadius}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Enhanced Loading Screen */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-300/20 border-t-purple-400 rounded-full animate-spin mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-300/20 border-t-blue-400 rounded-full animate-spin animation-delay-75"></div>
          </div>
          <div className="text-white text-lg font-medium animate-pulse">Loading Experience...</div>
          <div className="mt-2 text-purple-300 text-sm">{Math.round((loadedVideos / (totalVideos - 1)) * 100)}%</div>
        </div>
      )}

      {/* Main Video Frame */}
      <div
        ref={frameRef}
        id="video-frame"
        className="relative z-10 h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 rounded-none"
      >
        {/* Video Container */}
        <div className="relative w-full h-full">
          {/* Mini Video Preview */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 cursor-pointer">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="relative w-full h-full opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <video
                  ref={currentVideoRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  className="w-full h-full object-cover rounded-lg"
                  onLoadedData={handleVideoLoad}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg" />
              </div>
            </VideoPreview>
          </div>

          {/* Next Video (Transition) */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute inset-0 w-full h-full object-cover invisible opacity-0"
            onLoadedData={handleVideoLoad}
          />

          {/* Main Background Video */}
          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={handleVideoLoad}
          />

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-40 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Top Content */}
          <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-none">
                REDEFIN<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">N</span>E
              </h1>
              
              <div className="max-w-md space-y-4">
                <p className="text-base sm:text-lg md:text-xl text-blue-100/90 font-light leading-relaxed">
                  Enter the <span className="font-semibold text-white">Metagame Layer</span>
                  <br />
                  Unleash the <span className="font-semibold text-purple-300">Play Economy</span>
                </p>

                <Button
                  id="watch-trailer"
                  title="Watch Trailer"
                  leftIcon={<LocationArrowIcon />}
                  containerClass="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 sm:px-8 sm:py-4 shadow-lg hover:shadow-xl border border-yellow-300/50 hover:border-yellow-200"
                />
              </div>
            </div>
          </div>

          {/* Bottom Right Gaming Text */}
          <div className="self-end">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white/10 tracking-wider leading-none">
              G<span className="text-white/20">A</span>MING
            </h1>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40 animation-delay-500" />
        <div className="absolute top-1/3 left-1/6 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-50 animation-delay-1000" />
      </div>

      {/* Bottom Gaming Text (Outside Frame) */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800/30 tracking-wider leading-none">
          G<span className="text-gray-700/40">A</span>MING
        </h1>
      </div>

      {/* Video Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex space-x-2">
        {Array.from({ length: totalVideos }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i + 1)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === i + 1
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;