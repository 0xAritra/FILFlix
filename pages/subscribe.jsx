import { SUBSCRIPTION_LIFETIME_ADDRESS, SUBSCRIPTION_LIFETIME_ADDRESS_ABI } from "@/constants"
import { parseEther } from "ethers/lib/utils.js"
import React from "react"
import { useContractWrite, usePrepareContractWrite } from "wagmi"

const subscribe = () => {
  const { config } = usePrepareContractWrite({
    address: SUBSCRIPTION_LIFETIME_ADDRESS,
    abi: SUBSCRIPTION_LIFETIME_ADDRESS_ABI,
    functionName: "safeMint",
    overrides: {
      value: parseEther("0.75"),
    },
  })

  const { write } = useContractWrite(config)

  return (
    <div className="flex items-center justify-center">
      <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8 max-w-sm">
        <div className="p-5 text-center h-full bg-[#08071B] rounded-xl">
          <img className="border-white border-2 rounded-xl" src="/ff-monthly.jpg" alt="" />
          <div className="flex justify-around mt-2 items-center">
            <p className="text-[#0090ff] text-xl">0.1 FIL/MONTH</p>
            <button
              className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105"
              onClick={() => write?.()}
            >
              MINT
            </button>
          </div>
        </div>
      </div>

      <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8 max-w-sm">
        <div className="p-5 text-center h-full bg-[#08071B] rounded-xl">
          <img className="border-white border-2 rounded-xl" src="/ff-lifetime.jpg" alt="" />
          <div className="flex justify-evenly mt-2 items-center">
            <p className="text-[#0090ff] text-xl">0.75 FIL / Lifetime</p>
            <button
              className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105"
              onClick={() => write?.()}
            >
              MINT
            </button>
          </div>
        </div>
      </div>

      <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8 max-w-sm">
        <div className="p-5 text-center h-full bg-[#08071B] rounded-xl">
          <img className="border-white border-2 rounded-xl" src="/ff-yearly.jpg" alt="" />
          <div className="flex justify-evenly mt-2 items-center">
            <p className="text-[#0090ff] text-xl">0.5 FIL/YEAR</p>
            <button
              className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105"
              onClick={() => write?.()}
            >
              MINT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default subscribe
