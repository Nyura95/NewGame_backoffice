import React, { useState, useCallback } from 'react'

interface IProps {
  checked?: boolean
  classNameContainer?: string
  classNameInput?: string
  disabled?: boolean
  id: string
  label?: string
  name?: string
  onChange?: (value: boolean) => void
}

export const Checkbox: React.FC<IProps> = ({
  id,
  checked = false,
  disabled,
  label,
  name,
  onChange,
  classNameContainer,
  classNameInput,
}) => {
  const [check, setCheck] = useState(checked)

  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheck(e.target.checked)
      onChange && onChange(e.target.checked)
    },
    [onChange],
  )

  return (
    <div className={`form-check ${classNameContainer ? classNameContainer : ''}`}>
      <input
        className={`form-check-input ${classNameInput ? classNameInput : ''}`}
        type="checkbox"
        checked={check}
        onChange={change}
        id={id}
        disabled={disabled}
        name={name}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
