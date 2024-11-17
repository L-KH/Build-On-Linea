import { writeContract } from '@wagmi/core'
import { parseUnits } from 'viem';
import {useAccount} from "wagmi";

import {addresses} from '@/constants/config'
import { wagmiConfig } from '@/wagmi'

import NFT from './abi/NFT2.json';

//const contractAddress = CONTRACT_ADDRESS_TESTNET[4690]

export const useMint = () => {
  const account = useAccount();
  
  const handleMint = async (tokenURI: string) => {
    const chainId = account.chain?.id;
    if (!chainId || !addresses[chainId]?.nft?.address) {
      console.error("Unsupported chain ID or chain ID is missing from the config.");
      return;
    }

    const NFTAddress = addresses[chainId].nft.address;
    try {
      const result = await writeContract(wagmiConfig,{
        address: NFTAddress as `0x${string}`,
        abi: NFT,
        functionName: 'mint',
        args: [tokenURI],
        value: parseUnits("0.001", 18)
      });
  
      return result;
    } catch (error) {
      console.log(error)
    }
    
  };

  return { handleMint };
};