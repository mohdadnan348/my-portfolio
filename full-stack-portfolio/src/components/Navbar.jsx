// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ scrollToSection, refs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', ref: refs.homeRef },
    { name: 'Skills', ref: refs.skillsRef },
    { name: 'Projects', ref: refs.projectsRef },
    { name: 'Contact', ref: refs.contactRef },
  ];

  // ✅ Real resume download function
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume_mohd_adnan.pdf';     // public folder mein file honi chahiye
    link.download = 'Mohd_Adnan_Resume.pdf';  // download hone ka naam
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold gradient-text cursor-pointer"
          onClick={() => scrollToSection(refs.homeRef)}
        >
          Adnan.dev
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(link.ref)}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/80 to-orange-400/80 text-white hover:shadow-lg transition-all"
          >
            <FiDownload /> Resume
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 space-y-4">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    scrollToSection(link.ref);
                    setIsOpen(false);
                  }}
                  className="text-gray-300 hover:text-white text-lg"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  handleDownloadResume();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 text-white"
              >
                <FiDownload /> Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;