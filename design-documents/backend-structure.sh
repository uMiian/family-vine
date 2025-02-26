backend/
├── main.py                  # FastAPI app initialization
├── config.py                # Configuration settings
├── requirements.txt         # Dependencies
├── alembic/                 # Database migrations
├── api/
│   ├── __init__.py
│   ├── dependencies.py      # API dependencies (auth, etc.)
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py          # Authentication endpoints
│   │   ├── users.py         # User management endpoints
│   │   ├── documents.py     # Document upload/management endpoints
│   │   ├── metadata.py      # Metadata CRUD endpoints
│   │   ├── relationships.py # Relationship management endpoints
│   │   └── visualization.py # Graph/visualization data endpoints
├── core/
│   ├── __init__.py
│   ├── security.py          # Auth, JWT functions
│   └── config.py            # Core configuration
├── db/
│   ├── __init__.py
│   ├── base.py              # Base DB setup
│   ├── session.py           # DB session management
│   └── init_db.py           # DB initialization script
├── models/
│   ├── __init__.py
│   ├── user.py              # User model
│   ├── document.py          # Document model
│   ├── metadata.py          # Metadata model
│   ├── person.py            # Person model
│   └── relationship.py      # Relationship model
├── schemas/
│   ├── __init__.py
│   ├── user.py              # User Pydantic schema
│   ├── document.py          # Document Pydantic schema
│   ├── metadata.py          # Metadata Pydantic schema
│   ├── person.py            # Person Pydantic schema
│   └── relationship.py      # Relationship Pydantic schema
├── services/
│   ├── __init__.py
│   ├── file_service.py      # File handling service
│   ├── relationship_service.py  # Relationship processing service
│   └── visualization_service.py # Visualization data preparation
└── utils/
    ├── __init__.py
    └── helpers.py           # Helper functions
