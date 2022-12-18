import React, { useCallback, useState } from 'react'

interface IProps {
  className?: string
  height?: number
  initialTags?: string[]
  name?: string
  onValid?: (tags: string[]) => boolean
  onlyNumber?: boolean
  placeholder?: string
}

export const Tags: React.FC<IProps> = ({
  className = '',
  height = 100,
  name,
  onValid,
  placeholder,
  initialTags = [],
}) => {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)

  const add = useCallback(
    (tag: string) => {
      if (tag !== '') {
        const tmpTags = tag.split(',')
        if (onValid && !onValid(tmpTags)) return
        setTags([...tags, ...tmpTags])
        setValue('')
      }
    },
    [tags, onValid, setTags, setValue],
  )

  const remove = useCallback(
    (index: number) => {
      tags.splice(index, 1)
      setTags([...tags])
    },
    [tags, setTags],
  )

  return (
    <div
      className={`choices${focus ? ' focused is-focused' : ''}${className ? ` ${className}` : ''}`}
      data-type="text">
      <div className="choices__inner input-group">
        <input
          className="form-control choices__input"
          value={tags.join(',')}
          type="hidden"
          data-color="dark"
          name={name}
        />
        <div
          className="choices__list choices__list--multiple"
          style={{ maxHeight: height, overflow: 'auto', marginLeft: 0 }}>
          {tags.map((x, k) => (
            <div key={k} className="badge rounded-pill choices-dark me-2 choices__item--selectable">
              {x}
              <button type="button" className="choices__button" onClick={() => remove(k)}>
                Remove item
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          onFocus={() => setFocus(true)}
          placeholder={placeholder}
          className="choices__input choices__input--cloned form-control"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          role="textbox"
          aria-autocomplete="list"
          aria-label="false"
          data-form-type="other"
          value={value}
          onBlur={() => {
            setFocus(false)
            add(value)
          }}
          onKeyDown={e => (e.key === 'Enter' ? add(value) : null)}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}
