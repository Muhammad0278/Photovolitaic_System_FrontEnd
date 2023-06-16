import { useState } from 'react';
import { toast } from 'react-toastify';
import {Button,Container,Form,FormGroup,Input,Label,Row,Col,Card,CardHeader,CardBody} from 'reactstrap';
import { login } from '../services/user-service';
import { doLogin } from '../auth';
import { useNavigate } from 'react-router-dom';

  

const Login = () =>{
  const navigate =useNavigate();
const [loginDetail,setLoginDetail]=useState({
  Email:'',
  Password:''
})


const handleChange =(event,field) => {
  let actualvalue=event.target.value;
  setLoginDetail({
    ...loginDetail,[field]:actualvalue
  })
}
const hangleFormSubmit=(event) => {
  event.preventDefault();
  console.log(loginDetail);
  if(loginDetail.Email.trim() ==='' || loginDetail.Password.trim() ==='')
  {
    toast.error('Email and Password is Required !!');
    return;
  }
login(loginDetail).then((data) =>{
  
  console.log(data)
  if(data.status ===200)
  {
  toast.success("User is resgistered successfully !!");
  handleReset();
  doLogin(data.user,()=>{
    console.log("user data saved");
    navigate("/user/dashboard")
  });
}
else
{
  toast.error(data.message);
}
}).catch((error)=>{
  console.log('error login')
})
   
}
const handleReset=()=>{
  setLoginDetail({
    Email:'',
    Password:''
  });
}
    return(
<Container>
      <Row className='mt-5'>
        <Col sm={{size:6 ,offset:3}}>
      
       
       <Card color='light'>
        <CardHeader>
        <h1 className='text-center'>Login</h1>
        </CardHeader>
        <CardBody>
        <Form className="form" onSubmit={hangleFormSubmit}>
       
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@example.com"
              value={loginDetail.UserName}
              onChange={(e)=> handleChange(e,'Email')}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              value={loginDetail.Password}
              onChange={(e)=> handleChange(e,'Password')}
            />
          </FormGroup>
          <Container className='text-center'>
          <Button color='primary' outlin >Sign In</Button>
       
          </Container>
        
      </Form>
      </CardBody>
      </Card>

        </Col>
      </Row>
</Container>
    );

};

export default Login;