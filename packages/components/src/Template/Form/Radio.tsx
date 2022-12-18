import React, { useState, useCallback } from 'react'

interface IProps {
  checked?: boolean
  classNameContainer?: string
  classNameInput?: string
  disabled?: boolean
  id: string
  label?: string
  name?: string
  onChange?: (value: string) => void
  value?: string
}

export const Radio: React.FC<IProps> = ({
  id,
  checked = false,
  disabled,
  label,
  name,
  value,
  onChange,
  classNameContainer,
  classNameInput,
}) => {
  const [check, setCheck] = useState(checked)

  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheck(e.target.checked)
      onChange && onChange(e.target.value)
    },
    [onChange],
  )

  return (
    <div className={`form-check ${classNameContainer ? classNameContainer : ''}`}>
      <input
        className={`form-check-input ${classNameInput ? classNameInput : ''}`}
        type="radio"
        checked={check}
        onChange={change}
        id={id}
        value={value}
        disabled={disabled}
        name={name}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
