import React from "react"

const Card = ({ props }) => {
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
          <button className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105">
            MINT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
