

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideMenu from './SideMenu';
import classNames from "classnames";

const CustomNavbar = (args) => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);


  useEffect(() => {


    setLogin(isLoggedIn());

    setUser(getCurrentUserDetail());

  }, [login]);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    })

  }
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar  color="dark" dark expand="md" fixed='top' {...args} className='px-5'>
        <NavbarBrand  href="/user/dashboard">
       
             PHOTOVOLATIACE
          
       
          </NavbarBrand>
      
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
         
          {
            login &&
            (
              <>
               <NavItem>
            <NavLink href="/user/dashboard">
              Home
            </NavLink>
          </NavItem>
                <NavItem>
                  <NavLink href="/user/profile-info">
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/user/project-info">
                    Projects
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/user/product-info">
                    Products
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/user/viewproject-info">
                  View Projects
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {

              login &&
              (
                <>
                  <NavItem>
                    <NavLink onClick={logout}>Logout</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink >{user.UserName}</NavLink>
                  </NavItem>
                </>
              )

            }
            {
              !login &&
              (
                <>
                  <NavItem>
                    <NavLink href="/Login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/Signup">
                      Signup
                    </NavLink>
                  </NavItem>
                </>
              )
            }
          </Nav>

        </Collapse>
      </Navbar>
      {/* <div  className={classNames("sidebar", { "is-open": isOpen })}>
        
        <Nav color="dark" vertical   >
        <NavbarToggler onClick={toggle} />
          <NavItem>
            <NavLink href="/user/dashboard">
              Home
            </NavLink>
          </NavItem>
          {
            login &&
            (
              <>
                <NavItem>
                  <NavLink href="/user/profile-info">
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/user/project-info">
                    Projects
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/user/product-info">
                    Products
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Services">
                    Services
                  </NavLink>
                </NavItem>
              </>
            )}
        </Nav>
      </div> */}
      {/* <SideMenu />  */}
    </div>

  );

};

export default CustomNavbar;