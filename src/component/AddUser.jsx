import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
import UsersDataService from "../service/UsersDataService";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      password: "",
      parking: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onSubmit(values) {
    console.log("Submit: " + values.username);
    let user = {
      id: values.id,
      username: values.username,
      password: values.password,
      parking: values.parking
    };

    UsersDataService.createUser(user);
    alert("Usuário Criado Com Sucesso");
    this.props.history.push(`/users`);
  }

  validate(values) {
    let errors = {};
    if (
      !values.username ||
      !(values.username.length > 1 && values.username.length <= 10)
    ) {
      errors.description = "Enter A Username With A Max of 10 characters";
    }
    if (
      !values.password ||
      !(values.password.length > 1 && values.password.length <= 10)
    ) {
      errors.description = "Enter A Password With a Max of 10 Characters";
    }
    if (!values.parking) {
      errors.description = "Enter A Parking";
    }

    console.log("Validation: " + errors.description);
    return errors;
  }

  render() {
    return (
      <div className="container">
        <h3>User Creation</h3>

        <Formik
          validate={this.validate}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize={true}
          onSubmit={this.onSubmit}
        >
          {props => (
            <Form>
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
                <Field
                  className="form-control"
                  type="text"
                  name="username"
                  value={props.username}
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Password</label>
                <Field
                  className="form-control"
                  type="text"
                  name="password"
                  value={props.password}
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Parking</label>
                <Field
                  className="form-control"
                  type="text"
                  name="parking"
                  value={props.username}
                />
              </fieldset>
              <button className="btn btn-success" type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default AddUser;
