import React from 'react'

import { Avatar, Col, Row, Header, TypeColor, Card } from '@cityscoot/components'

import { useGetPlanetQuery } from '../../app/services/api/planet'
import Face from '../../assets/img/bruce-mars.jpg'
import Image from '../../assets/img/office-dark.jpg'
import Buildings from './Buildings'
import Cargo from './Cargo'
import Construct from './Construct'
import Resources from './Resources'

const Home: React.FC = () => {
  const { data, isLoading } = useGetPlanetQuery({})

  return (
    <Row>
      <Col col={12}>
        <Header image={Image} color={TypeColor.dark} />
      </Col>
      <Col col={12}>
        <Card className="mx-md-4 mt-n6" isBusy={isLoading}>
          <Card.Body>
            <Row className="gx-4 mb-2">
              <Col auto>
                <Avatar image={Face} />
              </Col>
              <Col auto className="my-auto">
                <div className="h-100">
                  <h5 className="mb-1">Nom: {data?.Data.Name}</h5>
                  <p className="mb-0 font-weight-normal text-sm">ID: {data?.Data.ID}</p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col col={12}>
        <Construct />
      </Col>
      <Col lg={6} md={12}>
        <Resources />
      </Col>
      <Col lg={6} md={12}>
        <Buildings />
      </Col>
      <Col lg={6} md={12}>
        <Cargo />
      </Col>
    </Row>
  )
}

export default Home
