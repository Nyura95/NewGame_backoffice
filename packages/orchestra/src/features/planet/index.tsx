import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Loader } from '@cityscoot/components'

import { useSwitchPlanetMutation } from '../../app/services/api/planet'
import { AppDispatch } from '../../app/store'
import { selectAccount, switchPlanetFocus } from '../account/accountSlice'
import Planet from './Planet'

const SwitchPlanet: React.FC = () => {
  const { id } = useParams()
  const { id_planet_focus } = useSelector(selectAccount)
  const [switchPlanet] = useSwitchPlanetMutation()

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (Number(id) !== id_planet_focus) {
      switchPlanet(Number(id)).then(() => {
        dispatch(switchPlanetFocus(Number(id)))
      })
    }
  }, [id, dispatch, switchPlanet, id_planet_focus])

  if (Number(id) !== id_planet_focus) return <Loader show />

  return <Planet />
}

export default SwitchPlanet
