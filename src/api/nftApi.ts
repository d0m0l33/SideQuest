import axios, { AxiosResponse } from "axios"

// TODO!  might use antoher API.
// Covalent apis for NFTS seem limited.
// Api stub. 

export const getNFTSFor = async (signerAddress: string|null|undefined, chainId:  number|null|undefined): Promise<AxiosResponse|null>=> {
  if(!signerAddress || signerAddress === undefined){
      return null;
  }
 
  return null;
}