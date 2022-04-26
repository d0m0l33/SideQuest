import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useEthers, useNotifications } from '@usedapp/core'
import { ethers } from 'ethers'
import soulMint from '../artifacts/contracts/SoulMint.sol/SoulMint.json'
import soulMintFactory from '../artifacts/contracts/SoulMintFactory.sol/SoulMintFactory.json'
import { Contract } from '@ethersproject/contracts'


export interface SoulMintFactoryConfig {
  contract: Contract|null;
  factoryContract: Contract|null;
  hasMintedFactory: boolean;
}
export const SOUL_MINT_FACTORY_ADDRESS = "0x32c2B3F606B2aF7EA945BBaC1D183d2960B201Cf"
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export function useSoulMintFactory() {

  const { account, chainId, library } = useEthers();
  const { notifications } = useNotifications()

  const signer = library?.getSigner();
  // soul mint factory contract
  // single chain for now
  const [config, setConfig] = useState<SoulMintFactoryConfig|null>()
  useEffect(() => {
    if(!account){
      setConfig(null)
    } else {
        const factoryContract = new ethers.Contract(SOUL_MINT_FACTORY_ADDRESS, soulMintFactory.abi, signer);
        factoryContract.contractByOwner(account).then(async (soulMintContractAddress: string) => {
            if (soulMintContractAddress === ADDRESS_ZERO) {
              setConfig({contract : null, hasMintedFactory: false, factoryContract: factoryContract});
            } else {
              const fetched = new ethers.Contract(soulMintContractAddress, soulMint.abi, library)
              setConfig({contract : fetched, hasMintedFactory: true, factoryContract: factoryContract});
            }
        }).catch((err: any) => {
          console.log(err)
          setConfig(null)
        })
    }

  }, [account,chainId,notifications])
  return config
}
