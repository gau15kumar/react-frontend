import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';




const Menu = ({ history }) => (
    <>
        <nav className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
            <div className ="navbar-brand">

                <Link className ="navbar-item" to ="/">
                    <div className ="is-size-4 "><strong>The Social Club</strong></div>
                </Link>
                
                <a role="button" class="navbar-burger" id="burger" data-target="navbarBasicExample" aria-label="menu" aria-expanded="false" href>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
           
            </div>
            
            <div id="navbarBasicExample" className="navbar-menu " >
                <div className ="navbar-start">

                    <Link
                        className= 'navbar-item is-size-5 '  
                        to="/users"
                        >
                        Users
                    </Link>
                    
                    <Link to={`/post/create`} className="navbar-item is-size-5" >
                            Create Post
                    </Link>
                    
                    
                    {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                        
                            <Link to={`/admin`} className="navbar-item is-size-5 "  >
                                Admin
                            </Link>
                        
                    )}

                    {isAuthenticated() && (
                        <Fragment>
                            
                                <Link to={`/findpeople`} className="navbar-item is-size-5 " >
                                    Find People
                                </Link>
                        
                                <Link
                                    to={`/user/${isAuthenticated().user._id}`}
                                    className="navbar-item is-size-5 "
                                    
                                >
                                    {`${isAuthenticated().user.name}'s profile`}
                                </Link>
                            
                                <span onClick={() => signout(() => history.push('/')) }
                                    className="navbar-item is-size-5 " style = {{ cursor: 'pointer'}}>
                                    Sign Out
                                </span>
                                
                            
                        </Fragment>
                    )}
                    {!isAuthenticated() && (
                        <Fragment>
                           
                                <Link  className="navbar-item is-size-5 m-1 " to="/signin">
                                        Sign In
                                    </Link>

                                    <Link  className="navbar-item is-size-5 " to="/signup">
                                        Sign Up
                                    </Link>
                                     
                                            
                                  
                        </Fragment>
                    )}
                </div>

                    
            </div>
        </nav>
    </>
);

export default withRouter(Menu);
