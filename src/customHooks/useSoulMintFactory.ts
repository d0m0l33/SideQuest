import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { ChainId, useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import soulMint from '../artifacts/contracts/SoulMint.sol/SoulMint.json'
import soulMintFactory from '../artifacts/contracts/SoulMintFactory.sol/SoulMintFactory.json'
import { Contract } from '@ethersproject/contracts'


export interface SoulMintFactoryConfig {
  contract: Contract|null;
  factoryContract: Contract|null;
  hasMintedFactory: boolean;
}

export function useSoulMintFactory() {

  const { account, chainId, library } = useEthers();
  const signer = library?.getSigner();
  // soul mint factory contract
  // single chain for now
  const [config, setConfig] = useState<SoulMintFactoryConfig|null>()
  useEffect(() => {
    if(!account){
      setConfig(null)
    } else {
        const factoryContract = new ethers.Contract('0x756743910ceA0998F23D57181b9d3512450CadF4', soulMintFactory.abi, signer);
        factoryContract.contractByOwner(account).then(async (soulMintContractAddress: string) => {
            if (soulMintContractAddress === '0x0000000000000000000000000000000000000000') {
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

  }, [account,chainId])
  return config
}
