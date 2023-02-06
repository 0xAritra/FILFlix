import Card from "@/components/Card"
import Head from "next/head"
import React, { useEffect, useState } from "react"

const discover = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api/discover")
      .then((res) => res.json())
      .then((data) => setData(data))
  })

  return (
    // <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8">
    //   <div className="p-5 flex text-center justify-around items-center h-full bg-[#08071B] rounded-xl flex-wrap">
    <>
      <Head>
        <title>filFlix | Discover</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h2 className="text-3xl underline text-center mt-8">Discover</h2>
      <div className="flex flex-wrap justify-center items-center">
        {data && data.map((i) => <Card key={i._id} props={i} />)}
      </div>
    </>
    //   </div>
    // </div>
  )
}

export default discover
