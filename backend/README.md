# Therapy Weaver Backend API

Flask backend API for Therapy Weaver application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file in the `backend` folder with the following content:
```env
SECRET_KEY=your-secret-key-change-this-in-production
FLASK_ENV=development
FLASK_DEBUG=True
DATABASE_URL=sqlite:///therapy_weaver.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173
HOST=0.0.0.0
PORT=5000
```

See `ENV_SETUP.md` for detailed explanations of each variable.

3. Initialize the database:
```bash
python app.py
```

This will create `therapy_weaver.db` SQLite database file.

## Running the Server

```bash
python app.py
```

The API will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/<user_id>` - Get user by ID
- `PUT /api/users/<user_id>` - Update user profile

### Tutors
- `GET /api/tutors` - Get all tutors (optional `?region=north`)
- `GET /api/tutors/<tutor_id>` - Get tutor by ID

### Activities
- `GET /api/activities` - Get activities (filters: `authorId`, `isPublished`, `language`, `type`)
- `GET /api/activities/<activity_id>` - Get activity by ID
- `POST /api/activities` - Create new activity
- `PUT /api/activities/<activity_id>` - Update activity
- `DELETE /api/activities/<activity_id>` - Delete activity

### Marketplace
- `GET /api/marketplace/activities` - Get published activities (filters: `region`, `language`, `type`, `price`, `search`)
- `POST /api/marketplace/activities/<activity_id>/publish` - Publish activity to marketplace

### Purchases
- `POST /api/purchases` - Create purchase
- `GET /api/purchases/user/<user_id>` - Get user's purchases
- `GET /api/purchases/check/<user_id>/<activity_id>` - Check if purchased

### Reviews
- `GET /api/reviews/activity/<activity_id>` - Get activity reviews
- `POST /api/reviews` - Create review

### Health
- `GET /api/health` - Health check

## Database Models

- **User**: Base user model (tutors and families)
- **Tutor**: Extended tutor information
- **FamilyUser**: Extended family user information
- **Activity**: Therapy activities
- **Purchase**: User purchases
- **Review**: Activity reviews

## Notes

- All timestamps are in UTC
- JSON fields are stored as text and parsed when needed
- Password hashing uses Werkzeug's security utilities
- CORS is enabled for frontend development

