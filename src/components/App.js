import React from "react";
import "../styles/App.css";
import Login from "./Login/login";
import UserList from "./UserList/UserList";
import Home from "./Home/Home";
import Navbar from "./MainNavbar/MainNavbar";
import Domains from "./Domains/Domains";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../graphQLConfig";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(far, faCheckSquare, faCoffee, faTrash);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/domains" component={Domains} />
          <Route path="/login" component={Login} />
          <Route path="/userlist" component={UserList} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
