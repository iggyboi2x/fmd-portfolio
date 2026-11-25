import './index.css'
import { useMagneticButtons, useScrollReveal } from './effects'
import Navbar from './components/Navbar'
import RouteLine from './components/RouteLine'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Awards from './components/Awards'
import Education from './components/Education'
import Certifications from './components/Certifications'
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
      <Education />
      <Skills />
      <Projects />
      <Awards />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}

export default App
