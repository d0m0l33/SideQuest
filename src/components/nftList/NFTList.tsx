import { formatUnits } from '@ethersproject/units'
import { ChainId, useEthers } from '@usedapp/core'
import React, { useEffect, useState } from 'react'
import { Row,Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { Colors } from '../../global/styles'
import { TextBold } from '../../global/typography'
// import { MetaBadge } from '../../portalHooks/BadgeHelperTypes'
// import { useBadgeList } from '../../portalHooks/useBadgeList'
// import { TextBold } from '../../typography/Text'
// import { BadgeOverviewModal, BadgeParams } from '../badge/BadgeOverviewModal'
import { NFTSVGIcon } from './NFTSVGIcon'
// import { useSelector } from 'react-redux'


declare const window: any;

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

  const { chainId, account, library } = useEthers();
  // const badges: MetaBadge[]| undefined = useBadgeList(account);
  const nfts: any[]| undefined = useState(TEST_NFTS);



  useEffect(() => {
    // account ORR chainID changed
  }, [nfts])

  console.log('nfts : ',nfts)
  // const [showModal, setShowModal] = useState(false)
  // const [selectedBadgeParams, setSelectedBadgeParams] = useState<BadgeParams>()

    // const handleShowModal =(index: number, badge: MetaBadge) =>  {
    //   if(!badge || !badge.ui){
    //     return;
    //   }
    //   const chainId: ChainId = badge.ui.onChain ? badge.ui.onChain.chainId : 0;
    //   setSelectedBadgeParams({
    //     domainName: 'Meta Portal',
    //     name: badge.ui.name,
    //     description: badge.ui.description,
    //     requirements: badge.ui.requirements,
    //     address: badge.ui.onChain ? badge.ui.onChain.address : null,
    //     tokenId: badge.ui.onChain ? badge.ui.onChain.tokenId : 0,
    //     chainName: CHAIN_NAMES[chainId],
    //     chainId: chainId,
    //     index: index,
    //   });

    //   setShowModal(!showModal);
    // }

    // const item = useSelector((state: any) => {
    //   return{
    //   index: state.selectedItem.index,
    //   balance: state.selectedItem.balance,
    //   holders: state.selectedItem.holders,
    //   name: state.selectedItem.name,
    //   address: state.selectedItem.address,
    //   color: state.selectedItem.color,
    //   tokenId: state.selectedItem.tokenId,
    // }
    // })


  return (
    <div>

      {!nfts[0] ? (<Spinner animation="grow" /> ): (
        <BadgeContainer>
        {nfts[0] && nfts[0].map((nft: any, idx:number) => {
              return (
         
                    <TokenItem key={`SubSection-${idx}`}> 
                    <TokenIconContainer>
                      <BadgeCreatorLogo>
                        Quest Dao
                      </BadgeCreatorLogo>
                      {(nft.index === idx) && <BadgeApplied> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" color="#FFF4D4" className="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>
                      </BadgeApplied>}
                      <NFTSVGIcon src={''} alt={''}></NFTSVGIcon>
                      <TokenBalance> 
                        {formatUnits(10,0)}xp
                      </TokenBalance>
                    </TokenIconContainer>
                        {nft.type && <TokenName>{nft.type}</TokenName>}                    
                  </TokenItem>
           
          )})}
        </BadgeContainer>
    )}
    </div>
  )
}

const BadgeContainer = styled.div`
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

const MintButton = styled(Button)`
  background-color: ${Colors.Yellow[100]};
`

const TokenItem = styled.li`
  display: flex;
  flex-direction: column;
`

const TokenIconContainer = styled.div`
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

const TokenName = styled(TextBold)`
  margin-left: 4px;
  font-size: 12px;
`

const TokenTicker = styled(TextBold)`
  grid-area: ticker;
  color: ${Colors.Gray[600]};
`

const TokenBalance = styled(TextBold)`
  position: absolute;
  bottom: 0;
  right: 0;
  padding:0.25em;
  font-size: 12px;
`

const BadgeApplied = styled(TextBold)`
  position: absolute;
  bottom: 0;
  left: 0;
  padding:0.25em;
  font-size: 12px;
`

const BadgeCreatorLogo = styled(TextBold)`
  position: absolute;
  top: 0;
  left: 0;
  padding:0.25em;
  font-size: 12px;
`

