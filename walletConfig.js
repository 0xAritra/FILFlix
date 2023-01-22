import "@rainbow-me/rainbowkit/styles.css"

import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createClient } from "wagmi"
// import { polygonMumbai } from "wagmi/chains"
// import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const tFil = {
  id: 3141,
  name: "Filecoin - Hyperspace testnet",
  network: "tfil",
  rpcUrls: {
    default: { http: ["https://api.hyperspace.node.glif.io/rpc/v1"] },
  },

  nativeCurrency: {
    name: "FIL",
    decimals: 18,
    symbol: "tFIL",
  },
  testnet: true,
  iconUrl: "https://cryptologos.cc/logos/filecoin-fil-logo.png?v=024",
}

const { chains, provider } = configureChains([tFil], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export { chains, wagmiClient }
