// src/App.jsx
import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3D';


function App() {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <Background3D />
      <Navbar scrollToSection={scrollToSection} refs={{ homeRef, skillsRef, projectsRef, contactRef }} />
      <main>
        <section ref={homeRef} id="home">
          <Hero scrollToContact={() => scrollToSection(contactRef)} />
        </section>
        <section ref={skillsRef} id="skills">
          <Skills />
        </section>
        <section ref={projectsRef} id="projects">
          <Projects />
        </section>
        <section ref={contactRef} id="contact">
          <Contact />
        </section>
      </main>
      <Footer scrollToSection={scrollToSection} refs={{ homeRef, skillsRef, projectsRef, contactRef }} />
    </div>
  );
}

export default App;