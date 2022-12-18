import React from 'react'

import Component from 'react-select'

type Option = { label: string; value: string }

interface IProps {
  className?: string
  disabled?: boolean
  isClearable?: boolean
  isLoading?: boolean
  isMulti?: boolean
  isSearchable?: boolean
  name?: string
  onChange?: (s: Option | null, m: Option[]) => void
  placeholder?: string
  values: {
    label: string
    value: string
  }[]
}

export const Select: React.FC<IProps> = ({
  className,
  isMulti,
  isSearchable,
  isClearable,
  disabled,
  values,
  isLoading,
  placeholder,
  name,
  onChange,
}) => {
  return (
    <Component
      className={className}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={disabled}
      isLoading={isLoading}
      name={name}
      placeholder={placeholder}
      onChange={e => {
        if (onChange) {
          if (Array.isArray(e)) {
            return onChange(null, e)
          }
          const o = e as Option
          onChange(o, [o])
        }
      }}
      classNames={{
        control: () => 'choosen-control',
        menu: () => 'choosen-menu',
        placeholder: () => 'choosen-placeholder',
        indicatorSeparator: () => 'choosen-indicatorSeparator',
        option: () => 'choosen-option',
        multiValueRemove: () => 'choosen-multivalueremove',
        singleValue: () => 'choosen-singleValue',
      }}
      options={values}
    />
  )
}
