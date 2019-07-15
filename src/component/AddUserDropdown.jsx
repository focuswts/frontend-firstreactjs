import React, { Component } from "react";
import UserDataStore from "../service/UsersDataStore";
import { Formik, Field, Form } from "formik";
import Select from "react-select";

const options = [
  { value: "Estacionamento Joao", label: "Joao" },
  { value: "Stop Parking", label: "Stop" },
  { value: "Marola Estacionamento", label: "Marola" }
];

class AddUserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      password: "",
      parking: "",
      selectedOption: null
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.value);
  };

  onSubmit(values) {
    console.log("Submit: " + values.username);
    let user = {
      id: values.id,
      username: values.username,
      password: values.password,
      parking: this.state.selectedOption.value
    };
    console.log("Estacionamento: ", user.parking);
    UserDataStore.createUser(user);
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
    if (!values.parking.value) {
      errors.description = "Enter A Parking";
    }

    console.log("Validation: " + errors.description);
    return errors;
  }

  render() {
    const { selectedOption } = this.state;
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
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
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
export default AddUserDropdown;
