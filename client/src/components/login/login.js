import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../../styles/login.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from "../../actions/auth/auth";
import withStyles from "@material-ui/core/styles/withStyles";
import { emailPattern } from "../../actions/types";

const useStyles = theme => ({ 
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
});


class Login extends Component {

    state = {
        password: '',
        email: '',
        error: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = e => {
        e.preventDefault();
        this.props.login(this.state.password, this.state.email)
                        .then((res) => {
                            this.props.history.push("/home");
                        })
                        .catch((error) => {
                            console.log("error : ", error) 
                            this.setState({error: 'Password or Email is not correct'})
                        })
     }

    render() {
        const { classes } = this.props;
        return (
            <Container className = 'headContainer'>
                <div className="err">
                         {this.state.error
                            ? this.state.error
                            : ""}
                </div>
                <div className="logIn">Log In</div>
                <form className='loginForm' onSubmit = { this.submit }>
                    <Container maxWidth="sm" className = 'container'>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            value = {this.state.email}
                            required
                            className={classes.textField}
                            onChange = {this.onChange}
                            type="text"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            style = {{width: 380}}
                        />
                    </Container>
                    <Container maxWidth="sm" className = 'container'>
                    <TextField
                        id="outlined-email-input"
                        label="Password"
                        required
                        value = {this.state.password}
                        className={classes.textField}
                        onChange = {this.onChange}
                        type="password"
                        name="password"
                        autoComplete="password"
                        margin="normal"
                        variant="outlined"
                        style = {{width: 380}}
                    />
                    </Container>
                    <Container maxWidth="sm" className = 'container'>
                        <Button variant="contained" color="primary" className = 'button' type = 'submit'>
                            Log In
                        </Button>
                    </Container>
                </form>
                <div className="forgot">
                    <Link to="/sigUp" className = 'navigantion'>
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (password, email, history) =>
            dispatch(login(password, email, history))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(useStyles)(Login))
);
