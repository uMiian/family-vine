from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from api.routes import auth, users, documents, metadata, relationships, visualization
from core.config import settings
from db.init_db import init_db

app = FastAPI(
    title="File Visualization API",
    description="API for file upload and visualization with relationship mapping",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(metadata.router, prefix="/api/documents", tags=["Metadata"])
app.include_router(relationships.router, prefix="/api/relationships", tags=["Relationships"])
app.include_router(visualization.router, prefix="/api/visualization", tags=["Visualization"])

# Mount static file directory for serving uploaded files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
async def startup_event():
    # Initialize database
    await init_db()

@app.get("/api/health", tags=["Health"])
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)