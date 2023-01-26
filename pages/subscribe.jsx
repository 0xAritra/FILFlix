import React from "react"

const subscribe = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8 max-w-sm">
        <div className="p-5 text-center h-full bg-[#08071B] rounded-xl">
          <img className="rounded-xl" src="/hero.jpg" alt="" />
          <div className="flex justify-around mt-2 items-center">
            <p className="text-[#0090ff] text-xl">2 FIL/MONTH</p>
            <button className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105">
              MINT
            </button>
          </div>
        </div>
      </div>

      <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8 max-w-sm">
        <div className="p-5 text-center h-full bg-[#08071B] rounded-xl">
          <img className="rounded-xl" src="/hero.jpg" alt="" />
          <div className="flex justify-evenly mt-2 items-center">
            <p className="text-[#0090ff] text-xl">20 FIL/YEAR</p>
            <button className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105">
              MINT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default subscribe
