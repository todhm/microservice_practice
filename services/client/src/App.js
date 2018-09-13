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
    isAuthenticated: false,
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
    console.log(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`);
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
      .then(res => {
        this.getUsers();
        this.setState({ username: "", email: "" });
        window.localStorage.setItem('authToken',res.data.auth_token);
        this.setState({isAuthenticated: true})
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  handleChange = e => {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };

  handleFormChange=(event)=>{
    const obj = this.state.formData; 
    obj[event.target.name] = event.target.value; 
    this.setState(obj);
  }

  handleUsersFormSubmit=event=>{
    event.preventDefault(); 
    const formType = window.location.href.split('/').reverse()[0];
    let data = {
      email: this.state.formData.email, 
      password: this.state.formData.password,
    };
    if(formType.includes('register')){
      data.username = this.state.formData.username; 
    }

    const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/${formType}`;
    axios.post(url,data)
    .then((res)=>{
      this.clearFormState();
      window.localStorage.setItem('authToken', res.data.auth_token);
    })
    .catch((err)=>{console.log(err.response.data);});
    
  }

  clearFormState=()=>{
    this.setState({
      formData: {username:'', email:'', password:''},
      username:'',
      email:'',
    })
  }

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
                  <Route exact path='/login' render={()=>(
                    <Form
                      formType={"Login"}
                      formData={formData}
                      handleUsersFormSubmit={this.handleUsersFormSubmit}
                      handleFormChange={this.handleFormChange}
                      />
                  )}/>
                  <Route exact path='/register' render={()=>(
                    <Form
                      formType={"Register"}
                      formData={formData}
                      handleUsersFormSubmit={this.handleUsersFormSubmit}
                      handleFormChange={this.handleFormChange}
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
