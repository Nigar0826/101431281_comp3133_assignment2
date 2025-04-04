const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 

// In-memory user store
const users = []; 

// In-memory employee store
const employees = [
  {
    _id: '1',
    firstName: 'Nigar',
    lastName: 'Ahmadova',
    email: 'nigar@example.com',
    salary: 70000,
    department: 'IT',
    picture: null
  },
  {
    _id: '2',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    salary: 65000,
    department: 'HR',
    picture: null
  }
];

// ✅ GraphQL Schema
const typeDefs = gql`
  type Query {
    employees: [Employee!]!
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    addEmployee(
      firstName: String!
      lastName: String!
      email: String!
      salary: Int!
      department: String!
      picture: String
    ): Employee

    updateEmployee(
      id: ID!
      firstName: String
      lastName: String
      email: String
      salary: Int
      department: String
      picture: String
    ): Employee

    deleteEmployee(id: ID!): Boolean
  }

  type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    salary: Int!
    department: String!
    picture: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {          
    email: String!
  }
`;

// ✅ Resolvers
const resolvers = {
  Query: {
    employees: () => employees,
    getEmployee: (_, { id }) => employees.find(emp => emp._id === id)
  },
  Mutation: {
    signup: (_, { email, password }) => {
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      users.push({ email, password });
      return {
        token: 'mock-signup-token-654321',
        user: { email }            
      };
    },

    login: (_, { email, password }) => {
      const user = users.find(user => user.email === email && user.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      return {
        token: 'mock-jwt-token-123456',
        user: { email }            
      };
    },

    addEmployee: (_, { firstName, lastName, email, salary, department, picture }) => {
      const newEmployee = {
        _id: uuidv4(),
        firstName,
        lastName,
        email,
        salary,
        department,
        picture: picture || null
      };
      employees.push(newEmployee);
      return newEmployee;
    },

    updateEmployee: (_, { id, ...updates }) => {
      const empIndex = employees.findIndex(emp => emp._id === id);
      if (empIndex === -1) throw new Error('Employee not found');
      employees[empIndex] = { ...employees[empIndex], ...updates };
      return employees[empIndex];
    },

    deleteEmployee: (_, { id }) => {
      const index = employees.findIndex(emp => emp._id === id);
      if (index === -1) return false;
      employees.splice(index, 1);
      return true;
    }
  }
};

// ✅ Start Apollo Server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
