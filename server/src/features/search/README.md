# User Search Feature

A comprehensive user search system built with clean architecture principles following the **Routes → Controller → Service → Repository** pattern.

## 🏗️ Architecture Overview

```
📁 features/search/
├── 📁 routes/          # HTTP route definitions
├── 📁 controllers/     # HTTP request/response handling
├── 📁 services/        # Business logic layer
├── 📁 repository/      # Data access layer
├── 📁 middlewares/     # Request validation & rate limiting
├── 📁 constants/       # Configuration constants
└── 📄 README.md       # This file
```

## 🚀 Features

### Core Functionality
- **General Search** - Search users by name or email
- **Autocomplete Suggestions** - WhatsApp-like email suggestions
- **Email Validation** - Batch validate emails for group creation
- **Advanced Search** - Filter by search type and match mode
- **Pagination** - Handle large result sets efficiently

### Technical Features
- **Input Validation** - Comprehensive request validation
- **Rate Limiting** - Prevent API abuse
- **Error Handling** - Consistent error responses
- **Security** - Regex injection prevention
- **Performance** - Optimized database queries

## 📡 API Endpoints

### 1. General Search
```http
GET /api/search/search?q=john&page=1&limit=20&sortBy=name&sortOrder=asc
```

**Parameters:**
- `q` (required) - Search query (1-100 characters)
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Results per page (1-50, default: 20)
- `sortBy` (optional) - Sort field: name, email, createdAt
- `sortOrder` (optional) - Sort order: asc, desc

**Response:**
```json
{
  "success": true,
  "message": "Search completed successfully",
  "data": {
    "users": [
      {
        "id": "userId",
        "email": "john@example.com",
        "name": "John Doe",
        "displayName": "John Doe <john@example.com>"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "pages": 1,
      "hasNext": false,
      "hasPrev": false
    },
    "total": 1
  }
}
```

### 2. Autocomplete Suggestions
```http
GET /api/search/suggest?q=jo&limit=5
```

**Parameters:**
- `q` (optional) - Search query (min 2 characters)
- `limit` (optional) - Max suggestions (1-10, default: 10)

**Response:**
```json
{
  "success": true,
  "message": "Suggestions retrieved successfully",
  "data": {
    "suggestions": [
      {
        "id": "userId",
        "email": "john@example.com",
        "name": "John Doe",
        "displayName": "John Doe <john@example.com>"
      }
    ],
    "query": "jo"
  }
}
```

### 3. Email Validation (Group Creation)
```http
POST /api/search/validate-emails
Content-Type: application/json

{
  "emails": ["john@example.com", "jane@example.com", "invalid@email"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email validation completed successfully",
  "data": {
    "validUsers": [
      {
        "id": "userId",
        "email": "john@example.com",
        "name": "John Doe",
        "displayName": "John Doe <john@example.com>"
      }
    ],
    "invalidEmails": ["invalid@email"],
    "totalProvided": 3,
    "totalValid": 1
  }
}
```

### 4. Advanced Search
```http
GET /api/search/search?q=john&searchType=email&exactMatch=true
```

**Additional Parameters:**
- `searchType` - Search scope: email, name, both
- `exactMatch` - Exact match mode: true, false

### 5. Health Check
```http
GET /api/search/health
```

## 🛡️ Security & Validation

### Input Validation
- Query length limits (1-100 characters)
- Result limits (max 50 for search, 10 for suggestions)
- Email format validation
- Array size limits for batch operations

### Rate Limiting
- **General endpoints**: 100 requests/minute
- **Suggestions**: 200 requests/minute (higher for UX)
- Per-user tracking via JWT or IP address

### Security Measures
- Regex injection prevention
- SQL injection protection via parameterized queries
- Authentication required on all endpoints
- User exclusion (can't search for self)

## 🎯 Frontend Integration

### WhatsApp-like Email Suggestions
```javascript
// Autocomplete component
const searchUsers = async (query) => {
  if (query.length < 2) return [];
  
  const response = await fetch(`/api/search/suggest?q=${query}&limit=5`);
  const data = await response.json();
  
  return data.data.suggestions;
};
```

### Group Creation Validation
```javascript
// Validate emails before creating group
const validateEmails = async (emails) => {
  const response = await fetch('/api/search/validate-emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emails })
  });
  
  const data = await response.json();
  return data.data;
};
```

### React-Select Integration
```javascript
// For use with react-select component
const loadOptions = async (inputValue) => {
  const users = await searchUsers(inputValue);
  return users.map(user => ({
    value: user.email,
    label: user.displayName
  }));
};
```

## ⚡ Performance Considerations

### Database Optimization
- **Lean queries** - Returns plain objects, not Mongoose documents
- **Field selection** - Only returns necessary fields (email, name, _id)
- **Indexes** - Ensure email and name fields are indexed
- **Query limits** - All queries have maximum result limits

### Caching Strategy
- Consider implementing Redis for frequent searches
- Cache suggestion results for common queries
- Implement query result caching for popular searches

### Monitoring
- Use `/health` endpoint for service monitoring
- Log slow queries and errors
- Monitor rate limit usage

## 🔧 Configuration

### Environment Variables
```env
# Rate limiting
SEARCH_RATE_LIMIT=100
SEARCH_RATE_WINDOW=60000

# Search limits
MAX_SEARCH_RESULTS=50
MAX_SUGGESTION_RESULTS=10
```

### Constants
All configuration is centralized in `/constants/index.js`:
- Query limits and validation rules
- Error codes and messages
- Default values and thresholds

## 🧪 Testing Examples

### Unit Tests
```javascript
// Test search service
describe('UserSearchService', () => {
  test('should return empty suggestions for short query', async () => {
    const result = await service.suggestUsers('a');
    expect(result.suggestions).toHaveLength(0);
  });
});
```

### Integration Tests
```javascript
// Test API endpoints
describe('Search API', () => {
  test('GET /suggest should return suggestions', async () => {
    const response = await request(app)
      .get('/api/search/suggest?q=john')
      .expect(200);
    
    expect(response.body.success).toBe(true);
  });
});
```

## 🚀 Deployment & Usage

1. **Install dependencies** - Ensure all required packages are installed
2. **Database setup** - Create indexes on User model fields
3. **Environment config** - Set rate limits and search parameters
4. **Route integration** - Mount search routes in main app
5. **Frontend integration** - Use endpoints in React components

## 📈 Future Enhancements

- **Fuzzy search** - Handle typos and similar spellings
- **Search history** - Track user search patterns
- **Advanced filters** - Filter by user roles, departments, etc.
- **Real-time search** - WebSocket-based live search
- **Search analytics** - Track popular searches and optimize

---

**Built with clean architecture principles for maximum maintainability and scalability!** 🎯
