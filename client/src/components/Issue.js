import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import './Issue.css';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { Button, Row } from 'reactstrap';
 
class Issue extends Component {
    confirmDeletion = () => {
        const {id} = this.props.info;
 
        Swal.fire({
                title: 'Delete this one?',
                text: "This action can not be canceled!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete',
                cancelButtonText: 'No, Cancel'
          }).then((result) => {
            if (result.value) {
                this.props.deleteIssue(id)
                Swal.fire(
                    'Press OK to back',
                    'The issue has been deleted',
                    'success'
                )
            }
          })
    }
 
 
    render() {
        const {id, title , description, updatedAt} = this.props.info;
        console.log(this.props);
 
        return ( 
            <Paper className="issue">
            <p className="issue_title" cols="10">
                <b><span className='issue-preview'>
                    {title.length > 25 ? `${title.substr(0, 25)}...` :title}
                </span></b>
            </p>
            <Divider light />
                <p className="issue_description">
                    <span className='issue-preview'>
                        {description.length > 25 ? `${description.substr(0, 300)}...` : description}
                    </span>
                </p>
                <p className="issue_datestamp"><b>{moment(updatedAt).fromNow()}</b></p>                
                    <div className="issue_button">
                        <Row className="issue_row">
                            <Link to={`/issue/${id}`} className="btn btn-primary"> Show </Link>
                            <Link to={`/edit/${id}`} className="btn btn-warning"> Edit </Link>
                            <Link onClick={this.confirmDeletion} className="btn btn-danger">Delete</Link>
                        </Row>
                    </div>                   
            </Paper>
         );
    }
}
export default Issue;