import gql from "graphql-tag";

const ALL_USER_QUERY = gql`
  query getAlluser {
    getAlluser {
      century
      title
      catches
      wicket5
      image
      runs
      wickets
      matches
    }
  }
`;

const userMutaion = gql`
  mutation createUser(
    $image: String!
    $title: String!
    $century: Int
    $catches: Int
    $wicket5: Int
    $runs: Int
    $matches: Int
    $wickets: Int
  ) {
    createUser(
      image: $image
      title: $title
      century: $century
      catches: $catches
      wicket5: $wicket5
      runs: $runs
      matches: $matches
      wickets: $wickets
    ) {
      century
      title
      catches
      wicket5
      image
      runs
      wickets
      matches
    }
  }
`;
export { ALL_USER_QUERY, userMutaion };
