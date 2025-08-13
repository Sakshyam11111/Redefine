import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord />, label: "Discord" },
  { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
  { href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
  { href: "https://medium.com", icon: <FaMedium />, label: "Medium" },
];

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-screen bg-black py-10 text-blue-50 overflow-x-hidden"
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-6 md:flex-row md:gap-0 max-w-full">
        {/* Copyright Section */}
        <p className="font-circular-web text-sm font-light text-center md:text-left">
          © Sakshyam 2025. All rights reserved
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${link.label} page`}
              className="text-blue-50 transition-all duration-300 ease-in-out transform hover:scale-125 hover:underline"
            >
              <span className="text-2xl">{link.icon}</span>
            </a>
          ))}
        </div>

        {/* Privacy Policy Link */}
        <a
          href="#privacy-policy"
          className="font-circular-web special-font text-sm font-light text-center transition-all duration-300 hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;