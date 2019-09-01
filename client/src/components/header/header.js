import React, { Component } from 'react';
import '../../styles/header.css';
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <div className = 'header'>
                <div className = "links">
                    <li><Link to = '' className = 'navigantion'>Main</Link></li>
                    <li><Link to = '/login' className = 'navigantion'>Log In</Link></li>
                    <li><Link to = '/signUp' className = 'navigantion'>Sign Up</Link></li>
                    <li><Link to = '/home' className = 'navigantion'>Home</Link></li>
                </div>
            </div>
        )
    }
}

export default Header;