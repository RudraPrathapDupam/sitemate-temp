import React, { Component } from 'react';
 
class EditIssue extends Component {
    titleRef = React.createRef();
    descRef = React.createRef();
 
    editIssue = (e) => {
        e.preventDefault();
        const issue = {
            title: this.titleRef.current.value,
            description: this.descRef.current.value,
            id: this.props.issue.id 
        }
        this.props.editIssue(issue);
    }
 
    loadForm = () => {
        if (!this.props.issue) return null;
        const {title, description} = this.props.issue;
        console.log(this.props);
 
        return (    
            <form onSubmit={this.editIssue} className="col-md-10">
                <legend className="text-center">Edit Issue</legend>
 
                <div className="form-group">
                    <label>Title for the Issue:</label>
                    <input type="text" ref={this.titleRef} className="form-control" defaultValue={title} />
                </div>
 
                <div className="form-group">
                    <label>Description:</label>
                    <textarea className="form-control" rows="7"cols="25" ref={this.descRef} defaultValue={description}></textarea>
                </div>
 
 
                <button type="submit" className="btn btn-primary" >Save changes</button>
            </form>
        );
    }
 
 
    render() {
        return ( 
            <React.Fragment>
                {this.loadForm()}
            </React.Fragment>            
         );
    }
}
 
export default EditIssue;
