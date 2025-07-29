import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-black min-h-screen">
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section id="home">
            <Hero />
          </section>

          {/* About Section */}
          <About />

          {/* Skills Section */}
          <Skills />

          {/* Projects Section */}
          <Projects />

          {/* Experience Section */}
          <Experience />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast Notifications */}
        <Toaster />
      </div>
    </Router>
  );
}

export default App;