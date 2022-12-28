import React from 'react'

import { Card, Col, ISort, Row, Spinner, Table, TypeColor } from '@cityscoot/components'

import { useGetCargoQuery } from '../../app/services/api/planet'
import { convertDate } from '../../helpers/date'

const Cargo: React.FC = () => {
  const { data, isLoading, isFetching, refetch } = useGetCargoQuery({})

  return (
    <Card isBusy={isLoading} className="ms-md-4 mt-3">
      <Card.Header>
        <Card.Header.Title>Cargo</Card.Header.Title>
        <Row>
          <Col auto>Espace max: {data?.Data.Weight}</Col>
        </Row>
        <Row>
          <Col auto>Espace utilisé: {data?.Data.CurrentWeight}</Col>
        </Row>
        <div className="position-absolute text-center end-0 top-0 my-auto">
          <Spinner
            type="grow"
            className="mt-2"
            color={isFetching ? TypeColor.warning : TypeColor.success}
            stopAnimation={!isFetching}
            onClick={refetch}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col col={12}>
            <Table
              length={[10, 25, 50]}
              headers={
                data && data.Data.Container.length > 0
                  ? Object.keys(data.Data.Container[0].Module).map(x => ({
                      sort: '' as ISort,
                      value: x,
                    }))
                  : []
              }
              rows={data ? data.Data.Container.map(x => Object.values(x.Module)) : []}
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
    </Card>
  )
}

export default Cargo
