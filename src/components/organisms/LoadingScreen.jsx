import React from 'react'
import Spinner from '../atoms/Spinner'
import Text from '../atoms/Text'

import '../../styles/components/organisms/LoadingScreen.css'

function LoadingScreen({ fadeOut = false }) {
  return (
    <div className={`loading-screen ${fadeOut ? 'loading-screen--hide' : ''}`}>
      <img
        src="/logo.png"
        alt="KM Digital"
        className="loading-screen-logo"
      />

      <Spinner className="text-light" />

      <Text className="loading-screen-text">
        Cargando tu experiencia...
      </Text>
    </div>
  )
}

export default LoadingScreen
