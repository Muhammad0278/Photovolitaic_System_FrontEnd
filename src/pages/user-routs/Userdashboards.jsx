import React from 'react'
import Base from '../../components/Base'
import { Row, Col } from 'reactstrap'

import LoadMap from './LoadMap'

const Userdashboards = () => {
  
  return (

    <Base>
      <Row className=''>
        <Col className='mt-4' sm={{ size: 12 }}>
          <Col style={{ backgroundColor: '#cfe2ff', paddingTop: 5, paddingBottom: 5 }} >
            <h3 className='text-center'>Product Information</h3>
          </Col>
          <Col style={{ border: '1.5px solid #cfe2ff', }} className="px-3" md={12}></Col>
        <LoadMap />
        </Col>
      </Row>
    </Base>

  )
}

export default Userdashboards