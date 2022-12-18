import React, { useMemo } from 'react'

// import Logo from '../../assets/img/logo-cityscoot.svg'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { Sidebar, NameIcon, ColorText, TypeSidebar, TypeTheme } from '@cityscoot/components'

import { AppDispatch } from '../../app/store'
import { selectSettings, updateSidebarMobile } from '../../features/settings/settingsSlice'

export const Side: React.FC = () => {
  const { sidebarMobileOpen, sidebarMini, sidebarColor, sidebarType, appTheme } =
    useSelector(selectSettings)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()

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
      title="Orchestra V2"
      body="body"
      onClose={() => dispatch(updateSidebarMobile(!sidebarMobileOpen))}>
      <Sidebar.Line colorText={colorText}>Pages</Sidebar.Line>
      <Sidebar.Items
        colorText={colorText}
        text={t('sidebar.admin.title') || ''}
        icon={NameIcon.settings}>
        <Sidebar.Item
          colorText={colorText}
          location={location.pathname}
          text="Home"
          href="/"
          onClick={href => navigate(href)}
        />
      </Sidebar.Items>
    </Sidebar>
  )
}
