import { useState } from 'react';
import { Mail, MapPin, Phone, Send, User, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion

// Mock AnimatedTitle component
const AnimatedTitle = ({ title, className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className={`animate-pulse ${className}`}
  >
    {title}
  </motion.div>
);

// Mock Button component
const Button = ({ title, containerClass, onClick, children }) => (
  <button className={containerClass} onClick={onClick}>
    {children || title}
  </button>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-full bg-black relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-bounce"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 px-6 py-20 lg:px-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="text-center mb-16"
            >
              <AnimatedTitle
                title="Get In Touch"
                className="special-font text-6xl lg:text-7xl font-black leading-none bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
              >
                Ready to start your next project? We'd love to hear from you.
                Send us a message and we'll respond as soon as possible.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20"
            >
              {/* Contact Info */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Email</p>
                        <p className="text-white font-medium">redefind111@gmail.com</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Phone</p>
                        <p className="text-white font-medium">(+ 977) 123-456-789</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.4 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Office</p>
                        <p className="text-white font-medium">123 Business, Kathmandu, Nepal</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">24h</div>
                    <div className="text-gray-300 text-sm">Response Time</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">100+</div>
                    <div className="text-gray-300 text-sm">Happy Clients</div>
                  </div>
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1 }}
                    className="relative"
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-blue-400' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                    className="relative"
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-400' : 'text-gray-400'}`} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.4 }}
                    className="relative"
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <MessageCircle className={`absolute left-3 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'message' ? 'text-blue-400' : 'text-gray-400'}`} />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={5}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your project..."
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.6 }}
                  >
                    <Button
                      containerClass={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 1, delay: 1.8 + i * 0.1 }}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactPage;