import React, { useEffect, useState } from 'react'

import { Card, List, Button, ColorButton, Spinner, TypeColor } from '@cityscoot/components'
import { ButtonRow } from '@cityscoot/components/src/Template/Form/ButtonRow'

import {
  useGetConstructResearchListQuery,
  useCancelConstructResearchMutation,
} from '../../app/services/api/account'
import { getMilliseconds, convertMsToHM } from '../../helpers/date'

const Construct: React.FC = () => {
  const { data, isFetching, refetch } = useGetConstructResearchListQuery({})
  const [seconds, setSeconds] = useState(0)
  const [cancelResearch, { isLoading }] = useCancelConstructResearchMutation()

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
    if (data && typeof data.Data !== 'string') {
      setSeconds(getMilliseconds(new Date(data.ServerTime), new Date(data.Data.DateEnd)))
    }
  }, [data])

  return (
    <Card className={'mx-3 mx-md-4 mt-3'} isBusy={isLoading || isFetching}>
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
      {data && typeof data.Data === 'string' && <Card.Body>Aucune construction en cours</Card.Body>}
      {data && typeof data.Data !== 'string' && (
        <>
          <Card.Body>
            <List>
              <List.Li>
                <strong>Nom: </strong>
                {data.Data.Research.Name}
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
                  await cancelResearch({}).unwrap()
                  refetch()
                }}>
                Cancel
              </Button>
            </ButtonRow>
          </Card.Footer>
        </>
      )}
    </Card>
  )
}

export default Construct
