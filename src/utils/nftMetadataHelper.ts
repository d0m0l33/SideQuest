import { ChainId } from "@usedapp/core"

export interface SideQuestNFTMetaData {
    contentUris: string[]
    chainId: ChainId| undefined | null,
    signer: string,
    contract: string | undefined | null,
}

export interface StandardAttribute {
    trait_type: string, 
    value: string|number,
    display_type?: string
}


export interface StandardNftMetaData {
    description: string,
    external_url: string
    name: string,
    attributes: StandardAttribute[], 
    image?: string,

}

export interface ModifiedNftMetaData extends StandardNftMetaData {
    sideQuest: SideQuestNFTMetaData,
}

export const makeFileObject =(obj: any, fileName: string)=> {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    return new File([blob], `${fileName}.json`); 
 }
 
 export const generateIpfsLink =(cid: string): string => {
   return`https://ipfs.io/ipfs/${cid}`;
 }
