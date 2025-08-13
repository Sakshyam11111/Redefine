import { useEffect, useRef, useState } from "react";
import { TiLocationArrow, TiTimes, TiThMenu } from 'react-icons/ti';

const navItems = ["Home", "Vault", "Prologue", "About", "Contact"];

const Button = ({ id, title, rightIcon, containerClass, onClick }) => (
  <button
    id={id}
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${containerClass}`}
  >
    <span className="flex items-center gap-2">
      {title}
      {rightIcon}
    </span>
  </button>
);

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const audioElementRef = useRef(null);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isAudioPlaying && audioElementRef.current) {
      audioElementRef.current.play();
    } else if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <img
                  src="/img/logo.png"
                  alt="logo"
                  className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                />
              </div>
              
              {/* Products Button - Hidden on mobile */}
              <div className="hidden lg:block">
                <Button
                  id="product-button"
                  title="Products"
                  rightIcon={<TiLocationArrow className="w-4 h-4" />}
                  containerClass="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item === "Home" ? "/" : item === "Contact" ? "/contactpage" : `#${item.toLowerCase()}`}
                  onClick={item === "Home" ? handleHomeClick : undefined}
                  className="text-white hover:text-purple-300 transition-all duration-300 text-sm font-medium relative group py-2"
                >
                  {item}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              ))}
            </div>

            {/* Audio Indicator & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Audio Indicator */}
              <button
                onClick={toggleAudioIndicator}
                className="flex items-center space-x-1 p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                aria-label="Toggle audio"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isIndicatorActive
                        ? 'h-6 bg-gradient-to-t from-purple-400 to-blue-400 animate-pulse'
                        : 'h-4 bg-white/60'
                    }`}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white hover:text-purple-300 transition-colors duration-300 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <TiTimes className="w-6 h-6" />
                ) : (
                  <TiThMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        isMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-16 left-4 right-4 bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 transform ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-4 opacity-0'
        }`}>
          <div className="p-6 space-y-4">
            {/* Products Button - Mobile */}
            <div className="mb-6">
              <Button
                id="product-button-mobile"
                title="Products"
                rightIcon={<TiLocationArrow className="w-4 h-4" />}
                containerClass="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                onClick={handleNavClick}
              />
            </div>
            
            {/* Navigation Items */}
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item === "Home" ? "#" : item === "Contact" ? "/contactpage" : `#${item.toLowerCase()}`}
                  onClick={item === "Home" ? handleHomeClick : handleNavClick}
                  className="block px-4 py-3 text-white hover:text-purple-300 hover:bg-white/5 rounded-lg transition-all duration-300 text-lg font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;