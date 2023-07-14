import React, { useEffect, useState } from 'react'
import {Row, Col, Form, FormGroup,  Input,  ButtonGroup, Button, Table,Accordion, AccordionBody, AccordionItem, AccordionHeader } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth';
import { GetAllADProjects } from '../../services/Product-service';
import { GetAllProductsBYProject, ManualReporing } from '../../services/Map-service';
import Base from '../../components/Base';
import LoadCharts from './LoadCharts';
import { toast } from 'react-toastify';

const ViewProjects = () => {
    const [open, setOpen] = useState('1');
    const UserData = getCurrentUserDetail();
    const [items, setItems] = useState([{ label: "Loading .........", value: "" }]);
    const [loading, setLoading] = useState(true);
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
      const [markers, setMarkers] = useState([]);
    useEffect(() => { (async () => await _LoadSelectProjects(UserData.Id))(); }, [])
    useEffect(() => { console.log(markers); }, [markers]);
    const onStatusChange = ((event, Status) => {
        
        event.preventDefault()
      
        _Load(Status, data);
      });
      const ReportOnChange = ((event, Status) => {
        debugger
        ManualReporing(data).then((resp) => {
          debugger
          // console.log(resp.data)
        var repsondata = JSON.parse(resp)
          if (repsondata.Code == 200) {
            toast.success("Project Report Generated successfully !!");
             _Load(true, data);
           // setItems(repsondata.data.map(({ ProjectID, ProjectName ,IsActive}) => ({ label: ProjectName, value: ProjectID, Istatus: IsActive })));
           // setLoading(false);
           // setData({ ...data, ProjectID: repsondata.data[0].ProjectID, ProjectName: repsondata.data[0].ProjectName })
          
          }
          if (repsondata.Code == 401) {
            _Load(true, data);
            toast.success("Report Already Generated !!");
          }
        }).catch((error) => {
          console.log('error')
        })
      
       
      });
      //====================== Load Select Option
  function _LoadSelectProjects(UserID) {
  
    GetAllADProjects(UserID).then((resp) => {
      // console.log(resp.data)
      var repsondata = JSON.parse(resp)
      if (repsondata.Code == 200) {
        setItems(repsondata.data.map(({ ProjectID, ProjectName ,IsActive}) => ({ label: ProjectName, value: ProjectID, Istatus: IsActive })));
        setLoading(false);
       // setData({ ...data, ProjectID: repsondata.data[0].ProjectID, ProjectName: repsondata.data[0].ProjectName })
      
      }
    }).catch((error) => {
      console.log('error')
    })
  }
  function _Load(Status, data) {
    console.log(data)
    GetAllProductsBYProject(Status, data).then((resp) => {
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
    const handleProjectChange = (event, property) => {
      debugger
        var index = event.nativeEvent.target.selectedIndex;
        let selectedtext = event.nativeEvent.target[index].text;
     
        setData({ ...data, ProjectID: event.target.value, ProjectName: selectedtext })

      //  let thisitmec= event.target.itemvalue;
      //  console.log(thisitmec);
      const istatus = event.target[event.target.selectedIndex].getAttribute('data-status');
       if(istatus == true)
       {

       }
      }; 
  return (
    <Base>
    <Row>
      <Col className='mt-4' sm={{ size: 12 }}>
        <Col style={{ backgroundColor: '#cfe2ff', paddingTop: 5, paddingBottom: 5 }} >
          <h3 className='text-center'>Veiw Project Information</h3>
        </Col>
        <Col style={{ border: '1.5px solid #cfe2ff', }} className="px-3" md={12}>

    <Row m-3>
   
    <Col md={9} >
      <Form className='' >
        <Row className=" align-items-center">

        <Col md={4} >
          <FormGroup className="mt-3">
         
            <Input id="ProjectName" name="ProjectName" placeholder="Project Name"
              type="select" onChange={(chioce) => { handleProjectChange(chioce, 'ProductName') }}
              value={data.ProjectID}    >
              <option disabled value=""> Select an option  </option>
              {items.map(item => (
             
                <option style={{color: item.Istatus == true ? "" : "red",fontWeight: item.Istatus == true ? "" : "700"  }} data-status= {item.Istatus}  key={item.value} value={item.value}>   {item.label} </option>
              ))}
            </Input>
          </FormGroup> 
          </Col>
          <Col md={8} >
          <FormGroup>
            <ButtonGroup className="mt-3">
              <Button id="btnactive" color="success" onClick={event => onStatusChange(event, true)}>    Search </Button>
              <Button id="btnReport" color="danger" onClick={event => ReportOnChange(event, false)}>    Generate Report  </Button>
            </ButtonGroup>
          </FormGroup>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col md={3}>
     
     </Col>
    <Col className='mt-4' sm={{ size: 12 }}>
              <Accordion open={open} toggle={Accordiantoggle}>
                {
                  // markers.map((marker, index)  (
                  markers.map((marker, index) => (
                    <AccordionItem>
                      <AccordionHeader targetId={index}><h3>{marker.ProjectName+' => '+marker.ProductName}</h3></AccordionHeader>
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
                                <Row>
                                  <Col>
                                 { marker.lstdata.length !=0 ? <LoadCharts data={marker.lstdata} /> : ""}
                                  </Col>
                                </Row>

                              </td>
                            </tr>
                          </tbody>
                        </Table>

                      </AccordionBody>
                    </AccordionItem>
                  ))}
              </Accordion>
            </Col>
  </Row>
  </Col>
        </Col>

      </Row>

    </Base>
  )
}

export default ViewProjects