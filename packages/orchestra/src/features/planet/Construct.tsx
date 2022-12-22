import React from 'react'

import { Card, List } from '@cityscoot/components'

import { useGetConstructBuildingListQuery } from '../../app/services/api/planet'
import { convertDate } from '../../helpers/date'

const Construct: React.FC = () => {
  const { data, isFetching } = useGetConstructBuildingListQuery({})

  return (
    <Card className={'ms-md-4 ms-md-4 mt-3'} isBusy={isFetching}>
      <Card.Header>
        <Card.Header.Title>Construction en cours</Card.Header.Title>
      </Card.Header>
      <Card.Body>
        {data && typeof data.Data !== 'string' && (
          <List>
            <List.Li>
              <strong>{convertDate(data.Data.DateEnd)}</strong>
            </List.Li>
          </List>
        )}
      </Card.Body>
    </Card>
  )
}

export default Construct
