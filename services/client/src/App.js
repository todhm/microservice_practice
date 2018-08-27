import React, { Component } from "react";
import axios from "axios";

import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";

export class App extends Component {
  state = {
    users: [],
    username: "",
    email: ""
  };
  componentDidMount() {
    this.getUsers();
  }
  getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
      .then(res => {
        this.setState({ users: res.data.data.users });
      })
      .catch(err => {
        console.log(err);
      });
  };
  addUser = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    };
    axios
      .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
      .then(res => {
        this.getUsers();
        this.setState({ username: "", email: "" });
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleChange = e => {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };
  render() {
    const { users, username, email } = this.state;
    return (
      <section>
        <div className="section">
          <div className="container">
            <div className="column is-one-third">
              <br />
              <h1 className="title is-1 is-1">All Users</h1>
              <hr />
              <br />
              <AddUser
                username={username}
                email={email}
                addUser={this.addUser}
                handleChange={this.handleChange}
              />
              <br />
              <br />
              <UsersList users={users} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
