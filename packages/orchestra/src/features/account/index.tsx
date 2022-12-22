import React from 'react'

import { useSelector } from 'react-redux'

import { Avatar, Col, Row, Header, TypeColor, Card } from '@cityscoot/components'

import Face from '../../assets/img/bruce-mars.jpg'
import Image from '../../assets/img/office-dark.jpg'
import { selectAccount } from './accountSlice'
import Planets from './Planets'
import Research from './Research'

const Home: React.FC = () => {
  const { id, email } = useSelector(selectAccount)

  return (
    <Row>
      <Col col={12}>
        <Header image={Image} color={TypeColor.dark} />
      </Col>
      <Col col={12}>
        <Card className="mx-3 mx-md-4 mt-n6">
          <Card.Body>
            <Row className="gx-4 mb-2">
              <Col auto>
                <Avatar image={Face} />
              </Col>
              <Col auto className="my-auto">
                <div className="h-100">
                  <h5 className="mb-1">
                    ID: {id} email: {email}
                  </h5>
                  <p className="mb-0 font-weight-normal text-sm">Information compte</p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col col={6}>
        <Planets />
      </Col>
      <Col col={6}>
        <Research />
      </Col>
    </Row>
  )
}

export default Home
