import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String]!
    attendance: Float!
    email: String!
    position: String!
    department: String!
    photoUrl: String
    createdAt: String
    updatedAt: String
  }

  type User {
    id: ID!
    email: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type PaginatedEmployees {
    employees: [Employee]!
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
  }

  input EmployeeFilter {
    department: String
    position: String
    search: String
    minAge: Int
    maxAge: Int
  }

  input EmployeeSort {
    field: String
    order: String # "asc" or "desc"
  }

  input EmployeeInput {
    name: String!
    age: Int!
    class: String!
    subjects: [String]!
    attendance: Float!
    email: String!
    position: String!
    department: String!
    photoUrl: String
  }

  input UpdateEmployeeInput {
    name: String
    age: Int
    class: String
    subjects: [String]
    attendance: Float
    email: String
    position: String
    department: String
    photoUrl: String
  }

  type Query {
    employees(
      page: Int
      limit: Int
      filter: EmployeeFilter
      sort: EmployeeSort
    ): PaginatedEmployees!
    
    employee(id: ID!): Employee
    
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, role: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): String!
    flagEmployee(id: ID!): Employee!
  }
`;
