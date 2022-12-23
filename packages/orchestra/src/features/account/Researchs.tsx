import React, { useState } from 'react'

import { Card, ISort, Spinner, Table, TypeColor } from '@cityscoot/components'

import { useGetResearchQuery } from '../../app/services/api/account'
import { IAccountResearch } from '../../app/services/api/interface'
import { convertDate } from '../../helpers/date'
import Research from './Research'

const Re: React.FC = () => {
  const [research, setResearch] = useState<IAccountResearch>()
  const { data, isLoading, isFetching, refetch } = useGetResearchQuery({})

  return (
    <Card isBusy={isLoading} className={'me-md-4 mt-3'}>
      <Card.Header>
        <Card.Header.Title>Research</Card.Header.Title>
        <div className="position-absolute text-center end-0 my-auto">
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
        <Table
          length={[10, 25, 50]}
          headers={
            data ? Object.keys(data.Data[0]).map(x => ({ sort: '' as ISort, value: x })) : []
          }
          rows={data ? data.Data.map(x => Object.values(x)) : []}
          onClick={i => setResearch(data?.Data[i])}
          texts={{
            error: 'Erreur',
            noData: 'Aucune donnée',
            info: 'Affichage de {from} à {to} pour {total} éléments ({sync})',
            sync: convertDate(data?.ServerTime || ''),
          }}
        />
      </Card.Body>
      {research && (
        <Card.Footer>
          <Research research={research} />
        </Card.Footer>
      )}
    </Card>
  )
}

export default Re
