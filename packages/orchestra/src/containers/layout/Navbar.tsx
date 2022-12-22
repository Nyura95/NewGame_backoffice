import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { NameIcon, LayoutBasic, TypeNavbar, TypeTheme } from '@cityscoot/components'

import { AppDispatch } from '../../app/store'
import { store } from '../../app/store'
import { reset } from '../../features/account/accountSlice'
import { logout } from '../../features/auth/authSlice'
import {
  selectSettings,
  updateOperatorOpen,
  updateSidebarMini,
  updateSidebarMobile,
} from '../../features/settings/settingsSlice'

export const Navbar: React.FC = () => {
  const [fixed, setFixed] = useState(false)
  const { navbarFixed, appTheme } = useSelector(selectSettings)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()

  const handleScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      if (navbarFixed) {
        if (window.scrollY > 0 && !fixed) {
          setFixed(!fixed)
        }
        if (window.scrollY === 0 && fixed) {
          setFixed(!fixed)
        }
      } else {
        setFixed(navbarFixed)
      }
    })
  }, [fixed, navbarFixed])

  useEffect(() => {
    if (navbarFixed) {
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
    handleScroll()
  }, [navbarFixed, handleScroll])

  return (
    <LayoutBasic.Navbar
      id="navbar"
      fixed={fixed}
      type={appTheme === TypeTheme.dark ? TypeNavbar.dark : TypeNavbar.light}
      localtion={location.pathname}
      onClickMini={() => dispatch(updateSidebarMini(!store.getState().settings.sidebarMini))}
      icons={[
        {
          icon: NameIcon.settings,
          mobile: false,
          onClick: () => dispatch(updateOperatorOpen(!store.getState().settings.operatorOpen)),
        },
        {
          icon: NameIcon.menu,
          mobile: true,
          onClick: () =>
            dispatch(updateSidebarMobile(!store.getState().settings.sidebarMobileOpen)),
        },
        {
          icon: NameIcon.logout,
          mobile: false,
          onClick: () => {
            dispatch(reset())
            dispatch(logout())
          },
        },
      ]}
    />
  )
}
