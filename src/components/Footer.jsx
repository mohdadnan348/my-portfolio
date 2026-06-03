// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = ({ scrollToSection, refs }) => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', ref: refs.homeRef },
    { name: 'Skills', ref: refs.skillsRef },
    { name: 'Projects', ref: refs.projectsRef },
    { name: 'Contact', ref: refs.contactRef },
  ];

  return (
    <footer className="glass-nav mt-20 py-8 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text">Adnan.
              dev
            </h3>
            <p className="text-gray-400 text-sm mt-1">Full Stack Developer & AI Enthusiast</p>
          </div>
          
          <div className="flex gap-6">
            {quickLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(link.ref)}
                className="text-gray-400 hover:text-orange-400 transition text-sm"
              >
                {link.name}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition text-xl">
              <FiGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition text-xl">
              <FiLinkedin />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition text-xl">
              <FiTwitter />
            </a>
            <a href="mailto:alex@example.com" className="text-gray-400 hover:text-orange-400 transition text-xl">
              <FiMail />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-6 pt-6 text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Adnan.Dev. Built with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}><FiHeart className="text-red-500 inline mx-1" /></motion.span> using React, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;