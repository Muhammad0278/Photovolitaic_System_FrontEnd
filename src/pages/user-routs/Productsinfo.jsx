import React from 'react'
import Base from '../../components/Base'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Modal, Table, Button, Container, Form, FormGroup, Input, Label, Row, Col, Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { AddProject, GetAllProjects } from '../../services/user-service';
import { getCurrentUserDetail, isLoggedIn } from '../../auth';
import { AddProduct, AddProject, DeleteProjects, GetAllProducts, GetAllProjects, GetByProjectsID, UpdateProjects } from '../../services/Product-service';
import axios from 'axios';

const Productinfo = () => {
    const [lists, setList] = useState([]);
    const [modal, setModal] = useState(false);
    // const [items,setItems] = React.useState([
    //     // {
    //     //     label: "Luke Skywalker",
    //     //     value: "Luke Skywalker"
    //     // },
    //     // { label: "C-3PO", value: "C-3PO" },
    //     // { label: "R2-D2", value: "R2-D2" }
    // ]);
    const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([
    { label: "Loading .........", value: "" }
  ]);
    const toggle = () => setModal(!modal);

    const UserData = getCurrentUserDetail();
    const [data, setData] = useState({
        UserID: UserData.Id,
        UserName: UserData.UserName,
        ProductID: '', ProductName: '', ProjectID: '', ProjectName: '',
        Manufacturer: '', Wattage: '', Efficiency: '', WarrantyYears: '', Price: '', Description: '',
        Latitude: '', Longitude: ''
    });
    const [editdata, setEditData] = useState({
        UserID: UserData.Id,
        UserName: UserData.UserName,
        ProductID: '', ProductName: '', ProjectID: '', ProjectName: '',
        Manufacturer: '', Wattage: '', Efficiency: '', WarrantyYears: '', Price: '', Description: '',
        Latitude: '', Longitude: ''
    });


    useEffect(() => {
        //console.log(data)
    }, [data])
    useEffect(() => {
        //console.log(data)
    }, [editdata])
    useEffect(() => {

        (async () => await _Load(data) )();

    }, [])
    useEffect(() => {

        (async () => await     _LoadSelectProjects( UserData.Id) )();

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

            ProductID: '', ProductName: '', ProjectID: '', ProjectName: '',
            Manufacturer: '', Wattage: '', Efficiency: '', WarrantyYears: '', Price: '', Description: ''
            , Latitude: '', Longitude: ''
        })
    }
    const resetEditData = () => {
        setEditData({
            ProductID: '', ProductName: '', ProjectID: '', ProjectName: '',
            Manufacturer: '', Wattage: '', Efficiency: '', WarrantyYears: '', Price: '', Description: '',
            Latitude: '', Longitude: ''
        })
    }
    const submitForm = ((event) => {
        event.preventDefault()
        console.log(data);
        if (data.ProjectName.trim() === '') {
            toast.error('Project Name Required !!');
            return;
        }
        if (data.ProductName.trim() === '') {
            toast.error('Product Name Required !!');
            return;
        }

        // call server api

        AddProduct(data)
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
        GetAllProducts(data).then((resp) => {
            setList(resp.data)
          
        }).catch((error) => {
            console.log('error')

        })
    }
    function _LoadSelectProjects(UserID) {
        //console.log(data);
        // axios({
        //     url: 'https://localhost:44324//api/Products/GetProject?UserID='+dataobj,
        //     method: 'get',
          
            
        //  })
        //  .then(response => {
        //     console.log(response)
        //  }) 
        //  .catch(err => {
        //     console.log(err);
        //  });
        GetAllProjects(UserID).then((resp) => {
            console.log(resp.data)
            if(resp.status ==200)
            {
          //var repsondata = JSON.parse(resp.data)
          setItems(resp.data.map(({ ProjectID,ProjectName }) => ({ label: ProjectName, value: ProjectID })));
          setLoading(false);
        //setItems({lable:resp.data.ProjectName,value:resp.data.ProductID})
        console.log(items)
            }
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

            <Row className='mt-2'>
                <Col sm={{ size: 10, offset: 1 }}>
                    <h3 className='text-center'>Product Information</h3>

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
                                        type="select"
                                        onChange={(e) => handleChange(e, 'ProjectName')}
                                        value={data.ProjectName}
                                    >
                                        {items.map(item => (
                                           
                                            <option
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="ProductName">
                                        Product Name
                                    </Label>
                                    <Input
                                        id="ProductName"
                                        name="ProductName"
                                        placeholder="Product Name"
                                        type="text"
                                        onChange={(e) => handleChange(e, 'ProductName')}
                                        value={data.ProductName}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Manufacturer">
                                        Manufacturer
                                    </Label>
                                    <Input
                                        id="Manufacturer"
                                        name="Manufacturer"
                                        placeholder="Manufacturer"
                                        type="text"
                                        onChange={(e) => handleChange(e, 'Manufacturer')}
                                        value={data.Manufacturer}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Wattage">
                                        Wattage
                                    </Label>
                                    <Input
                                        id="Wattage"
                                        name="Wattage"
                                        placeholder="Wattage"
                                        type="Wattage"
                                        onChange={(e) => handleChange(e, 'Wattage')}
                                        value={data.Wattage}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>

                                <FormGroup>
                                    <Label for="Efficiency">
                                        Efficiency
                                    </Label>
                                    <Input
                                        id="Efficiency"
                                        name="Efficiency"
                                        placeholder="Efficiency"
                                        type="text"
                                        onChange={(e) => handleChange(e, 'Efficiency')}
                                        value={data.Efficiency}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>

                                <FormGroup>
                                    <Label for="WarrantyYears">
                                        Warranty Years
                                    </Label>
                                    <Input
                                        id="WarrantyYears"
                                        name="WarrantyYears"
                                        placeholder="Warranty Years"
                                        type="text"
                                        onChange={(e) => handleChange(e, 'WarrantyYears')}
                                        value={data.WarrantyYears}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>

                                <FormGroup>
                                    <Label for="Price">
                                        Price
                                    </Label>
                                    <Input
                                        id="Price"
                                        name="Price"
                                        placeholder="Price"
                                        type="text"
                                        onChange={(e) => handleChange(e, 'Price')}
                                        value={data.Price}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>

                                <FormGroup>
                                    <Label for="Latitude">
                                        Latitude
                                    </Label>
                                    <Input
                                        id="Latitude"
                                        name="Latitude"
                                        placeholder="Latitude"
                                        type="text"
                                        onChange={(e) => handleChange(e, 'Latitude')}
                                        value={data.Latitude}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>

                                <FormGroup>
                                    <Label for="Longitude">
                                        Longitude
                                    </Label>
                                    <Input
                                        id="Longitude"
                                        name="Longitude"
                                        placeholder="Longitude"
                                        type="text"
                                        onChange={(e) => handleChange(e, 'Longitude')}
                                        value={data.Longitude}
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
            </Row>

            <Modal isOpen={modal} toggle={toggle} >
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
                                <Label for="ProjectName">
                                    Name
                                </Label>
                                <Input
                                    id="EditProjectName"
                                    name="EditProjectName"
                                    placeholder="Project Name"
                                    type="select"
                                    onChange={(e) => handleEditChange(e, 'ProjectName')}
                                    value={editdata.ProjectName}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="EditProductName">
                                    Product Name
                                </Label>
                                <Input
                                    id="EditProductName"
                                    name="EditProductName"
                                    placeholder="Product Name"
                                    type="text"
                                    onChange={(e) => handleEditChange(e, 'ProductName')}
                                    value={editdata.ProductName}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="Manufacturer">
                                    Manufacturer
                                </Label>
                                <Input
                                    id="EditManufacturer"
                                    name="EditManufacturer"
                                    placeholder="Manufacturer"
                                    type="text"
                                    onChange={(e) => handleEditChange(e, 'Manufacturer')}
                                    value={editdata.Manufacturer}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="Wattage">
                                    Wattage
                                </Label>
                                <Input
                                    id="EditWattage"
                                    name="EditWattage"
                                    placeholder="Wattage"
                                    type="Wattage"
                                    onChange={(e) => handleEditChange(e, 'Wattage')}
                                    value={editdata.Wattage}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>

                            <FormGroup>
                                <Label for="Efficiency">
                                    Efficiency
                                </Label>
                                <Input
                                    id="EditEfficiency"
                                    name="EditEfficiency"
                                    placeholder="Efficiency"
                                    type="text"
                                    onChange={(e) => handleEditChange(e, 'Efficiency')}
                                    value={editdata.Efficiency}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>

                            <FormGroup>
                                <Label for="WarrantyYears">
                                    Warranty Years
                                </Label>
                                <Input
                                    id="EditWarrantyYears"
                                    name="EditWarrantyYears"
                                    placeholder="Warranty Years"
                                    type="text"
                                    onChange={(e) => handleEditChange(e, 'WarrantyYears')}
                                    value={editdata.WarrantyYears}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>

                            <FormGroup>
                                <Label for="Price">
                                    Price
                                </Label>
                                <Input
                                    id="EditPrice"
                                    name="EditPrice"
                                    placeholder="Price"
                                    type="text"
                                    onChange={(e) => handleEditChange(e, 'Price')}
                                    value={editdata.Price}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>

                            <FormGroup>
                                <Label for="Latitude">
                                    Latitude
                                </Label>
                                <Input
                                    id="EditLatitude"
                                    name="EditLatitude"
                                    placeholder="Latitude"
                                    type="text"
                                    onChange={(e) => handleEditChange(e, 'Latitude')}
                                    value={editdata.Latitude}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>

                            <FormGroup>
                                <Label for="EditLongitude">
                                    Longitude
                                </Label>
                                <Input
                                    id="EditLongitude"
                                    name="EditLongitude"
                                    placeholder="Longitude"
                                    type="text"
                                    onChange={(e) => handleEditChange(e, 'Longitude')}
                                    value={editdata.Longitude}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>

                            <FormGroup>
                                <Label for="description">
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

export default Productinfo