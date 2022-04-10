import { formatUnits } from '@ethersproject/units'
import {useEthers} from '@usedapp/core'
import React, { useEffect, useMemo, useState } from 'react'
import { Row,Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { Colors } from '../../global/styles'
import { TextBold } from '../../global/typography'
import { NFTSVGIcon } from './NFTSVGIcon'
import soulMint from '../../artifacts/contracts/SoulMint.sol/SoulMint.json'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import axios from 'axios'
import {COVALENT_KEY} from '../../global/apiKeys'

const TEST_NFTS = [
  {
    type : 'Dao Contribution',
    id: '10',
    index: '50',
    name: 'Quest DAO'
  },
  {
    type : 'Dao Contribution',
    id: '11',
    index: '51',
    name: 'Quest DAO'

  },
  {
    type : 'Dao Contribution',
    id: '12',
    index: '52',
    name: 'Quest DAO'

  },
  {
    type : 'Dao Contribution',
    id: '13',
    index: '53',
    name: 'Quest DAO'

  }
]

export function NFTList() {
  const [nfts, setNfts] =  useState(TEST_NFTS);
  const { chainId, account, library } = useEthers();
  useEffect(() => {
    ;(async () => {
      // SoulMint contract instance from deployInstanceAndMintThree, run npx hardhat run `scripts/deployInstanceAndMintThree.js --network mumbai` and use yours
      // TODO: use SoulMintFactory and get SoulMint address from factory, then use the methods directly from the instance
      const contract = new ethers.Contract('0x4445A92f0ea160046a6Cf99FBBE902FA9fcAF9b4', soulMint.abi, library);
      const xpoapAddress = await contract.getXpoapAddress();

      const allNfts = await axios.get(`https://api.covalenthq.com/v1/${chainId}/tokens/${xpoapAddress}/nft_token_ids/?key=${COVALENT_KEY}`)
      setNfts(allNfts.data.data.items.map((nft: any) => ({
          id: nft.token_id,
          index: new BigNumber(nft.token_id).plus(50).toString(),
          name: 'Quest DAO',
          type : 'Dao Contribution',
        }
      )))
    })()
  }, [library, chainId, account])

  useEffect(() => {
    // nfts changed
  }, [nfts])

  return (
    <div>

      {!nfts ? (<Spinner animation="grow" /> ): (
        <NFTContainer>
        {nfts && nfts.map((nft: any, idx:number) => {
              return (
         
                    <NFTItem key={`SubSection-${idx}`}> 
                    <NFTIconContainer>
                      <NFTDomainName>
                        Quest Dao
                      </NFTDomainName>
                      <NFTSVGIcon src={''} alt={''}></NFTSVGIcon>
                      <NFTContributionPoints> 
                        {formatUnits(10,0)}xp
                      </NFTContributionPoints>
                    </NFTIconContainer>
                        {nft.type && <NFTType>{nft.type}</NFTType>}                    
                  </NFTItem>
           
          )})}
        </NFTContainer>
    )}
    </div>
  )
}

const NFTContainer = styled.div`
display: flex;
flex-flow: row wrap;
height: 100%;
`


export const Button = styled.button`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  height: 40px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${Colors.Black[900]};
  border: 1px solid ${Colors.Black[900]};
  background-color: transparent;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }
`

const NFTItem = styled.li`
  display: flex;
  flex-direction: column;
`

const NFTIconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 120px;
  height:120px;
  margin: 0.2em;
  border: 1px solid #ebebeb;
  background: rgb(60, 60, 60);
  background: rgba(149, 149, 149, 0.4);
  position: relative;

  &:hover,
  &:focus, 
  &:active {
    color: ${Colors.Yellow[100]};
    border-width: medium;
    border-color: ${Colors.Yellow[100]};
  }
`

const NFTType = styled(TextBold)`
  margin-left: 4px;
  font-size: 12px;
`

const NFTContributionPoints = styled(TextBold)`
  position: absolute;
  bottom: 0;
  right: 0;
  padding:0.25em;
  font-size: 12px;
`

const NFTDomainName = styled(TextBold)`
  position: absolute;
  top: 0;
  left: 0;
  padding:0.25em;
  font-size: 12px;
`

