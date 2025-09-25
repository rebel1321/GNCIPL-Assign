# Task Management System - Backend API

A complete RESTful API for task management built with Node.js, Express.js, and MongoDB. This system provides user authentication and full CRUD operations for task management.

## 🚀 Features

- **User Authentication**: JWT-based authentication system
- **Task Management**: Complete CRUD operations for tasks
- **User Management**: User registration, login, and profile management
- **Security**: Password hashing, JWT tokens, and user authorization
- **Task Features**: Task completion status, due dates, and user-specific tasks

## 📋 Table of Contents

- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Task Routes](#task-routes)
- [Data Models](#data-models)
- [Authentication](#authentication)
- [Postman Testing](#postman-testing)
- [Error Handling](#error-handling)
- [Troubleshooting](#troubleshooting)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment5/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will run on `http://localhost:5000`

## 🔧 Environment Variables

Create a `.env` file in the backend root directory:

```bash
# Server Configuration
PORT=5000

# JWT Configuration
JWT_SECRET="your_super_secure_jwt_secret_key"

# MongoDB Configuration
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/taskmanagement"
# Or for local MongoDB:
# MONGODB_URI="mongodb://localhost:27017/taskmanagement"

# Optional: Environment
NODE_ENV="development"
```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

## 👤 User Routes

### 1. User Registration
**POST** `/api/users/register`

Create a new user account.

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Success Response (201 Created)
```json
{
  "_id": "64f5a1b2c3d4e5f6789abcde",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "msg": "Congratulations!! Account has been created for you.."
}
```

#### Error Responses
- `400` - Missing required fields / Password too short / User already exists
- `500` - Internal server error

---

### 2. User Login
**POST** `/api/users/login`

Authenticate user and get JWT token.

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Success Response (200 OK)
```json
{
  "_id": "64f5a1b2c3d4e5f6789abcde",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses
- `400` - Invalid credentials
- `500` - Internal server error

---

### 3. Get User Profile
**GET** `/api/users/`

Get authenticated user's profile information.

#### Headers Required
```
Authorization: Bearer <jwt_token>
```

#### Success Response (200 OK)
```json
{
  "user": {
    "_id": "64f5a1b2c3d4e5f6789abcde",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "joiningTime": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "status": true,
  "msg": "Profile found successfully.."
}
```

#### Error Responses
- `401` - Unauthorized (missing/invalid token)
- `500` - Internal server error

---

## 📝 Task Routes

### 1. Get All Tasks
**GET** `/api/tasks/`

Retrieve all tasks for the authenticated user.

#### Headers Required
```
Authorization: Bearer <jwt_token>
```

#### Success Response (200 OK)
```json
{
  "tasks": [
    {
      "_id": "64f5a1b2c3d4e5f6789abcde",
      "user": "64f5a1b2c3d4e5f6789abcdf",
      "description": "Complete project documentation",
      "isCompleted": false,
      "dueDate": "2024-02-15T23:59:59.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "status": true,
  "msg": "Tasks found successfully.."
}
```

---

### 2. Get Task by ID
**GET** `/api/tasks/:taskId`

Retrieve a specific task by ID.

#### URL Parameters
- `taskId`: MongoDB ObjectId of the task

#### Headers Required
```
Authorization: Bearer <jwt_token>
```

#### Success Response (200 OK)
```json
{
  "task": {
    "_id": "64f5a1b2c3d4e5f6789abcde",
    "user": "64f5a1b2c3d4e5f6789abcdf",
    "description": "Complete project documentation",
    "isCompleted": false,
    "dueDate": "2024-02-15T23:59:59.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "status": true,
  "msg": "Task found successfully.."
}
```

#### Error Responses
- `400` - Invalid task ID / Task not found
- `401` - Unauthorized
- `500` - Internal server error

---

### 3. Create New Task
**POST** `/api/tasks/`

Create a new task for the authenticated user.

#### Headers Required
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "description": "Complete API documentation",
  "dueDate": "2024-02-20T23:59:59.000Z"  // optional
}
```

#### Success Response (200 OK)
```json
{
  "task": {
    "_id": "64f5a1b2c3d4e5f6789abce0",
    "user": "64f5a1b2c3d4e5f6789abcdf",
    "description": "Complete API documentation",
    "isCompleted": false,
    "dueDate": "2024-02-20T23:59:59.000Z",
    "createdAt": "2024-01-17T11:45:00.000Z",
    "updatedAt": "2024-01-17T11:45:00.000Z"
  },
  "status": true,
  "msg": "Task created successfully.."
}
```

#### Error Responses
- `400` - Missing description
- `401` - Unauthorized
- `500` - Internal server error

---

### 4. Update Task
**PUT** `/api/tasks/:taskId`

Update an existing task.

#### URL Parameters
- `taskId`: MongoDB ObjectId of the task

#### Headers Required
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body (all fields optional)
```json
{
  "description": "Updated task description",
  "isCompleted": true,
  "dueDate": "2024-02-25T23:59:59.000Z"
}
```

#### Success Response (200 OK)
```json
{
  "task": {
    "_id": "64f5a1b2c3d4e5f6789abcde",
    "user": "64f5a1b2c3d4e5f6789abcdf",
    "description": "Updated task description",
    "isCompleted": true,
    "dueDate": "2024-02-25T23:59:59.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-17T12:15:00.000Z"
  },
  "status": true,
  "msg": "Task updated successfully.."
}
```

#### Error Responses
- `400` - Invalid task ID / Task not found
- `403` - Cannot update another user's task
- `401` - Unauthorized
- `500` - Internal server error

---

### 5. Delete Task
**DELETE** `/api/tasks/:taskId`

Delete a specific task.

#### URL Parameters
- `taskId`: MongoDB ObjectId of the task

#### Headers Required
```
Authorization: Bearer <jwt_token>
```

#### Success Response (200 OK)
```json
{
  "status": true,
  "msg": "Task deleted successfully.."
}
```

#### Error Responses
- `400` - Invalid task ID / Task not found
- `403` - Cannot delete another user's task
- `401` - Unauthorized
- `500` - Internal server error

---

## 📊 Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  name: String (required, trimmed),
  email: String (required, unique, trimmed),
  password: String (required, hashed with bcrypt),
  joiningTime: Date (default: current date),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Task Schema
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: "User", required),
  description: String (required),
  isCompleted: Boolean (default: false),
  dueDate: Date (optional, default: null),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication:

1. **Registration/Login**: User receives a JWT token upon successful authentication
2. **Protected Routes**: Include the token in the Authorization header
3. **Token Format**: `Authorization: Bearer <your_jwt_token>`
4. **Token Expiration**: Tokens are valid for the duration specified in JWT_SECRET configuration

### Security Features
- Password hashing using bcryptjs (salt rounds: 10)
- JWT token-based authentication
- User-specific data access (users can only access their own tasks)
- Input validation and sanitization

---

## 🧪 Postman Testing

### Setting Up Postman Collection

1. **Create a new Postman Collection** named "Task Management API"

2. **Set up Environment Variables**:
   - `baseUrl`: `http://localhost:5000/api`
   - `authToken`: (will be set automatically after login)

### Testing Workflow

#### Step 1: User Registration
```
POST {{baseUrl}}/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

**Expected**: 201 status, user object with token

#### Step 2: User Login
```
POST {{baseUrl}}/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```

**Postman Script (Tests tab)**:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("authToken", response.token);
}
```

#### Step 3: Get User Profile
```
GET {{baseUrl}}/users/
Authorization: Bearer {{authToken}}
```

#### Step 4: Create Task
```
POST {{baseUrl}}/tasks/
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "description": "Test task from Postman",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

**Postman Script (Tests tab)**:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("taskId", response.task._id);
}
```

#### Step 5: Get All Tasks
```
GET {{baseUrl}}/tasks/
Authorization: Bearer {{authToken}}
```

#### Step 6: Get Specific Task
```
GET {{baseUrl}}/tasks/{{taskId}}
Authorization: Bearer {{authToken}}
```

#### Step 7: Update Task
```
PUT {{baseUrl}}/tasks/{{taskId}}
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "description": "Updated task description",
  "isCompleted": true
}
```

#### Step 8: Delete Task
```
DELETE {{baseUrl}}/tasks/{{taskId}}
Authorization: Bearer {{authToken}}
```

### Postman Collection Tests

Add these test scripts to validate responses:

#### Generic Test Script (for all requests)
```javascript
pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

pm.test("Response should be JSON", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});
```

#### Success Response Test
```javascript
pm.test("Status code is successful", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response has status true", function () {
    const response = pm.response.json();
    if (response.status !== undefined) {
        pm.expect(response.status).to.be.true;
    }
});
```

#### Error Response Test (for negative testing)
```javascript
pm.test("Status code indicates client error", function () {
    pm.expect(pm.response.code).to.be.oneOf([400, 401, 403, 404]);
});

pm.test("Error message is present", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.any.keys('message', 'msg');
});
```

---

## ⚠️ Error Handling

### Common HTTP Status Codes

- **200 OK**: Successful GET, PUT, DELETE
- **201 Created**: Successful POST (user registration)
- **400 Bad Request**: Invalid input, validation errors
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Access denied (trying to access other user's data)
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

### Error Response Format

```json
{
  "status": false,
  "msg": "Error description",
  "message": "Alternative error message format"
}
```

---

## 🔍 Troubleshooting

### Common Issues

#### Server Won't Start
- **Check MongoDB connection**: Ensure MongoDB is running and URI is correct
- **Port already in use**: Change PORT in .env or kill process using port 5000
- **Missing dependencies**: Run `npm install`

#### Authentication Issues
- **"Not authorized, no token"**: Include `Authorization: Bearer <token>` header
- **"Not authorized, token failed"**: Token might be expired or invalid
- **Token not being set**: Check if login/register response includes token

#### Database Issues
- **Connection timeout**: Check MongoDB URI and network connectivity
- **Validation errors**: Ensure required fields are provided
- **Duplicate key error**: Email already exists during registration

#### Task Operations
- **"Task id not valid"**: Ensure taskId is valid MongoDB ObjectId (24 hex characters)
- **"No task found"**: Task doesn't exist or belongs to different user
- **"Can't update/delete task of another user"**: Users can only modify their own tasks

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

### Health Check Endpoint

```
GET http://localhost:5000/
```

Should return server status and basic information.

---

## 📝 API Testing Checklist

### ✅ User Management
- [ ] Register new user with valid data
- [ ] Register with missing fields (should fail)
- [ ] Register with existing email (should fail)
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Get profile with valid token
- [ ] Get profile without token (should fail)

### ✅ Task Management
- [ ] Create task with description only
- [ ] Create task with description and due date
- [ ] Create task without description (should fail)
- [ ] Get all tasks for user
- [ ] Get specific task by ID
- [ ] Get non-existent task (should fail)
- [ ] Update task description
- [ ] Mark task as completed
- [ ] Update task due date
- [ ] Delete task
- [ ] Try to access another user's task (should fail)

### ✅ Authentication & Authorization
- [ ] Access protected route without token (should fail)
- [ ] Access protected route with invalid token (should fail)
- [ ] Access protected route with expired token (should fail)
- [ ] Verify token contains correct user information

---

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Set secure values for production
2. **Database**: Use MongoDB Atlas or secured MongoDB instance
3. **HTTPS**: Enable SSL/TLS in production
4. **Rate Limiting**: Implement rate limiting middleware
5. **Logging**: Add comprehensive logging system
6. **Error Monitoring**: Integrate error tracking (e.g., Sentry)

### Docker Support (Optional)

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review error messages and status codes

---

**Happy Coding! 🎉**