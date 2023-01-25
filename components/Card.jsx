import React from "react"

const Card = () => {
  return (
    <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8 max-w-sm">
      <div className="p-5 text-center h-full bg-[#08071B] rounded-xl">
        <img
          className="mb-4"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Filecoin.svg/1200px-Filecoin.svg.png"
          alt=""
        />
        <h3 className="text-xl uppercase my-2 font-bold">Title</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente aspernatur dicta tempora
          nihil quisquam reiciendis nesciunt voluptas expedita! Iure repellat?
        </p>
        <div className="flex my-5 items-center justify-evenly">
          <p className="text-[#0090ff] text-xl">1 FIL</p>
          <button className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105">
            MINT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
