import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
export default class App extends Component {
  state = {
    users: [],
    username: "",
    email: "",
    title: "TestDriven.io",
    formData:{
      username:'',
      email:'',
      password:''
    },
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
    const { users,username,email,title,formData } = this.state;
    return (
      <div>
        <NavBar title={title} />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <br />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <div>
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
                    )}
                  />
                  <Route exact paht='/register' rencer={()=>(
                    <Form
                      formType={"Register"}
                      formData={formData}
                      />
                  )}/>
                  <Route exact paht='/register' rencer={()=>(
                    <Form
                      formType={"Register"}
                      formData={formData}
                      />
                  )}/>
                  <Route exact path="/about" component={About} />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
