import React, { useState } from 'react'

import { Card, Col, ISort, Row, Table } from '@cityscoot/components'

import { IBuilding } from '../../app/services/api/interface'
import { useGetBuildingQuery } from '../../app/services/api/planet'
import { convertDate } from '../../helpers/date'
import Building from './Building'

const Resource: React.FC = () => {
  const [building, setBuilding] = useState<IBuilding>()
  const { data, isLoading } = useGetBuildingQuery({})

  return (
    <Card isBusy={isLoading} className={'ms-md-4 mt-3'}>
      <Card.Header>
        <Card.Header.Title>Building</Card.Header.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col col={12}>
            <Table
              length={[10, 25, 50]}
              headers={
                data ? Object.keys(data.Data[0]).map(x => ({ sort: '' as ISort, value: x })) : []
              }
              rows={data ? data.Data.map(x => Object.values(x)) : []}
              onClick={i => setBuilding(data?.Data[i])}
              texts={{
                error: 'Erreur',
                noData: 'Aucune donnée',
                info: 'Affichage de {from} à {to} pour {total} éléments ({sync})',
                sync: convertDate(data?.ServerTime || ''),
              }}
            />
          </Col>
        </Row>
      </Card.Body>
      {building && (
        <Card.Footer>
          <Building building={building} />
        </Card.Footer>
      )}
    </Card>
  )
}

export default Resource
