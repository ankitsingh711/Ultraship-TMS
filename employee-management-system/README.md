# Employee Management System

A full-stack employee management application built with React, GraphQL, Node.js, and MongoDB.

## Features

- **Authentication**: Secure login/signup with JWT and role-based access (Admin/Employee).
- **Dashboard**:
  - **Grid View**: Detailed table view of employees.
  - **Tile View**: Card-based view for quick scanning.
  - **Filtering**: Filter by department, position, and search by name/email.
  - **Pagination**: Server-side pagination for scalability.
  - **Sorting**: Sort employees by various fields.
- **Employee Management**:
  - View detailed employee profiles.
  - Add, Edit, Delete employees (Admin only).
  - Flag employees for review.
- **UI/UX**:
  - Modern glassmorphism design.
  - Responsive layout (mobile/desktop).
  - Smooth animations and transitions.
  - Dark mode aesthetic.

## Tech Stack

### Backend
- **Node.js & Express**: Server runtime.
- **Apollo Server**: GraphQL API.
- **MongoDB & Mongoose**: Database and ODM.
- **TypeScript**: Type safety.
- **JWT & Bcrypt**: Authentication security.

### Frontend
- **React**: UI library.
- **Vite**: Build tool.
- **Apollo Client**: GraphQL state management.
- **React Router**: Navigation.
- **Vanilla CSS**: Custom design system with variables and utility classes.
- **Lucide React**: Icons.

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or cloud URI)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Seed the database with sample data
   npm run seed
   
   # Start the server
   npm run dev
   ```
   Backend runs on `http://localhost:4000`.

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start the development server
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`.

## API Documentation

The GraphQL Playground is available at `http://localhost:4000/graphql` when the server is running.

### Sample Query
```graphql
query GetEmployees {
  employees(page: 1, limit: 10) {
    employees {
      name
      department
      position
    }
    totalCount
  }
}
```

## Credentials

**Admin User**
- Email: `admin@example.com`
- Password: `password123`

**Employee User**
- Email: `employee@example.com`
- Password: `password123`
