import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"

const Header = () => {
  return (
    <div className="pb-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] sticky top-0 z-10">
      <div className="p-5 flex justify-around items-center h-full bg-[#08071B]">
        <h1 className="text-3xl text-[#0090ff]">
          <Link href={"/"}>
            FIL<span className="text-[#E50914]">Flix</span>
          </Link>
        </h1>
        <ul className="flex space-x-5">
          <li className="text-[#E50914] hover:underline">
            <Link href={"/discover"}>/ discover</Link>
          </li>
          <li className="text-[#E50914] hover:underline">
            <Link href={"/library"}>/ library</Link>
          </li>
          <li className="text-[#E50914] hover:underline">
            <Link href={"/subscribe"}>/ subscribe</Link>
          </li>
          <li className="text-[#E50914] hover:underline">
            <Link href={"/meet"}>/ meet</Link>
          </li>
          <li className="text-[#0090ff] hover:underline">
            <Link href={"/create"}>/ create</Link>
          </li>
        </ul>
        <ConnectButton />
      </div>
    </div>
  )
}

export default Header
