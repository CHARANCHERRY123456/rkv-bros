# Assignment Feature

Clean architecture implementation of Assignment feature following Routes → Controller → Service → Repository pattern.

## 📁 Structure

```
assignment/
├── assignment.model.js          # Mongoose schema
├── assignment.repository.js     # Data access layer (extends CrudRepository)
├── assignment.service.js        # Business logic
├── assignment.controller.js     # HTTP handlers
├── assignment.routes.js         # Route definitions
└── README.md                    # This file
```

## 🏗️ Architecture Flow

```
Client Request
    ↓
Routes (assignment.routes.js)
    ↓
Controller (assignment.controller.js) - HTTP handling + next(error)
    ↓
Service (assignment.service.js) - Business logic + validation
    ↓
Repository (assignment.repository.js) - Database operations
    ↓
Model (assignment.model.js) - Mongoose schema
    ↓
MongoDB
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/assignments` | Create new assignment |
| GET | `/assignments` | Get all assignments |
| GET | `/assignments/:name` | Get specific assignment |
| POST | `/assignments/:name/vote` | Submit/toggle vote |
| PUT | `/assignments/:name/reset-votes` | Reset all votes |
| PUT | `/assignments/:name` | Update assignment |
| DELETE | `/assignments/:name` | Delete assignment |

## ⚙️ Features

- **Toggle Voting**: Click once to vote, click again to unvote
- **Admin Marking**: Admin can mark correct answers (green highlight)
- **Vote Counting**: Track vote counts and percentages
- **Error Handling**: Centralized error middleware with next(error)
- **Validation**: Input validation in service layer
- **Repository Pattern**: Extends CrudRepository for common operations

## 🎯 Key Methods

### Repository
- `findByName(assignmentName)` - Find assignment by name
- `toggleVote(assignmentName, questionIndex, optionIndex, email, isAdmin)` - Toggle vote
- `resetVotes(assignmentName)` - Reset all votes

### Service
- `submitVote(assignmentName, questionIndex, optionIndex, email)` - Handle vote with validation
- Throws `ValidationError` or `NotFoundError` for proper error handling

### Controller
- All methods use `try-catch` with `next(error)` for centralized error handling
