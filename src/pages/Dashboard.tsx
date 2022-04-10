import { useContractFunction, useEthers } from '@usedapp/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LeaderboardList } from '../components/leaderBoardList/LeaderBoardList';
import { NFTList } from '../components/nftList/NFTList';
import { BorderRad, Colors, Shadows } from '../global/styles';
import { Web3Storage } from 'web3.storage'
import { WEB3_STORAGE_API_KEY } from '../global/apiKeys';
import { Button } from 'react-bootstrap';
import { Contract } from '@ethersproject/contracts'
import soulMint from '../artifacts/contracts/SoulMint.sol/SoulMint.json'
import { ethers } from 'ethers'
import { Spinner } from 'react-bootstrap'


export const SouleMintAbi = [
    "function mintOne(uint256 eventId, address to) public",
  ];

export function DashBoardPage() {
const { chainId, account, library } = useEthers();
const [selectedFile, setSelectedFile] = useState();
const [currentIpfsLinks, setCurrentIpfsLinks] = useState<string[]>([]);
const [isUploading, setIsUploading] = useState<boolean>(false);

const signer = library?.getSigner();

let contract: Contract|null = null;
const souleMintInterface = new ethers.utils.Interface(SouleMintAbi);
contract = new Contract('0xf46bB4381BECf28CB0ebf7D6a5127bD04810d0cE', souleMintInterface, signer);

    useEffect(() => {
        ;(async () => {
          })()
        // account ORR chainID changed
    }, [account,chainId])

    const sendObj = useContractFunction(contract, 'mintOne', { transactionName: 'Mint' });

    const changeHandler = (event:any) => {
        setSelectedFile(event.target.files[0]);
    };

  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setIsUploading(true);

    // Construct with token and endpoint
    const client = new Web3Storage({ token: WEB3_STORAGE_API_KEY })
    const fileInput: any = document.querySelector('input[type="file"]');
    if(!fileInput){
        console.error('No files selected');
        return;
    }

    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(fileInput.files) // Promise<CIDString>

    // Get info on the Filecoin deals that the CID is stored in
    const info = await client.status(rootCid) // Promise<Status | undefined>

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid) // Promise<Web3Response | null>

    if(!res){
        console.error('Error fetching and verifying files stored in web3.storage.');
        return;
    }
    const files = await res.files() // Promise<Web3File[]>
    const links: string[] = [];
    for (const file of files) {
        // can then pass the cid to an nft contract
        console.log(`${file.cid} ${file.name} ${file.size}`);
        if(file.cid && file.name){
            const link = generateIpfsLink(file.cid, file.name);
            links.push(link);
        }
    }

    setCurrentIpfsLinks(links);
    setIsUploading(false);
    if(!signer){
        return;
    }
    const eventId = Math.random() % 100000;
    sendObj.send(ethers.utils.parseEther(eventId.toString()),account);

  };


  // can re add this if you want separate minting

//   const handleMint = async (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     e.preventDefault();
//     if(!signer){
//         return;
//     }
//      const eventId = Math.random() % 100000;
//      sendObj.send(ethers.utils.parseEther(eventId.toString()),account);
//   };

  const generateIpfsLink =(cid: string, filename: string): string => {
    return`https://ipfs.io/ipfs/${cid}/${filename}`;
  }

  return (
    <div>
        { account ? (<DashboardContainer>
    <Section>
        <UploadSection>
        <UploadActionInput type="file" name="file" onChange={changeHandler} />
        <div>
            <UploadActionButton onClick={handleUpload}>upload</UploadActionButton>
            {/* <UploadActionButton onClick={handleMint}>mint</UploadActionButton> */}

        </div>
        </UploadSection>
        {isUploading &&  <Spinner animation="grow" /> }
        {(currentIpfsLinks && currentIpfsLinks.length > 0) && <UrlLinkSection>
            <UrlLink>
            <Text>
                <a 
                href={currentIpfsLinks[0]} target="_blank" rel="noopener noreferrer">
{currentIpfsLinks[0]
}                
</a>
                
            </Text>
            </UrlLink>
        </UrlLinkSection>}
     </Section>
    <Section>
        <BoardPrimary>
            <NFTBoard></NFTBoard>
        </BoardPrimary>
        <BoardSecondary>
            <LeaderBoard/>
        </BoardSecondary>
    </Section>
    </DashboardContainer>) : 
    (<DashboardContainer>

<Section>
<Text>Connect to view Dashboard</Text>
</Section>
    </DashboardContainer>)
  }
  </div>
  )
}

const LeaderBoard = ()=> {
    return (
        <div>
            <div style={{margin:'0.5em', color:'white'}}>
            <Text>Leader Board</Text>
            </div>
            <LeaderboardList/>
        </div>
    )
}

const NFTBoard = ()=> {
    return (
        <div>
            <NFTList />
        </div>
    )
}

const DashboardContainer = styled.div `
  display: flex;
  margin: 1em;
  column-gap: 10px;
  row-gap: 10px;
  flex-direction:column;

`
export const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`

export const Section = styled.div`
    display:flex;
`
export const SubSection = styled.div`
    display:flex;
    margin-right:0.5em;

`
export const BoardPrimary = styled(SubSection)`
    display:flex;
    flex-grow: 2;
    flex-direction: column;
    box-shadow: ${Shadows.main};
    background-color: aliceblue;`


export const BoardSecondary = styled(SubSection)`
    display:flex;
    flex-grow: 1;
    flex-direction: column;
    box-shadow: ${Shadows.main};
    background-color: #1DA1F2;
`

export const UploadSection = styled(SubSection)`
    display:flex;
    flex-direction: column;
    box-shadow: ${Shadows.main};
    background-color: #aliceblue;
`

export const UrlLinkSection = styled(SubSection)`
    display:flex;
    flex-direction: column;
    box-shadow: ${Shadows.main};
    background-color: #aliceblue;
    justify-content:center;
    max-width: 300px;
    overflow: scroll;
`

export const UrlLink = styled.div`
    margin: 1em;

`
export const UploadActionButton = styled(Button)`
  margin: 0.5em;
  background-color:#1DA1F2;
  border-color:#1DA1F2;
`

export const UploadActionInput = styled.input`
  margin: 0.5em;
  color: ${Colors.Black[900]};
  border: 1px solid ${Colors.Black[900]};
  border-radius: ${BorderRad.m};
  background-color: transparent;

`


