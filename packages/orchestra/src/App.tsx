import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Container from './containers/layout'
import Login from './features/auth/Login'
import PrivateOutlet from './utils/privateOutlet'

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<PrivateOutlet />}>
      <Route path="*" element={<Container />}></Route>
    </Route>
  </Routes>
)

export default App
