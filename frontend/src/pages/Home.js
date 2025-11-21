import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import './Home.css';

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: '🚀',
      title: 'Real-time AI Detection',
      description: 'Advanced computer vision algorithms detect objects instantly with high accuracy.'
    },
    {
      icon: '🎯',
      title: 'Voice Feedback',
      description: 'Get instant audio feedback about detected objects for enhanced accessibility.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data stays on your device. No images are stored on our servers.'
    },
    {
      icon: '💡',
      title: 'Easy to Use',
      description: 'Simple interface that works seamlessly across all devices and browsers.'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized performance with minimal latency for real-time processing.'
    },
    {
      icon: '🌐',
      title: 'Cross Platform',
      description: 'Works perfectly on desktop, tablet, and mobile devices.'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ AI-Powered Vision Technology
          </div>
          <h1>See the World Through AI Eyes</h1>
          <p>
            Experience revolutionary object detection with real-time voice feedback. 
            Powered by cutting-edge artificial intelligence for enhanced accessibility 
            and user experience.
          </p>
          <div className="hero-buttons">
            {currentUser ? (
              <Link to="/detector" className="btn btn-primary">
                🎯 Start Detecting
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">
                  Get Started Free
                </Link>
                <Link to="/why-us" className="btn btn-secondary">
                  Learn More
                </Link>
              </>
              
            )}
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat">
              <div className="stat-number">50ms</div>
              <div className="stat-label">Response Time</div>
            </div>
            <div className="stat">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Objects</div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose VisionVoice AI?</h2>
            <p className="subtitle">
              Experience the future of computer vision with our advanced AI-powered platform
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience AI Vision?</h2>
            <p>
              Join thousands of users who are already exploring the world with enhanced vision capabilities. 
              Start detecting objects with voice feedback today!
            </p>
            {currentUser ? (
              <Link to="/detector" className="btn btn-accent">
                🎯 Launch Detector
              </Link>
            ) : (
              <Link to="/signup" className="btn btn-accent">
                Start Free Trial
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;