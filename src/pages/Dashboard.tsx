import { useEthers } from '@usedapp/core'
import React, { useEffect } from 'react'
import styled from 'styled-components'

export function DashBoardPage() {
  const { chainId, account, library } = useEthers();

  useEffect(() => {
    // account ORR chainID changed
  }, [account,chainId])

  return (
    <div>
    { account ? (<BadgesPageContainer>
<Section>
<h1>Dashboard</h1>
</Section>
    </BadgesPageContainer>) : 
    (<BadgesPageContainer>

<Section>
<Text>Connect for Dashboard...</Text>

</Section>
    </BadgesPageContainer>)
  }
  </div>
  )
}

const BadgesPageContainer = styled.div `
  display: flex;
  margin: 1em;
  column-gap: 10px;
  row-gap: 10px;
`
export const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`


export const Section = styled.div`
    display:flex;
  `