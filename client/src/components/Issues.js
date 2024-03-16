import React, { Component } from 'react';
import Listing from './Listing';
import './Issue.css';
 
class Issues extends Component {
    state = {  }
    render() { 
        return ( 
            <form className="col-md-10">
                <legend className="text-center">Issue Listing Page</legend>
                <Listing 
                    issues={this.props.issues} 
                    deleteIssue={this.props.deleteIssue} 
                />
            </form>
         );
    }
}
 
export default Issues;