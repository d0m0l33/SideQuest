import { formatUnits } from '@ethersproject/units'
import { Card, Spinner, Badge, ListGroup, ListGroupItem, Figure } from 'react-bootstrap'
import styled from 'styled-components'
import { Colors } from '../../global/styles'
import { TextBold } from '../../global/typography'
import { NFTSVGIcon } from './NFTSVGIcon'
import { Contract } from '@ethersproject/contracts'

import { useSoulMintNfts } from '../../customHooks/useSoulMintNfts'
import { useSoulMintFactory, SoulMintFactoryConfig } from '../../customHooks/useSoulMintFactory'
import { Button } from '../base/Button'
import { BsFillHandThumbsUpFill, BsStar } from "react-icons/bs";
import { BiShare } from "react-icons/bi";
import { useEffect } from 'react'


export function NFTList() {
  let contractConfig: SoulMintFactoryConfig| null| undefined = useSoulMintFactory();
  let nfts: any[]| undefined| null = useSoulMintNfts(contractConfig?.contract);

  useEffect(() => {
    ;(async () => {
        console.log('nfts : ',nfts)
    })()
}, [nfts])
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
        <TokenCard key={`token-${idx}`}>
        <TokenCardContents>
          <div style={{display:'flex'}}>
              <Figure style={{marginRight:'1em'}}>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                    src="mario.jpeg"
                />
              </Figure>
              <div style={{display:'flex', flexDirection: 'column'}}>
                <b><p style={{fontSize:'15px' }}>{nft.name}</p></b>
                <div style={{fontSize: '12px'}}>4/23/2022, 5:36:58 PM</div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>
                      <Badge style={{marginRight: '0.2em'}}>Individual Log</Badge>
                      <Badge style={{marginRight: '0.2em'}}>Multi Link</Badge>
                      <Badge style={{marginRight: '0.2em'}} bg="dark">Fully IPFS Backed</Badge>
                    </div>
                    <div>
                    <BiShare style={{marginRight: '0.2em', fontSize: '20px'}} />
                    <BsStar style={{marginRight: '0.2em'}} />
                    </div>
                </div>
              </div>
          </div>
        </TokenCardContents>
        </TokenCard>
  )})}
</>

  )
}

const NFTContainer = styled.div`
display: flex;
flex-direction: column;
height: 600px;
overflow:scroll;
`
const TokenCard = styled.div`
  background-color:  ${Colors.White};
  border:solid;
  border-width: 0.5px;
  border-top: none;
  border-left: none;
  border-right: none;
  borderColor:${Colors.Gray[300]};


  &:hover {
    color: ${Colors.Blue[200]};
    border-width: small;
    background-color: #f8f8ff;
    border:none;
    cursor: pointer;
  }
`
const TokenCardContents = styled.div`
  margin: 1em;
  display:flex;
`

