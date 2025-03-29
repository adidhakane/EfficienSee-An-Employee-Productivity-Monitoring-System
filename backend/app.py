import logging
import os
import time
import threading
import re
import pymongo
import cv2
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
from keras.models import load_model
from PIL import Image, ImageOps
from pynput import keyboard, mouse
import pygetwindow as gw
from datetime import datetime
from dotenv import load_dotenv
import atexit

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
MODEL_PATH = os.getenv("MODEL_PATH", "C:/Users/Hp/OneDrive/Desktop/Project check/efficiensee_Model.h5")

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Flask App Initialization
app = Flask(__name__)
CORS(app)

# MongoDB Connection
try:
    client = pymongo.MongoClient(MONGO_URI)
    db = client["newEfficienSee_DB"]
    logging.info("✅ Connected to MongoDB")
except Exception as e:
    logging.error(f"❌ MongoDB connection failed: {e}")
    exit(1)

# Load AI Model
try:
    model = load_model(MODEL_PATH)
    class_names = ["Face", "Not Face"]
    logging.info("✅ AI Model loaded successfully")
except Exception as e:
    logging.error(f"❌ Failed to load model: {e}")
    exit(1)

# Monitoring Variables
monitoring = False
active_duration = 0
inactive_duration = 0
total_break_time = 0
break_counter = 0
tab_switch_count = 0
previous_window = None
last_active_time = time.time()

# Constants
IDLE_THRESHOLD = 1
BREAK_THRESHOLD = 5

# Helper Functions
def sanitize_email(email):
    if not email or not isinstance(email, str):
        return ""
    sanitized = email.lower().strip()
    sanitized = re.sub(r'@', '_at_', sanitized)
    sanitized = re.sub(r'\.', '_dot_', sanitized)
    return re.sub(r'[^a-z0-9_]', '', sanitized)

def convert_to_hms(seconds):
    hours, remainder = divmod(int(seconds), 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{hours:02}:{minutes:02}:{seconds:02}"

def preprocess_frame(frame):
    image = Image.fromarray(frame)
    image = ImageOps.fit(image, (224, 224), Image.Resampling.LANCZOS)
    image_array = np.asarray(image) / 255.0
    return np.expand_dims(image_array, axis=0)

def monitor_activity():
    global monitoring, active_duration, inactive_duration, total_break_time, break_counter, tab_switch_count, previous_window, last_active_time
    
    try:
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            raise RuntimeError("Could not open webcam")
    except Exception as e:
        logging.error(f"❌ Webcam error: {e}")
        return

    keyboard_listener = keyboard.Listener(on_press=lambda _: update_last_active())
    mouse_listener = mouse.Listener(on_move=lambda x, y: update_last_active())
    keyboard_listener.start()
    mouse_listener.start()
    monitoring = True
    logging.info("✅ Monitoring started")

    try:
        while monitoring:
            ret, frame = cap.read()
            if not ret:
                logging.warning("⚠️ Could not read frame from webcam")
                break

            input_data = preprocess_frame(frame)
            predictions = model.predict(input_data)
            face_detected = np.argmax(predictions) == 0

            current_time = time.time()
            time_diff = current_time - last_active_time
            
            if face_detected:
                if time_diff > IDLE_THRESHOLD:
                    inactive_duration += 0.1
                else:
                    active_duration += 0.1
            else:
                total_break_time += 0.1
                if total_break_time >= BREAK_THRESHOLD and not break_counter:
                    break_counter += 1

            try:
                current_window = gw.getActiveWindow()
                if current_window and current_window.title != previous_window:
                    tab_switch_count += 1
                    previous_window = current_window.title
            except Exception:
                pass

            if cv2.waitKey(1) == 27:
                break
    finally:
        monitoring = False
        cap.release()
        cv2.destroyAllWindows()
        keyboard_listener.stop()
        mouse_listener.stop()
        logging.info("🛑 Monitoring stopped")

def update_last_active():
    global last_active_time
    last_active_time = time.time()

@app.route("/")
def home():
    return jsonify({"message": "EfficienSee Backend is Running!"})

@app.route("/start_monitoring", methods=["POST"])
def api_start_monitoring():
    global monitoring
    if not monitoring:
        threading.Thread(target=monitor_activity).start()
        return jsonify({"message": "Monitoring started"})
    return jsonify({"message": "Monitoring already running"})

@app.route("/stop_monitoring", methods=["POST"])
def api_stop_monitoring():
    global monitoring, active_duration, inactive_duration, total_break_time, break_counter, tab_switch_count
    monitoring = False  # Stop monitoring

    email = request.json.get("email", "").strip()
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    sanitized_email = sanitize_email(email)  # Convert email into a valid collection name

    # Calculate total elapsed time
    elapsed_time = time.time() - last_active_time  # Time since monitoring started

    # Create record data
    record = {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "elapsed_time": convert_to_hms(elapsed_time),  # Fixed calculation for total monitoring duration
        "tab_switched_count": tab_switch_count,
        "active_duration": convert_to_hms(active_duration),
        "inactive_duration": convert_to_hms(inactive_duration),
        "break_time": convert_to_hms(total_break_time),
        "break_counter": break_counter
    }

    try:
        collection = db[sanitized_email]  # Use sanitized email as collection name
        result = collection.insert_one(record)  # Insert the data
        record["_id"] = str(result.inserted_id)  # Convert ObjectId to string

        logging.info(f"✅ Data inserted into collection: {sanitized_email}")
        return jsonify({"status": "success", "collection": sanitized_email, "data": record})
    
    except Exception as e:
        logging.error(f"❌ Database error: {e}")
        return jsonify({"error": str(e)}), 500

@atexit.register
def cleanup():
    cv2.destroyAllWindows()
    logging.info("🧹 Cleaned up resources")

if __name__ == "__main__":
    logging.info("🚀 Starting Employee Monitoring System...")
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port)
