from flask import Blueprint, request, jsonify
from models import db, Admin
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from datetime import timedelta

login_bp = Blueprint('login_bp', __name__)

@login_bp.route('/api/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    print("Attempting login for:", username)

    admin = Admin.query.filter_by(username=username).first()
    if admin:
        print("Admin found:", admin.username)
        print("Stored hash:", admin.password)
        print("Password match:", check_password_hash(admin.password, password))

    if admin and check_password_hash(admin.password, password):
        access_token = create_access_token(identity=username, expires_delta=timedelta(days=1))
        return jsonify({
            'token': access_token,
            'admin_id': admin.id,
            'message': 'Login successful'
        }), 200

    return jsonify({'message': 'Invalid username or password'}), 401
