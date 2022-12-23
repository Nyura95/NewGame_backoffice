import React, { useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { Sidebar, NameIcon, ColorText, TypeSidebar, TypeTheme } from '@cityscoot/components'

import { AppDispatch } from '../../app/store'
import { selectAccount } from '../../features/account/accountSlice'
import { selectSettings, updateSidebarMobile } from '../../features/settings/settingsSlice'

export const Side: React.FC = () => {
  const { sidebarMobileOpen, sidebarMini, sidebarColor, sidebarType, appTheme } =
    useSelector(selectSettings)
  const { planets } = useSelector(selectAccount)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()

  const colorText = useMemo(() => {
    return sidebarType === TypeSidebar.white ||
      (sidebarType === TypeSidebar.transparent && appTheme === TypeTheme.white)
      ? ColorText.dark
      : ColorText.white
  }, [appTheme, sidebarType])

  return (
    <Sidebar
      open={sidebarMobileOpen}
      mini={sidebarMini}
      color={sidebarColor}
      type={sidebarType}
      colorText={colorText}
      title="NewGame"
      body="body"
      onClose={() => dispatch(updateSidebarMobile(!sidebarMobileOpen))}>
      <Sidebar.Line colorText={colorText}>Pages</Sidebar.Line>
      <Sidebar.Items colorText={colorText} text={'Planets'} icon={NameIcon.settings}>
        {planets.map((x, k) => (
          <Sidebar.Item
            key={k}
            colorText={colorText}
            location={location.pathname}
            text={x.Name}
            href={`/planet/${x.ID}`}
            onClick={href => navigate(href)}
          />
        ))}
      </Sidebar.Items>
      <Sidebar.Items colorText={colorText} text={'Compte'} icon={NameIcon.settings}>
        <Sidebar.Item
          colorText={colorText}
          location={location.pathname}
          text="Information"
          href="/"
          onClick={href => navigate(href)}
        />
      </Sidebar.Items>
    </Sidebar>
  )
}
