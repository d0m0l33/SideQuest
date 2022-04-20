import { formatUnits } from '@ethersproject/units'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { Colors } from '../../global/styles'
import { TextBold } from '../../global/typography'
import { NFTSVGIcon } from './NFTSVGIcon'
import { Contract } from '@ethersproject/contracts'

import { useSoulMintNfts } from '../../customHooks/useSoulMintNfts'
import { useSoulMintFactory, SoulMintFactoryConfig } from '../../customHooks/useSoulMintFactory'


//{contract && !nfts ?  (<Spinner animation="grow" /> ):

export function NFTList() {
  let contractConfig: SoulMintFactoryConfig| null| undefined = useSoulMintFactory();
  let nfts: any[]| undefined| null = useSoulMintNfts(contractConfig?.contract);
  return (
    <div>

      {!contractConfig || !contractConfig.contract ?  (<div>No contributions at the moment.<br></br>Upload content and tokenize your contributions!</div> ): (
        <NFTContainer>
        {!nfts ? (<Spinner animation="grow" />) : (
       <NftContent nfts={nfts}></NftContent>
        ) }

        </NFTContainer>
    )}
    </div>
  )
}


const NftContent = ({ nfts }: { nfts: any[]; })=>{
  return (
    <>
    { nfts && nfts.length === 0 && <div>No contributions at the moment.<br></br>Upload content and tokenize your contributions!</div>}
    {nfts.map((nft: any, idx:number) => {
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
</>

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

