from flask import Blueprint, request, jsonify
from flask_cors import CORS
import json
import os

student_bp = Blueprint('student_bp', __name__)
CORS(student_bp)

DATA_FILE = 'students_data.json'

# Load data from file
def load_students():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    except json.JSONDecodeError:
        print("❌ Error: Failed to decode JSON data.")
        return []

# Save data to file
def save_students(data):
    try:
        with open(DATA_FILE, 'w') as file:
            json.dump(data, file, indent=2)
    except Exception as e:
        print(f"❌ Error saving data: {e}")

# 🔍 Find student by USN
def find_student(usn, students):
    return next((student for student in students if student["usn"] == usn), None)

# 📥 GET all students
@student_bp.route('/api/students', methods=['GET'])
def get_students():
    students = load_students()
    return jsonify(students), 200

# ➕ POST new student
@student_bp.route('/api/students', methods=['POST'])
def add_student():
    students = load_students()
    data = request.json

    required_fields = ["usn", "name", "branch", "year", "phone", "room_no", "place", 
                       "college_email", "personal_email", "address", "father_phone", 
                       "fees_paid", "hostel"]

    if not all(field in data for field in required_fields):
        return jsonify({'message': '⚠️ Missing required fields'}), 400

    if find_student(data['usn'], students):
        return jsonify({'message': '⚠️ Student with this USN already exists'}), 409

    students.append(data)
    save_students(students)
    return jsonify({'message': '✅ Student added successfully'}), 201

# ✏️ PUT update student
@student_bp.route('/api/students/<usn>', methods=['PUT'])
def update_student(usn):
    students = load_students()
    data = request.json

    print(f"🔄 Updating student with USN: {usn}")  # Debugging
    print("📌 Received Update Data:", data)  # Debugging

    for student in students:
        if student["usn"] == usn:
            student.update(data)
            save_students(students)
            print("✅ Student updated successfully!")  # Debugging
            return jsonify({'message': '✅ Student updated successfully'}), 200

    print("❌ Student not found!")  # Debugging
    return jsonify({'message': '❌ Student not found'}), 404

# ❌ DELETE student
@student_bp.route('/api/students/<usn>', methods=['DELETE'])
def delete_student(usn):
    students = load_students()
    updated_students = [s for s in students if s["usn"] != usn]

    if len(students) == len(updated_students):
        return jsonify({'message': '❌ Student not found'}), 404  

    save_students(updated_students)
    return jsonify({'message': '✅ Student deleted successfully'}), 200

# 🏠 GET students in a specific room and hostel
@student_bp.route('/api/rooms/<int:room_number>', methods=['GET'])
def get_students_in_room(room_number):
    students = load_students()
    hostel_type = request.args.get('hostel')  # Get hostel type from query params

    if not hostel_type:
        return jsonify({"message": "⚠️ Hostel type is required"}), 400

    # Debugging output
    print("📌 All Students:", students)  
    print("🏠 Room Number:", room_number)
    print("🏢 Hostel Type:", hostel_type)

    # Ensure case-insensitive matching for 'hostel' field
    hostel_type = hostel_type.lower()

    filtered_students = [
        student for student in students
        if str(student.get('room_no')) == str(room_number) and student.get('hostel', '').lower() == hostel_type
    ]

    if not filtered_students:
        print("❌ No students found in this room for the specified hostel.")

    return jsonify(filtered_students), 200
