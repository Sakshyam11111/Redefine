import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Features />
                <Story />
                <Contact />
              </>
            }
          />
          <Route path="/contactpage" element={<ContactPage />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;