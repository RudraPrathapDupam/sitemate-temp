import React, { Component } from 'react';
import moment from 'moment';
 
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import renderHTML from 'react-render-html';
 
class SingleIssue extends Component {
 
    showIssue = (props) => {
        if (!props.issue) return null;
 
        const {title, description, updatedAt} = this.props.issue;
        console.log("render Single");
 
        return (
            <React.Fragment>
 
                <Paper className="single_issue"> 
                    <h4>Title: {title}</h4>
                    <Divider light />
                    <p><b>Description:</b> {description}</p>
                    <Divider light />
                    <h5>Updated At: {moment(updatedAt).format('DD MM YYYY')}</h5>
                    <div style={{ width: '60%' }}>{renderHTML(description)}</div>
                </Paper>
            </React.Fragment>
        )
 
    }
    render() {
        return (
            <div className=" col-md-10">
                {this.showIssue(this.props)} 
            </div>
        );
    }
}
 
 
export default SingleIssue;