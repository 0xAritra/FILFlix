import React from "react"
import { CREATOR_ABI, CREATOR_ADDRESS } from "@/constants"
import { prepareWriteContract, writeContract } from "@wagmi/core"
import { utils } from "ethers"

const Card = ({ props }) => {
  const onClick = async () => {
    try {
      const tokenId = props.tokenId
      const price = utils.parseEther(props.price)
      const config = await prepareWriteContract({
        mode: "recklesslyUnprepared",
        address: CREATOR_ADDRESS,
        abi: CREATOR_ABI,
        functionName: "mint",
        args: [tokenId],
        overrides: {
          value: price,
        },
      })

      const { hash } = await writeContract(config)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8 max-w-sm">
      <div className="p-5 text-center h-full bg-[#08071B] rounded-xl">
        <img className="mb-4" src={props.image} alt="" />
        <h3 className="text-xl uppercase my-2 font-bold">{props.name}</h3>
        <p>{props.description}</p>

        <div className="flex my-5 items-center justify-evenly">
          <div>
            <p className="text-[#0090ff] text-xl">{props.price} FIL</p>
            <p className="text-[#0090ff]">Supply: {props.supply}</p>
          </div>
          <button
            className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105"
            onClick={onClick}
          >
            MINT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
