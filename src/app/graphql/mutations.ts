import { gql } from 'apollo-angular';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $firstName: String!
    $lastName: String!
    $email: String!
    $salary: Int!
    $department: String!
    $picture: String
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      email: $email
      salary: $salary
      department: $department
      picture: $picture
    ) {
      _id
      firstName
      lastName
      email
      salary
      department
      picture
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $salary: Int
    $department: String
  ) {
    updateEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      salary: $salary
      department: $department
    ) {
      _id
      firstName
      lastName
      email
      salary
      department
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;




