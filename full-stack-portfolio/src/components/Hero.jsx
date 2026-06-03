// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight, FiMail } from 'react-icons/fi';
import TypingAnimation from './TypingAnimation';

const Hero = ({ scrollToContact }) => {
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/mohdadnan348', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/mohd-adnan-b274b8253/', label: 'LinkedIn' },
   
  ];

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
           Mohd Adnan<br />
            <span className="text-3xl md:text-4xl mt-2 block">I'm a <TypingAnimation /></span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto lg:mx-0 mb-8">
            Building scalable web apps with MERN, PERN, Next.js, and AI integrations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button onClick={scrollToContact} className="btn-primary flex items-center gap-2">
              Hire Me <FiArrowRight />
            </button>
            <button className="btn-outline flex items-center gap-2">
              View Projects <FiArrowRight />
            </button>
          </div>
          <div className="flex gap-5 justify-center lg:justify-start mt-8">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition text-2xl"
                aria-label={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
         <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full glass-card flex items-center justify-center overflow-hidden animate-float">
  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-orange-400/10 rounded-full"></div>

  <img
    src="/logo.png"
    alt="profile"
    className="w-full h-full object-cover rounded-full"
  />
</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;