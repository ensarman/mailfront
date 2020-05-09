import React from "react";
import "../styles/App.css";
import Login from "./Login/login";
import UserList from "./UserList/UserList";
import Home from "./Home/Home";
import Navbar from "./MainNavbar/MainNavbar";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../graphQLConfig";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/userlist" component={UserList} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
