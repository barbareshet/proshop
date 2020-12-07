import React from "react";
import {Navbar, Nav, Container, Badge} from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
const Header = () =>{
    const cart = useSelector( state => state.cart )
    const { cartItems } = cart;
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
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user mr-2" aria-hidden="true"></i>Sign In
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
