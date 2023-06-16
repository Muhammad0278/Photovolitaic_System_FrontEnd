

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import { BrowserRouter,Route,Routes,route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Privateroute from './components/Privateroute';
import Userdashboards from './pages/user-routs/Userdashboards';
import UserProfile from './pages/user-routs/UserProfile';
import Projectinfo from './pages/user-routs/Projectinfo';
import Productinfo from './pages/user-routs/Productsinfo';


function App() {
  return (
    
     <BrowserRouter>
     <ToastContainer />
    
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/Services" element={<Services/>}/>
     
      <Route path="/user" element={<Privateroute/>}>
        
         <Route path="dashboard" element={<Userdashboards/>}/>
         <Route path="profile-info" element={<UserProfile/>}/>
         <Route path="project-info" element={<Projectinfo/>}/>
         <Route path="product-info" element={<Productinfo/>}/>
      </Route>
       
     
    
     </Routes>
     
     </BrowserRouter>
   
  );
}

export default App;
