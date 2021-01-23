import React from "react";
import {Navbar, Nav, Container, Badge, NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import {logOut} from "../actions/userAction";
const Header = () =>{
    const dispatch = useDispatch();
    const cart = useSelector( state => state.cart )
    const { cartItems } = cart;
    const userLogin = useSelector( state => state.userLogin );
    const { userInfo } = userLogin;
    function logoutHandler(e){
        dispatch(logOut());
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart mr-2" aria-hidden="true"></i>Cart
                                    {!!cartItems > 0 &&
                                        <Badge variant="info"> {cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            { userInfo ? (
                               <NavDropdown id="username" title={userInfo.name}>
                                   <LinkContainer to="/profile">
                                       <NavDropdown.Item><i className="fas fa-user mr-2" aria-hidden="true"></i>Profile</NavDropdown.Item>
                                   </LinkContainer>
                                   <NavDropdown.Item onClick={logoutHandler}>
                                       <i className="fas fa-sign-out-alt mr-2" aria-hidden="true"></i>Logout
                                   </NavDropdown.Item>
                               </NavDropdown>
                            ) : (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className="fas fa-sign-in-alt mr-2" aria-hidden="true"></i>Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>
                                            / Register
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
