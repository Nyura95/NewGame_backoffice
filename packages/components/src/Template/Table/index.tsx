import React, { useState, useMemo, useLayoutEffect } from 'react'

import { Checkbox } from '../Form/Checkbox'

type ISort = 'asc' | 'desc' | ''
const Sort: ISort[] = ['', 'asc', 'desc']

const nextSort = (current: ISort): ISort => {
  const i = Sort.findIndex(x => x === current)
  if (i + 1 > Sort.length - 1) {
    return Sort[0]
  }

  return Sort[i + 1]
}

interface IProps {
  headers?: {
    sort: ISort
    value: string
  }[]
  length?: number[]
  onClick?: (i: number, v: string) => void
  onSelector?: (selectors: string[]) => void
  rows?: string[][]
  selector?: number
  texts?: {
    error: string
    info: string
    noData: string
    sync: string
  }
}

export const Table: React.FC<IProps> = ({
  headers = [],
  length = [25],
  onClick,
  onSelector,
  rows = [],
  selector,
  texts = {
    noData: 'No data',
    info: 'Showing {from} to {to} of {total} entries ({sync})',
    sync: '',
  },
}) => {
  const [lengthSelected, setLengthSelected] = useState(length[0])
  const [page, setPage] = useState(1)
  const [currentHeaders, setCurrentHeaders] = useState(headers)
  const [currentSelector, setCurrentSelector] = useState<string[]>([])

  useLayoutEffect(() => {
    setCurrentHeaders(headers)
  }, [headers])

  const rowsWithSkip = useMemo(() => {
    const r: string[][] = []
    const offset = (page - 1) * lengthSelected
    for (let i = offset; i < offset + lengthSelected; i++) {
      if (!rows[i]) break
      r.push(rows[i])
    }

    return r
  }, [page, lengthSelected, rows])

  const maxPage = useMemo(() => {
    return Math.ceil(rows.length / lengthSelected)
  }, [rows.length, lengthSelected])

  const fromTo = useMemo(() => {
    const min = lengthSelected * (page - 1)
    let max = lengthSelected * page
    if (max > rows.length) {
      max = rows.length
    }

    return [min, max]
  }, [lengthSelected, page, rows.length])

  const pageDrawer = useMemo(() => {
    const pages: number[] = []

    if (maxPage === 1) {
      pages.push(1)

      return pages
    }

    pages.push(1)
    for (let i = page - 1; i < page + 2; i++) {
      if (i <= 1 || i > maxPage || i === maxPage) continue
      pages.push(i)
    }
    pages.push(maxPage)

    return pages
  }, [maxPage, page])

  return (
    <div className="dataTable-wrapper">
      <div className="dataTable-top">
        <div className="dataTable-dropdown">
          <label>
            <select
              className="dataTable-selector"
              onChange={e => setLengthSelected(Number(e.target.value))}
              value={lengthSelected}>
              {length.map((v, k) => (
                <option key={k} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="table-responsive">
        <div className="dataTable-loading no-footer sortable fixed-height fixed-columns">
          <div className="dataTable-container">
            <table className="table table-flush dataTable-table">
              <thead className="thead-light">
                <tr>
                  {selector !== undefined ? (
                    <th
                      className={`text-uppercase text-xxs font-weight-bolder opacity-7 text-white opacity-8 `}>
                      Selector
                    </th>
                  ) : null}
                  {currentHeaders.map((v, k) => (
                    <th
                      key={k}
                      className={`text-uppercase text-xxs font-weight-bolder opacity-7 text-white opacity-8 ${v.sort} cursor-pointer`}>
                      <a
                        className="dataTable-sorter"
                        onClick={() => {
                          currentHeaders[k].sort = nextSort(v.sort)
                          setCurrentHeaders([...currentHeaders])
                        }}>
                        {v.value}
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowsWithSkip.length === 0 ? (
                  <tr>
                    <td colSpan={headers.length} className="text-center">
                      {texts.noData}
                    </td>
                  </tr>
                ) : (
                  rowsWithSkip.map((v, k) => (
                    <tr key={k}>
                      {selector !== undefined ? (
                        <td className="text-sm font-weight-normal">
                          <Checkbox
                            onChange={v => {
                              if (v) {
                                currentSelector.push(rowsWithSkip[k][selector])
                              } else {
                                currentSelector.splice(
                                  currentSelector.indexOf(rowsWithSkip[k][selector]),
                                  1,
                                )
                              }
                              setCurrentSelector(currentSelector)
                              if (onSelector) onSelector(currentSelector)
                            }}
                            id={`selector-${k}`}
                          />
                        </td>
                      ) : null}
                      {v.map((d, k2) => (
                        <td
                          key={k2}
                          className={`text-sm font-weight-normal${
                            onClick ? ' cursor-pointer' : ''
                          }`}
                          onClick={() => (onClick ? onClick(k, d) : null)}>
                          {d}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="dataTable-bottom">
        <div className="dataTable-info">
          {texts.info
            .replace('{from}', fromTo[0].toString())
            .replace('{to}', fromTo[1].toString())
            .replace('{total}', rows.length.toString())
            .replace('{sync}', texts.sync)}
        </div>
        <nav className="dataTable-pagination">
          <ul className="dataTable-pagination-list">
            <li className="pager cursor-pointer">
              <a
                data-page="1"
                onClick={() => {
                  if (page - 1 > 0) setPage(page - 1)
                }}>
                ‹
              </a>
            </li>
            {pageDrawer.map((v, k) => (
              <li
                key={k}
                className={`${page === Number(v) ? ' active' : 'cursor-pointer'}`}
                onClick={() => setPage(Number(v))}>
                <a data-page={k + 1}>{v}</a>
              </li>
            ))}
            <li className="pager cursor-pointer">
              <a
                data-page="2"
                onClick={() => {
                  if (page + 1 <= maxPage) setPage(page + 1)
                }}>
                ›
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
