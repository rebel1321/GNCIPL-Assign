# National Budget API System

A RESTful API system for tracking department-wise government budgets, providing CRUD operations, authentication, and public reports.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token) for Authentication

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=7000
   MONGODB_URI=mongodb://localhost:27017
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get a token
- `GET /api/users/profile` - Get user profile (requires authentication)
- `GET /api/users` - Get all users (admin only)

### Budget Management

- `GET /api/budgets` - Get all budgets (requires authentication)
- `POST /api/budgets` - Create a new budget (admin only)
- `GET /api/budgets/:id` - Get a specific budget (requires authentication)
- `PUT /api/budgets/:id` - Update a budget (admin or auditor)
- `DELETE /api/budgets/:id` - Delete a budget (admin only)

### Public Reports

- `GET /api/budgets/reports/summary` - Get summary budget report
- `GET /api/budgets/reports/sectors` - Get sector-wise budget report

## Role-Based Access Control

- **Admin**: Full access to create, read, update, and delete budgets
- **Auditor**: Can update budget utilization and notes, and view all budgets
- **Viewer**: Can only view budgets

## Authorization

For protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer your_token_here
```

## Request and Response Examples

### Register User

**Request:**
```json
POST /api/users/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "Admin User",
  "email": "admin@example.com",
  "role": "admin",
  "token": "jwt_token"
}
```

### Create Budget

**Request:**
```json
POST /api/budgets
Authorization: Bearer your_token_here
{
  "department": "Education",
  "sector": "Social",
  "year": 2025,
  "allocatedAmount": 5000000,
  "notes": "Budget for education sector"
}
```

**Response:**
```json
{
  "_id": "budget_id",
  "department": "Education",
  "sector": "Social",
  "year": 2025,
  "allocatedAmount": 5000000,
  "utilizedAmount": 0,
  "notes": "Budget for education sector",
  "createdAt": "2025-09-06T12:00:00.000Z",
  "updatedAt": "2025-09-06T12:00:00.000Z"
}
```

### Get Summary Report

**Request:**
```
GET /api/budgets/reports/summary?year=2025
```

**Response:**
```json
[
  {
    "_id": {
      "year": 2025
    },
    "totalAllocated": 50000000,
    "totalUtilized": 25000000,
    "count": 10
  }
]
```

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios:

- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error
