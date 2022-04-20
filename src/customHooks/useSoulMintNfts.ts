import  { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { ChainId, useEthers, useNotifications } from '@usedapp/core'
import { getTokenIdsFor } from '../api/nftApi';
import { Contract } from '@ethersproject/contracts'
import BigNumber from 'bignumber.js';



export function useSoulMintNfts(contract:Contract|null|undefined, overrideChainId?: ChainId, tags?: string[]) {

  const { account, chainId, library } = useEthers();
  const { notifications } = useNotifications()

  const adjustedChainId = chainId === 31337 ? ChainId.Mainnet : chainId;
  // soul mint contract calls external xpoap address
  // so logs that will be indexed in the future are assosciated with this contract address
  const [nfts, setNfts] = useState<any[]>()
  useEffect(() => {
    if(!contract){
      setNfts(undefined);
    } else {
      contract.getXpoapAddress() .then(async (xpoapAddress: string) => {
        getTokenIdsFor(xpoapAddress, adjustedChainId)
        .then(async (response) => {
          if (response) {
              const nftItems = parseResponseForItems(response);
              if(nftItems) {
                // hardcoding contribution token data for now
                setNfts(nftItems.map((nft: any) => ({
                  id: nft.token_id,
                  index: new BigNumber(nft.token_id).plus(50).toString(),
                  name: 'Quest DAO',
                  type : 'Dao Contribution',
                })));
  
              } else {
          
                  setNfts(undefined);
              }
          } else {
            const errorMessage = 'Couldnt fetch transaction data';
            return Promise.reject(new Error(errorMessage))
          }
        })
        .catch((err) => {
          console.log(err)
          setNfts(undefined)
        })
      }).catch((err: any) => {
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
