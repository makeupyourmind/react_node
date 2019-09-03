import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';



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

class ShowContacts extends Component {

    render(){
        return (
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
                    {this.props.contacts.map(contact => (
                        <StyledTableRow key={contact._id}>
                            <StyledTableCell component="th" scope="row">{contact.name}</StyledTableCell>
                            <StyledTableCell align="right">{contact.number}</StyledTableCell>
                            <StyledTableCell align="right">{contact.age}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button onClick = {this.props.delete} value = {contact._id} variant="contained" color="secondary">
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
        )
    }

}

export default ShowContacts;


