import React from 'react'

import { useSelector } from 'react-redux'

import { Card, ISort, Table } from '@cityscoot/components'

import { selectAccount } from './accountSlice'

const Planets: React.FC = () => {
  const { planets } = useSelector(selectAccount)

  return (
    <Card className="ms-md-4 mt-3">
      <Card.Header>
        <Card.Header.Title>Planets</Card.Header.Title>
      </Card.Header>
      <Card.Body>
        <Table
          length={[10, 25, 50]}
          headers={Object.keys(planets[0]).map(x => ({ sort: '' as ISort, value: x }))}
          rows={planets.map(x => Object.values(x))}
          texts={{
            error: 'Erreur',
            noData: 'Aucune donnée',
            info: 'Affichage de {from} à {to} pour {total} éléments ({sync})',
            sync: '',
          }}
        />
      </Card.Body>
    </Card>
  )
}

export default Planets
