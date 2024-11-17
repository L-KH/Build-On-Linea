"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { Transport } from "viem";
import { type Chain } from 'viem'
import { createConfig, http } from "wagmi";
import {
  sepolia,
  scrollTestnet,
  fantomSonicTestnet,
  lineaTestnet,
} from "wagmi/chains";

import berachain_logo from "../public/img/berachain_logo.png"
import lineaTesnet_logo from "../public/img/lineaTesnet_logo.png";
import metistoken from "../public/img/metistoken.png";
import tabitoken from "../public/img/tabitoken.png";
import scroll_logo from "../public/img/scroll_logo.png";
import taiko_logo from "../public/img/taiko_logo.png"
import parallel_logo from "../public/img/parallel_logo.png"
import mint_logo from "../public/img/mint_logo.png"
import zircuit_logo from "../public/img/zircuit_logo.png"
import redstone_logo from "../public/img/redstone_logo.png"
import plume_network_logo from "../public/img/plume_network_logo.png"
import minato_logo from "../public/img/minato_logo.png"
import unichain_logo from "../public/img/unichain_logo.png"
import inkseplolia_logo from "../public/img/inksepolia_logo.png"


const walletConnectProjectId = '51d5d824bfd42cd4f17cfb3dcec82da9';

if (!walletConnectProjectId) {
  throw new Error(
    "WalletConnect project ID is not defined. Please check your environment variables.",
  );
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  { appName: "ImaginAIryNFTs", projectId: walletConnectProjectId },
);
const berachainTestnet: Chain = {
  id: 0x138d5, // Chain ID for Berachain Testnet
  name: 'Berachain Testnet',
  nativeCurrency: {
    name: 'Berachain Token',
    symbol: 'BERA',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://artio.rpc.berachain.com'] },
  },
  blockExplorers: {
    default: { name: 'Berachain Explorer', url: 'https://explorer.berachain.com' },
  },
  testnet: true,
};  
const ParallelTestnet: Chain = {
  id: 0x25bb, // Chain ID for Berachain Testnet
  name: 'Parallel Testnet',
  nativeCurrency: {
    name: 'Parallel Testnet',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc-accused-coffee-koala-b9fn1dik76.t.conduit.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Parallel Explorer', url: 'https://explorerl2new-accused-coffee-koala-b9fn1dik76.t.conduit.xyz' },
  },
  testnet: true,
};  
const taikokaltatestnet: Chain = {
  id: 0x28c60, // Chain ID for Berachain Testnet
  name: 'Taiko Kalta Testnet',
  nativeCurrency: {
    name: 'Taiko Kalta Token',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.katla.taiko.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Taiko Kalta Explorer', url: 'https://explorer.katla.taiko.xyz' },
  },
  testnet: true,
};  
const taikokaltatestnet2: Chain = {
  id: 0x28c61, // Chain ID for Berachain Testnet
  name: 'Taiko Hekla Testnet',
  nativeCurrency: {
    name: 'Taiko Hekla Token',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.hekla.taiko.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Taiko Hekla Explorer', url: 'https://hekla.taikoscan.network' },
  },
  testnet: true,
}; 
const metissepoliatestnet: Chain = {
  id: 0xe9fd, // Chain ID for Berachain Testnet
  name: 'Metis Sepolia Testnet',
  nativeCurrency: {
    name: 'Metis Sepolia Token',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://sepolia.rpc.metisdevops.link/'] },
  },
  blockExplorers: {
    default: { name: 'Metis Sepolia Explorer', url: 'https://sepolia.explorer.metisdevops.link' },
  },
  testnet: true,

};  
const tabitestnet: Chain = {
  id: 0x263d, // Chain ID for Berachain Testnet
  name: 'Tabi Testnet',
  nativeCurrency: {
    name: 'Tabi Token',
    symbol: 'TABI',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.tabichain.com/'] },
  },
  blockExplorers: {
    default: { name: 'Tabi Testnet Explorer', url: 'https://testnet.tabiscan.com/' },
  },
  testnet: true,

};  
const minttestnet: Chain = {
  id: 0x697, // Chain ID for Berachain Testnet
  name: 'Mint Testnet',
  nativeCurrency: {
    name: 'ETH Token',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://sepolia-testnet-rpc.mintchain.io/'] },
  },
  blockExplorers: {
    default: { name: 'Mint Testnet Explorer', url: 'https://sepolia-testnet-explorer.mintchain.io/' },
  },
  testnet: true,

};  
const zircuittestnet: Chain = {
  id: 0xbf03, // Chain ID for Berachain Testnet
  name: 'Zircuit Testnet',
  nativeCurrency: {
    name: 'ETH Token',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://zircuit1.p2pify.com/'] },
  },
  blockExplorers: {
    default: { name: 'Zircuit Testnet Explorer', url: 'https://explorer.zircuit.com/' },
  },
  testnet: true,

};  
const redstone: Chain = {
  id: 0x2b2, // Chain ID for Berachain Testnet
  name: 'RedStone Mainnet',
  nativeCurrency: {
    name: 'ETH Token',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.redstonechain.com/'] },
  },
  blockExplorers: {
    default: { name: 'RedStone Mainnet Explorer', url: 'https://explorer.redstone.xyz/' },
  },
  testnet: true,

};  
const plume: Chain = {
  id: 0x99c0a0f, // Chain ID for Berachain Testnet
  name: 'Plume Testnet',
  nativeCurrency: {
    name: 'ETH Token',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.plumenetwork.xyz/http'] },
  },
  blockExplorers: {
    default: { name: 'Plume Network Explorer', url: 'https://testnet-explorer.plumenetwork.xyz/' },
  },
  testnet: true,

};  
const BeraBartio: Chain = {
  id: 0x138d4, // Chain ID for Berachain Testnet
  name: 'Berachain Bartio',
  nativeCurrency: {
    name: 'Berachain Bartio',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://bartio.rpc.berachain.com/'] },
  },
  blockExplorers: {
    default: { name: 'BERA Explorer', url: 'https://bartio.beratrail.io' },
  },
  testnet: true,
}; 
const minato: Chain = {
  id: 0x79a, // Chain ID for Berachain Testnet
  name: 'Minato Testnet',
  nativeCurrency: {
    name: 'Minato Testnet',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.minato.soneium.org'] },
  },
  blockExplorers: {
    default: { name: 'Soneium Explorer', url: 'https://explorer-testnet.soneium.org' },
  },
  testnet: true,
}; 
const unichain: Chain = {
  id: 0x515, // Chain ID for Berachain Testnet
  name: 'Unichain Sepolia',
  nativeCurrency: {
    name: 'Unichain Sepolia',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['	https://sepolia.unichain.org'] },
  },
  blockExplorers: {
    default: { name: 'Unichain Sepolia Explorer', url: 'https://sepolia.uniscan.xyz/' },
  },
  testnet: true,
}; 
const inkseplolia: Chain = {
  id: 0xBA5ED, // Chain ID for Berachain Testnet
  name: 'Ink Sepolia',
  nativeCurrency: {
    name: 'Ink Sepolia',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['	https://rpc-gel-sepolia.inkonchain.com/'] },
  },
  blockExplorers: {
    default: { name: 'Ink Sepolia Explorer', url: 'https://explorer-sepolia.inkonchain.com' },
  },
  testnet: true,
}; 
// Fix missing icons
const customLineaTestnet = { ...lineaTestnet, iconUrl: lineaTesnet_logo.src };
const customMetis = { ...metissepoliatestnet, iconUrl: metistoken.src };
const customScroll = { ...scrollTestnet, iconUrl: scroll_logo.src };
const customTaiko = { ...taikokaltatestnet, iconUrl: taiko_logo.src };
const customTaiko2 = { ...taikokaltatestnet2, iconUrl: taiko_logo.src };

