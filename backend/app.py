from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config
from models import db, User, Tutor, FamilyUser, Activity, Purchase, Review
from datetime import datetime
import uuid
import hashlib
import json
from werkzeug.security import generate_password_hash, check_password_hash

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={
    r"/api/*": {
        "origins": "http://localhost:8080"
    }
})
db.init_app(app)

# ==================== AUTHENTICATION ROUTES ====================

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """Register a new user (tutor or family)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('email') or not data.get('password') or not data.get('name') or not data.get('role'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        # Validate role
        if data['role'] not in ['tutor', 'family']:
            return jsonify({'error': 'Invalid role'}), 400
        
        # Create user
        user_id = str(uuid.uuid4())
        user = User(
            id=user_id,
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            name=data['name'],
            role=data['role'],
            region=data.get('region') if data['role'] == 'tutor' else None,
            avatar=data.get('avatar'),
        )
        db.session.add(user)
        
        # Create role-specific record
        if data['role'] == 'tutor':
            tutor = Tutor(
                id=user_id,
                specialization=json.dumps(data.get('specialization', [])),
                experience=data.get('experience'),
                qualifications=json.dumps(data.get('qualifications', [])),
                bio=data.get('bio'),
            )
            db.session.add(tutor)
        else:
            family = FamilyUser(
                id=user_id,
                child_name=data.get('childName'),
                child_age=data.get('childAge'),
            )
            db.session.add(family)
        
        db.session.commit()
        
        user_dict = user.to_dict()
        if data['role'] == 'tutor':
            user_dict.update(Tutor.query.get(user_id).to_dict())
        else:
            user_dict.update(FamilyUser.query.get(user_id).to_dict())
        
        return jsonify({'user': user_dict, 'message': 'User created successfully'}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not check_password_hash(user.password_hash, data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Update last login
        user.last_login_at = datetime.utcnow()
        db.session.commit()
        
        user_dict = user.to_dict()
        if user.role == 'tutor':
            tutor = Tutor.query.get(user.id)
            if tutor:
                user_dict.update(tutor.to_dict())
        else:
            family = FamilyUser.query.get(user.id)
            if family:
                user_dict.update(family.to_dict())
        
        return jsonify({'user': user_dict, 'message': 'Login successful'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== USER ROUTES ====================

@app.route('/api/users', methods=['GET'])
def get_all_users():
    """Get all users (for debugging/admin purposes)"""
    try:
        users = User.query.all()
        result = []
        for user in users:
            user_dict = user.to_dict()
            if user.role == 'tutor':
                tutor = Tutor.query.get(user.id)
                if tutor:
                    user_dict.update(tutor.to_dict())
            else:
                family = FamilyUser.query.get(user.id)
                if family:
                    user_dict.update(family.to_dict())
            result.append(user_dict)
        return jsonify({'users': result, 'count': len(result)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    """Get user by ID"""
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        user_dict = user.to_dict()
        if user.role == 'tutor':
            tutor = Tutor.query.get(user_id)
            if tutor:
                user_dict.update(tutor.to_dict())
        else:
            family = FamilyUser.query.get(user_id)
            if family:
                user_dict.update(family.to_dict())
        
        return jsonify({'user': user_dict}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    """Update user profile"""
    try:
        data = request.get_json()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Update user fields
        if 'name' in data:
            user.name = data['name']
        if 'avatar' in data:
            user.avatar = data['avatar']
        if 'region' in data and user.role == 'tutor':
            user.region = data['region']
        
        # Update role-specific fields
        if user.role == 'tutor':
            tutor = Tutor.query.get(user_id)
            if tutor:
                if 'specialization' in data:
                    tutor.specialization = json.dumps(data['specialization'])
                if 'experience' in data:
                    tutor.experience = data['experience']
                if 'qualifications' in data:
                    tutor.qualifications = json.dumps(data['qualifications'])
                if 'bio' in data:
                    tutor.bio = data['bio']
        else:
            family = FamilyUser.query.get(user_id)
            if family:
                if 'childName' in data:
                    family.child_name = data['childName']
                if 'childAge' in data:
                    family.child_age = data['childAge']
                if 'selectedTutorId' in data:
                    family.selected_tutor_id = data['selectedTutorId']
                if 'favoriteActivities' in data:
                    family.favorite_activities = json.dumps(data['favoriteActivities'])
        
        db.session.commit()
        
        user_dict = user.to_dict()
        if user.role == 'tutor':
            tutor = Tutor.query.get(user_id)
            if tutor:
                user_dict.update(tutor.to_dict())
        else:
            family = FamilyUser.query.get(user_id)
            if family:
                user_dict.update(family.to_dict())
        
        return jsonify({'user': user_dict, 'message': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ==================== TUTOR ROUTES ====================

@app.route('/api/tutors', methods=['GET'])
def get_tutors():
    """Get all tutors, optionally filtered by region"""
    try:
        region = request.args.get('region')
        query = User.query.filter_by(role='tutor')
        
        if region and region != 'all':
            query = query.filter_by(region=region)
        
        tutors = query.all()
        result = []
        
        for tutor_user in tutors:
            tutor_data = tutor_user.to_dict()
            tutor_details = Tutor.query.get(tutor_user.id)
            if tutor_details:
                tutor_data.update(tutor_details.to_dict())
            result.append(tutor_data)
        
        return jsonify({'tutors': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tutors/<tutor_id>', methods=['GET'])
def get_tutor(tutor_id):
    """Get tutor by ID"""
    try:
        user = User.query.get(tutor_id)
        if not user or user.role != 'tutor':
            return jsonify({'error': 'Tutor not found'}), 404
        
        tutor_data = user.to_dict()
        tutor_details = Tutor.query.get(tutor_id)
        if tutor_details:
            tutor_data.update(tutor_details.to_dict())
        
        return jsonify({'tutor': tutor_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== ACTIVITY ROUTES ====================

@app.route('/api/activities', methods=['GET'])
def get_activities():
    """Get activities with optional filters"""
    try:
        author_id = request.args.get('authorId')
        is_published = request.args.get('isPublished')
        language = request.args.get('language')
        activity_type = request.args.get('type')
        
        query = Activity.query
        
        if author_id:
            query = query.filter_by(author_id=author_id)
        if is_published is not None:
            query = query.filter_by(is_published=is_published.lower() == 'true')
        if language:
            query = query.filter_by(language=language)
        if activity_type:
            query = query.filter_by(type=activity_type)
        
        activities = query.order_by(Activity.created_at.desc()).all()
        
        return jsonify({
            'activities': [activity.to_dict(include_author=True) for activity in activities]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/activities/<activity_id>', methods=['GET'])
def get_activity(activity_id):
    """Get activity by ID"""
    try:
        activity = Activity.query.get(activity_id)
        if not activity:
            return jsonify({'error': 'Activity not found'}), 404
        
        return jsonify({'activity': activity.to_dict(include_author=True)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/activities', methods=['POST'])
def create_activity():
    """Create a new activity"""
    try:
        data = request.get_json()
        
        if not data.get('title') or not data.get('type') or not data.get('authorId'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        activity_id = str(uuid.uuid4())
        activity = Activity(
            id=activity_id,
            title=data['title'],
            type=data['type'],
            language=data.get('language', 'english'),
            description=data.get('description', ''),
            elements=json.dumps(data.get('elements', [])),
            author_id=data['authorId'],
            is_published=data.get('isPublished', False),
            tags=json.dumps(data.get('tags', [])),
        )
        
        db.session.add(activity)
        db.session.commit()
        
        return jsonify({'activity': activity.to_dict(), 'message': 'Activity created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/activities/<activity_id>', methods=['PUT'])
def update_activity(activity_id):
    """Update an activity"""
    try:
        data = request.get_json()
        activity = Activity.query.get(activity_id)
        
        if not activity:
            return jsonify({'error': 'Activity not found'}), 404
        
        # Update fields
        if 'title' in data:
            activity.title = data['title']
        if 'description' in data:
            activity.description = data['description']
        if 'elements' in data:
            activity.elements = json.dumps(data['elements'])
        if 'tags' in data:
            activity.tags = json.dumps(data['tags'])
        if 'language' in data:
            activity.language = data['language']
        
        activity.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({'activity': activity.to_dict(), 'message': 'Activity updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/activities/<activity_id>', methods=['DELETE'])
def delete_activity(activity_id):
    """Delete an activity"""
    try:
        activity = Activity.query.get(activity_id)
        if not activity:
            return jsonify({'error': 'Activity not found'}), 404
        
        db.session.delete(activity)
        db.session.commit()
        
        return jsonify({'message': 'Activity deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ==================== MARKETPLACE ROUTES ====================

@app.route('/api/marketplace/activities', methods=['GET'])
def get_marketplace_activities():
    """Get published marketplace activities with filters"""
    try:
        region = request.args.get('region')
        language = request.args.get('language')
        activity_type = request.args.get('type')
        price_filter = request.args.get('price')  # 'all', 'free', 'paid'
        search = request.args.get('search')
        
        query = Activity.query.filter_by(is_published=True)
        
        if region and region != 'all':
            # Filter by author's region
            query = query.join(User).filter(User.region == region)
        
        if language:
            query = query.filter_by(language=language)
        if activity_type:
            query = query.filter_by(type=activity_type)
        if price_filter == 'free':
            query = query.filter_by(pricing_model='free')
        elif price_filter == 'paid':
            query = query.filter(Activity.pricing_model.in_(['paid', 'institutional']))
        
        if search:
            query = query.filter(
                (Activity.title.contains(search)) |
                (Activity.description.contains(search))
            )
        
        activities = query.order_by(Activity.purchase_count.desc(), Activity.rating.desc()).all()
        
        return jsonify({
            'activities': [activity.to_dict(include_author=True) for activity in activities]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/marketplace/activities/<activity_id>/publish', methods=['POST'])
def publish_activity(activity_id):
    """Publish an activity to marketplace"""
    try:
        data = request.get_json()
        activity = Activity.query.get(activity_id)
        
        if not activity:
            return jsonify({'error': 'Activity not found'}), 404
        
        # Update marketplace fields
        activity.is_published = True
        activity.price = data.get('price', 0)
        activity.pricing_model = data.get('pricingModel', 'free')
        activity.age_min = data.get('ageRange', {}).get('min')
        activity.age_max = data.get('ageRange', {}).get('max')
        activity.therapy_goals = json.dumps(data.get('therapyGoals', []))
        activity.diagnosis_tags = json.dumps(data.get('diagnosisTags', []))
        activity.thumbnail = data.get('thumbnail')
        activity.preview_url = data.get('previewUrl')
        
        if 'description' in data:
            activity.description = data['description']
        
        activity.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({'activity': activity.to_dict(include_author=True), 'message': 'Activity published successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ==================== PURCHASE ROUTES ====================

@app.route('/api/purchases', methods=['POST'])
def create_purchase():
    """Create a purchase"""
    try:
        data = request.get_json()
        
        if not data.get('userId') or not data.get('activityId'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if already purchased
        existing = Purchase.query.filter_by(
            user_id=data['userId'],
            activity_id=data['activityId']
        ).first()
        
        if existing:
            return jsonify({'error': 'Activity already purchased'}), 400
        
        # Get activity to get price
        activity = Activity.query.get(data['activityId'])
        if not activity:
            return jsonify({'error': 'Activity not found'}), 404
        
        # Create purchase
        purchase_id = str(uuid.uuid4())
        purchase = Purchase(
            id=purchase_id,
            user_id=data['userId'],
            activity_id=data['activityId'],
            price=activity.price,
        )
        
        # Update activity purchase count
        activity.purchase_count += 1
        
        db.session.add(purchase)
        db.session.commit()
        
        return jsonify({'purchase': purchase.to_dict(), 'message': 'Purchase successful'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/purchases/user/<user_id>', methods=['GET'])
def get_user_purchases(user_id):
    """Get all purchases for a user"""
    try:
        purchases = Purchase.query.filter_by(user_id=user_id).order_by(Purchase.purchased_at.desc()).all()
        
        # Get activities for purchases
        activities = []
        for purchase in purchases:
            activity = Activity.query.get(purchase.activity_id)
            if activity:
                activities.append(activity.to_dict(include_author=True))
        
        return jsonify({'purchases': [p.to_dict() for p in purchases], 'activities': activities}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/purchases/check/<user_id>/<activity_id>', methods=['GET'])
def check_purchase(user_id, activity_id):
    """Check if user has purchased an activity"""
    try:
        purchase = Purchase.query.filter_by(user_id=user_id, activity_id=activity_id).first()
        return jsonify({'purchased': purchase is not None}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== REVIEW ROUTES ====================

@app.route('/api/reviews/activity/<activity_id>', methods=['GET'])
def get_activity_reviews(activity_id):
    """Get reviews for an activity"""
    try:
        reviews = Review.query.filter_by(activity_id=activity_id).order_by(Review.created_at.desc()).all()
        return jsonify({'reviews': [r.to_dict() for r in reviews]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reviews', methods=['POST'])
def create_review():
    """Create a review"""
    try:
        data = request.get_json()
        
        if not data.get('activityId') or not data.get('userId') or not data.get('rating'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Validate rating
        if not (1 <= data['rating'] <= 5):
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400
        
        # Get user name
        user = User.query.get(data['userId'])
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        review_id = str(uuid.uuid4())
        review = Review(
            id=review_id,
            activity_id=data['activityId'],
            user_id=data['userId'],
            user_name=user.name,
            rating=data['rating'],
            comment=data.get('comment', ''),
        )
        
        db.session.add(review)
        
        # Update activity rating
        activity = Activity.query.get(data['activityId'])
        if activity:
            # Recalculate average rating
            all_reviews = Review.query.filter_by(activity_id=data['activityId']).all()
            if all_reviews:
                activity.rating = sum(r.rating for r in all_reviews) / len(all_reviews)
                activity.review_count = len(all_reviews)
        
        db.session.commit()
        
        return jsonify({'review': review.to_dict(), 'message': 'Review created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ==================== INITIALIZATION ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'API is running'}), 200

def init_db():
    """Initialize database"""
    with app.app_context():
        db.create_all()
        print("Database initialized successfully!")

if __name__ == '__main__':
    init_db()
    app.run(debug=app.config['DEBUG'], host=app.config['HOST'], port=app.config['PORT'])

