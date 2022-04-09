import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { ChainId, useEthers } from '@usedapp/core'
import { getNFTSFor } from '../api/nftApi';



export function useNFTS(signerAddress: string|null|undefined, overrideChainId?: ChainId, tags?: string[]) {
  const { account, chainId } = useEthers();
  const adjustedChainId = chainId === 31337 ? ChainId.Mainnet : chainId;

  console.log('chainId : ',chainId)
  const [nfts, setNfts] = useState<any[]>()
  useEffect(() => {
    getNFTSFor(signerAddress, adjustedChainId)
      .then(async (response) => {
        if (response) {
            console.log()
            const validNfts = parseResponseForItems(response);
            console.log(validNfts)
            if(validNfts) {
           

                setNfts(validNfts);
            } else {
                // should do something with this case
                // in theory there should always be the defalt badge
                // if an account is connected
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
  }, [account,chainId])
  return nfts
}


export const parseResponseForItems =(response: AxiosResponse): (any[]|null) => {
    if(!response || !response.data || !response.data.data) {
      return null;
    }
    return response.data.data.items;
}
