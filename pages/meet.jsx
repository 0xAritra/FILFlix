import Head from "next/head"
import React, { useEffect, useState } from "react"
import { HuddleIframe } from "@huddle01/huddle01-iframe"
import { useAccount, useContractRead } from "wagmi"
import { SUBSCRIPTION_LIFETIME_ADDRESS, SUBSCRIPTION_LIFETIME_ADDRESS_ABI } from "@/constants"

const iframeConfig = {
  roomUrl: "https://iframe.huddle01.com/lmao-filflix",
  height: "600px",
  width: "80%",
  noBorder: false, // false by default
}

const discover = () => {
  const [balance, setBalance] = useState(null)
  const { address, isConnecting, isDisconnected } = useAccount()
  const contractRead = useContractRead({
    address: SUBSCRIPTION_LIFETIME_ADDRESS,
    abi: SUBSCRIPTION_LIFETIME_ADDRESS_ABI,
    functionName: "balanceOf",
    args: [address],
  })
  useEffect(() => {
    setBalance(contractRead.data)
  }, [contractRead])
  return (
    <>
      <Head>
        <title>filFlix | Meet</title>
        <meta name="description" content="FilFlix Meet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h2 className="text-3xl underline text-center mt-8">Meet</h2>
      <p className="text-lg text-center m-4">Meet with your favorite creators</p>
      {balance && balance > 0 ? (
        <>
          <div className="flex flex-wrap justify-center items-center">
            <HuddleIframe config={iframeConfig} />
          </div>
        </>
      ) : (
        <h2 className="text-center m-4 text-lg">
          Get the{" "}
          <a className="underline" href="/subscribe">
            subscription
          </a>{" "}
          or{" "}
          <a href="/discover" className="underline">
            buy some content!
          </a>
        </h2>
      )}
    </>
  )
}

export default discover
