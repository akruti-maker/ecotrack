import { Link } from "react-router-dom";
import "./LandingPage.css";
import heroImage from "../assets/hero.png";
import {
  FaLeaf,
  FaBolt,
  FaTint,
  FaRecycle,
 
} from "react-icons/fa";

function LandingPage() {
  return (
    <div className="landing">

      {/* Background Blur */}
      <div className="bg1"></div>
      <div className="bg2"></div>

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">
          <FaLeaf /> EcoTrack
        </h2>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <Link to="/login">
  <button className="login-btn">Login</button>
</Link>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-left">
          <span className="tag">
            🌿 Sustainable Living Made Easy
          </span>

          <h1>
            Track Your
            <span> Carbon Footprint</span>
            <br />
            Build a Greener Tomorrow
          </h1>

          <p>
            EcoTrack helps you monitor electricity, water,
            fuel usage and waste generation while calculating
            your carbon footprint with beautiful insights and
            personalized eco-friendly recommendations.
          </p>

          <div className="hero-buttons">
           <Link to="/login" className="link-btn">
  <button className="primary-btn">
    Get Started
  </button>
</Link>

            <a href="#about" className="link-btn">
  <button className="secondary-btn">
    Learn More
  </button>
</a>
          </div>

          <div className="stats">
            <div>
              <h3>10K+</h3>
              <p>Users</p>
            </div>

            <div>
              <h3>50K+</h3>
              <p>CO₂ Saved</p>
            </div>

            <div>
              <h3>95%</h3>
              <p>Accuracy</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src={heroImage} alt="Eco Dashboard" />
        </div>

      </section>

      {/* Features */}
      <section className="features" id="features">

        <h2>Our Features</h2>

        <div className="feature-grid">

          <div className="card">
            <FaBolt className="icon" />
            <h3>Electricity Tracking</h3>
            <p>
              Monitor daily electricity consumption
              and reduce unnecessary usage.
            </p>
          </div>

          <div className="card">
            <FaTint className="icon" />
            <h3>Water Monitoring</h3>
            <p>
              Keep track of water usage and conserve
              valuable natural resources.
            </p>
          </div>

          <div className="card">
            <FaRecycle className="icon" />
            <h3>Waste Management</h3>
            <p>
              Record waste generation and improve
              recycling habits efficiently.
            </p>
          </div>

          <div className="card">
            <FaLeaf className="icon" />
            <h3>Carbon Calculator</h3>
            <p>
              Calculate your carbon footprint and
              receive sustainability insights.
            </p>
          </div>

        </div>

      </section>

      {/* About */}
      <section className="about" id="about">

        <h2>Why EcoTrack?</h2>

        <p>
          EcoTrack is an all-in-one sustainability platform that
          empowers individuals to monitor resource consumption,
          reduce carbon emissions, and adopt eco-friendly habits.
          Through interactive dashboards, reports, and AI-powered
          recommendations, EcoTrack makes sustainable living simple
          and engaging.
        </p>

      </section>

      {/* Contact Section */}

<section className="contact" id="contact">

  <h2>Contact Us</h2>

  <p>
    We'd love to hear your feedback or answer your questions.
  </p>

  <div className="contact-info">

    <div className="contact-card">
      <h3>📧 Email</h3>
      <p>support@ecotrack.com</p>
    </div>

    <div className="contact-card">
      <h3>📞 Phone</h3>
      <p>+91 98765 43210</p>
    </div>

    <div className="contact-card">
      <h3>📍 Address</h3>
      <p>Mumbai, Maharashtra, India</p>
    </div>

  </div>

</section>





{/* Footer */}

<footer className="footer">
  <p>© 2026 EcoTrack | Built for a Sustainable Future 🌱</p>
</footer>

    </div>
  );
}

export default LandingPage;