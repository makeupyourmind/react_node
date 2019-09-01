import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../../styles/signUp.css';
import withStyles from "@material-ui/core/styles/withStyles";
import { signUp } from "../../actions/auth/auth";

const useStyles = theme => ({ 
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
});

const mapStateToProps = state => {
    // return {
    //     auth: state.authReducer
    // };
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: (password, email, history) =>
            dispatch(signUp(password, email, history))
    };
};


class SignUp extends Component {

    state = {
        name: '',
        password: '',
        email: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = e => {
        e.preventDefault();
        this.props.signUp(this.state.name, this.state.password, this.state.email)
                        .then((res) => {
                            this.props.history.push("/login");
                        })
                        .catch((error) => {
                            console.log("error : ", error) 
                            this.setState({error: 'Invalid values'})
                        })
     }

    render(){
        const { classes } = this.props;
        return(
            <Container className = 'headContainer'>
                <div className="err">
                         {this.state.error
                            ? this.state.error
                            : ""}
                </div>
                <div className='signUp'>Sign Up</div>
            <form className='loginForm' onSubmit = { this.submit }>
                <Container maxWidth="sm" className = 'container'>
                    <TextField
                        id="outlined-email-input"
                        label="Name"
                        value = {this.state.name}
                        required
                        className={classes.textField}
                        onChange = {this.onChange}
                        type="text"
                        name="name"
                        autoComplete="name"
                        margin="normal"
                        variant="outlined"
                        style = {{width: 380}}
                    />
                </Container>
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
                {/* <div className="err">
                     {this.state.error
                        ? this.state.error
                        : ""}
                </div> */}
                <Container maxWidth="sm" className = 'container'>
                    <Button variant="contained" color="primary" className = 'button' type = 'submit'>
                        Sign Up
                    </Button>
                </Container>
            </form>
            <div className="forgot">
                <Link to="/login" className = 'navigantion'>
                    Have an account? Log In
                </Link>
            </div>
        </Container>
        )
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(useStyles)(SignUp))
);
