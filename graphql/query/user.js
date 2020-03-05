const GraphQL = require("graphql");
const { GraphQLList } = GraphQL;
const userType = require("../types/user.js");
const userResolver = require("../resolvers/user.js");
const userQuery = {
  userList() {
    return {
      type: new GraphQLList(userType),
      description: "This wil l return all emp details",
      resolve(parent, args, context, info) {
        return userResolver.getAllUser();
      }
    };
  }
};

module.exports = userQuery;
