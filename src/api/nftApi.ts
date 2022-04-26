import axios, { AxiosResponse } from "axios"
import { COVALENT_KEY } from "../global/apiKeys";

// TODO!  might use antoher API.
// Covalent apis for NFTS seem limited.
// Api stub. 

export const getTokenIdsFor = async (contractAddress: string|null|undefined, chainId:  number|null|undefined): Promise<AxiosResponse|null>=> {
  if(!contractAddress || contractAddress === undefined){
      return null;
  }

  const tokenIdsForContractAddress = 
  `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_token_ids/?key=${COVALENT_KEY}`

  return axios.get(tokenIdsForContractAddress)
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      // handle error
      console.log(error);

      return null;
    });
 }

 export const getMetadataFor = async (
   contractAddress: string|null|undefined,
   tokenId: number, 
   chainId:  number|null|undefined): Promise<AxiosResponse|null>=> {
  if(!contractAddress || contractAddress === undefined){
      return null;
  }

  const metadataForTokenID = 
  `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/?key=${COVALENT_KEY}`

  return axios.get(metadataForTokenID)
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      // handle error
      console.log(error);

      return null;
    });
 }
 