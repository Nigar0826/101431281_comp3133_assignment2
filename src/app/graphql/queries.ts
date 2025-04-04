import { gql } from 'apollo-angular';

export const GET_ALL_EMPLOYEES = gql`
  query {
    employees {
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

export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
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
