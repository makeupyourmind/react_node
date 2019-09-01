import React, { Component } from 'react';
import { getAllContacts, addContact, deleteContact, search } from '../../actions/contact/contact';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withStyles from "@material-ui/core/styles/withStyles";
import '../../styles/contact.css'
import { TextField, Button, Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);


const mapStateToProps = state => {
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
        console.log("contacts!!!!!!!! : ",contacts)
        contacts = contacts.filter(value => Object.keys(value).length !== 0);
        return (
         <div>
             <div className="err">
                         {this.state.error
                            ? this.state.error
                            : ""}
                    </div>
             <div className = "inputs">
                <form onSubmit = {this.submit} className ="addContact">
                <TextField
                    id="outlined-name"
                    label="Name"
                    required
                    onChange = {this.onChange}
                    margin="normal"
                    variant="outlined"
                    name = "name"
                />
                <TextField
                    id="outlined-name"
                    label="Phone Number"
                    required
                    onChange = {this.onChange}
                    margin="normal"
                    variant="outlined"
                    name = "number"
                />
                <TextField
                    id="outlined-name"
                    label="Age"
                    required
                    onChange = {this.onChange}
                    margin="normal"
                    variant="outlined"
                    name = "age"
                />
                <div className = 'custom'>
                    <Button variant="contained" color="primary" type = 'submit'>
                            Add Contact
                    </Button> 
                </div>        
                </form>
            </div>
             <div className = 'search'>
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    className = "search_field"
                    margin="normal"
                    onChange = {this.search}
                />
             </div>
            <div className = "table">
                <Table>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Phone Number</StyledTableCell>
                        <StyledTableCell align="right">Age</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
                        <StyledTableCell align="right">Edit</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {contacts.map(contact => (
                        <StyledTableRow key={contact._id}>
                            <StyledTableCell component="th" scope="row">{contact.name}</StyledTableCell>
                            <StyledTableCell align="right">{contact.number}</StyledTableCell>
                            <StyledTableCell align="right">{contact.age}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button onClick = {this.delete} value = {contact._id} variant="contained" color="secondary">
                                    Delete
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button value = {contact._id} variant="contained" color="primary">
                                   <Link to = {`edit/${contact._id}`} className = 'navigantion'>Edit </Link>
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </div>
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Contacts)
);