import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import ReactTable from "react-table";
import "react-table/react-table.css";

@inject("routing", "user")
@observer
class ListUsers extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  userStore = null;

  constructor(props) {
    super(props);
    this.userStore = this.props.user;
    this.renderTable = this.renderTable.bind(this);
    this.addUser = this.addUser.bind(this);
    this.reloadTable = this.reloadTable.bind(this);
  }

  unsubscribeFromStore() {
    this.props.routing.history.subscribe((location, action) =>
      console.log(location.pathname)
    );
  }

  componentWillMount = async () => {
    console.log("will Mount");
    this.userStore.refreshUsers();
    //this.usersData = this.userStore.refreshUsers();
  };

  componentDidMount = async () => {
    console.log("did mount");
    //  this.reloadTable();
    this.unsubscribeFromStore();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.users !== this.userStore.users) {
      console.log("didupdate");
      this.userStore.refreshUsers();
    }
  }

  componentDidCatch() {
    console.log("catch");
    //  this.reloadTable();
  }

  //Update User Method
  updateUserClicked(id) {
    console.log("Update User: " + id);
    this.props.history.push(`/users/update/${id}`);
  }

  addUser() {
    console.log("redirect");
    //   this.props.history.push("/users/add");
    this.props.history.push("/users/add");
  }
  //User Delete Method
  deleteUserClicked(id) {
    this.userStore.deleteUser(id);
    //  this.props.user.deleteUser(id);
  }

  reloadTable() {
    //   this.forceUpdate(() => this.props.user.refreshUsers());
    //this.props.user.refreshUsers();
    this.userStore.refreshUsers();
    //this.forceUpdate();
  }

  renderTable() {
    return this.userStore.users.map(user => {
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
    // const data = this.userStore.users;
    const columns = [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "User",
        accessor: "username"
      },
      {
        Header: "Password",
        accessor: "password"
      },
      {
        Header: "Parking",
        accessor: "parking"
      },
      {
        Header: props => <span>OPTIONS</span>,
        acessor: "options",
        //RowInfo pega os dados da linha
        Cell: rowInfo => (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => this.deleteUserClicked(rowInfo.row.id)}
            >
              Delete
            </button>

            <button
              className="btn btn-success"
              onClick={() => this.updateUserClicked(rowInfo.row.id)}
            >
              Update
            </button>
          </div>
        )
      }
    ];

    return (
      <div>
        <button className="btn btn-success" onClick={this.addUser}>
          NEW USER
        </button>
        <button className="btn btn-success" onClick={this.reloadTable}>
          REFRESH
        </button>
        <ReactTable data={this.userStore.users} columns={columns} />
      </div>
    );
  }
}
export default withRouter(ListUsers);
