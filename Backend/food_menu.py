from flask import Blueprint, request, jsonify
import json, os

food_bp = Blueprint("food", __name__)
DATA_FILE = "food_menu.json"

# Helper functions to load and save food menu
def load_menu():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as file:
        return json.load(file)

def save_menu(data):
    with open(DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)

# Main route to handle GET, POST, PUT, DELETE
@food_bp.route("/api/foodmenu", methods=["GET", "POST", "PUT", "DELETE"])
def food_menu():
    menu = load_menu()

    if request.method == "GET":
        return jsonify(menu)

    elif request.method == "POST":
        new_entry = request.get_json()
        menu.append(new_entry)
        save_menu(menu)
        return jsonify({"message": "Food item added"}), 201

    elif request.method == "PUT":
        updated = request.get_json()
        for i, day in enumerate(menu):
            if day["day"].lower() == updated["day"].lower():
                menu[i] = updated
                save_menu(menu)
                return jsonify({"message": "Updated"}), 200
        return jsonify({"error": "Day not found"}), 404

    elif request.method == "DELETE":
        day = request.args.get("day")
        menu = [item for item in menu if item["day"].lower() != day.lower()]
        save_menu(menu)
        return jsonify({"message": "Deleted"}), 200
