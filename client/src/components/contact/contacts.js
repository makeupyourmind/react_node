import React, { Component } from 'react';
import { getAllContacts, addContact, deleteContact, search } from '../../actions/contact/contact';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import '../../styles/contact.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Hover from './hover';
import ShowContacts from './showContacts';

class Contacts extends Component {

    state = {
        name: '',
        number: '',
        age: '',
        error: ''
    }

    componentWillMount(){
        this.props.getAllContacts()
                                .catch(e => {
                                    this.props.history.push('/login')
                                });
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.contact) {
          this.props.contacts.push(nextProps.contact);
        }

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        switch (e.target.name) {
            case 'age':
                if(/^[0-9]+$/.test(e.target.value)){
                    this.setState({
                        error: ""
                    });
                } else
                    this.setState({
                        error: "Enter correct age. Only numbers"
                    });
                break;
        }
    }

    delete = (e) => {
        e.preventDefault();
        const userId = this.props.auth.user._id;
        this.props.deleteContact(e.currentTarget.value, userId)
    }

    search = (e) => {
        this.props.search(e.target.value)
    }

    submit = e => {
        e.preventDefault();
        const userId = this.props.auth.user._id;
        this.props.addContact(this.state.name, this.state.number, this.state.age, userId)
                        .catch((error) => {
                            console.log("error : ", error) 
                            this.setState({error: 'Invalid values'})
                        })
     }

    render() {

    
        let {contacts, loading} = this.props;
        if (loading) {
            return <div className = "loading">
                        <CircularProgress/>
                    </div>
        }
        // console.log("contacts!!!!!!!! : ",contacts)
        return (
                <div>
                    <div className="err">
                            {this.state.error
                            ? this.state.error
                            : ""}
                    </div>
                    <Hover search = {this.search} onChange = {this.onChange} submit = {this.submit}/>
                    <ShowContacts contacts = {contacts} delete = {this.delete}/>
                </div>
        );
    }
}


const mapStateToProps = state => {
    // console.log("state.contactReducer.contacts : ", state.contactReducer.contacts);
    return {
        contacts: state.contactReducer.contacts,
        loading: state.contactReducer.loading,
        contact: state.contactReducer.contact,
        auth: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllContacts: () => dispatch(getAllContacts()),
        addContact: (name, number, age, userId) => dispatch(addContact(name, number, age, userId)),
        deleteContact: (id, userId) => dispatch(deleteContact(id, userId)),
        search: (value) => dispatch(search(value))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Contacts)
);