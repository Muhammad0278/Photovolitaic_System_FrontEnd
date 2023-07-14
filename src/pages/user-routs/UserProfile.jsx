import React from 'react'
import Base from '../../components/Base'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Container, Form, FormGroup, Input, Label, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { DeleteUser, UpdateUser } from '../../services/user-service';
import { getCurrentUserDetail } from '../../auth';

const UserData = getCurrentUserDetail();
const UserProfile = () => {

  const [users, setUsers] = useState(UserData);
console.log(UserData)
  const handleUpdate = () => {
    UpdateUser(users)
          .then((resp) => {
              console.log(resp)
              toast.success("User Information is Update successfully !!");
             
          }).catch((error) => {
              console.log('error')

          })
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure to delete this record") === true) {
      DeleteUser(users.id)
          .then((resp) => {
              console.log(resp)
              toast.success("user Information is Delete successfully !!");
             
          }).catch((error) => {
              console.log('error')

          })
  }};
  const handleChange = (event, property) => {
    //setData({...data,[property]:event.target.value});
    setUsers({ ...users, [property]: event.target.value })
};
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
                     onChange={(e)=> handleChange(e,'UserName')}
                    value={users.UserName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="Email"
                      placeholder="Email"
                    onChange={(e)=> handleChange(e,'Email')}
                    value={users.Email}
                    />
                  </FormGroup>

                </Col>
              </Row>
              <FormGroup>
                <Label for="Address">
                  Address
                </Label>
                <Input
                  id="Address"
                  name="address"
                  placeholder="1234 Main St"
                  onChange={(e)=> handleChange(e,'Address')}
                  value={users.Address}
                />
              </FormGroup>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="City">
                      City
                    </Label>
                    <Input
                      id="City"
                      name="city"
                      onChange={(e)=> handleChange(e,'City')}
                      value={users.City}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="State">
                      State
                    </Label>
                    <Input
                      id="State"
                      name="state"
                      onChange={(e)=> handleChange(e,'State')}
                      value={users.State}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="Zip">
                      Zip
                    </Label>
                    <Input
                      id="Zip"
                      name="zip"
                      onChange={(e)=> handleChange(e,'ZipCode')}
                      value={users.ZipCode}
                    />
                  </FormGroup>

                </Col>
                <Container className='text-center'>
                  <Button color='primary' outlin style={{"margin-right":5}} onClick={handleUpdate} >
                    Update
                  </Button>
                  <Button color='danger' onClick={() => { handleDelete() }}>Delete</Button>
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