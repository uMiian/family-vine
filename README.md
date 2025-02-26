# Family Vine

TODO: Pictures of app

## What is Family Vine

Family Vine is a media manager with an added empahsis on maintaing your family story. Alongside saving media, it also allows you to tag it with relevant information, like who's in it, where it was taken, and for what event. In doing so, family vine weaves together a story of events through your photos and videos. What's more is that it allows you to traverse this story as you add more memories!

## Features

- File Upload: Drag-and-drop interface for easy file uploads
- Metadata Tagging: Tag files with the 5W information (Who, What, Where, Why, When)
- Relationship Management: Define relationships with people (child, parent, etc.)
- Visualization: Interactive graph showing relationships and timeline view of documents

## Tech Stack
### Frontend

- React.js
- D3.js for visualizations
- Modern UI components
- Context API for state management

### Backend

- Python with FastAPI
- JWT authentication
- RESTful API design
- SQLAlchemy ORM

### Database

- PostgreSQL (recommended)
Relational data model for users, documents, metadata, and relationships

## Getting Started
### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- PostgreSQL

### Backend Setup

```bash 
# Clone repository
git clone https://github.com/yourusername/file-visualization-app.git
cd file-visualization-app/backend


# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env file with your database credentials

# Run migrations
alembic upgrade head

# Start the server
uvicorn main:app --reload
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env file with your API URL

# Start development server
npm start
```

## API Endpoints
The app exposes the following main API endpoints:

- Authentication: /api/auth/*
- Users: /api/users/*
- Documents: /api/documents/*
- Metadata: /api/documents/{id}/metadata
- People: /api/people/*
- Relationships: /api/relationships/*
- Visualization: /api/visualization/*

See the API documentation for more details.

## Database Schema
The database consists of the following main tables:

- Users: Store user information
- Documents: Track uploaded files
- Metadata: Store 5W information for documents
- People: Track people in the user's network
- Relationships: Define relationships between users and people
- DocumentPerson: Connect documents to people

## Directory Structure

```
|── backend/
│   ├── api/          # API endpoints
│   ├── core/         # Core functionality
│   ├── db/           # Database connections
│   ├── models/       # SQLAlchemy models
│   ├── schemas/      # Pydantic schemas
│   ├── services/     # Business logic
│   └── utils/        # Utility functions
│
└── frontend/
    ├── public/       # Static files
    └── src/
        ├── api/      # API client
        ├── components/  # React components
        ├── context/  # React context
        ├── hooks/    # Custom hooks
        ├── pages/    # Page components
        └── utils/    # Utility functions
```

## Development
### Code Style

- Backend: Follow PEP 8 guidelines
- Frontend: Follow ESLint configuration

### Testing
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## License
__MIT License__

## Contributors

Luis Guillen luis.a.guillen.arcos-1@ou.edu
Your Name your.email@example.com