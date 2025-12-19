# Environment Variables Setup

Create a `.env` file in the `backend` folder with the following variables:

## Required .env File Contents

```env
# Flask Configuration
SECRET_KEY=your-secret-key-change-this-in-production
FLASK_ENV=development
FLASK_DEBUG=True

# Database Configuration
# For SQLite (default - recommended for development):
DATABASE_URL=sqlite:///therapy_weaver.db

# For PostgreSQL (production example):
# DATABASE_URL=postgresql://username:password@localhost:5432/therapy_weaver

# For MySQL (alternative):
# DATABASE_URL=mysql://username:password@localhost:3306/therapy_weaver

# CORS Configuration (comma-separated list of allowed origins)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173

# Server Configuration
HOST=0.0.0.0
PORT=5000
```

## Variable Descriptions

### SECRET_KEY
- **Required**: Yes
- **Description**: Secret key for Flask session security and password hashing
- **Development**: Can use any random string
- **Production**: Must be a strong, random secret key
- **Example**: `SECRET_KEY=your-super-secret-key-here-min-32-chars`

### FLASK_ENV
- **Required**: No (defaults to 'development')
- **Description**: Flask environment mode
- **Options**: `development` or `production`
- **Example**: `FLASK_ENV=development`

### FLASK_DEBUG
- **Required**: No (defaults to 'True')
- **Description**: Enable/disable Flask debug mode
- **Options**: `True` or `False`
- **Example**: `FLASK_DEBUG=True`

### DATABASE_URL
- **Required**: No (defaults to SQLite)
- **Description**: Database connection string
- **SQLite Format**: `sqlite:///therapy_weaver.db`
- **PostgreSQL Format**: `postgresql://username:password@host:port/database`
- **MySQL Format**: `mysql://username:password@host:port/database`
- **Example**: `DATABASE_URL=sqlite:///therapy_weaver.db`

### CORS_ORIGINS
- **Required**: No (defaults to localhost ports)
- **Description**: Comma-separated list of allowed frontend origins for CORS
- **Format**: `origin1,origin2,origin3`
- **Example**: `CORS_ORIGINS=http://localhost:5173,http://localhost:3000`

### HOST
- **Required**: No (defaults to '0.0.0.0')
- **Description**: Host address to bind the server
- **Options**: `0.0.0.0` (all interfaces) or `127.0.0.1` (localhost only)
- **Example**: `HOST=0.0.0.0`

### PORT
- **Required**: No (defaults to 5000)
- **Description**: Port number to run the server
- **Example**: `PORT=5000`

## Quick Setup

1. Create `.env` file in the `backend` folder:
```bash
cd backend
touch .env
```

2. Copy the contents above into the `.env` file

3. For production, generate a strong SECRET_KEY:
```python
import secrets
print(secrets.token_hex(32))
```

## Notes

- The `.env` file is gitignored and should never be committed
- All variables have defaults, so the app will work without `.env` file
- For production, always set a strong `SECRET_KEY`
- Update `CORS_ORIGINS` to match your frontend URL in production

