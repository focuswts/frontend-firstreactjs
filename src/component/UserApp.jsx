import React, { Component } from "react";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";
import ListUsers2 from "./ListUsers2";
import { Provider } from "mobx-react";
import AddUserDropdown from "./AddUserDropdown";
import ListUsers from "./ListUsers";
import UsersDataStoreMobX from "../service/UsersDataStoreMobX";
const browserHistory = require("history").createMemoryHistory();
const routingStore = new RouterStore();

const stores = {
  // Key can be whatever you want
  routing: routingStore,
  user: UsersDataStoreMobX
  // ...other stores
};

const history = syncHistoryWithStore(browserHistory, routingStore);

class UserApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <div className="userApp">
            <h1>User Control Application</h1>
            <Switch>
              <Route path="/" exact component={ListUsers} />
              <Route path="/users" exact component={ListUsers2} />
              <Route path="/users/add" exact component={AddUser} />
              <Route path="/users/add2" exact component={AddUserDropdown} />
              <Route path="/users/update/:id" exact component={UpdateUser} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default UserApp;
