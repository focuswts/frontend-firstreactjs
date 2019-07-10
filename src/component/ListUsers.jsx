import React, { Component } from "react";
import UsersDataService from "../service/UsersDataService";

class ListUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      message: null
    };
    console.log(props.history);
    this.refreshUsers = this.refreshUsers.bind(this);
    this.deleteUserClicked = this.deleteUserClicked.bind(this);
    this.updateUserClicked = this.updateUserClicked.bind(this);
    this.addUser = this.addUser.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidMount() {
    this.refreshUsers();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.changedProp !== this.state.changedProp;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username != this.props.username) {
      this.refreshUsers();
    }
  }

  //Get All Users Method
  refreshUsers() {
    UsersDataService.retrieveAllUsers().then(response => {
      console.log(response);
      this.setState({ users: response.data });
    });
  }

  //User Delete Method
  deleteUserClicked(id) {
    UsersDataService.deleteUser(id).then(response => {
      this.setState({ message: `Delete of User ${id} sucessfull` });
      this.refreshUsers();
    });
  }

  //Update User Method
  updateUserClicked(id) {
    console.log("Update User: " + id);
    this.props.history.push(`/users/update/${id}`);
  }

  addUser() {
    this.props.history.push(`/users/add`);
  }

  renderTable() {
    return this.state.users.map(user => {
      const { id, username, password, parking } = user;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{username}</td>
          <td>{password}</td>
          <td>{parking}</td>
          <td>
            <button
              className="btn btn-warning"
              onClick={() => this.deleteUserClicked(id)}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => this.updateUserClicked(id)}
            >
              Update
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log("Rendering List Users");
    return (
      <div className="container">
        <h3>Users List</h3>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Parking</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>{this.renderTable()}</tbody>
          </table>
        </div>
        <div className="row">
          <button className="btn btn-success" onClick={this.addUser}>
            NEW USER
          </button>
        </div>
      </div>
    );
  }
}
export default ListUsers;
