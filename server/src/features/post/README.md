# Post Feature

This folder implements the Post feature for the application, including the Post, Like, and Comment schemas, and exposes RESTful routes for post management.

## Schemas

### Post
- **userId**: ObjectId (ref: User, required)
- **content**: String
- **mediaUrl**: String
- **timestamps**: createdAt, updatedAt

### Like
- **userId**: ObjectId (ref: User)
- **postId**: ObjectId (ref: Post)
- **timestamps**: createdAt, updatedAt

### Comment
- **postId**: ObjectId (ref: Post, required)
- **userId**: ObjectId (ref: User, required)
- **parentCommentId**: ObjectId (ref: Comment, for nested comments, default: null)
- **content**: String (required)
- **timestamps**: createdAt, updatedAt

## Routes

All routes require authentication (`authMiddleware`).

### Create Post
- **POST /**
- **Input:**
  - `content`: String
  - `mediaUrl`: String (optional)
- **Output:**
  - Created post object

### Get All Posts
- **GET /**
- **Input:**
  - Query params: `page`, `limit` (optional)
- **Output:**
  - Array of post objects with like count and isLikeByMe

### Get Post By ID
- **GET /:postId**
- **Input:**
  - URL param: `postId`
- **Output:**
  - Post object with details

### Toggle Like
- **PUT /:postId/like**
- **Input:**
  - URL param: `postId`
- **Output:**
  - `{ liked: true }` if liked, `{ liked: false }` if unliked

---

**Note:**
- All timestamps are automatically managed.
- Likes and comments are linked to posts via ObjectId references.
- Nested comments are supported via `parentCommentId`.
