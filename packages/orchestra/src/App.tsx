import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Container from './containers/layout'
import Account from './features/account'
import Login from './features/auth/Login'
import SwitchPlanet from './features/planet'
import PrivateOutlet from './utils/privateOutlet'

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<PrivateOutlet />}>
      <Route path="*" element={<Container />}>
        <Route index element={<Account />} />
        <Route path="planet/:id" element={<SwitchPlanet />} />
      </Route>
    </Route>
  </Routes>
)

export default App
