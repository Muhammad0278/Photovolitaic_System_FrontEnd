import { Row } from "reactstrap";
import CustomNavbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./sidebar/SideBar";
import Topbar from "./content/Topbar";


// import SideBar from "./src/components/sidebar/SideBar";



const Base=({title="Welcom",children})=>{
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  
    return(
      
        <div className="container-fluid mt-5"   p-0 m-0>
        <div className="row">
        <CustomNavbar />
        <div className="col-md-12" >
        {children}
        </div>
          <div className="col-md-2" style={{paddingLeft:0}}>
        
        
          {/* <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} /> */}
        
          {/* <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} /> */}
       
          </div>
          <div className="col-md-10">
            {/* Main content */}
           
          </div>
        </div>
      </div>
    );
};

export default Base;