import React, { useCallback } from 'react'

import { Card, List, Button, ColorButton } from '@cityscoot/components'
import { ButtonRow } from '@cityscoot/components/src/Template/Form/ButtonRow'

import {
  useStartConstructResearchMutation,
  useCancelConstructResearchMutation,
} from '../../app/services/api/account'
import { IAccountResearch } from '../../app/services/api/interface'

interface IProps {
  research: IAccountResearch
}

const Resource: React.FC<IProps> = ({ research }) => {
  const [startResearch, { isLoading }] = useStartConstructResearchMutation()
  const [cancelResearch, { isLoading: cancel }] = useCancelConstructResearchMutation()

  const click = useCallback(() => {
    if (research.IsOnResearch) return cancelResearch({})
    startResearch(research.ID)
  }, [research, cancelResearch, startResearch])

  return (
    <Card plain isBusy={isLoading || cancel}>
      <Card.Header>
        <Card.Header.Title>{research.Name}</Card.Header.Title>
      </Card.Header>
      <Card.Body>
        <List>
          <List.Li>
            <strong>ID: </strong>
            {research.ID}
          </List.Li>
          <List.Li>
            <strong>Level: </strong>
            {research.Level}
          </List.Li>
          <List.Li>
            <strong>Peux être construit: </strong>
            {research.CanBeResearch ? 'Oui' : 'Non'}
          </List.Li>
          <List.Li>
            <strong>En cours de construction: </strong>
            {research.IsOnResearch ? 'Oui' : 'Non'}
          </List.Li>
          <List.Li>
            <strong>Coût: </strong>
            <List>
              {research.NextLevel.Costs.map((x, k) => (
                <List.Li key={k}>
                  <strong>{x.IDResource}: </strong>
                  {x.Value}
                </List.Li>
              ))}
              <List.Li>
                <strong>Temps de construction: </strong>
                {research.NextLevel.Time} secondes
              </List.Li>
            </List>
          </List.Li>
        </List>
      </Card.Body>
      <Card.Footer>
        <ButtonRow>
          <Button
            color={research.IsOnResearch ? ColorButton.danger : ColorButton.primary}
            onClick={click}>
            {research.IsOnResearch ? 'Cancel' : 'Upgrade'}
          </Button>
        </ButtonRow>
      </Card.Footer>
    </Card>
  )
}

export default Resource
