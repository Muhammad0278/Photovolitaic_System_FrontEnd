import React from 'react'
import Base from '../../components/Base'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Container, Form, FormGroup, Input, Label, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

const UserProfile = () => {
  return (
    <Base>
      <Row>
        <Col className='mt-4' sm={{ size: 12 }}>
          <Col style={{ backgroundColor: '#cfe2ff', paddingTop: 5, paddingBottom: 5 }} >
            <h3 className='text-center'>User Information</h3>
          </Col>
          <Col style={{ border: '1.5px solid #cfe2ff', }} className="px-3" md={12}>

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
                <Container className='text-center'>
                  <Button color='primary' outlin>
                    Update
                  </Button>
                </Container>
              </Row>


            </Form>


          </Col>
        </Col>

      </Row>

    </Base>
  )
}

export default UserProfile