
import axios from 'axios';
import { useEffect, useState } from 'react';
import { signUp } from '../services/user-service';
import { Button, Container, Form, FormGroup, Input, Label, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { toast } from 'react-toastify'


const Signup = () => {
  const [data, setData] = useState({
    UserName: '',
    Email: '',
    Password: '',
  })

  const [error, setErrort] = useState({
    errors: {},
    IsError: false
  });

  useEffect(() => {
    //console.log(data)
  }, [data])

  const hadleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value })
  }

  //rest form
  const resetData = () => {
    setData({
      UserName: '',
      Email: '',
      Password: '',

    })
  }

  const submitForm = (event) => {
    event.preventDefault()
    // call server api
    signUp(data)
      .then((resp) => {
        console.log(resp)
        toast.success("User is resgistered successfully !!");
        resetData();
      }).catch((error) => {
        console.log('error')
      })

    // axios
    // .post('https://localhost:7024/api/User', {

    //     "userName": "usman12",
    //     "email": "usman@gmail.com",
    //     "password": "121212",

    //     "imagepath": ""
    //   })
    // .then((response) => {

    //     console.log('get data')

    // });

  }
  return (

    <Container>
      <Row className='mt-5'>

        <Col sm={{ size: 6, offset: 3 }}>
          <Card color='light'>
            <CardHeader>
              <h1 className='text-center'>Sign Up</h1>
            </CardHeader>
            <CardBody>
              <Form className="form" onSubmit={submitForm}>
                <FormGroup>
                  <Label for="Username">Username</Label>
                  <Input type="Username" name="Username" id="Username" placeholder=""
                    onChange={(e) => hadleChange(e, 'UserName')} value={data.UserName} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="example@example.com"
                    onChange={(e) => hadleChange(e, 'Email')} value={data.Email} />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword"
                    placeholder="********" onChange={(e) => hadleChange(e, 'Password')} value={data.Password} />
                </FormGroup>
                <Container className='text-center'>
                  <Button color='primary' outlin >Register</Button>
                  <Button className='ms-2' onClick={resetData} outlin>Reset</Button>
                </Container>

              </Form>
            </CardBody>
          </Card>

        </Col>
      </Row>
    </Container>
  );

};
export default Signup;