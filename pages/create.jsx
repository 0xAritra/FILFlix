import CreateCard from "@/components/CreateCard"
import Head from "next/head"
import React from "react"

const create = () => {
  return (
    <div>
      <Head>
        <title>filFlix | Create</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h2 className="text-3xl underline text-center mt-8">Create</h2>
      <CreateCard />
    </div>
  )
}

export default create
