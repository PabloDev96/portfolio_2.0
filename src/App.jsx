import { motion } from 'framer-motion';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Section from './components/Section';
import Projects from './components/Projects';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-900">
      <NavBar />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <Section />
      <div id="projects">
        <Projects />
      </div>
      <Home />
      <Footer />
    </div>
  );
}

export default App;