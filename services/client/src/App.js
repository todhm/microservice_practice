import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Form from "./components/forms/Form";
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';
import Message from './components/Message';

export default class App extends Component {

  state = {
    users: [],
    title: "TestDriven.io",
    isAuthenticated: false,
    messageName: null, 
    messageType: null,
  };

  componentWillMount() {
    if (window.localStorage.getItem('authToken')) {
      this.setState({ isAuthenticated: true });
    };
  };
  componentDidMount() {
    if (window.localStorage.getItem('authToken')) {
      this.getUsers();
    };
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

  handleUserFormSubmit=event=>{
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
      this.setState({isAuthenticated: true});
      this.getUsers();

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

  logoutUser=()=>{
    window.localStorage.clear();
    this.setState({isAuthenticated:false, messageName: null, messageType: null});
  };
  loginUser=(token)=>{
    window.localStorage.setItem('authToken',token);
    this.setState({isAuthenticated:true});
    this.getUsers(); 
    this.createMessage('Welcome!','success');
  };

  createMessage=(name="Sanity Check",type="success")=>{
    this.setState({
      messageName:name, 
      messageType:type
    });
    setTimeout(()=>{
      this.removeMessage();
    },3000);

  };

  removeMessage=()=>{
    this.setState({
      messageName:null, 
      messageType:null
    })
  }

  render() {
    const { users,  title, isAuthenticated,messageName, messageType} = this.state;
    return (
      <div>
        <NavBar title={title} isAuthenticated={isAuthenticated}/>
        <section className="section">
          <div className="container">
          {this.state.messageName && this.state.messageType &&
          <Message
            messageName={messageName}
            messageType={messageType}
            removeMessage={this.removeMessage}
          />}
            <div className="columns">
              <div className="column is-half">
                <br />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                        <UsersList users={users} />
                    )}
                  />
                  <Route exact path='/login' render={()=>(
                    <Form
                      formType={"Login"}
                      isAuthenticated={isAuthenticated}
                      loginUser={this.loginUser}
                      createMessage={this.createMessage}
                      />
                  )}/>
                  <Route exact path='/register' render={()=>(
                    <Form
                      formType={"Register"}
                      loginUser={this.loginUser}
                      isAuthenticated={isAuthenticated}
                      createMessage={this.createMessage}
                      />
                  )}/>
                  <Route exact path="/about" component={About} />
                  <Route exact path="/logout" render={()=>(
                    <Logout 
                      logoutUser={this.logoutUser}
                      isAuthenticated={isAuthenticated}
                    />
                  )} />
                  <Route exact path='/status' render={()=>(
                    <UserStatus
                      isAuthenticated={isAuthenticated}
                    />
                  )}/>
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
