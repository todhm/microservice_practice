import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default class UserStatus extends Component{
    state={
        email:'',
        id:'',
        username:''
    };

    componentDidMount(){
        this.getUserStatus();
    }

    getUserStatus=(event)=>{
        const options = {
            url: `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/status`,
            method: 'get',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.localStorage.authToken}`
            }
        };
        return axios(options)
            .then((res)=>{
                const{email,id,username} = res.data.data; 
                this.setState({email,id,username})
            })
            .catch((error)=>{console.log(error.response.data);})
    }

    render(){
        const {id,email,username} = this.state; 
        const {isAuthenticated} = this.props; 
        if(!isAuthenticated){
            return(
                <p>You must logged in to view this. Click <Link to="/login">here </Link>to log back in</p>
            )
        }

        return(
            <div>
                <ul>
                    <li><strong>User ID:</strong>{id}</li>
                    <li><strong>Email:</strong>{email}</li>
                    <li><strong>Username:</strong>{username}</li>
                </ul>
            </div>
        )
    };

}