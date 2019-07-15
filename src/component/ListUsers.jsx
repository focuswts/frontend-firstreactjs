import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { action, observable } from "mobx";

@inject("routing", "user")
@observer
class ListUsers extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.renderTable = this.renderTable.bind(this);
    this.addUser = this.addUser.bind(this);
    this.reloadTable = this.reloadTable.bind(this);
  }

  unsubscribeFromStore() {
    this.props.routing.history.subscribe((location, action) =>
      console.log(location.pathname)
    );
  }

  @action
  componentDidMount() {
    console.log("did mount");
    this.props.user.refreshUsers();
    this.reloadTable();
    this.unsubscribeFromStore();
  }

  @action
  componentDidUpdate(prevProps) {

    if (prevProps.user.users !== this.props.user.users) {
      console.log("didupdate");
      this.props.user.refreshUsers();
      this.reloadTable();
    }

  }

  @action
  componentDidCatch() {
    console.log("catch");
    this.reloadTable();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.users !== this.props.user.users) {
      console.log("willProps");
      this.reloadTable();
    }
  }


  //Update User Method
  @action
  updateUserClicked(id) {
    console.log("Update User: " + id);
    this.props.history.push(`/users/update/${id}`);
  }

  @action
  addUser() {
    console.log("redirect");
    //   this.props.history.push("/users/add");
    this.props.history.push("/users/add");
  }
  //User Delete Method
  @action
  deleteUserClicked(id) {
    this.props.user.deleteUser(id).then(this.props.user.refreshUsers());
    //  this.props.user.deleteUser(id);
    this.reloadTable();
  }


  renderTable() {
    return this.props.user.users.map(user => {
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

  reloadTable() {
    //   this.forceUpdate(() => this.props.user.refreshUsers());
    this.props.user.refreshUsers();
    this.forceUpdate();
  }

  render() {
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
        <ReactTable data={this.props.user.users} columns={columns} />
      </div>
    );
  }
}
export default withRouter(ListUsers);
