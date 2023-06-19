import React from 'react'
import Base from '../../components/Base'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CardTitle, CardSubtitle, CardText, Modal, Table, Button, Container, Form, FormGroup, Input, Label, Row, Col, Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
//import { AddProject, GetAllProjects } from '../../services/user-service';
import { getCurrentUserDetail, isLoggedIn } from '../../auth';
import { AddProduct,  DeleteProducts, GetAllProjects, GetProductsByProjectsID, GetSelectedProducts } from '../../services/Product-service';
import axios from 'axios';

const UserData = getCurrentUserDetail();
const Productinfo = () => {
    const [lists, setList] = useState([]);

    const [modal, setModal] = useState(false);
    // State variable to keep track of all the expanded rows
    // By default, nothing expanded. Hence initialized with empty array.
    const [expandedRows, setExpandedRows] = useState([]);

    // State variable to keep track which row is currently expanded.
    const [expandState, setExpandState] = useState({});
    const [loading, setLoading] = useState(true);
    const [productloading, setProductLoading] = useState(true);
    const [region, setRegion] = useState("");
    const [items, setItems] = useState([
        { label: "Loading .........", value: "" }
    ]);
    const [productitems, setProductItems] = useState([]);
    const toggle = () => setModal(!modal);

    //const UserData = getCurrentUserDetail();
    const [data, setData] = useState({
        UserID: UserData.Id,
        UserName: UserData.UserName,
        ProductID: '', ProductName: '', ProjectID: '', ProjectName: '',


    });
  


    useEffect(() => {
        //console.log(data)
    }, [data])
  
    useEffect(() => {

        (async () => await _Load(UserData.Id))();

    }, [])
    useEffect(() => {

        (async () => await _LoadSelectProjects(UserData.Id))();

    }, [])
 
    const handleProjectChange = (event, property) => {
        debugger
        //setData({...data,[property]:event.target.value});
        // let val= item.value;
        console.log(event)
        var index = event.nativeEvent.target.selectedIndex;
        let selectedtext = event.nativeEvent.target[index].text;

        setData({...data,
            ProjectID: event.target.value,
            ProjectName: selectedtext
        })
        GetProductsByProjectsID(event.target.value).then((resp) => {
            debugger
            if (resp !== "") {
                var repsondata = JSON.parse(resp)
                // console.log(repsondata)
                if (repsondata.Code == 200) {
                  //  setProductItems(resp.data)
                    //setItems(repsondata.data.map(({ ProjectID, ProjectName }) => ({ label: ProjectName, value: ProjectID })));
                    setProductItems(repsondata.data.map(({ ProductID, ProductName }) => ({ label: ProductName, value: ProductID })));
                    productloading(false);

                    // toggle();
                }
            }

        }).catch((error) => {
            console.log('error')

        })

    };
    const handleProductChange = (event, property) => {
        debugger
        //setData({...data,[property]:event.target.value});
        // let val= item.value;
        console.log(event)
        var index = event.nativeEvent.target.selectedIndex;
        let selectedtext = event.nativeEvent.target[index].text;

        setData({
            ...data,
            ProductID: event.target.value,
            ProductName: selectedtext
        })


    };

    const resetData = () => {
        setData({

            UserID:UserData.Id,
            UserName: UserData.UserName,  ProductID: '', ProductName: '', ProjectID: '', ProjectName: '',
          
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
                _Load(data.UserID);
            }).catch((error) => {
                console.log('error')

            })

    })

    function _Load(data) {
        console.log(data)
       
        GetSelectedProducts(data).then((resp) => {
            debugger
            var repsondata = JSON.parse(resp)
            if (repsondata.Code == 200) {
            setList(repsondata.data)
            }

        }).catch((error) => {
            console.log('error')

        })
    


    }
    function _LoadSelectProjects(UserID) {
         GetAllProjects(UserID).then((resp) => {
            // console.log(resp.data)
            var repsondata = JSON.parse(resp)
            if (repsondata.Code == 200) {
                setItems(repsondata.data.map(({ ProjectID, ProjectName }) => ({ label: ProjectName, value: ProjectID })));
                setLoading(false);

            }
        }).catch((error) => {
            console.log('error')

        })
    }


    const handleDelete = (id) => {
        // isRowExpanded ? (obj[ProjectID] = false) : (obj[ProjectID] = true);

        if (window.confirm("Are you sure to delete this record") === true) {
            DeleteProducts(id)
                .then((resp) => {
                    console.log(resp)
                    toast.success("Product Information is Delete successfully !!");
                    resetData();
                    setList([]);
                    _Load(data.UserID);
                }).catch((error) => {
                    console.log('error')

                })
        }
    }
    const handleEpandRow = (event, ID) => {
        debugger
        const currentExpandedRows = expandedRows;
        const isRowExpanded = currentExpandedRows.includes(ID);

        let obj = {};
        isRowExpanded ? (obj[ID] = false) : (obj[ID] = true);
        setExpandState(obj);

        // If the row is expanded, we are here to hide it. Hence remove
        // it from the state variable. Otherwise add to it.
        const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(ID => ID !== ID) :
            currentExpandedRows.concat(ID);

        setExpandedRows(newExpandedRows);
    }

    //console.log(lists);
    return (
        <Base>

            <Row className=''>
            
           
                <Col className='mt-4' sm={{ size: 12}}>
                <Col style={{backgroundColor: '#cfe2ff', paddingTop: 5,paddingBottom: 5}} >
               <h3 className='text-center'>Product Information</h3>
            </Col>
            <Col  style={{border: '1.5px solid #cfe2ff',}} className="px-3" md={12}>
                    <Form className='' onSubmit={submitForm}>
                        <Row>
                            {/* <img src='src/Images/Q_CELLS.jpg' alt="myprofilepic"/> */}
                          
                            {/* <image src='src/Images/Q_CELLS.jpg'></image> */}
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="ProjectName">   Name  </Label>
                                    <Input id="ProjectName" name="ProjectName" placeholder="Project Name"
                                        type="select" onChange={(chioce) => { handleProjectChange(chioce, 'ProductName') }}
                                        value={data.ProjectID}  
                                        
                                        >
                                              <option disabled value="">
                                               Select an option
                                        </option>
                                        {items.map(item => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="ProductName">  Product Name </Label>
                                    <Input id="ProductName" name="ProductName" placeholder="Project Name"
                                        type="select" onChange={(chioce) => { handleProductChange(chioce, 'ProductName') }}
                                        value={data.ProductID}  >
                                        <option disabled value="">
                                            Select an option
                                        </option>
                                        {productitems.map(item => (
                                            <option key={item.value} value={item.value} >
                                                {item.label}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>

                        </Row>


                        <Container className='text-center'>
                            <Button color='primary' outlin>
                                Add
                            </Button>
                        </Container>
                    </Form>

                    <Row className='mt-5'>
                        <Container>
                            
                            <Row>
                                <Col sm={12}>
                                    <Table bordered hover responsive striped variant="dark">
                                        <thead>
                                            <tr>
                                                <th hidden></th>


                                                <th>Project Name</th>
                                                <th>Description</th>
                                              
                                                <th>Delete</th>
                                                <th>Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                //    lists.map((user) =>
                                                lists.map((current, index) =>
                                                    <>
                                                        <tr key={current.ID} >

                                                            <td hidden>
                                                                {current.ID}
                                                            </td>

                                                            <td>{current.ProjectName}</td>
                                                            <td>{current.Description}</td>
                                                          

                                                            <td>
                                                                <Button color='danger' onClick={() => { handleDelete(current.ID) }}>Delete</Button>
                                                            </td>
                                                            <td>
                                                                <Button color='primary' variant="link" onClick={event => handleEpandRow(event, current.ID)}>
                                                                    {
                                                                        expandState[current.ID] ?
                                                                            'Hide' : 'Show'
                                                                    }
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                        <>
                                                            {
                                                                expandedRows.includes(current.ID) ?
                                                                    <tr>

                                                                        <td colspan="6">
                                                                            <Row>
                                                                                <Col md={3}>
                                                                                {/* <img  width={220} height={150}  src={require(current.ImagePath)}  alt="logo"   /> */}
                                                                                    <img  width={220} height={150}  src={require('./../../Images/Q_CELLS.jpg')}  alt="logo"   />
                                                                                </Col>
                                                                                <Col md={9}>
                                                                                    <h1>{current.ProductName}</h1>
                                                                                    <ul>
                                                                                    <li><span><b>Voltage:</b></span> {' '}<span>{current.Wattage}</span></li>
                                                                                    <li><span><b>Warranty:</b></span> {' '}<span>{current.WarrantyYears} Years</span></li>
                                                                                    <li><span><b>Price:</b></span> {' '}<span>{current.Price} </span></li>
                                                                                    <li><span><b>Description:</b></span> {' '}<span>{current.ptDes}</span></li>
                                                                                    </ul>
                                                                                </Col>

                                                                            </Row>

                                                                        </td>
                                                                    </tr> : null
                                                            }
                                                        </>
                                                    </>
                                                )}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>

                    </Row>
                    </Col>

                </Col>
            </Row>




        </Base>
    )
}

export default Productinfo