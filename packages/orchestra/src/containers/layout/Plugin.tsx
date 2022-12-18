import React, { useCallback, useLayoutEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import {
  Plugin,
  Card,
  NameIcon,
  Icon,
  TypeColor,
  Button,
  TypeSidebar,
  TypeTheme,
  ColorButton,
  Input,
} from '@cityscoot/components'

import { AppDispatch } from '../../app/store'
import {
  selectSettings,
  updateAppTheme,
  updateIntervalRefetch,
  updateNavbarFixed,
  updateOperatorOpen,
  updateSidebarColor,
  updateSidebarType,
} from '../../features/settings/settingsSlice'

export const Plugins: React.FC = () => {
  const { operatorOpen, sidebarType, appTheme, navbarFixed, intervalRefetch } =
    useSelector(selectSettings)
  const dispatch = useDispatch<AppDispatch>()
  const [interval, setInterval] = useState(intervalRefetch / 1000)

  const { t } = useTranslation()

  const updateColor = useCallback(
    (color: TypeColor) => {
      dispatch(updateSidebarColor(color))
    },
    [dispatch],
  )

  const updateType = useCallback(
    (type: TypeSidebar) => {
      dispatch(updateSidebarType(type))
    },
    [dispatch],
  )

  useLayoutEffect(() => {
    if (intervalRefetch !== interval) {
      if (interval < 30) setInterval(30)
      dispatch(updateIntervalRefetch(interval))
    }
  }, [interval, dispatch, intervalRefetch])

  return (
    <Plugin
      id="plugins"
      icon={NameIcon.settings}
      open={operatorOpen}
      onClickIcon={() => dispatch(updateOperatorOpen(!operatorOpen))}>
      <Card className="shadow-lg">
        <Card.Header className="pb-0 pt-3">
          <div className="float-start">
            <h5 className="mt-3 mb-0">{t('plugins.configurator.title')}</h5>
          </div>
          <div className="float-end mt-4">
            <Icon
              className="cursor-pointer"
              icon={NameIcon.clear}
              onClick={() => dispatch(updateOperatorOpen(!operatorOpen))}
            />
          </div>
        </Card.Header>
        <hr className="horizontal my-1 light" />
        <Card.Body>
          <h6 className="mb-0">{t('plugins.configurator.color')}</h6>
          <div className="badge-colors text-start">
            <span
              className="badge filter bg-gradient-primary active"
              onClick={() => updateColor(TypeColor.primary)}
            />
            <span
              className="badge filter bg-gradient-dark"
              data-color="dark"
              onClick={() => updateColor(TypeColor.dark)}
            />
            <span
              className="badge filter bg-gradient-info"
              data-color="info"
              onClick={() => updateColor(TypeColor.info)}
            />
            <span
              className="badge filter bg-gradient-success"
              data-color="success"
              onClick={() => updateColor(TypeColor.success)}
            />
            <span
              className="badge filter bg-gradient-warning"
              data-color="warning"
              onClick={() => updateColor(TypeColor.warning)}
            />
            <span
              className="badge filter bg-gradient-danger"
              data-color="danger"
              onClick={() => updateColor(TypeColor.danger)}
            />
          </div>
          <hr className="horizontal my-1 light" />
          <h6 className="mb-0">{t('plugins.configurator.type')}</h6>
          <div className="d-flex">
            <Button
              className="px-3 mb-2"
              gradient
              color={ColorButton.dark}
              active={sidebarType === TypeSidebar.dark}
              onClick={() => updateType(TypeSidebar.dark)}>
              {t('plugins.configurator.typeChoiceDark')}
            </Button>
            <Button
              className="px-3 mb-2 ms-2"
              gradient
              color={ColorButton.dark}
              active={sidebarType === TypeSidebar.transparent}
              onClick={() => updateType(TypeSidebar.transparent)}>
              {t('plugins.configurator.typeChoiceTransparent')}
            </Button>
            <Button
              className="px-3 mb-2 ms-2"
              gradient
              color={ColorButton.dark}
              active={sidebarType === TypeSidebar.white}
              onClick={() => updateType(TypeSidebar.white)}>
              {t('plugins.configurator.typeChoiceWhite')}
            </Button>
          </div>
          <hr className="horizontal my-1 light" />
          <h6 className="mb-0">{t('plugins.configurator.theme')}</h6>
          <div className="d-flex">
            <h6 className="mb-0">{t('plugins.configurator.themeChoice')}</h6>
            <div className="form-check form-switch ps-0 ms-auto my-auto">
              <input
                className="form-check-input mt-1 ms-auto"
                type="checkbox"
                onChange={() =>
                  dispatch(
                    updateAppTheme(appTheme === TypeTheme.white ? TypeTheme.dark : TypeTheme.white),
                  )
                }
                checked={appTheme === TypeTheme.dark}
              />
            </div>
          </div>
          <hr className="horizontal my-1 light" />
          <h6 className="mb-0">{t('plugins.configurator.navbar')}</h6>
          <div className="d-flex">
            <h6 className="mb-0">{t('plugins.configurator.navbarChoice')}</h6>
            <div className="form-check form-switch ps-0 ms-auto my-auto">
              <input
                className="form-check-input mt-1 ms-auto"
                type="checkbox"
                onChange={() => dispatch(updateNavbarFixed(!navbarFixed))}
                checked={navbarFixed}
              />
            </div>
          </div>
          <hr className="horizontal my-1 light" />
          <div className="d-flex">
            <h6 className="mb-0">Interval de rafraichissement (seconde)</h6>
            <div className="form-check form-switch ps-0 ms-auto my-auto">
              <Input
                type="number"
                min={30}
                value={interval}
                onChange={v => setInterval(Number(v))}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </Plugin>
  )
}
