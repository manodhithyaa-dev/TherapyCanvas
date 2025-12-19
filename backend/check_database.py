"""
Script to check database contents
Run this to see what's in your database
"""
from app import app, db
from models import User, Tutor, FamilyUser, Activity, Purchase, Review

def check_database():
    with app.app_context():
        print("=" * 60)
        print("DATABASE CONTENTS")
        print("=" * 60)
        
        # Users
        users = User.query.all()
        print(f"\n📊 USERS: {len(users)} total")
        for user in users:
            print(f"  - ID: {user.id}")
            print(f"    Email: {user.email}")
            print(f"    Name: {user.name}")
            print(f"    Role: {user.role}")
            print(f"    Region: {user.region}")
            print(f"    Created: {user.created_at}")
            print()
        
        # Tutors
        tutors = Tutor.query.all()
        print(f"\n👨‍🏫 TUTORS: {len(tutors)} total")
        for tutor in tutors:
            user = User.query.get(tutor.id)
            print(f"  - ID: {tutor.id}")
            print(f"    Name: {user.name if user else 'N/A'}")
            print(f"    Experience: {tutor.experience} years")
            print(f"    Rating: {tutor.rating}")
            print(f"    Verified: {tutor.verified}")
            print()
        
        # Family Users
        families = FamilyUser.query.all()
        print(f"\n👨‍👩‍👧 FAMILY USERS: {len(families)} total")
        for family in families:
            user = User.query.get(family.id)
            print(f"  - ID: {family.id}")
            print(f"    Name: {user.name if user else 'N/A'}")
            print(f"    Child: {family.child_name} ({family.child_age} years)")
            print()
        
        # Activities
        activities = Activity.query.all()
        print(f"\n📚 ACTIVITIES: {len(activities)} total")
        for activity in activities:
            print(f"  - ID: {activity.id}")
            print(f"    Title: {activity.title}")
            print(f"    Author: {activity.author_id}")
            print(f"    Published: {activity.is_published}")
            print()
        
        # Purchases
        purchases = Purchase.query.all()
        print(f"\n🛒 PURCHASES: {len(purchases)} total")
        for purchase in purchases:
            print(f"  - ID: {purchase.id}")
            print(f"    User: {purchase.user_id}")
            print(f"    Activity: {purchase.activity_id}")
            print(f"    Price: ₹{purchase.price}")
            print()
        
        print("=" * 60)

if __name__ == '__main__':
    check_database()

