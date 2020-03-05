import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import React from "react";
import Alluser from "./view/allusers";
import Home from "./view/home.js";
import Compare from "./view/compare";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:6545/graphql"
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/compare" component={Compare} />
            <Route exact path="/" component={Home} />
            <Route exact path="/allplayer" component={Alluser} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}
