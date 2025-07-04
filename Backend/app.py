import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db

# Initialize Flask app
app = Flask(__name__)

# Secret key for JWT
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Replace with a strong secret key
jwt = JWTManager(app)

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Enable CORS for API routes
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Import and register blueprints
from student import student_bp
from notifications import notifications_bp
from complaints import complaints_bp
from food_menu import food_bp
from register import register_bp
from login import login_bp
from profile import profile_bp


app.register_blueprint(student_bp)
app.register_blueprint(notifications_bp)
app.register_blueprint(complaints_bp)
app.register_blueprint(food_bp)
app.register_blueprint(register_bp)
app.register_blueprint(login_bp)
app.register_blueprint(profile_bp)

# Global error handler
@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({"error": str(e)}), 500

# Create database tables when app starts
with app.app_context():
    db.create_all()

# Run the app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
