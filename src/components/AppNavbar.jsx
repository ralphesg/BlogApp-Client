import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';


export default function AppNavbar({isLoggedIn}) {
    console.log(localStorage.length)
    console.log(isLoggedIn)
    return (
        <Navbar expand="lg" className="nav">
            <Container className="container-navbar">
                <Navbar.Brand as={Link} to="/">
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navToggle" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/"> Home</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto">
                        { isLoggedIn ? (
                                <Nav.Link as={NavLink} to="/logout"> Logout</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login"> Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register"> Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
