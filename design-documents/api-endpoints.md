# API Endpoints

## Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/logout` - Logout (invalidate token)
- `GET /api/auth/me` - Get current user information

## Users
- `GET /api/users/{user_id}` - Get user details
- `PUT /api/users/{user_id}` - Update user details
- `DELETE /api/users/{user_id}` - Delete user account

## Documents
- `POST /api/documents/` - Upload a new document
- `GET /api/documents/` - List all documents for current user
- `GET /api/documents/{document_id}` - Get document details
- `PUT /api/documents/{document_id}` - Update document details
- `DELETE /api/documents/{document_id}` - Delete a document
- `GET /api/documents/{document_id}/download` - Download a document

## Metadata
- `POST /api/documents/{document_id}/metadata` - Add metadata to document
- `GET /api/documents/{document_id}/metadata` - Get metadata for document
- `PUT /api/documents/{document_id}/metadata` - Update document metadata
- `DELETE /api/documents/{document_id}/metadata` - Delete document metadata

## People
- `POST /api/people/` - Add a new person
- `GET /api/people/` - List all people for current user
- `GET /api/people/{person_id}` - Get person details
- `PUT /api/people/{person_id}` - Update person details
- `DELETE /api/people/{person_id}` - Delete a person

## Relationships
- `POST /api/relationships/` - Create a new relationship
- `GET /api/relationships/` - List all relationships for current user
- `GET /api/relationships/{relationship_id}` - Get relationship details
- `PUT /api/relationships/{relationship_id}` - Update relationship
- `DELETE /api/relationships/{relationship_id}` - Delete a relationship

## Document-Person Connections
- `POST /api/documents/{document_id}/people/{person_id}` - Connect document to person
- `DELETE /api/documents/{document_id}/people/{person_id}` - Remove document-person connection

## Visualization
- `GET /api/visualization/graph` - Get graph data for network visualization
- `GET /api/visualization/timeline` - Get timeline data for document chronology
- `GET /api/visualization/stats` - Get usage statistics and metrics
