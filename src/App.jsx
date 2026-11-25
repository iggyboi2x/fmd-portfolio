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
import GitHubActivity from './components/GitHubActivity'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

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
      <GitHubActivity />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  )
}

export default App
