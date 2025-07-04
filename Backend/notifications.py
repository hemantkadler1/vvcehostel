from flask import Blueprint, request, jsonify
from datetime import datetime
import json
import os
import uuid

notifications_bp = Blueprint("notifications", __name__)

DATA_FILE = "notifications_data.json"

# Load notifications safely
def load_notifications():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r") as file:
            data = json.load(file)
            if isinstance(data, list):  # Ensure valid list format
                return data
            return []
    except (json.JSONDecodeError, IOError):
        return []

# Save notifications with error handling
def save_notifications(notifications):
    try:
        with open(DATA_FILE, "w") as file:
            json.dump(notifications, file, indent=4)
    except IOError:
        print("Error: Unable to save notifications!")

# Route to handle GET and POST
@notifications_bp.route("/api/notifications", methods=["GET", "POST"])
def manage_notifications():
    notifications = load_notifications()

    if request.method == "GET":
        return jsonify(notifications), 200

    elif request.method == "POST":
        try:
            new_notification = request.get_json()
            print("Received Notification Data:", new_notification)

            if not new_notification or "title" not in new_notification or "message" not in new_notification:
                print("Error: Invalid notification format")
                return jsonify({"error": "Invalid notification format"}), 400

            # Add UUID and timestamp
            new_notification["id"] = str(uuid.uuid4())
            new_notification["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            # Append and save
            notifications.insert(0, new_notification)
            save_notifications(notifications)

            print("Notification saved successfully!")
            return jsonify({"message": "Notification added successfully"}), 201

        except Exception as e:
            print("Error while saving notification:", str(e))
            return jsonify({"error": str(e)}), 500

# Route to delete a notification
@notifications_bp.route("/api/notifications/<string:notification_id>", methods=["DELETE"])
def delete_notification(notification_id):
    notifications = load_notifications()

    # Filter out the notification with the given ID
    updated_notifications = [n for n in notifications if n.get("id") != notification_id]

    if len(updated_notifications) == len(notifications):
        return jsonify({"error": "Notification not found"}), 404

    save_notifications(updated_notifications)
    return jsonify({"message": "Notification deleted successfully"}), 200
