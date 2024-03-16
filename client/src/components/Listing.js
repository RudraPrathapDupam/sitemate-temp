import React, { Component } from 'react';
import Issue from './Issue';
import './Issue.css';
 
class Listing extends Component {
    showIssue = () => {
        const issues = this.props.issues;
        if (issues.length === 0) return null;        
        return (
            <div classname="issue_list_item"><React.Fragment>
                {Object.keys(issues).map(issue =>(
                    <Issue
                        key={issue}
                        info={this.props.issues[issue]}
                        deleteIssue={this.props.deleteIssue}
                    />
 
                ) )}
            </React.Fragment></div>
        )
    }
 
    render() { 
        return ( 
                <div className="issue_list">
                    {this.showIssue() }
                </div>
 
 
         );
    }
}
 
export default Listing;
