import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(input: { email: $email, username: $username, password: $password }) {
      _id
      username
      email
      password
    }
  }
`;
