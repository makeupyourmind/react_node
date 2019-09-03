import React, { Component } from 'react'; 
import { TextField, Button} from '@material-ui/core';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import {getContactById, editContactById} from '../../actions/contact/contact';
import '../../styles/editContact.css'


const mapStateToProps = state => {
    console.log("STATE : ", state.contactReducer);
    return {
        // contact: state.contactReducer.contact,
        // loading: state.contactReducer.loading,
        contacts: state.contactReducer.contacts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getContactById: (id) => dispatch(getContactById(id)),
        editContactById: (id, name, age, number) => dispatch(editContactById(id, name, age, number))
    };
};

class EditContact extends Component {

    state = {
        name: '',
        age: '',
        number: ''
    }

    // componentWillMount(){
    //     const id = this.props.location.pathname.split('/')[2]
    //     this.props.getContactById(id)
    // }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = e => {
        e.preventDefault();
        const id = this.props.location.pathname.split('/')[2];
        if(this.state.name === '' || this.state.age === '' || this.state.number === ''){
            let name = document.getElementById('outlined-name').value;
            let age = document.getElementById('outlined-age').value;
            let number = document.getElementById('outlined-number').value;
            this.props.editContactById(id, name, age, number)
                                        .then(() => { 
                                            console.log('edited');
                                            this.props.history.push('/home')
                                        })
        }
        else{
            this.props.editContactById(id, this.state.name, this.state.age, this.state.number)
        }
    }

    render() {
        let {contacts} = this.props;
        const id = this.props.location.pathname.split('/')[2]
        console.log("THIS PROPS contacts : ", contacts);
        let contact = contacts.filter((item) => item._id === id);
        console.log("CONTACT : ", contact);
        return (
            <div>
                <form onSubmit = {this.submit} className = "form">
                    <div className = "field">
                        <label className = "label">Name</label>
                        <TextField
                            id="outlined-name"
                            required
                            defaultValue = {contact[0].name}
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
                            defaultValue = {contact[0].number}
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
                            defaultValue = {contact[0].age}
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