from flask import Blueprint, request, jsonify
from models import db, Admin
from werkzeug.security import generate_password_hash
from datetime import datetime

register_bp = Blueprint('register', __name__)

@register_bp.route('/api/register', methods=['POST'])
def register_admin():
    try:
        data = request.get_json()

        # Extract fields from request
        full_name = data.get('full_name')
        phone = data.get('phone')
        email = data.get('email')
        department = data.get('department')
        dob_str = data.get('dob')
        username = data.get('username')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        # Validate required fields
        if not all([full_name, phone, email, department, dob_str, username, password, confirm_password]):
            return jsonify({'error': 'All fields are required'}), 400

        # Confirm password check
        if password != confirm_password:
            return jsonify({'error': 'Passwords do not match'}), 400

        # Validate and parse date
        try:
            dob = datetime.strptime(dob_str, "%Y-%m-%d").date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

        # Check if username or email already exists
        if Admin.query.filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 400
        if Admin.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 400

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Create and save new admin
        new_admin = Admin(
            full_name=full_name,
            phone=phone,
            email=email,
            department=department,
            dob=dob,
            username=username,
            password=hashed_password
        )
        db.session.add(new_admin)
        db.session.commit()

        return jsonify({'message': 'Admin registered successfully'}), 201

    except Exception as e:
        return jsonify({'error': f'Something went wrong: {str(e)}'}), 500
