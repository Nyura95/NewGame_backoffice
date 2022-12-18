import React, { useCallback, useLayoutEffect, useState } from 'react'

import { TypeInput } from '../enum'

interface IProps {
  className?: string
  classNameContainer?: string
  classNameInput?: string
  disabled?: boolean
  ftype?: TypeInput
  invalid?: boolean
  label?: string
  max?: number
  min?: number
  name?: string
  onChange?: (value: string) => void
  onClickText?: () => void
  placeholder?: string
  required?: boolean
  text?: string
  type?: React.HTMLInputTypeAttribute
  valid?: boolean
  value?: string | number
}

export const Input: React.FC<IProps> = ({
  className = '',
  type = 'text',
  label,
  valid,
  invalid,
  value = '',
  name,
  onChange,
  onClickText,
  disabled,
  ftype = TypeInput.outline,
  classNameContainer,
  classNameInput,
  placeholder,
  required,
  text,
  min,
  max,
}) => {
  const [focus, setFocus] = useState(false)
  const [val, setVal] = useState(value)

  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVal(e.target.value)
      if (onChange) onChange(e.target.value)
    },
    [onChange],
  )

  useLayoutEffect(() => {
    setVal(value)
  }, [value])

  return (
    <div
      className={`input-group ${ftype}${focus ? ' focused is-focused' : ''}${
        valid ? ' is-valid' : ''
      }${invalid ? ' is-invalid' : ''}${val ? ' is-filled' : ''} ${
        classNameContainer ? classNameContainer : ''
      }${className ? ` ${className}` : ''}`}>
      {label && (
        <label className={`${ftype !== TypeInput.static ? `form-label` : ''}`}>{label}</label>
      )}
      {text && (
        <span
          onClick={onClickText}
          className={`input-group-text${onClickText ? ' cursor-pointer z-index2' : ''}`}>
          {text}
        </span>
      )}
      <input
        disabled={disabled}
        type={type}
        name={name}
        className={`form-control ${classNameInput ? classNameInput : ''}`}
        data-form-type={type}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={val}
        onChange={change}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
      />
    </div>
  )
}
