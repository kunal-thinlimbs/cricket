const GraphQL = require("graphql");
const { GraphQLString, GraphQLInt } = GraphQL;

const userType = new GraphQL.GraphQLObjectType({
  name: "userType",
  description: "user Details",
  fields: () => ({
    title: {
      type: GraphQLString,
      description: "user name GraphQLString"
    },
    runs: {
      type: GraphQLString,
      description: "user runs GraphQLString"
    },
    wickets: {
      type: GraphQLInt,
      description: "user wickets  GraphQLInt"
    },
    catches: {
      type: GraphQLInt,
      description: "user catches GraphQLInt"
    },
    century: {
      type: GraphQLInt,
      description: "user century GraphQLInt"
    },
    wicket5: {
      type: GraphQLInt,
      description: "user wicket5 GraphQLString"
    },
    image: {
      type: GraphQLString,
      description: "user image GraphQLString"
    },
    matches: {
      type: GraphQLInt,
      description: "user matches GraphQLInt"
    }
  })
});
module.exports = userType;
