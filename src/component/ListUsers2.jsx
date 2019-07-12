import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import UsersDataService from "../service/UsersDataService";

class ListUsers2 extends Component {
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
    this.reloadTable = this.reloadTable.bind(this);
  }

  componentWillMount() {
    this.refreshUsers();
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.users == prevState.users) {
      this.refreshUsers();
    }
  }



  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.users.length == 0) {
      return true;
    }

    if (this.state.users == nextState.users) {
      return false;
    }

    return true;
  }

  //Get All Users Method
  refreshUsers() {
    UsersDataService.retrieveAllUsers().then(response => {
      this.setState({ users: response.data });
    });
  }

  reloadTable() {
    console.log("Refresh");
    this.forceUpdate();
  }

  //User Delete Method
  deleteUserClicked(id) {
    UsersDataService.deleteUser(id).then(response => {
      this.setState({ message: `Delete of User ${id} sucessfull` });
    },
      this.refreshUsers()
    );

    this.forceUpdate();
  }

  //Update User Method
  updateUserClicked(id) {
    this.props.history.push(`/users/update/${id}`);
  }

  addUser() {
    this.props.history.push(`/users/add`);
  }

  render() {
    const users = this.state.users;
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
        <ReactTable
          data={users}
          columns={columns}
          resolveData={data => data.map(row => row)}
        />
      </div>
    );
  }
}
export default ListUsers2;
