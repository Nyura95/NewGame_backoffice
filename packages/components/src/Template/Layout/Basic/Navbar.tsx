import React, { useMemo } from 'react'

import { NameIcon, TypeNavbar } from '../../enum'

export interface INavbarIcon {
  icon: NameIcon
  mobile?: boolean
  onClick?: () => void
}

interface IProps {
  fixed?: boolean
  icons?: INavbarIcon[]
  id: string
  localtion?: string
  onClick?: (href: string) => void
  onClickMini?: () => void
  title?: string
  type?: TypeNavbar
}

export const Navbar: React.FC<IProps> = ({
  id,
  icons,
  onClick,
  onClickMini,
  localtion = '/',
  fixed = false,
  title,
  type = TypeNavbar.dark,
}) => {
  const path = useMemo(() => {
    return localtion.split('/')
  }, [localtion])

  return (
    <nav
      id={id}
      className={`navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none${
        fixed ? ' position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky' : ''
      } ${type}`}
      data-scroll={fixed}>
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            {path.map((x, k) => {
              if (k === path.length - 1) {
                return (
                  <li
                    key={k}
                    className="breadcrumb-item text-sm active text-white"
                    onClick={() => onClick && onClick(x)}>
                    {x}
                  </li>
                )
              }

              return (
                <li
                  key={k}
                  className="breadcrumb-item text-sm"
                  onClick={() => onClick && onClick(x)}>
                  <a className={`opacity-${3 + k} text-white`}>{x}</a>
                </li>
              )
            })}
          </ol>
          <h6 className="font-weight-bolder mb-0">{title}</h6>
        </nav>
        <div className="sidenav-toggler sidenav-toggler-inner d-xl-block d-none ">
          <i className="material-icons-round opacity-10 cursor-pointer" onClick={onClickMini}>
            menu_open
          </i>
        </div>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline">
              <label className="form-label">Search here</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            {icons?.map((x, k) => {
              if (x.mobile) {
                return (
                  <li
                    key={k}
                    className="nav-item d-xl-none ps-3 d-flex align-items-center"
                    onClick={x.onClick}>
                    <i className="material-icons fixed-plugin-button-nav cursor-pointer">
                      {x.icon}
                    </i>
                  </li>
                )
              }

              return (
                <li key={k} className="nav-item px-3" onClick={x.onClick}>
                  <i className="material-icons fixed-plugin-button-nav cursor-pointer">{x.icon}</i>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
