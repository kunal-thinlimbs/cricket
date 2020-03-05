"use strict";
const GraphQL = require("graphql");
const { GraphQLString, GraphQLInt, GraphQLBoolean } = GraphQL;
const userType = require("../types/user.js");
const userResolver = require("../resolvers/user.js");
const userMutation = {
  createUser() {
    return {
      type: userType,
      description: "It will add user in the database",
      args: {
        title: {
          type: GraphQLString,
          description: "user name GraphQLString"
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
        runs: {
          type: GraphQLInt,
          description: "user runs GraphQLString"
        },
        image: {
          type: GraphQLString,
          description: "user image GraphQLString"
        },
        matches: {
          type: GraphQLInt,
          description: "user matches GraphQLString"
        }
      },
      resolve(parent, args, context, info) {
        return userResolver.createUser(parent, args, context, info);
      }
    };
  }
};
module.exports = userMutation;
