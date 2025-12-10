import React from 'react'
import '../../styles/components/molecules/Display.css'
import Text from '../atoms/Text'

function Display({
  title,
  subtitle,
  height = 'auto',
  gradient = 'linear-gradient(135deg, #0f1c2e, #ff6a00)',
  padding = '2rem',
  radius = '16px',
}) {
  return (
    <div
      className="display-molecule"
      style={{
        background: gradient,
        height,
        padding,
        borderRadius: radius,
      }}
    >
      {title && (
        <Text>
          {title}
        </Text>
      )}

      {subtitle && (
        <Text>
          {subtitle}
        </Text>
      )}
    </div>
  )
}

export default Display
