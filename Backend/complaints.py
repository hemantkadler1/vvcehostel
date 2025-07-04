from flask import Blueprint, request, jsonify
from flask_cors import CORS
import json
import os

complaints_bp = Blueprint('complaints', __name__)
CORS(complaints_bp, methods=["GET", "POST", "DELETE"])  # Enable CORS for needed methods

# File to store complaints
COMPLAINTS_FILE = "complaints.json"

# Load complaints from file
if os.path.exists(COMPLAINTS_FILE):
    with open(COMPLAINTS_FILE, "r") as file:
        try:
            complaints_list = json.load(file)
        except json.JSONDecodeError:
            complaints_list = []
else:
    complaints_list = []

# Function to save complaints to file
def save_complaints():
    with open(COMPLAINTS_FILE, "w") as file:
        json.dump(complaints_list, file, indent=4)

# Route to submit a complaint
@complaints_bp.route("/api/complaints", methods=["POST"])
def submit_complaint():
    data = request.json
    
    if not all(key in data for key in ["name", "roomNo", "description"]):
        return jsonify({"error": "Missing required fields"}), 400

    if not data["description"].strip():
        return jsonify({"error": "Complaint description cannot be empty"}), 400

    complaints_list.append(data)
    save_complaints()
    
    return jsonify({"message": "Complaint submitted successfully!"}), 201

# Route to fetch all complaints
@complaints_bp.route("/api/complaints", methods=["GET"])
def get_complaints():
    return jsonify(complaints_list)

# Route to delete complaint by index
@complaints_bp.route("/api/complaints/<int:complaint_id>", methods=["DELETE"])
def delete_complaint(complaint_id):
    global complaints_list
    if 0 <= complaint_id < len(complaints_list):
        del complaints_list[complaint_id]
        save_complaints()
        return jsonify({"message": "Complaint deleted successfully!"}), 200
    else:
        return jsonify({"error": "Complaint not found"}), 404
    
# Update complaints (e.g., for mark as resolved)
@complaints_bp.route("/api/complaints/update", methods=["PUT"])
def update_complaints():
    updated_list = request.json
    global complaints_list
    complaints_list = updated_list
    save_complaints()
    return jsonify({"message": "Complaints updated successfully"}), 200
