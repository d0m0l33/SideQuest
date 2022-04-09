import React, { useState } from 'react'
import styled from 'styled-components'
import { BorderRad } from '../../global/styles'

export function NFTIcon({ src, alt }: { src: string; alt: string }) {
  const [isIconError, setIconError] = useState(false)

  return (
    <>
      {isIconError ? (
        '🤷‍♂️'
      ) : (
        <Icon
          src={src}
          alt={alt}
          onError={() => {
            setIconError(true)
          }}
        />
      )}
    </>
  )
}

const Icon = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  overflow: hidden;
  color: #fff;
`

