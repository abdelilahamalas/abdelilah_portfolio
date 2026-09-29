import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import useScrollAnimation from '../hooks/useScrollAnimation';

const PortfolioHome = () => {
  useScrollAnimation();

  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </>
  );
};

export default PortfolioHome;
