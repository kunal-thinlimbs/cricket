const GraphQL = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = GraphQL;
const userMutation = require("./mutations/user.js");
const userQuery = require("./query/user");
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "ALL QUERY",
  fields: {
    getAlluser: userQuery.userList()
  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  description: "ALL MUTATION",
  fields: {
    createUser: userMutation.createUser()
  }
});
const MainSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
module.exports = MainSchema;
