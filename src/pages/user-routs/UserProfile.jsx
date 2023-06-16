import React from 'react'
import Base from '../../components/Base'
import { useState } from 'react';
import { toast } from 'react-toastify';
import {Button,Container,Form,FormGroup,Input,Label,Row,Col,Card,CardHeader,CardBody} from 'reactstrap';

const UserProfile=() => {
  return (
   <Base>
     <Row className='mt-2'>
        <Col sm={{size:10 ,offset:1}}>
      
       
       <Card >
        <CardHeader>
        <h1 className='text-center'>User Profile</h1>
        </CardHeader>
        <CardBody>
        <Form>
  <Row>
    <Col md={6}>
    <FormGroup>
            <Label for="Username">Username</Label>
            <Input
              type="Username"
              name="Username"
              id="Username"
              placeholder=""
            //  onChange={(e)=> hadleChange(e,'UserName')}
             // value={data.UserName}
            />
          </FormGroup>
    </Col>
    <Col md={6}>
    <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@example.com"
             // onChange={(e)=> hadleChange(e,'Email')}
             // value={data.Email}
            />
          </FormGroup>
      
    </Col>
  </Row>
  <FormGroup>
    <Label for="exampleAddress">
      Address
    </Label>
    <Input
      id="exampleAddress"
      name="address"
      placeholder="1234 Main St"
    />
  </FormGroup>
 
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleCity">
          City
        </Label>
        <Input
          id="exampleCity"
          name="city"
        />
      </FormGroup>
    </Col>
    <Col md={4}>
      <FormGroup>
        <Label for="exampleState">
          State
        </Label>
        <Input
          id="exampleState"
          name="state"
        />
      </FormGroup>
    </Col>
    <Col md={2}>
      <FormGroup>
        <Label for="exampleZip">
          Zip
        </Label>
        <Input
          id="exampleZip"
          name="zip"
        />
      </FormGroup>
    </Col>
  </Row>
 
  <Container className='text-center'>
  <Button color='primary' outlin>
   Update
  </Button>
  </Container>
</Form>
      </CardBody>
      </Card>

        </Col>
      </Row>

   </Base>
  )
}

export default UserProfile