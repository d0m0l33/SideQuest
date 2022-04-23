import React, { useEffect, useState } from 'react'
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'
import { Button } from '../base/Button'
import styled from 'styled-components'
import { Colors } from '../../global/styles'

export const AccountButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()
  const ens = useLookupAddress()
  const [showModal, setShowModal] = useState(false)

  const [activateError, setActivateError] = useState('');
  const { error } = useEthers()
  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])

  const activate = async () => {
    setActivateError('')
    activateBrowserWallet()
  }

  return (
    <Account>
      {activateError && <ErrorWrapper>⚠️ {activateError}</ErrorWrapper>}
      {account ? (
        <>
          <AccountLabel onClick={() => setShowModal(!showModal)}>{ens ?? shortenAddress(account)}</AccountLabel>
          <DisconnectButton onClick={() => deactivate()}>x</DisconnectButton>
        </>
      ) : (
        <LoginButton onClick={activate}>Connect</LoginButton>
      )}
    </Account>
  )
}

const ErrorWrapper = styled.div`
  color: #ff3960;
  margin-right: 40px;
  margin-left: 40px;
  overflow: auto;
`

const Account = styled.div`
  display: flex;
  align-items: center;
`

const LoginButton = styled(Button)`
  width:10em;
`

const DisconnectButton = styled(Button)`
  width: 60px;
  font-size: 11px;

`

const AccountLabel = styled(Button)`
  padding-left: 8px;
  font-size: 11px;
  margin-right: 0.5em;
`