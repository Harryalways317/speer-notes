Speer-Notes


# Speer Notes Tech & Implementation Description
Tech Stack : Node JS, Typescript, Express, Postgres, Prisma


The code is deployed under https://speer-notes-production.up.railway.app/
Feel Free to test it.



# Speer Notes API Documentation

Welcome to the Speer Notes API. Use `/api` as the base endpoint.

## API Endpoints

### `GET /`

- **Description**: Welcome endpoint (with documentation).
- **Response**: 
  - Presents this ReadME you are reading....

### `GET /api/health`

- **Description**: health endpoint.
- **Response**: 
  - Status of service



### `GET /api/notes`

- **Description**: Retrieve all notes for the authenticated user.
- **Requires Authentication**: Yes
- **Response**: 
  ```json

    [
        {
            "id": "0cf59c3c-832c-4c28-a0e7-ed9a9afd2ef6",
            "title": "Hii",
            "content": "This is COntent",
            "createdAt": "2024-01-05T09:53:42.570Z",
            "updatedAt": "2024-01-05T09:53:42.570Z",
            "deletedAt": null,
            "authorId": "b696e8f2-ae87-4cd3-ae50-93a52bd47fd3",
            "shared": []
        },
        {
            "id": "0a3cd214-5383-467a-a702-408205d35fb5",
            "title": "Hii2 - Updated",
            "content": "This is COntent2 Updated",
            "createdAt": "2024-01-05T09:57:51.765Z",
            "updatedAt": "2024-01-05T10:20:36.016Z",
            "deletedAt": null,
            "authorId": "b696e8f2-ae87-4cd3-ae50-93a52bd47fd3",
            "shared": [
                {
                    "id": "c741a0d8-1898-4f36-a47f-3925b8953ae7",
                    "createdAt": "2024-01-05T10:34:28.836Z",
                    "noteId": "0a3cd214-5383-467a-a702-408205d35fb5",
                    "ownerId": "b696e8f2-ae87-4cd3-ae50-93a52bd47fd3",
                    "sharedWithId": "34947484-a7e8-4713-8357-eea15b411e17"
                }
            ]
        },
    ]
  ```

### `GET /api/notes/:id`

- **Description**: Retrieve a specific note by its ID.
- **Parameters**: `id` - ID of the note to retrieve.
- **Requires Authentication**: Yes
- **Response**: 
  ```json
  {
    "id": "uuid",
    "title": "Sample Note",
    "content": "This is a sample note.",
    "authorId": "user1"
  }
  ```

### `POST /api/notes`

- **Description**: Create a new note for the authenticated user.
- **Requires Authentication**: Yes
- **Request**:
  ```json
  {
    "title": "New Note",
    "content": "Content of the new note."
  }
  ```
- **Response**: 
  ```json
  {
    "id": "uuid",
    "title": "New Note",
    "content": "Content of the new note.",
    "authorId": "user1"
  }
  ```

### `PUT /api/notes/:id`

- **Description**: Update an existing note by ID.
- **Parameters**: `id` - ID of the note to update.
- **Requires Authentication**: Yes
- **Request**:
  ```json
  {
    "title": "Updated Note",
    "content": "Updated content of the note."
  }
  ```
- **Response**: 
  ```json
  {
    "id": "uuid",
    "title": "Updated Note",
    "content": "Updated content of the note.",
    "authorId": "user1"
  }
  ```

### `DELETE /api/notes/:id`

- **Description**: Delete a note by ID.
- **Parameters**: `id` - ID of the note to delete.
- **Requires Authentication**: Yes
- **staus**: 204 NO CONTENT
- **Response**: 
  ```json
  
  ```

### `POST /api/notes/:id/share`

- **Description**: Share a note with another user.
- **Parameters**: `id` - ID of the note to share.
- **Requires Authentication**: Yes
- **Request**:
  ```json
  {
    "sharedWithId": "34947484-a7e8-4713-8357-eea15b411e17"
  }
  ```
- **Response**: 
  ```json
    {
        "id": "c741a0d8-1898-4f36-a47f-3925b8953ae7",
        "createdAt": "2024-01-05T10:34:28.836Z",
        "noteId": "0a3cd214-5383-467a-a702-408205d35fb5",
        "ownerId": "b696e8f2-ae87-4cd3-ae50-93a52bd47fd3",
        "sharedWithId": "34947484-a7e8-4713-8357-eea15b411e17"
    }
  ```

### `GET /api/search?q=:query`

- **Description**: Search for notes based on keywords.
- **Query Parameters**: `q` - The search query string.
- **Requires Authentication**: Yes
- **Response**: 
  ```json
    [
        {
            "id": "0a3cd214-5383-467a-a702-408205d35fb5",
            "title": "Hii2 - Updated",
            "content": "This is COntent2 Updated",
            "createdAt": "2024-01-05T09:57:51.765Z",
            "updatedAt": "2024-01-05T10:20:36.016Z",
            "deletedAt": null,
            "authorId": "b696e8f2-ae87-4cd3-ae50-93a52bd47fd3"
        }
    ]
  ```

### `POST /api/auth/signup`

- **Description**: Register a new user.
- **Request**:
  ```json
  {
    "email": "newuser@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "uuid",
    "email": "newuser@example.com"
  }
  ```

  ### Edge cases are handled like
  ```json
  {
    "message": "A user with this email already exists"
  }
    ```

### `POST /api/auth/login`

- **Description**: Authenticate a user and return a token.
- **Request**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "token": "jwt-token"
  }
  ```

---
