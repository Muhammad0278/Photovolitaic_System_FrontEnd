import { Row } from "reactstrap";
import CustomNavbar from "./Navbar";


const Base=({title="Welcom",children})=>{

    return(
           <Row>
           <div className="container-fluid" p-0 m-0>
           
            <CustomNavbar />
         
            <Row className='mt-5'>
            {children}
            </Row>

            
           </div>
           </Row>
    );
};

export default Base;