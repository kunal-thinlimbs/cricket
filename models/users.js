const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersModel = new Schema(
  {
    title: String,
    runs: Number,
    wickets: Number,
    catches: Number,
    matches: Number,
    century: Number,
    wicket5: Number,
    image: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("users", usersModel);

// import * as mongoose from "mongoose";

// export interface usersModelTypes extends mongoose.Document {
//   name: String;
//   age: Number;
//   email: String;
//   status: Boolean;
//   phoneNumber: Number;
// }

// export const usersModelSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     IpVoted: { type: Array }
//   },
//   {
//     timestamps: true
//   }
// );

// const userModel = mongoose.model<usersModelTypes>("surveys", usersModelSchema);
// export default userModel;
