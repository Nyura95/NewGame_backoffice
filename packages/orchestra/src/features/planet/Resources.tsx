import React, { useMemo } from 'react'

import { useSelector } from 'react-redux'

import { Card, ISort, ProgressCounter, Spinner, Table, TypeColor } from '@cityscoot/components'

import { useGetResourceQuery } from '../../app/services/api/planet'
import { convertDate } from '../../helpers/date'
import { selectSettings } from '../settings/settingsSlice'

const Resource: React.FC = () => {
  const { intervalRefetch } = useSelector(selectSettings)
  const { data, isLoading, isFetching, isError, refetch } = useGetResourceQuery(
    {},
    { pollingInterval: intervalRefetch },
  )

  const spinner = useMemo(() => {
    if (isLoading) return { color: TypeColor.primary, stopAnimation: true }
    if (isFetching) return { color: TypeColor.warning, stopAnimation: false }
    if (isError) return { color: TypeColor.danger, stopAnimation: true }

    return { color: TypeColor.success, stopAnimation: true }
  }, [isLoading, isFetching, isError])

  return (
    <Card isBusy={isLoading} className={'ms-md-4 mt-3'}>
      <Card.Header>
        <Card.Header.Title>Ressources</Card.Header.Title>
        <div className="position-absolute text-center end-0 my-auto">
          <ProgressCounter stop={isFetching} timer={intervalRefetch} />
          <Spinner
            type="grow"
            className="mt-2"
            color={spinner.color}
            stopAnimation={spinner.stopAnimation}
            onClick={refetch}
            tooltip={convertDate(data?.ServerTime || '')}
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

export default Resource
