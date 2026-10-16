import './index.css'
import { useMagneticButtons, useScrollReveal } from './effects'
import Navbar from './components/Navbar'
import RouteLine from './components/RouteLine'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useScrollReveal()
  useMagneticButtons()

  return (
    <>
      <Navbar />
      <RouteLine />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  )
}

export default App
