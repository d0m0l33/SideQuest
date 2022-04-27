import  { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { ChainId, useEthers, useNotifications } from '@usedapp/core'
import { getMetadataFor, getTokenIdsFor } from '../api/nftApi';
import { Contract } from '@ethersproject/contracts'
import BigNumber from 'bignumber.js';
import { Web3Storage } from 'web3.storage';
import { Web3StorageClient } from '../utils/web3StorageClient';

export function useSoulMintNfts(contract:Contract|null|undefined, overrideChainId?: ChainId, tags?: string[]) {

  const { account, chainId } = useEthers();
  const { notifications } = useNotifications()

  const adjustedChainId = chainId === 31337 ? ChainId.Mainnet : chainId;
  const [nfts, setNfts] = useState<any[]>()
  useEffect(() => {
    if(!contract || !chainId){
      setNfts(undefined);
    } else {
        getTokenIdsFor(contract.address, adjustedChainId)
        .then(async (response) => {
          if (response) {
              const nftItems = parseResponseForItems(response);
              if(!nftItems) {
                setNfts(undefined);
              } else {
                let sideQuestNfts:any[] = [];
                const resolvedPromises = nftItems?.map(async (nftItem)=> {
                  const tokenId = nftItem.token_id;
                  const response = await getMetadataFor(contract.address,tokenId,chainId);
                  const metadata = response ? parseResponseForItems(response) : null;
                  const sideQuestNft = createSideQuestNFT(tokenId,metadata);
                  return sideQuestNft;
                })
                sideQuestNfts = await Promise.all(resolvedPromises);
                setNfts(sideQuestNfts);
              }
          } else {
            const errorMessage = 'Couldnt fetch transaction data';
            setNfts(undefined);
            console.error(errorMessage);
          }
        })
        .catch((err) => {
          console.log(err)
          setNfts(undefined)
        })
    }
  }, [account,chainId, contract, notifications])
  return nfts
}


export const parseResponseForItems =(response: AxiosResponse): (any[]|null) => {
    if(!response || !response.data || !response.data.data) {
      return null;
    }
    return response.data.data.items;
}


export const extractIPFSDataFrom = (convalentList: any[]) => {
  if(convalentList == null || convalentList[0].nft_data == null ||  convalentList[0].nft_data[0] == null) {
    return null;
  }
  const nftData = convalentList[0].nft_data[0];
  return nftData ? nftData.external_data : null;
}

export const createSideQuestNFT = (tokenId: number, metadata: any) => {
  
 const ipfsData = extractIPFSDataFrom(metadata);
 const description = ipfsData? ipfsData?.description : null;
 const name =  ipfsData ? ipfsData?.name : 'Personal Log';
 const attributes = ipfsData ? ipfsData?.attributes : [];
 return  {
    id: tokenId,
    name: name,
    description: description,
    attributes : attributes,
    date: null,
    index: new BigNumber(tokenId).plus(50).toString(),
    type : null,
  }
}

export async function retrieveFiles (cid: string) {
  const data = [];
  const client = await Web3StorageClient.getClient();
  if(!client){
      console.error('error crearing ')
      return null;
  }  
  const res = await client.get(cid);
  if(!res) {
    return null;
  }
  if (!res.ok) {
    return null;
  }

  // unpack File objects from the response
  const files = await res.files()
  for (const file of files) {
    console.log(`${file.cid} -- ${file.name} -- ${file.size}`)
    data.push(file)
  }
  return data
}
