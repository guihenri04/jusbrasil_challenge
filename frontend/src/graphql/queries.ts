import { gql } from '@apollo/client';

export const SEARCH_SUGGESTIONS = gql`
  query SearchSuggestions($input: SearchSuggestionsInput!) {
    searchSuggestions(input: $input) {
      suggestions {
        id
        term
        category
      }
      total
      hasMore
    }
  }
`;

export const GET_ALL_SUGGESTIONS = gql`
  query GetAllSuggestions {
    getAllSuggestions {
      id
      term
      category
      createdAt
      updatedAt
    }
  }
`;

export const HEALTH_CHECK = gql`
  query HealthCheck {
    healthCheck
  }
`; 