const customberachain = { ...BeraBartio, iconUrl: berachain_logo.src };
const customparallel = { ...ParallelTestnet, iconUrl: parallel_logo.src };
const customTabi = { ...tabitestnet, iconUrl: tabitoken.src };
const custommint = { ...minttestnet, iconUrl: mint_logo.src };
const customzircuit = { ...zircuittestnet, iconUrl: zircuit_logo.src };
const customredstone = { ...redstone, iconUrl: redstone_logo.src };
const customplume = { ...plume, iconUrl: plume_network_logo.src };
const customminato = { ...minato, iconUrl: minato_logo.src };
const customunichain = { ...unichain, iconUrl: unichain_logo.src };
const customuink = { ...inkseplolia, iconUrl: inkseplolia_logo.src };


const transports: Record<number, Transport> = {
  [customminato.id]: http(), // Add Berachain Testnet transport
  [customunichain.id]: http(), // Add Unichain Testnet transport
  [customuink.id]: http(), // Add customuink Testnet transport
  [customplume.id]: http(), // Add Berachain Testnet transport
  //[customTaiko.id]: http(), // Add Berachain Testnet transport
  //[customTaiko2.id]: http(), // Add Berachain Testnet transport
  [sepolia.id]: http(),
  //[customScroll.id]: http(),
  [fantomSonicTestnet.id]: http(),
  //[customMetis.id]: http(), // Add Berachain Testnet transport
  [customTabi.id]: http(), 
  [customLineaTestnet.id]: http(),
  // [baseGoerli.id]: http(),
  // [bscTestnet.id]: http(),
  [customberachain.id]: http(), // Add Berachain Testnet transport
  [customparallel.id]: http(), 
  [custommint.id]: http(), 
  [customzircuit.id]: http(), 
  [customredstone.id]: http(), 

};
export const wagmiConfig = createConfig({
  chains: [
  // customunichain,
  // customminato,
  // customuink,
  // //customTaiko,
  // customplume,
  //customTaiko2,
  sepolia,
  //customScroll,
  //fantomSonicTestnet,
  //customMetis,
  // customLineaTestnet,
  // // baseGoerli,
  // // bscTestnet,
  // customberachain, // Add the custom Berachain Testnet to the wagmi configuration
  // customparallel,
  // customTabi,
  // custommint,
  // //customzircuit,
  // customredstone
  ],
  connectors,
  transports,
  ssr: true,
});
