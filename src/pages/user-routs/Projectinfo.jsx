import React from 'react'
import Base from '../../components/Base'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Modal, Table, Button, Container, Form, FormGroup, Input, Label, Row, Col, Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { AddProject, GetAllProjects } from '../../services/user-service';
import { getCurrentUserDetail, isLoggedIn } from '../../auth';
import { AddProject, DeleteProjects, GetAllProjects, GetByProjectsID, UpdateProjects } from '../../services/Project-service';
import axios from 'axios';

const Projectinfo = () => {
    const [lists, setList] = useState([]);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const UserData = getCurrentUserDetail();
    const [data, setData] = useState({
        UserID: UserData.Id,
        UserName: UserData.UserName,
        ProjectID: '',
        ProjectName: '',
        OwnerName: '',
        ContactEmail: '',
        ContactPhone: '',
        Description: ''
    });
    const [editdata, setEditData] = useState({
        UserID: UserData.Id,
        UserName: UserData.UserName,
        ProjectID: '',
        ProjectName: '',
        OwnerName: '',
        ContactEmail: '',
        ContactPhone: '',
        Description: ''
    });


    useEffect(() => {
        //console.log(data)
    }, [data])
    useEffect(() => {
        //console.log(data)
    }, [editdata])
    useEffect(() => {

        (async () => await _Load(data))();

    }, [])
    const handleChange = (event, property) => {
        //setData({...data,[property]:event.target.value});
        setData({ ...data, [property]: event.target.value })
    };
    const handleEditChange = (event, property) => {
        debugger
        //setData({...data,[property]:event.target.value});
        setEditData({ ...editdata, [property]: event.target.value })
    };

    const resetData = () => {
        setData({
            ProjectID: '',
            ProjectName: '',
            OwnerName: '',
            ContactEmail: '',
            ContactPhone: '',
            Description: ''
        })
    }
    const resetEditData = () => {
        setEditData({
            ProjectID: '',
            ProjectName: '',
            OwnerName: '',
            ContactEmail: '',
            ContactPhone: '',
            Description: ''
        })
    }
    const submitForm = ((event) => {
        event.preventDefault()
        console.log(data);
        if (data.ProjectName.trim() === '') {
            toast.error('Project Name Required !!');
            return;
        }

        // call server api

        AddProject(data)
            .then((resp) => {
                console.log(resp)
                toast.success("Project Information is Added successfully !!");
                resetData();
                _Load(data);
            }).catch((error) => {
                console.log('error')

            })

    })
    const submitEditForm = ((event) => {
        event.preventDefault()
        console.log(editdata);
        if (editdata.ProjectName.trim() === '') {
            toast.error('Project Name Required !!');
            return;
        }

        // call server api
        UpdateProjects(editdata)
            .then((resp) => {
                console.log(resp)
                toast.success("Project Information is Updated successfully !!");
                resetEditData();
                document.getElementById('closeButton').click();
                _Load(data);
            }).catch((error) => {
                console.log('error')

            })

    })
    function _Load(data) {
        GetAllProjects(data).then((resp) => {
            setList(resp.data)
        }).catch((error) => {
            console.log('error')

        })
    }

    async function testGetaxios(id) {
        try {

            let res = await axios.get('https://localhost:44324/api/Projects/GetbyProject', {
                params: { _ProjectID: id }
            });
            if (res.data !== "") {
                var repsondata = JSON.parse(res.data)
                if (repsondata.Code == 200) {
                    let ProjectID = repsondata.data.ProjectID;
                    let ProjectName = repsondata.data.ProjectName;
                    let OwnerName = repsondata.data.OwnerName;
                    let ContactEmail = repsondata.data.ContactEmail;
                    let ContactPhone = repsondata.data.ContactPhone;
                    let Description = repsondata.data.Description;
                    // setEditData(editdata => [...editdata, repsondata.data]);
                    setEditData({
                        ProjectID: ProjectID,
                        ProjectName: ProjectName,
                        OwnerName: OwnerName,
                        ContactEmail: ContactEmail,
                        ContactPhone: ContactPhone,
                        Description: Description
                    })
                    console.log(editdata)
                }
            }
        }
        catch (error) {
            fail(error);
        };
    }
    function success(res) {
        console.log(res.data[0][0].email);
    }
    function fail(error) {
        console.log(error);
    }
    const handleEdit = (id) => {

        console.log(id)
        // testaxios(id)
        GetByProjectsID(id).then((resp) => {
            if (resp !== "") {
                var repsondata = JSON.parse(resp)
                // console.log(repsondata)
                if (repsondata.Code == 200) {

                    setEditData
                        ({
                            ProjectID: repsondata.data.ProjectID,
                            ProjectName: repsondata.data.ProjectName,
                            OwnerName: repsondata.data.OwnerName,
                            ContactEmail: repsondata.data.ContactEmail,
                            ContactPhone: repsondata.data.ContactPhone,
                            Description: repsondata.data.Description
                        })
                    toggle();
                }
            }

        }).catch((error) => {
            console.log('error')

        })
    }

    const handleDelete = (id) => {

        if (window.confirm("Are you sure to delete this record") === true) {
            DeleteProjects(id)
                .then((resp) => {
                    console.log(resp)
                    toast.success("Project Information is Delete successfully !!");
                    resetData();
                    _Load(data);
                }).catch((error) => {
                    console.log('error')

                })
        }
    }

    //console.log(lists);
    return (
        <Base>

            <Row >
            <Col className='mt-4' sm={{ size: 12}}>
                    
                    <Col style={{backgroundColor: '#cfe2ff', paddingTop: 5,paddingBottom: 5}} >
               <h3 className='text-center'>Project Information</h3>
            </Col>
            <Col  style={{border: '1.5px solid #cfe2ff',}} className="px-3" md={12}>
                    <Form className='' onSubmit={submitForm}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="ProjectName">
                                        Name
                                    </Label>
                                    <Input
                                        id="ProjectName"
                                        name="ProjectName"
                                        placeholder="Project Name"
                                        type="ProjectName"
                                        onChange={(e) => handleChange(e, 'ProjectName')}
                                        value={data.ProjectName}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="OwnerName">
                                        Owner Name
                                    </Label>
                                    <Input
                                        id="OwnerName"
                                        name="OwnerName"
                                        placeholder="Owner Name"
                                        type="OwnerName"
                                        onChange={(e) => handleChange(e, 'OwnerName')}
                                        value={data.OwnerName}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="ContactEmail">
                                        Contact Email
                                    </Label>
                                    <Input
                                        id="ContactEmail"
                                        name="ContactEmail"
                                        placeholder="Contact Email"
                                        type="Email"
                                        onChange={(e) => handleChange(e, 'ContactEmail')}
                                        value={data.ContactEmail}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="ContactPhone">
                                        Contact Phone
                                    </Label>
                                    <Input
                                        id="ContactPhone"
                                        name="ContactPhone"
                                        placeholder="Contact Phone"
                                        type="ContactPhone"
                                        onChange={(e) => handleChange(e, 'ContactPhone')}
                                        value={data.ContactPhone}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={12}>

                                <FormGroup>
                                    <Label for="description">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Description"
                                        type="textarea"
                                        onChange={(e) => handleChange(e, 'Description')}
                                        value={data.Description}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>


                        <Container className='text-center'>
                            <Button color='primary' outlin>
                                Add
                            </Button>
                        </Container>
                    </Form>

                    <Row className='mt-2'>
                        <Table
                            bordered
                            hover
                            responsive
                            striped
                        >
                            <thead>
                                <tr>
                                    <th hidden>
                                        #
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Description
                                    </th>

                                    <th>
                                        Edit
                                    </th>
                                    <th>
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    lists.map((current, index) => (
                                        <tr>
                                            <td hidden>{current.ProjectID}</td>
                                            <td>{current.ProjectName}</td>
                                            <td>{current.Description}</td>
                                            <td>
                                                <Button color='primary' onClick={() => { handleEdit(current.ProjectID); }}>Edit</Button>
                                            </td>
                                            <td>
                                                <Button color='danger' onClick={() => { handleDelete(current.ProjectID) }}>Delete</Button>
                                            </td>
                                        </tr>

                                    ))
                                }


                            </tbody>
                        </Table>
                    </Row>

                    </Col>
                </Col>
            </Row>

            <Modal style={{backgroundColor:"cfe2ff !important"}}  isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Project Information</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="ProjectName">
                                    Name
                                </Label>
                                <Input
                                    id="EditProjectName"
                                    name="EditProjectName"
                                    placeholder="Project Name"
                                    type="EditProjectName"
                                    onChange={(e) => handleEditChange(e, 'ProjectName')}
                                    value={editdata.ProjectName}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="EditOwnerName">
                                    Owner Name
                                </Label>
                                <Input
                                    id="EditOwnerName"
                                    name="EditOwnerName"
                                    placeholder="Owner Name"
                                    type="EditOwnerName"
                                    onChange={(e) => handleEditChange(e, 'OwnerName')}
                                    value={editdata.OwnerName}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="ContactEmail">
                                    Contact Email
                                </Label>
                                <Input
                                    id="EditContactEmail"
                                    name="EditContactEmail"
                                    placeholder="Contact Email"
                                    type="Email"
                                    onChange={(e) => handleEditChange(e, 'ContactEmail')}
                                    value={editdata.ContactEmail}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="EditContactPhone">
                                    Contact Phone
                                </Label>
                                <Input
                                    id="EditContactPhone"
                                    name="EditContactPhone"
                                    placeholder="Contact Phone"
                                    type="EditContactPhone"
                                    onChange={(e) => handleEditChange(e, 'ContactPhone')}
                                    value={editdata.ContactPhone}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>

                            <FormGroup>
                                <Label for="Editdescription">
                                    Description
                                </Label>
                                <Input
                                    id="Editdescription"
                                    name="Editdescription"
                                    placeholder="Description"
                                    type="textarea"
                                    onChange={(e) => handleEditChange(e, 'Description')}
                                    value={editdata.Description}
                                />
                            </FormGroup>
                            
                        </Col>
                        
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitEditForm}>
                        Update
                    </Button>
                    <Button color="secondary" id="closeButton" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>


        </Base>
    )
}

export default Projectinfo