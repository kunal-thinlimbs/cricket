const express = require("express");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
var cors = require("cors");
const MainSchema = require("./graphql/schema");
var app = express();
var port = process.env.PORT || 6545;
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://kunal:Wd0QWxAUb9PPxsPd@cluster0-blaew.mongodb.net/kunaltestplayer?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("running with ", port);
    });
  })
  .catch(err => {
    console.log(err);
  });
app.use(
  "/graphql",
  expressGraphQL((request, response) => {
    return {
      graphiql: true,
      schema: MainSchema
    };
  })
);
