import { Box } from '@mui/material'
import classnames from 'classnames'
import React, { useState } from 'react'
import TextContent from 'src/components/TextContent'
import './Input.scss'
import { InputProps } from './Input.type'

const Input = React.forwardRef((props: InputProps, ref?: React.LegacyRef<HTMLInputElement>) => {
  const {
    label,
    type,
    className = '',
    name,
    errorMessage,
    icon,
    disabled,
    sizeIcon = 18,
    hint,
    required,
    autoComplete,
    accept,
    style,
    borderType = 'round',
    ...rest
  } = props

  const [focused, setFocused] = useState(false)
  const [show, setShow] = useState(false)

  return (
    <Box className={classnames(className)} style={style}>
      <TextContent.Label label={label} required={required} />
      <Box
        className={classnames(`input ${borderType}`, {
          focused,
          disabled,
        })}
      >
        <Box className="input-form">
          <input
            // required={required}
            name={name}
            type={show ? 'text' : type}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            autoComplete={autoComplete}
            ref={ref}
            accept={accept}
            {...rest}
          />
        </Box>

        {icon && (
          <></>
        )}

        {type === 'password' && (
          <></>
        )}
      </Box>

      <TextContent.ErrorMessage message={errorMessage ?? ''} />
      <TextContent.Hint hint={hint} />
    </Box>
  )
})

export default Input
