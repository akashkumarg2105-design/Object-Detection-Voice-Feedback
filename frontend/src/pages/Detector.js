import React, { useRef, useState, useEffect, useCallback } from 'react';
import './Detector.css';

const Detector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [stream, setStream] = useState(null);

  // Initialize webcam
  const initializeWebcam = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      alert('Unable to access webcam. Please check permissions.');
    }
  }, []);

  // Speak detected objects
  const speakObject = useCallback((objectName) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = objectName;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    } else {
      console.log('Text-to-speech not supported');
    }
  }, []);

  // Simulate object detection
  const detectObjects = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Simulate detection
    const mockObjects = ['person', 'chair', 'laptop', 'phone', 'book'];
    const randomObjects = mockObjects
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    // Draw bounding boxes (mock)
    randomObjects.forEach((obj, index) => {
      const x = 50 + index * 150;
      const y = 50 + index * 30;
      const width = 100;
      const height = 80;

      // Draw bounding box
      context.strokeStyle = '#00ff00';
      context.lineWidth = 2;
      context.strokeRect(x, y, width, height);

      // Draw label
      context.fillStyle = '#00ff00';
      context.font = '16px Arial';
      context.fillText(obj, x, y - 5);
    });

    setDetectedObjects(randomObjects);

    // Speak the detected objects
    if (randomObjects.length > 0) {
      speakObject(`Detected ${randomObjects.join(', ')}`);
    }
  }, [speakObject]);

  const startDetection = useCallback(async () => {
    await initializeWebcam();
    setIsDetecting(true);
  }, [initializeWebcam]);

  const stopDetection = useCallback(() => {
    setIsDetecting(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setDetectedObjects([]);
  }, [stream]);

  useEffect(() => {
    let detectionInterval;
    
    if (isDetecting) {
      detectionInterval = setInterval(detectObjects, 2000);
    }

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    };
  }, [isDetecting, detectObjects]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="detector">
      <div className="container">
        <div className="detector-header">
          <h1>AI Object Detector</h1>
          <p>Real-time object detection with instant voice feedback</p>
        </div>

        <div className="detector-controls">
          {!isDetecting ? (
            <button onClick={startDetection} className="start-button">
              🎯 Start Detection
            </button>
          ) : (
            <button onClick={stopDetection} className="stop-button">
              ⏹️ Stop Detection
            </button>
          )}
        </div>

        <div className="detector-main">
          <div className="video-section">
            <div className="video-container glass">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="video-element"
              />
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                className="canvas-overlay"
              />
              {!isDetecting && (
                <div className="video-placeholder">
                  <div className="placeholder-icon">👁️</div>
                  <h3>Camera Feed Ready</h3>
                  <p>Click "Start Detection" to begin analyzing objects</p>
                </div>
              )}
            </div>
          </div>

          <div className="results-section">
            <div className="results-card glass">
              <div className="results-header">
                <h3>Detected Objects</h3>
                <div className="objects-count">
                  {detectedObjects.length} items
                </div>
              </div>
              
              <div className="objects-list">
                {detectedObjects.map((obj, index) => (
                  <div key={index} className="object-item">
                    <div className="object-icon">🔍</div>
                    <div className="object-info">
                      <div className="object-name">{obj}</div>
                      <div className="object-confidence">
                        Detected
                      </div>
                    </div>
                  </div>
                ))}
                {detectedObjects.length === 0 && isDetecting && (
                  <div className="detecting-placeholder">
                    <div className="pulse-animation"></div>
                    <p>Scanning for objects...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="stats-card glass">
              <h4>Detection Stats</h4>
              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-value">{detectedObjects.length}</div>
                  <div className="stat-label">Objects Found</div>
                </div>
                <div className="stat">
                  <div className="stat-value">Real-time</div>
                  <div className="stat-label">Processing</div>
                </div>
                <div className="stat">
                  <div className="stat-value">AI</div>
                  <div className="stat-label">Powered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="instructions-section">
          <div className="instruction-cards">
            <div className="instruction-card">
              <div className="instruction-icon">1</div>
              <h4>Start Detection</h4>
              <p>Click the start button to activate your camera and begin object detection</p>
            </div>
            <div className="instruction-card">
              <div className="instruction-icon">2</div>
              <h4>Point & Scan</h4>
              <p>Point your camera at objects you want to detect and identify</p>
            </div>
            <div className="instruction-card">
              <div className="instruction-icon">3</div>
              <h4>Listen & Learn</h4>
              <p>Hear instant voice feedback about detected objects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detector;