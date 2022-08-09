import { gql } from '@apollo/client';

export const GET_UNITS = gql`
  query GetUnits {
    units {
      id
      name
    }
  }
`;
