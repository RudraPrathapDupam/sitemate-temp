import React, { Component } from 'react';
 
import {BrowserRouter, Route, Switch , Redirect} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
 
import {Header, Navigation} from './Layout/Layout';
import Issues from './Issues';
import SingleIssue from './SingleIssue';
import Form from './Form';
import EditIssue from './EditIssue';
 
class Router extends Component {
    state = {  
        issues: []
    }
 
    componentDidMount() {
        this.getIssue();
    }
 
    getIssue = () => {
        axios.get(`http://0.0.0.0:8000/api/issues`)
             .then( res => {
                console.log(res);
                 this.setState({
                     issues: res.data.issues
                 }) 
             })
    }
 
    deleteIssue = (id) => {
        //console.log(id);
        axios.delete(`http://0.0.0.0:8000/api/issues/${id}`)
        .then(res => {
            if (res.status === 200) {
                const issues = [...this.state.issues];
                let result = issues.filter(issue => (
                    issue.id !== id
                ));
                this.setState({
                    issues: result
                })
            } 
        })
    }
 
    createIssue = (issue) => {
        axios.post(`http://0.0.0.0:8000/api/issues`, {issue})
             .then(res => {
                console.log(res)
                 if (res.status === 200) {
                    Swal.fire(
                        'issue Create',
                        'It is created correctly.',
                        'success'
                    )
 
                    let issueId = {id: res.data.issue.id};
                    const newIssue = Object.assign({}, res.data.issue, issueId)
 
                    this.setState(prevState => ({
                        issues: [...prevState.issues, newIssue]
                    }))
                 }
             })
    }
 
    editIssue = (issueUpdate) => {
        const {id} = issueUpdate;
 
        axios.put(`http://0.0.0.0:8000/api/issues/${id}`, {issueUpdate})
             .then(res => {
                 if (res.status === 200) {
                    Swal.fire(
                        'Issue Updated',
                        'The changes were saved correctly.',
                        'success'
                    )
 
                    let issueId = res.data.issue.id;
 
					const issues = [...this.state.issues];
 
                    const issueEdit = issues.findIndex(issue => issueId === issue.id)
 
                    issues[issueEdit] = issueUpdate;
                    this.setState({
                        issues 
                    })
                 }
             })
    }
 
    render() { 
        return (  
            <BrowserRouter>
 
                <div className="container">
                    <div className="row justify-content-center">
 
                        <Navigation />
 
                        <Switch>
                            <Route exact path="/" render={ () => {
                                return(
                                    <Issues 
                                        issues={this.state.issues}
                                        deleteIssue={this.deleteIssue}
                                    />
                                );
                            }} />
 
                            <Route exact path="/issue/:issueId" render={ (props) => {
                                let idIssue = props.location.pathname.replace('/issue/', '')
 
                                const issues=this.state.issues;
                                let filter;
                                filter = issues.filter(issue => (
                                    issue.id === idIssue
                                ))
                                console.log("Show single:", filter[0]);
 
 
                                return(
                                    <SingleIssue 
                                        issue={filter[0]} 
                                    />
                                )
                            }} />
                            <Route exact path="/create" render={() => {
                                return(
                                    <Form 
                                        createIssue={this.createIssue}
                                    />
                                );
                            }}
                            />
                            <Route exact path="/edit/:issueId" render={ (props) => {
                                let idIssue = props.location.pathname.replace('/edit/', '')
                                const issues=this.state.issues;
                                let filter;
                                filter = issues.filter(issue => (
                                    issue.id === idIssue
                                ))                                
                                return(
                                    <EditIssue
                                        issue={filter[0]} 
                                        editIssue={this.editIssue}
                                    />
                                )
                            }} />                            
                        </Switch>
                    </div>
                </div>            
            </BrowserRouter>
        );
    }
} 
export default Router;
