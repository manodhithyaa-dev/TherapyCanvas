from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(50), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'tutor' or 'family'
    region = db.Column(db.String(20), nullable=True)  # For tutors
    avatar = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login_at = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    activities = db.relationship('Activity', backref='author', lazy=True, foreign_keys='Activity.author_id')
    purchases = db.relationship('Purchase', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'region': self.region,
            'avatar': self.avatar,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'lastLoginAt': self.last_login_at.isoformat() if self.last_login_at else None,
        }

class Tutor(db.Model):
    __tablename__ = 'tutors'
    
    id = db.Column(db.String(50), db.ForeignKey('users.id'), primary_key=True)
    specialization = db.Column(db.Text, nullable=True)  # JSON array
    experience = db.Column(db.Integer, nullable=True)
    qualifications = db.Column(db.Text, nullable=True)  # JSON array
    bio = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Float, default=0.0)
    total_students = db.Column(db.Integer, default=0)
    total_activities = db.Column(db.Integer, default=0)
    verified = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'specialization': json.loads(self.specialization) if self.specialization else [],
            'experience': self.experience,
            'qualifications': json.loads(self.qualifications) if self.qualifications else [],
            'bio': self.bio,
            'rating': self.rating,
            'totalStudents': self.total_students,
            'totalActivities': self.total_activities,
            'verified': self.verified,
        }

class FamilyUser(db.Model):
    __tablename__ = 'family_users'
    
    id = db.Column(db.String(50), db.ForeignKey('users.id'), primary_key=True)
    child_name = db.Column(db.String(100), nullable=True)
    child_age = db.Column(db.Integer, nullable=True)
    selected_tutor_id = db.Column(db.String(50), db.ForeignKey('users.id'), nullable=True)
    favorite_activities = db.Column(db.Text, nullable=True)  # JSON array
    
    def to_dict(self):
        return {
            'id': self.id,
            'childName': self.child_name,
            'childAge': self.child_age,
            'selectedTutorId': self.selected_tutor_id,
            'favoriteActivities': json.loads(self.favorite_activities) if self.favorite_activities else [],
        }

class Activity(db.Model):
    __tablename__ = 'activities'
    
    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    language = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=True)
    elements = db.Column(db.Text, nullable=False)  # JSON array
    author_id = db.Column(db.String(50), db.ForeignKey('users.id'), nullable=False)
    is_published = db.Column(db.Boolean, default=False)
    tags = db.Column(db.Text, nullable=True)  # JSON array
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Marketplace fields
    price = db.Column(db.Float, default=0.0)
    pricing_model = db.Column(db.String(20), default='free')  # 'free', 'paid', 'institutional'
    purchase_count = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float, default=0.0)
    review_count = db.Column(db.Integer, default=0)
    thumbnail = db.Column(db.String(255), nullable=True)
    preview_url = db.Column(db.String(255), nullable=True)
    age_min = db.Column(db.Integer, nullable=True)
    age_max = db.Column(db.Integer, nullable=True)
    therapy_goals = db.Column(db.Text, nullable=True)  # JSON array
    diagnosis_tags = db.Column(db.Text, nullable=True)  # JSON array
    
    # Relationships
    purchases = db.relationship('Purchase', backref='activity', lazy=True)
    reviews = db.relationship('Review', backref='activity', lazy=True)
    
    def to_dict(self, include_author=False):
        data = {
            'id': self.id,
            'title': self.title,
            'type': self.type,
            'language': self.language,
            'description': self.description,
            'elements': json.loads(self.elements) if self.elements else [],
            'authorId': self.author_id,
            'isPublished': self.is_published,
            'tags': json.loads(self.tags) if self.tags else [],
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None,
            'price': self.price,
            'pricingModel': self.pricing_model,
            'purchaseCount': self.purchase_count,
            'rating': self.rating,
            'reviewCount': self.review_count,
            'thumbnail': self.thumbnail,
            'previewUrl': self.preview_url,
            'ageRange': {'min': self.age_min, 'max': self.age_max} if self.age_min and self.age_max else None,
            'therapyGoals': json.loads(self.therapy_goals) if self.therapy_goals else [],
            'diagnosisTags': json.loads(self.diagnosis_tags) if self.diagnosis_tags else [],
        }
        
        if include_author:
            author = User.query.get(self.author_id)
            if author:
                data['author'] = {
                    'id': author.id,
                    'name': author.name,
                    'region': author.region,
                    'avatar': author.avatar,
                    'rating': getattr(Tutor.query.get(author.id), 'rating', None) if author.role == 'tutor' else None,
                }
        
        return data

class Purchase(db.Model):
    __tablename__ = 'purchases'
    
    id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey('users.id'), nullable=False)
    activity_id = db.Column(db.String(50), db.ForeignKey('activities.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    purchased_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'activityId': self.activity_id,
            'price': self.price,
            'purchasedAt': self.purchased_at.isoformat() if self.purchased_at else None,
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.String(50), primary_key=True)
    activity_id = db.Column(db.String(50), db.ForeignKey('activities.id'), nullable=False)
    user_id = db.Column(db.String(50), db.ForeignKey('users.id'), nullable=False)
    user_name = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1-5
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'activityId': self.activity_id,
            'userId': self.user_id,
            'userName': self.user_name,
            'rating': self.rating,
            'comment': self.comment,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
        }

