import React, { Component } from "react";
import { list } from "./apiUser";

import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png"

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    renderUsers = users => (
        <div className="columns is-multiline">
            {users.map((user, i) => (
                <div className="card  column  is-one-third mt-2" key={i}>
                    <div className ="card-image">
                        <figure className ="image">
                        
                            <img
                                style={{ height: "auto", width: "50%" }}
                          
                                src={`${process.env.REACT_APP_API_URL}/user/photo/${
                                    user._id
                                }`}
                                onError={i => (i.target.src = `${DefaultProfile}`)}
                                alt={user.name}
                            />
                        </figure>
                    </div>
                   
                    <div className="card-content">
                        <h5 className="content"><strong>{user.name}</strong></h5>
                        <p className="content">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="button is-rounded is-black is-focused"
                        >
                            View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users } = this.state;
        return (
            <div className="container box box-shadow mt-6">
                <h2 className="title">Users</h2>
                
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;
