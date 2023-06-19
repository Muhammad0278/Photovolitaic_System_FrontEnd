import React from 'react'
import { Nav, NavItem, NavLink, Collapse } from 'reactstrap';

function SideMenu() {
    return (
        <div className="sidebar">
            <Nav color="dark" vertical>
                <NavItem>
                    <NavLink href="#">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">About</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Contact</NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}

export default SideMenu