import React, { useState, useEffect, useRef } from 'react'
import Base from '../../components/Base'
import { Container, Modal, Row, Col, Form, FormGroup, Label, Input, CardBody, Card, CardTitle, CardText, CardHeader, CardGroup, ButtonGroup, Button, Table, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import LoadMap from './LoadMap'
import { getCurrentUserDetail } from '../../auth';
import { AddProduct, DeleteProducts, GetAllProjects, GetProductsByProjectsID } from '../../services/Product-service';
import Leaflet, { marker } from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import markerRetina from "leaflet/dist/images/marker-icon-2x.png"
import LoadMapForm from "./LoadMapForms";
import { GetMapProducts } from "../../services/Map-service";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'reactstrap';
import { toast } from 'react-toastify';
import LoadCharts from './LoadCharts';

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const Userdashboards = () => {
  const UserData = getCurrentUserDetail();
  const [editMode, setEditMode] = useState(false);
  const [modal, setModal] = useState(false);
  const [productitems, setProductItems] = useState([]);
  const toggle = () => setModal(!modal);
  const [open, setOpen] = useState('1');
  const [markers, setMarkers] = useState([]);
  const [items, setItems] = useState([{ label: "Loading .........", value: "" }]);
  const [loading, setLoading] = useState(true);
  // const chartData = [
  //   { date: '2023-06-24', value: 10 },
  //   { date: '2023-06-25', value: 5 },
  //   { date: '2023-06-26', value: 8 },
  //   // Add more data points as needed
  // ];
  const [data, setData] = useState({
    UserID: UserData.Id,
    UserName: UserData.UserName,ID:'',
    ProductID: '', ProductName: '', ProjectID: '', ProjectName: '', Latitude: '', Longitude: ''
  });
  const Accordiantoggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const mapRef = useRef();
  const zoom = 6;
  const containerStyle = {
    width: "100%", height: "400px"
  }
  const center = {
    lat: 51.165691,
    lng: 10.451526
  }

  //=================== Use Effect
  useEffect(() => { (async () => await _LoadSelectProjects(UserData.Id))(); }, [])
  useEffect(() => { (async () => await _LoadProducts())(); }, [])
  useEffect(() => { console.log(markers); }, [markers]);
  useEffect(() => { (async () => await _Load(data))(); }, [])

  const handleProjectChange = (event, property) => {
    var index = event.nativeEvent.target.selectedIndex;
    let selectedtext = event.nativeEvent.target[index].text;
    setData({ ...data, ProjectID: event.target.value, ProjectName: selectedtext })
  };
  //====================== Load Select Option
  function _LoadSelectProjects(UserID) {

    GetAllProjects(UserID).then((resp) => {
      // console.log(resp.data)
      var repsondata = JSON.parse(resp)
      if (repsondata.Code == 200) {
        setItems(repsondata.data.map(({ ProjectID, ProjectName }) => ({ label: ProjectName, value: ProjectID })));
        setLoading(false);
        setData({ ...data, ProjectID: repsondata.data[0].ProjectID, ProjectName: repsondata.data[0].ProjectName })
      
      }
    }).catch((error) => {
      console.log('error')
    })
  }
  function _LoadProducts() {
    GetProductsByProjectsID().then((resp) => {
      if (resp !== "") {
        var repsondata = JSON.parse(resp)
        if (repsondata.Code == 200) {
          setProductItems(repsondata.data.map(({ ProductID, ProductName }) => ({ label: ProductName, value: ProductID })));
          //  productloading(false);
        }
      }

    }).catch((error) => {
      console.log('error')

    })

  }

  //===============Change Event
  const onStatusChange = ((event, Status) => {
    debugger
    event.preventDefault()
    _Load(Status, data);
  });
  const mapClicked = async (event) => {
    setEditMode(false)
    console.log(event.latlng.lat, event.latlng.lng)
    setData({ ...data,ProductID:'',ProductName:'', Latitude: event.latlng.lat, Longitude: event.latlng.lng })
    toggle();
  }
  const markerClicked = (marker, index) => {
    debugger
    console.log(marker.Latitude, marker.Latitude)
  //  console.log(marker.position.lat, marker.position.lng)
    setData({ ...data,ID: marker.ID ,ProductID:marker.ProductID,ProductName:marker.ProductName, Latitude: marker.Latitude, Longitude:marker.Longitude })
    debugger
    setEditMode(true)
   // document.getElementById('btnAdd').style('display:none');
    toggle();
  }
  const markerDragEnd = (event, index) => {
    debugger
    console.log(event.lat, event.lng)
   // setEditMode(true)
   
    //setData({ ...data,ProductID:'',ProductName:'', Latitude: event.lat, Longitude: event.lng })
   // toggle();
  }

  function _Load(Status, data) {
    console.log(data)
    GetMapProducts(Status, data).then((resp) => {
      debugger
      var repsondata = JSON.parse(resp)
      if (repsondata.Code == 200) {
        setMarkers([...repsondata.data]);
      }
      if (repsondata.Code == 401) {
        setMarkers([]);
      }
    }).catch((error) => {
      console.log('error')
    })

  }
  const resetData = () => {
    setData({
      UserID: UserData.Id,
      UserName: UserData.UserName, ProductID: '', ProductName: '', ProjectID: '', ProjectName: '', Latitude: '', Longitude: ''
    })
  }
  // Model Events

  const submitForm = ((event) => {
    debugger
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
    AddProduct(data).then((resp) => {
      console.log(resp)
      toast.success("Product Information is Added successfully !!");
      document.getElementById('btnactive').click();
      setData({
        UserID: UserData.Id,
        UserName: UserData.UserName,ID:'0', ProductID: '', ProductName: '', ProjectID: data.ProjectID, ProjectName: data.ProjectName, Latitude: '', Longitude: ''
      })
      //  resetData();
      document.getElementById('closeButton').click();
      //_Load(Status, data)

    }).catch((error) => {
      console.log('error')
    })
  })
  const handleDeleteMap = (event,id) => {
    event.preventDefault()
    debugger
    console.log(event.target.value);
    if (data.ProjectName.trim() === '') {
      toast.error('Project Name Required !!');
      return;
    }
    if (data.ProductName.trim() === '') {
      toast.error('Product Name Required !!');
      return;
    }
    DeleteProducts(id).then((resp) => {
      console.log(resp)
      toast.success("Product Information is Deleted successfully !!");
      document.getElementById('btnactive').click();
      setData({
        UserID: UserData.Id,
        UserName: UserData.UserName,ID:'0', ProductID: '', ProductName: '', ProjectID: data.ProjectID, ProjectName: data.ProjectName, Latitude: '', Longitude: ''
      })
      //  resetData();
      document.getElementById('closeButton').click();
      //_Load(Status, data)
 
    }).catch((error) => {
      console.log('error')
    })
  };
  const handleUpdateMap = (event, property) => {
    //setData({...data,[property]:event.target.value});
   // setData({ ...data, [property]: event.target.value })
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
   AddProduct(data).then((resp) => {
     console.log(resp)
     toast.success("Product Information is Added successfully !!");
     document.getElementById('btnactive').click();
     setData({
       UserID: UserData.Id,
       UserName: UserData.UserName,ID:'0', ProductID: '', ProductName: '', ProjectID: data.ProjectID, ProjectName: data.ProjectName, Latitude: '', Longitude: ''
     })
     //  resetData();
     document.getElementById('closeButton').click();
     //_Load(Status, data)

   }).catch((error) => {
     console.log('error')
   })

  };
  const handleChange = (event, property) => {
    //setData({...data,[property]:event.target.value});
    setData({ ...data, [property]: event.target.value })
  };
  const handleProductChange = (event, property) => {
    var index = event.nativeEvent.target.selectedIndex;
    let selectedtext = event.nativeEvent.target[index].text;
    setData({ ...data, ProductID: event.target.value, ProductName: selectedtext })
  };
  return (

    <Base>
      <Row className=''>
        <Col className='mt-4' sm={{ size: 12 }}>
          <Col style={{ backgroundColor: '#cfe2ff', paddingTop: 5, paddingBottom: 5 }} >
            <h3 className='text-center'>Dashboard</h3>
          </Col>
          <Col style={{ border: '1.5px solid #cfe2ff', }} className="px-3" md={12}>
            <Col sm={{ size: 9 }}>
            {/* <CardGroup>
                <Card className=" m-3" color="info" inverse style={{ width: '18rem' }} >
                  <CardHeader> Total Project </CardHeader>
                
                </Card>
                <Card className="m-3" color="success" inverse style={{ width: '8rem' }} >
                  <CardHeader>  Project InProcess  53 </CardHeader>
                                </Card>
                <Card className="m-3" color="success" inverse style={{ width: '18rem' }} >
                  <CardHeader>  Project Completed <h1>53</h1> </CardHeader>
                
                </Card>
              </CardGroup> */}
            </Col>
            <Row m-3>
              {/* <img src='src/Images/Q_CELLS.jpg' alt="myprofilepic"/> */}

              {/* <image src='src/Images/Q_CELLS.jpg'></image> */}
              <Col md={9}>
               
              </Col>
              <Col md={3} className="pull-right">
                <Form className='' >
                  <Row className="row-cols-lg-auto align-items-center">
                    <FormGroup className="mt-3">
                   
                      <Input id="ProjectName" name="ProjectName" placeholder="Project Name"
                        type="select" onChange={(chioce) => { handleProjectChange(chioce, 'ProductName') }}
                        value={data.ProjectID}    >
                        <option disabled value=""> Select an option  </option>
                        {items.map(item => (
                          <option key={item.value} value={item.value}>   {item.label}  </option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <ButtonGroup className="mt-3">
                        <Button id="btnactive" color="success" onClick={event => onStatusChange(event, true)}>    Load </Button>
                        {/* <Button id="btndeactive" color="danger" onClick={event => onStatusChange(event, false)}>    Deactive Projects  </Button> */}
                      </ButtonGroup>
                    </FormGroup>
                  </Row>
                </Form>
              </Col>
            </Row>

            <MapContainer style={containerStyle} center={center} zoom={zoom} scrollWheelZoom={false} ref={mapRef}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapContent onClick={mapClicked} />
              {
                markers.map((marker, index) => (
                  <MarkerContent key={index} // position={marker.position} 
                    position={[marker.Latitude, marker.Longitude]} markobject={marker}
                    draggable={false} onMarkerClick={event => markerClicked(marker, index)}
                    onDragEnd={event => markerDragEnd(event, index)} />
                ))}
            </MapContainer>

            <Col className='mt-4' sm={{ size: 12 }}>
              <Accordion open={open} toggle={Accordiantoggle}>
                {
                  // markers.map((marker, index)  (
                  markers.map((marker, index) => (
                    <AccordionItem>
                      <AccordionHeader targetId={index}><h3>{marker.ProductName}</h3></AccordionHeader>
                      <AccordionBody accordionId={index}>
                        <Table bordered hover responsive striped variant="dark">
                          <tbody>
                            <tr>
                              <td colspan="6">
                                <Row>
                                  <Col md={3}>
                                    {/* <img  width={220} height={150}  src={require(current.ImagePath)}  alt="logo"   /> */}
                                    <img width={220} height={150} src={require('./../../Images/Q_CELLS.jpg')} alt="logo" />
                                  </Col>
                                  <Col md={9}>
                                    <h1>{marker.ProductName}</h1>
                                    <ul>
                                      <li><span><b>Voltage:</b></span> {' '}<span>{marker.Wattage}</span></li>
                                      <li><span><b>Warranty:</b></span> {' '}<span>{marker.WarrantyYears} Years</span></li>
                                      <li><span><b>Price:</b></span> {' '}<span>{marker.Price} </span></li>
                                      <li><span><b>Description:</b></span> {' '}<span>{marker.ptDes}</span></li>
                                    </ul>
                                  </Col>

                                </Row>
                                {/* <Row>
                                  <Col>
                                  <LoadCharts data={chartData} />
                                  </Col>
                                </Row> */}

                              </td>
                            </tr>
                          </tbody>
                        </Table>

                      </AccordionBody>
                    </AccordionItem>
                  ))}
              </Accordion>
            </Col>
          </Col>

        </Col>
      </Row>
      <Modal style={{ backgroundColor: "cfe2ff !important" }} isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Product</ModalHeader>
        <ModalBody>
          <Row>
            <Form className='' onSubmit={submitForm}>
              <Row>
                {/* <img src='src/Images/Q_CELLS.jpg' alt="myprofilepic"/> */}

                {/* <image src='src/Images/Q_CELLS.jpg'></image> */}


                <Col md={12}>
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
                <Col md={6}>
                  <FormGroup>
                    <Label for="Latitude">
                      Latitude
                    </Label>
                    <Input id="Latitude" name="Latitude" placeholder="Latitude"
                      type="text" onChange={(e) => handleChange(e, 'Latitude')} value={data.Latitude}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Longitude">
                      Longitude
                    </Label>
                    <Input id="Longitude" name="Longitude" placeholder="Longitude"
                      type="text" onChange={(e) => handleChange(e, 'Longitude')} value={data.Longitude} />
                  </FormGroup>
                </Col>
              </Row>


              <Container className='text-center'>
              {editMode ? (
        <>
          <Button style={{"margin-right":5}} color='primary' onClick={handleUpdateMap}>Update</Button>
          <Button style={{"margin-right":5}} color='danger' onClick={(e) => handleDeleteMap(e, data.ID)}>Delete</Button>
          {/* <Button style={{"margin-right":5}} color='danger' onClick={handleDeleteMap(event,data.ProductID)}>Delete</Button> */}
        </>
      ) : (
        // <button onClick={() => setEditMode(true)}>Add</button>
        <Button id="btnAdd" style={{"margin-right":5}} color='primary' outlin>
                  Add
                </Button>
      )}
                
                <Button color="secondary" id="closeButton" onClick={toggle}>
                  Cancel
                </Button>
              </Container>
            </Form>
          </Row>
        </ModalBody>
        {/* <ModalFooter>
                    <Button color="primary" >
                    Add
                    </Button>
                  
                </ModalFooter> */}
      </Modal>
    </Base>

  )
}

const MapContent = ({ onClick }) => {
  const map = useMapEvents({
    click: event => onClick(event)
  })
  return null;
}

const MarkerContent = (props) => {
 
 
  const markerRef = useRef();
  debugger
  const { position,markobject , draggable, onMarkerClick, onDragEnd } = props;
 
  return <Marker position={position} draggable={draggable} data={marker}
    eventHandlers={{
      click: event => onMarkerClick(event),
      dragend: () => onDragEnd(markerRef.current.getLatLng())
    }} ref={markerRef}  >
    {/* <Popup maxWidth="100" maxHeight="auto"> */}
      {/* <b>{position[0]}, {position[1]}</b>
      <b>{marker.ID}</b> */}
     
      {/* <LoadMapForm location={position} /> */}
    {/* </Popup> */}
  </Marker>
}
export default Userdashboards