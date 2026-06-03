// src/components/TypingAnimation.jsx
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypingAnimation = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['MERN Expert', 'Full Stack Developer', 'Next.js Specialist', 'AI Integrator', 'PERN Stack Dev'],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
    return () => typed.destroy();
  }, []);

  return <span ref={el} className="gradient-text"></span>;
};

export default TypingAnimation;