import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Row,
  } from 'reactstrap';
import { blue } from '@material-ui/core/colors';
 
const Navigation = () => {
    return (
            <Nav fill pills >
            <Navbar className=''>
                <NavbarBrand href="/">Issues Demo</NavbarBrand>
                    <Row className='navRow'>
                    <NavItem ><Link to={'/'}>List All Posts</Link> </NavItem>
                    <NavItem ><Link to={'/create'}>Add New Post</Link></NavItem>
                    </Row>
            </Navbar>
        </Nav>
     );
}
 
export default Navigation;