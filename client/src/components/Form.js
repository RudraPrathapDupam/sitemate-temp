import React, { Component } from 'react';
 
class Form extends Component {
    //create refs
    titleRef = React.createRef();
    descRef = React.createRef();
 
 
    createIssue = (e) => {
        e.preventDefault();
 
        const issue = {
            title: this.titleRef.current.value,
            description: this.descRef.current.value,
        }
 
        this.props.createIssue(issue);
 
    }
 
 
    render() { 
        return ( 
            <form onSubmit={this.createIssue} className="col-md-10">
                <legend className="text-center">Create New Issue</legend>
 
                <div className="form-group">
                    <label>Title for the Issue:</label>
                    <input type="text" ref={this.titleRef} className="form-control" placeholder="Title.." />
                </div>
 
 
                <div className="form-group">
                    <label>Description:</label>
                    <textarea className="form-control" rows="7"cols="25" ref={this.descRef} placeholder="Here write your Description.."></textarea>
                </div>
 
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
         );
    }
}
 
export default Form;