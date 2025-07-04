from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Admin

profile_bp = Blueprint('profile', __name__)

# GET: Fetch admin profile
@profile_bp.route('/api/admin/profile', methods=['GET'])
@jwt_required()
def get_profile():
    username = get_jwt_identity()
    admin = Admin.query.filter_by(username=username).first()

    if not admin:
        return jsonify({"error": "Admin not found"}), 404

    admin_data = {
        "full_name": admin.full_name,
        "email": admin.email,
        "phone": admin.phone,
        "department": admin.department,
        "dob": str(admin.dob),
        "username": admin.username
    }

    # Optional dummy login history
    login_history = [
        {"date": "2025-04-06 10:45 AM", "ip": "192.168.1.2"},
        {"date": "2025-04-05 09:22 AM", "ip": "192.168.1.3"},
    ]

    return jsonify({"admin": admin_data, "login_history": login_history})


# PUT: Update email and phone number
@profile_bp.route('/api/admin/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    username = get_jwt_identity()
    admin = Admin.query.filter_by(username=username).first()

    if not admin:
        return jsonify({"error": "Admin not found"}), 404

    data = request.get_json()
    email = data.get('email')
    phone = data.get('phone')

    if email:
        admin.email = email
    if phone:
        admin.phone = phone

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"}), 200
