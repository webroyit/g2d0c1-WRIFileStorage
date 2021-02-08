import React from 'react'
import { Navbar as BootstrapNavbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <BootstrapNavbar bg="light" expand="sm">
            <BootstrapNavbar.Brand as={Link} to="/">
                WRI File Storage
            </BootstrapNavbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/user">Profile</Nav.Link>
            </Nav>
        </BootstrapNavbar>
    )
}

export default Navbar
