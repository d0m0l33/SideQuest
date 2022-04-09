import axios, { AxiosResponse } from "axios"
import { COVALENT_KEY } from "../global/apiKeys";



export const getNFTSFor = async (signerAddress: string|null|undefined, chainId:  number|null|undefined): Promise<AxiosResponse|null>=> {
  if(!signerAddress || signerAddress === undefined){
      return null;
  }
  console.log('signer address : ',signerAddress)
  const COVALENT_API_KEY = COVALENT_KEY;
  const COVALENT = {
    url: "https://api.covalenthq.com/v1/", 
  }

  const transactionsForAddress = 
  `${COVALENT.url}${chainId}/address/${signerAddress}/transactions_v2/?key=${COVALENT_API_KEY}`

  // Make a request for a user with a given ID
  return axios.get(transactionsForAddress)
    .then(function (response: any) {
      // handle success
      return response
    })
    .catch(function (error: any) {
      // handle error
      console.log(error);

      return null;
    });
}