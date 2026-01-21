import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Section from './components/Section';
import Projects from './components/Projects';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <NavBar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Section />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="contact">
          <Home />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;