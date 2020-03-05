const usersModel = require("../../models/users");

const userResolver = {
  createUser: async (parent, args, context, info) => {
    console.log("findssss", args);
    let findName = await usersModel.findOne({
      title: args.title.toLowerCase()
    });
    console.log("findssss", findName);
    if (findName) {
      return {
        title: "User  Exists",

        image: "User  Exists"
      };
    } else {
      var newUser = new usersModel({
        title: args.title.toLowerCase(),
        runs: args.runs,
        wickets: args.wickets,
        catches: args.catches,
        matches: args.matches,
        century: args.century,
        wicket5: args.wicket5,
        image: args.image
      });
      console.log("newUser", newUser);
      try {
        let response = await newUser.save();
        return response;
      } catch (error) {
        return error;
      }
    }
    //with promise
    // return new Promise((resolve, reject) => {
    //   newUser.save(function(err, user) {
    //     if (user) {
    //       resolve(user);
    //       return newUser;
    //     }
    //     if (err) reject(err);
    //   });
    // });
  },
  getAllUser: async (parent, args, context, info) => {
    try {
      let response = await usersModel.find({});

      return response;
    } catch (error) {
      return error;
    }
    //with promise
    // return new Promise((resolve, reject) => {
    //   usersModel.find({}, function(err, user) {
    //     if (user) {
    //       resolve(user);
    //     }
    //     if (err) reject(err);
    //   });
    // });
  }
};

module.exports = userResolver;
