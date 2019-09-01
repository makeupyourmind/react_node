import React, { Component } from 'react'; 
import { TextField, Button, Container, CircularProgress, Tooltip } from '@material-ui/core';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import {getContactById, editContactById} from '../../actions/contact/contact';
import '../../styles/editContact.css'


const mapStateToProps = state => {
    return {
        contact: state.contactReducer.contact,
        loading: state.contactReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getContactById: (id) => dispatch(getContactById(id)),
        editContactById: (id, name, age, number) => dispatch(editContactById(id, name, age, number))
    };
};

class EditContact extends Component {

    state = {
        name: '',
        age: '',
        number: ''
    }

    componentWillMount(){
        const id = this.props.location.pathname.split('/')[2]
        this.props.getContactById(id)
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = e => {
        e.preventDefault();
        const id = this.props.location.pathname.split('/')[2];
        if(this.state.name === ''){
            let name = document.getElementById('outlined-name').value;
            let age = document.getElementById('outlined-age').value;
            let number = document.getElementById('outlined-number').value;
            this.props.editContactById(id, name, age, number)
        }
        else{
            this.props.editContactById(id, this.state.name, this.state.age, this.state.number)
        }
    }

    render() {
        let {contact, loading} = this.props;
        if (loading) {
            return <div className = "loading">
                        <CircularProgress/>
                    </div>
        }
        
        // console.log("contact : ", contact);
        return (
            <div>
                <form onSubmit = {this.submit} className = "form">
                    <div className = "field">
                        <label className = "label">Name</label>
                        <TextField
                            id="outlined-name"
                            required
                            defaultValue = {contact.name}
                            onChange = {this.onChange}
                            margin="normal"
                            variant="outlined"
                            name = "name"
                        />
                    </div>
                    <div className = "field">
                        <label className = "label">Number</label>
                        <TextField
                            id="outlined-number"
                            required
                            defaultValue = {contact.number}
                            onChange = {this.onChange}
                            margin="normal"
                            variant="outlined"
                            name = "number"
                        />
                    </div>
                    <div className = "field">
                        <label className = "label">Age</label>
                        <TextField
                            id="outlined-age"
                            required
                            defaultValue = {contact.age}
                            onChange = {this.onChange}
                            margin="normal"
                            variant="outlined"
                            name = "age"
                        />
                    </div>
                    <div className = "button">
                        <Button variant="contained" color="primary" className = 'button' type = 'submit'>
                            Edit
                        </Button>
                    </div>
                    <div className = "button">
                        <Button variant="contained" color="primary" className = 'button'>
                            <Link to = '/home' className='navigation'>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        )
    }

}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditContact)
);