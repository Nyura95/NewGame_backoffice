import React, { useCallback } from 'react'

import { Card, List, Button, ColorButton } from '@cityscoot/components'
import { ButtonRow } from '@cityscoot/components/src/Template/Form/ButtonRow'

import { IPlanetBuilding } from '../../app/services/api/interface'
import {
  useStartConstructBuildingMutation,
  useCancelConstructBuildingMutation,
} from '../../app/services/api/planet'

interface IProps {
  building: IPlanetBuilding
}

const Resource: React.FC<IProps> = ({ building }) => {
  const [startConstruct, { isLoading }] = useStartConstructBuildingMutation()
  const [cancelConstruct, { isLoading: cancel }] = useCancelConstructBuildingMutation()

  const click = useCallback(() => {
    if (building.IsOnBuilding) return cancelConstruct({})
    startConstruct(building.ID)
  }, [building, cancelConstruct, startConstruct])

  return (
    <Card plain isBusy={isLoading || cancel}>
      <Card.Header>
        <Card.Header.Title>{building.Name}</Card.Header.Title>
      </Card.Header>
      <Card.Body>
        <List>
          <List.Li>
            <strong>ID: </strong>
            {building.ID}
          </List.Li>
          <List.Li>
            <strong>Level: </strong>
            {building.Level}
          </List.Li>
          <List.Li>
            <strong>Peux être construit: </strong>
            {building.CanBeBuild ? 'Oui' : 'Non'}
          </List.Li>
          <List.Li>
            <strong>En cours de construction: </strong>
            {building.IsOnBuilding ? 'Oui' : 'Non'}
          </List.Li>
          <List.Li>
            <strong>Coût: </strong>
            <List>
              {building.NextLevel.Costs.map((x, k) => (
                <List.Li key={k}>
                  <strong>{x.IDResource}: </strong>
                  {x.Value}
                </List.Li>
              ))}
              <List.Li>
                <strong>Temps de construction: </strong>
                {building.NextLevel.Time} secondes
              </List.Li>
            </List>
          </List.Li>
          <List.Li>
            <strong>Building required: </strong>
            <List>
              {building.Required.Building.map((x, k) => (
                <List.Li key={k}>
                  <strong>{x.IDBuildingRequired}: </strong>
                  {x.LevelRequired}
                </List.Li>
              ))}
            </List>
          </List.Li>
          <List.Li>
            <strong>Research required: </strong>
            <List>
              {building.Required.Research.map((x, k) => (
                <List.Li key={k}>
                  <strong>{x.IDResearchRequired}: </strong>
                  {x.LevelRequired}
                </List.Li>
              ))}
            </List>
          </List.Li>
        </List>
      </Card.Body>
      <Card.Footer>
        <ButtonRow>
          <Button
            color={building.IsOnBuilding ? ColorButton.danger : ColorButton.primary}
            onClick={click}>
            {building.IsOnBuilding ? 'Cancel' : 'Upgrade'}
          </Button>
        </ButtonRow>
      </Card.Footer>
    </Card>
  )
}

export default Resource
