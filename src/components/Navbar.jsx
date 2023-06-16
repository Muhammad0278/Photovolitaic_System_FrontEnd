

import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';
import {  doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

const CustomNavbar = (args) =>{
  let navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
const [login,setLogin] =useState(false);
const [user,setUser] =useState(undefined);


useEffect(()=>{
 

setLogin(isLoggedIn());

setUser(getCurrentUserDetail());

},[login]);

const logout=()=>{
doLogout(()=> {
  setLogin(false);
navigate("/");
})

}
  const toggle = () => setIsOpen(!isOpen);
    return(
      <div>
      <Navbar color="dark" dark expand="md" fixed='top' {...args} className='px-5'>
        <NavbarBrand href="/">My Project</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink href="/">
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
              <NavLink href="/Services">
              Services
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
  
    </div>

    );

};

export default CustomNavbar;