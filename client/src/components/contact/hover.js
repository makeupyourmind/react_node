import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

class Hover extends Component {

    render(){
        return(
            <div>
            <div className = "inputs">
                <form onSubmit = {this.props.submit} className ="addContact">
                    <TextField
                        id="outlined-name"
                        label="Name"
                        required
                        onChange = {this.props.onChange}
                        margin="normal"
                        variant="outlined"
                        name = "name"
                    />
                    <TextField
                        id="outlined-name"
                        label="Phone Number"
                        required
                        onChange = {this.props.onChange}
                        margin="normal"
                        variant="outlined"
                        name = "number"
                    />
                    <TextField
                        id="outlined-name"
                        label="Age"
                        required
                        onChange = {this.props.onChange}
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
                    onChange = {this.props.search}
                />
             </div>
        </div>

        )
    }

}


export default Hover;