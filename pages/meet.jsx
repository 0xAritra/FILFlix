import Head from "next/head"
import React from "react"
import { HuddleIframe } from "@huddle01/huddle01-iframe"

const iframeConfig = {
  roomUrl: "https://iframe.huddle01.com/lmao-filflix",
  height: "600px",
  width: "80%",
  noBorder: false, // false by default
}

const discover = () => {
  return (
    <>
      <Head>
        <title>filFlix | Meet</title>
        <meta name="description" content="FilFlix Meet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h2 className="text-3xl underline text-center mt-8">Meet</h2>
      <p className="text-lg text-center m-4">Meet with your favorite creators</p>
      <div className="flex flex-wrap justify-center items-center">
        <HuddleIframe config={iframeConfig} />
      </div>
    </>
  )
}

export default discover
