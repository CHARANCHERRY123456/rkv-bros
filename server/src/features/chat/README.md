# Chat Feature

A comprehensive chat system built with clean architecture principles following the **Routes → Controller → Service → Repository** pattern.

## 🏗️ Architecture Overview

```
📁 features/chat/
├── 📁 routes/          # HTTP route definitions
├── 📁 controllers/     # HTTP request/response handling
├── 📁 services/        # Business logic layer
├── 📁 repository/      # Data access layer
└── 📄 README.md       # This file
```

## 🚀 Features

### Core Functionality
- **WhatsApp-style Group Ordering** - Groups sorted by last message activity
- **Real-time Group Chat** - Socket.io integration for live messaging
- **Group Management** - Create, join, and manage groups
- **Message History** - Paginated message retrieval
- **Member Management** - Add/remove group members

### Technical Features
- **Activity Tracking** - Groups bubble to top when messages are sent
- **Authentication** - JWT-based user authentication
- **Error Handling** - Comprehensive error responses
- **Pagination** - Efficient message loading
- **Data Validation** - Input sanitization and validation

## 📡 API Endpoints

### Group Management

#### 1. Get User Groups (WhatsApp-style ordering)
```http
GET /api/chat/groups/:email
```

**Response:**
```json
{
  "success": true,
  "message": "Groups retrieved successfully",
  "data": {
    "groups": [
      {
        "id": "groupId",
        "name": "Group Name",
        "members": ["user1@email.com", "user2@email.com"],
        "memberCount": 2,
        "lastActivity": "2025-01-29T10:30:00Z",
        "lastMessage": {
          "content": "Last message content",
          "sender": "user1@email.com",
          "createdAt": "2025-01-29T10:30:00Z"
        }
      }
    ],
    "total": 1,
    "userEmail": "user@email.com"
  }
}
```

#### 2. Create New Group
```http
POST /api/chat/groups
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Group",
  "members": ["user1@email.com", "user2@email.com"],
  "description": "Optional description"
}
```

#### 3. Get Group Details
```http
GET /api/chat/groups/:groupId/details
Authorization: Bearer <token>
```

#### 4. Add Members to Group
```http
POST /api/chat/groups/:groupId/members
Authorization: Bearer <token>
Content-Type: application/json

{
  "members": ["newuser@email.com"]
}
```

### Message Management

#### 1. Get Group Messages
```http
GET /api/chat/groups/:groupId/messages?page=1&limit=50
Authorization: Bearer <token>
```

#### 2. Send Message
```http
POST /api/chat/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Hello, world!",
  "groupId": "groupId",
  "type": "text"
}
```

#### 3. Get Latest Group Message
```http
GET /api/chat/groups/:groupId/messages/latest
Authorization: Bearer <token>
```

#### 4. Mark Message as Read
```http
PUT /api/chat/messages/:messageId/read
Authorization: Bearer <token>
```

## 🎯 WhatsApp-style Features

### Group Ordering Logic
1. **New groups** appear at the top
2. **Groups with recent messages** bubble to the top
3. **Groups with no messages** sorted by creation date
4. **Real-time updates** when messages are sent

### Implementation Details
- MongoDB aggregation pipeline joins Groups with Messages
- Sorts by `lastActivity` timestamp (most recent first)
- Updates group activity when messages are sent
- Frontend receives pre-sorted group list

## 🔧 Integration

### Frontend Integration
```javascript
// Get user's groups (already sorted by activity)
const getGroups = async (userEmail) => {
  const response = await axiosClient.get(`/chat/groups/${userEmail}`);
  return response.data.data.groups; // Already sorted!
};

// Send message (automatically updates group order on backend)
const sendMessage = async (content, groupId) => {
  const response = await axiosClient.post('/chat/messages', {
    content,
    groupId,
    type: 'text'
  });
  // Group will appear at top in next fetch
};
```

### Socket.io Integration
```javascript
// Listen for new messages to update group order
socket.on('new-message', (data) => {
  // Refresh group list or move group to top locally
  refreshGroups();
});
```

## ⚡ Performance Considerations

### Database Optimization
- **Lean queries** - Returns plain objects for better performance
- **Indexed fields** - Ensure `members`, `createdAt`, `lastActivity` are indexed
- **Aggregation pipeline** - Efficient sorting with database-level joins
- **Pagination** - Limits message loading for better UX

### Caching Strategy
- Consider caching group lists for frequent users
- Cache message counts and latest messages
- Implement Redis for high-traffic scenarios

### Real-time Updates
- Socket.io for instant message delivery
- Group order updates via socket events
- Optimistic UI updates for better UX

## 🚀 Deployment & Usage

### Backend Setup
1. **Mount routes** in your main app:
```javascript
import chatRoutes from './features/chat/routes/index.js';
app.use('/api/chat', chatRoutes);
```

2. **Database indexes**:
```javascript
// Add these indexes for performance
db.groups.createIndex({ "members": 1 })
db.groups.createIndex({ "lastActivity": -1 })
db.messages.createIndex({ "groupId": 1, "createdAt": -1 })
```

### Frontend Integration
- Replace existing group fetch logic with new endpoints
- Update UI to handle pre-sorted groups
- Implement real-time updates for group ordering

## 📈 Future Enhancements

- **Unread message counts** - Track unread messages per group
- **Message reactions** - Like, love, etc.
- **File sharing** - Support for images, documents
- **Group admin features** - Admin roles and permissions
- **Message search** - Search within groups
- **Group avatars** - Custom group profile pictures
- **Push notifications** - Real-time notification system

## 🧪 Testing

### Example API Tests
```javascript
// Test group creation and ordering
describe('Chat API', () => {
  test('Groups should be ordered by last activity', async () => {
    // Create two groups
    const group1 = await createGroup('Group 1', ['user1@test.com']);
    const group2 = await createGroup('Group 2', ['user1@test.com']);
    
    // Send message to group2
    await sendMessage('Hello', group2.id);
    
    // Fetch groups - group2 should be first
    const groups = await getGroups('user1@test.com');
    expect(groups[0].id).toBe(group2.id);
  });
});
```

## 🎯 Legacy Support

The new API maintains backward compatibility with existing routes:
- `GET /group/:email` → `GET /groups/:email`
- `POST /group` → `POST /groups`
- `GET /messages/:groupId` → `GET /groups/:groupId/messages`

---

**Built with clean architecture principles for WhatsApp-like user experience!** 💬
