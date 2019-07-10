import React, { Component } from "react";
import ListUsers from "./ListUsers";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";
import { createBrowserHistory } from "history";
import PropTypes from "prop-types";
import ListUsers2 from "./ListUsers2";

class UserApp extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.addUser = this.addUser.bind(this);
  }

  addUser() {
    console.log("add");
  }

  render() {
    // const { match, location, history } = this.props;
    const history = createBrowserHistory();
    return (
      <Router history={history}>
        <div className="userApp">
          <h1>User Control Application</h1>
          <Switch>
            <Route path="/" exact component={ListUsers} />
            <Route path="/users" exact component={ListUsers2} />
            <Route path="/users/add" exact component={AddUser} />
            <Route path="/users/update/:id" exact component={UpdateUser} />
          </Switch>
        
        </div>
      </Router>
    );
  }
}

export default UserApp;
