from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import io
from PIL import Image
import tensorflow as tf
import pyttsx3
import threading

app = Flask(__name__)
CORS(app)

# Initialize text-to-speech engine
tts_engine = pyttsx3.init()

# Load pre-trained model (using COCO dataset classes)
class_names = [
    'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck',
    'boat', 'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench',
    'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra',
    'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
    'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove',
    'skateboard', 'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup',
    'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple', 'sandwich', 'orange',
    'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
    'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse',
    'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 'toaster', 'sink',
    'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear', 'hair drier',
    'toothbrush'
]

# Load model (you can replace this with your custom trained model)
try:
    model = tf.keras.applications.MobileNetV2(weights='imagenet')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def speak_text(text):
    """Speak text in a separate thread"""
    def speak():
        try:
            tts_engine.say(text)
            tts_engine.runAndWait()
        except Exception as e:
            print(f"Error in text-to-speech: {e}")
    
    thread = threading.Thread(target=speak)
    thread.daemon = True
    thread.start()

def preprocess_image(image):
    """Preprocess image for model inference"""
    image = cv2.resize(image, (224, 224))
    image = tf.keras.applications.mobilenet_v2.preprocess_input(image)
    image = np.expand_dims(image, axis=0)
    return image

def detect_objects(image):
    """Detect objects in image using pre-trained model"""
    if model is None:
        return ["model not available"]
    
    try:
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Make prediction
        predictions = model.predict(processed_image)
        decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(
            predictions, top=3
        )
        
        # Extract class names with high confidence
        detected_objects = []
        for _, class_name, confidence in decoded_predictions[0]:
            if confidence > 0.5:  # Confidence threshold
                detected_objects.append(class_name)
        
        return detected_objects if detected_objects else ["no objects detected"]
    
    except Exception as e:
        print(f"Error in object detection: {e}")
        return ["error in detection"]

@app.route('/detect', methods=['POST'])
def detect():
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image'].split(',')[1]  # Remove data:image/jpeg;base64,
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Detect objects
        detected_objects = detect_objects(image)
        
        # Speak detected objects
        if detected_objects and detected_objects[0] != "no objects detected":
            speak_text(f"Detected {', '.join(detected_objects)}")
        
        return jsonify({
            'detected_objects': detected_objects,
            'message': 'Detection completed successfully'
        })
        
    except Exception as e:
        print(f"Error in detection endpoint: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)