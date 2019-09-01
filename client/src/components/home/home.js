import React, { Component } from 'react';
import { connect } from "react-redux";
import { authorizated, logout } from "../../actions/auth/auth";
import { Link } from 'react-router-dom';
import Contacts from '../contact/contacts';
import '../../styles/home.css';

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authorizated: () => dispatch(authorizated()),
        logout: () => dispatch(logout()),
    };
};

class Home extends Component {

    logout = e => {
        e.preventDefault();
        this.props.logout()
        this.props.history.push("/");
     }

    componentWillMount = () => {
        if (!localStorage.getItem("token")){
            return this.props.history.push("/login");
        }else{
            this.props.authorizated()
                                    .catch(e => {
                                        this.props.history.push('/login')
                                    });
        }
    };

    render() {
        return (
            <div>
                <div className = "welcome">Welcome to your contact list app, {this.props.auth.user.name}</div>
                <div className = 'logout'><Link to = '/' className = "navigation" onClick = {this.logout}>Log Out</Link></div>
                <Contacts/>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
