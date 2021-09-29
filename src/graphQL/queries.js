import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      _id
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
  query login($userID: String!, $password: String!) {
    login(userID: $userID, password: $password) {
      token
      expiredAt
    }
  }
`;

export const GET_PROFILE = gql`
  query getProfile {
    getProfile {
      _id
      email
      username
      catchedPokemons {
        refId
        nickname
        detail {
          name
          abilities {
            ability {
              name
            }
          }
        }
      }
    }
  }
`;

export const FETCH_POKEMONS = gql`
  query pokemons($page: Int!, $limit: Int) {
    pokemons(page: $page, limit: $limit) {
      id
      name
      abilities {
        ability {
          name
        }
      }
    }
  }
`;
