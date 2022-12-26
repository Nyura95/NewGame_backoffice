import React, { useEffect, useMemo, useState } from 'react'

import { Card, List, Button, ColorButton, Spinner, TypeColor } from '@cityscoot/components'
import { ButtonRow } from '@cityscoot/components/src/Template/Form/ButtonRow'

import {
  useCancelConstructBuildingMutation,
  useGetConstructBuildingListQuery,
} from '../../app/services/api/planet'
import { getMilliseconds, convertMsToHM } from '../../helpers/date'

const Construct: React.FC = () => {
  const { data, isFetching, refetch } = useGetConstructBuildingListQuery({})
  const [seconds, setSeconds] = useState(0)
  const [cancelConstruct, { isLoading }] = useCancelConstructBuildingMutation()

  const current = useMemo(() => {
    if (data) {
      if (typeof data.Data === 'string') return undefined

      return data.Data.find(x => x.IDStatus === 2)
    }

    return undefined
  }, [data])

  const inwait = useMemo(() => {
    if (data) {
      if (typeof data.Data === 'string') return undefined

      return data.Data.filter(x => x.IDStatus === 1)
    }

    return undefined
  }, [data])

  useEffect(() => {
    if (seconds > 0) {
      const timeout = setTimeout(() => {
        setSeconds(seconds - 1000)
      }, 1000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [seconds])

  useEffect(() => {
    if (data && current) {
      setSeconds(getMilliseconds(new Date(data.ServerTime), new Date(current.DateEnd)))
    }
  }, [data, current])

  return (
    <Card className={'mx-3 mx-md-4 mt-3'} isBusy={isLoading || isFetching}>
      <Card.Header>
        <Card.Header.Title>Construction</Card.Header.Title>
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
      {!current && <Card.Body>Aucune construction en cours</Card.Body>}
      {current && (
        <>
          <Card.Body>
            <List>
              <List.Li>
                <strong>Nom: </strong>
                {current.Building.Name}
              </List.Li>
              <List.Li>
                <strong>{convertMsToHM(seconds)} secondes</strong>
              </List.Li>
            </List>
          </Card.Body>
          <Card.Footer>
            <ButtonRow>
              <Button
                color={ColorButton.danger}
                onClick={async () => {
                  await cancelConstruct({}).unwrap()
                  refetch()
                }}>
                Cancel
              </Button>
            </ButtonRow>
          </Card.Footer>
        </>
      )}
      {inwait && inwait.length > 0 && (
        <Card.Footer>
          <List>
            <List.Li>
              <strong>Construction en attente: </strong>
              {inwait.length}
            </List.Li>
            <List.Li>
              <strong>Prochain: </strong>
              <List>
                {inwait.map((x, k) => (
                  <List.Li key={k}>
                    <strong>Nom: </strong>
                    {x.Building.Name}
                  </List.Li>
                ))}
              </List>
            </List.Li>
          </List>
        </Card.Footer>
      )}
    </Card>
  )
}

export default Construct
