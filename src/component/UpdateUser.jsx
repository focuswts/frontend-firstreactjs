import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import UsersDataService from "../service/UsersDataService";

class UserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      username: "",
      password: "",
      parking: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    if (this.state.id == null) {
      return;
    }

    UsersDataService.retrieveUser(this.state.id).then(response =>
      this.setState({
        username: response.data.username,
        password: response.data.password,
        parking: response.data.parking
      })
    );

    console.log("ID: " + this.state.id);
  }

  onSubmit(values) {
    console.log(values);
    let user = {
      id: this.state.id,
      username: values.username,
      password: values.password,
      parking: values.parking
    };
    console.log("Submit: " + user.username);
    UsersDataService.updateUser(user);
    this.props.history.push(`/users`);
  }

  validate(values) {
    let errors = {};
    if (
      !values.password ||
      !(values.username.length > 1 && values.username.length <= 20)
    ) {
      errors.description = "Enter A Username With A Max of 10 characters";
    }
    if (
      !values.password ||
      !(values.password.length > 1 && values.password.length <= 20)
    ) {
      errors.description = "Enter A Password With a Max of 10 Characters";
    }
    if (!values.parking) {
      errors.description = "Enter A Parking";
    }
    if (!values.id) {
      errors.description =
        "ID is Null,please go back to ListUsers Page and do the process again";
    }
    console.log("Validation: " + errors.description);
    return errors;
  }

  render() {
    let { username, password, parking, id } = this.state;
    return (
      <div>
        <div className="container">
          <h3>User Creation</h3>

          <Formik
            validate={this.validate}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={this.state}
            onSubmit={this.onSubmit}
          >
            {props => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>ID</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="id"
                    disabled
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Username</label>
                  <Field className="form-control" type="text" name="username" />
                </fieldset>
                <fieldset className="form-group">
                  <label>Password</label>
                  <Field className="form-control" type="text" name="password" />
                </fieldset>
                <fieldset className="form-group">
                  <label>Parking</label>
                  <Field className="form-control" type="text" name="parking" />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default UserComponent;
