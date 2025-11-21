import React from 'react';
import './WhyUs.css';

const WhyUs = () => {
  return (
    <div className="why-us">
      <div className="container">
        <h1>Why Choose VoiceDetect?</h1>
        
        <div className="reasons">
          <div className="reason-card">
            <h3>🚀 Advanced AI Technology</h3>
            <p>Our system uses state-of-the-art object detection algorithms powered by deep learning models for accurate and fast detection.</p>
          </div>

          <div className="reason-card">
            <h3>🎯 Real-time Processing</h3>
            <p>Experience seamless real-time object detection with instant voice feedback, making it perfect for various applications.</p>
          </div>

          <div className="reason-card">
            <h3>👁️ Accessibility Focused</h3>
            <p>Voice feedback makes our technology accessible to visually impaired users, enhancing independence and user experience.</p>
          </div>

          <div className="reason-card">
            <h3>🔒 Privacy First</h3>
            <p>We prioritize your privacy. All processing happens locally whenever possible, and we don't store your personal data.</p>
          </div>

          <div className="reason-card">
            <h3>💡 Easy to Use</h3>
            <p>Simple interface designed for users of all technical levels. Just click and start detecting objects with voice feedback.</p>
          </div>

          <div className="reason-card">
            <h3>🌐 Cross-Platform</h3>
            <p>Works seamlessly across different devices and browsers, ensuring you can access our technology anywhere, anytime.</p>
          </div>
        </div>

        <div className="technology-stack">
          <h2>Our Technology Stack</h2>
          <div className="stack-items">
            <div className="stack-item">React.js</div>
            <div className="stack-item">Node.js</div>
            <div className="stack-item">Python</div>
            <div className="stack-item">TensorFlow</div>
            <div className="stack-item">OpenCV</div>
            <div className="stack-item">MongoDB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;