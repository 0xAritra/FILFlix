import "@/styles/globals.css"
import { chains, wagmiClient } from "../walletConfig"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiConfig } from "wagmi"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
