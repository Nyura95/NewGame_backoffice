import React from 'react'

import { Card, ISort, Table } from '@cityscoot/components'

import { useGetResearchQuery } from '../../app/services/api/account'
import { convertDate } from '../../helpers/date'

const Research: React.FC = () => {
  const { data, isLoading } = useGetResearchQuery({})

  return (
    <Card isBusy={isLoading} className={'ms-md-4 mt-3'}>
      <Card.Header>
        <Card.Header.Title>Research</Card.Header.Title>
      </Card.Header>
      <Card.Body>
        <Table
          length={[10, 25, 50]}
          headers={
            data ? Object.keys(data.Data[0]).map(x => ({ sort: '' as ISort, value: x })) : []
          }
          rows={data ? data.Data.map(x => Object.values(x)) : []}
          texts={{
            error: 'Erreur',
            noData: 'Aucune donnée',
            info: 'Affichage de {from} à {to} pour {total} éléments ({sync})',
            sync: convertDate(data?.ServerTime || ''),
          }}
        />
      </Card.Body>
    </Card>
  )
}

export default Research
