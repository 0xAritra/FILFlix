import { useEffect, useState } from "react"
// import { FileUploader } from "react-drag-drop-files"
import lighthouse from "@lighthouse-web3/sdk"
import { ethers } from "ethers"
import { prepareWriteContract, readContract, writeContract } from "@wagmi/core"
import { CREATOR_ADDRESS, CREATOR_ABI } from "@/constants"

//
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}
//

const CreateCard = () => {
  // const fileTypes = ["MP3", "MP4", "FLV", "MKV", "JPEG", "JPG", "PNG", "GIF", "PDF"]
  const imgTypes = ["JPEG", "JPG", "PNG", "GIF"]

  const [file, setFile] = useState(null)
  const [ext, setExt] = useState(null)
  const [file1, setFile1] = useState(null)
  const [nft, setNft] = useState(null)
  const [content, setContent] = useState(null)
  const [nftMetadata, setNftMetadata] = useState({
    tokenId: null,
    name: "",
    description: "",
    image: "",
    price: "",
    supply: "",
    content: "",
  })
  const debouncedPrice = useDebounce(nftMetadata.price)
  const debouncedSupply = useDebounce(nftMetadata.supply)
  // const handleChange = (file) => {
  // console.log(file)
  // setExt(file.name.split(".").pop().toLowerCase())
  // setFile(file)
  // }

  // const handleChange1 = (file1) => {
  //   console.log(file1)
  //   setFile1(file1)
  // }

  useEffect(() => {
    getTokenId()
  }, [])

  const applyAccessConditions = async () => {
    const cid = content.substring(content.lastIndexOf("/") + 1)

    const conditions = [
      {
        id: 1,
        chain: "Hyperspace",
        method: "balanceOf",
        standardContractType: "ERC721",
        contractAddress: "0x0Ef8BdC587CB444F66ed1f60DeD94d1d6F0fC128",
        returnValueTest: { comparator: ">=", value: "1" },
        parameters: [":userAddress"],
      },
    ]

    const aggregator = "([1])"
    const { publicKey, signedMessage } = await encryptionSignature()

    const response = await lighthouse.accessCondition(
      publicKey,
      cid,
      signedMessage,
      conditions,
      aggregator
    )

    console.log(response)
  }

  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message
    const signedMessage = await signer.signMessage(messageRequested)
    return {
      signedMessage: signedMessage,
      publicKey: address,
    }
  }

  const progressCallback = (progressData) => {
    let percentageDone = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
    console.log(percentageDone)
  }

  const deploy = async (e) => {
    //
    console.log(e.target.files[0])
    setFile1(e.target.files[0])
    // Push file to lighthouse node
    const output = await lighthouse.upload(
      e,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
      progressCallback
    )
    console.log("File Status:", output)
    setNft("https://gateway.lighthouse.storage/ipfs/" + output.data.Hash)
    console.log("Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash)
    setNftMetadata((prevNftMetadata) => ({
      ...prevNftMetadata,
      image: "https://gateway.lighthouse.storage/ipfs/" + output.data.Hash,
    }))
  }

  /* Deploy file along with encryption */
  const deployEncrypted = async (e) => {
    //
    console.log(e.target.files[0])
    setExt(e.target.files[0].name.split(".").pop().toLowerCase())
    setFile(e.target.files[0])
    //
    const sig = await encryptionSignature()
    const response = await lighthouse.uploadEncrypted(
      e,
      sig.publicKey,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
      sig.signedMessage,
      progressCallback
    )
    // console.log(response)
    console.log("https://files.lighthouse.storage/viewFile/" + response.data.Hash)
    setContent("https://files.lighthouse.storage/viewFile/" + response.data.Hash)
    setNftMetadata((prevNftMetadata) => ({
      ...prevNftMetadata,
      content: "https://files.lighthouse.storage/viewFile/" + response.data.Hash,
    }))
  }

  const getTokenId = async () => {
    const data = await readContract({
      address: CREATOR_ADDRESS,
      abi: CREATOR_ABI,
      functionName: "tokenId",
      chainId: 3141,
    })
    setNftMetadata((prevNftMetadata) => ({ ...prevNftMetadata, tokenId: Number(data) }))
  }

  const mintNft = async () => {
    try {
      // console.log(nftMetadata)

      await applyAccessConditions()
      // mint

      const config = await prepareWriteContract({
        mode: "recklesslyUnprepared",
        address: CREATOR_ADDRESS,
        abi: CREATOR_ABI,
        functionName: "create",
        args: [debouncedPrice.toString(), debouncedSupply.toString()],
      })

      const { hash } = await writeContract(config)
      //
      console.log(JSON.stringify(nftMetadata))

      fetch("http://localhost:3000/api/create", {
        method: "post",
        body: JSON.stringify(nftMetadata),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onInput = (e) => {
    setNftMetadata((prevNftMetadata) => ({ ...prevNftMetadata, [e.target.name]: e.target.value }))
  }

  return (
    <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8">
      <div className="p-5 flex text-center justify-around items-center h-full bg-[#08071B] rounded-xl">
        <form
          action="/api/create"
          className="m-4"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {/* Step - 1 */}
          <div className="m-4">
            <h2 className="underline text-xl">Step 1: Upload File</h2>
            <div className="file-upload text-center">
              <label
                htmlFor="file"
                style={{
                  background: "#E50914",
                  padding: "0.5rem 1rem",
                  color: "white",
                  borderRadius: "0.3rem",
                  cursor: "pointer",
                }}
              >
                Upload Content
              </label>
              {/* <FileUploader
              multiple={false}
              handleChange={(e) => deployEncrypted(e)}
              name="file"
              types={fileTypes}
            /> */}
              <input
                onChange={deployEncrypted}
                type="file"
                name="file"
                id="file"
                className="hidden"
              />
            </div>
            <p className="my-2">{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
            {content && (
              <a className="text-white underline" href={content}>
                {content}
              </a>
            )}
            {(ext === "mp4" || ext === "flv" || ext === "mkv") && (
              <video
                controls
                className="mx-auto max-w-[500px]"
                src={URL.createObjectURL(file)}
              ></video>
            )}
            {imgTypes.includes(ext?.toUpperCase()) && (
              <img className="max-w-[500px] mx-auto m-4" src={URL.createObjectURL(file)} alt="" />
            )}
            {ext === "mp3" && (
              <audio className="mx-auto" src={URL.createObjectURL(file)} controls />
            )}
            {ext === "pdf" && (
              <a
                className="mx-auto block underline my-4"
                href={URL.createObjectURL(file)}
                target="_blank"
              >
                Preview PDF
              </a>
            )}
            {/* <button className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105">
            Upload.
          </button> */}
          </div>
          <hr className="my-16" />
          {/* Step - 2 */}
          <div className="text-center">
            <h2 className="underline text-xl my-4">Step 2: Mint NFT</h2>
            <h3>add preview/cover image:</h3>
            <div className="img-file m-4 text-black space-y-4 mx-auto">
              {/*  */}
              <label
                htmlFor="file1"
                style={{
                  background: "#E50914",
                  padding: "0.5rem 1rem",
                  color: "white",
                  borderRadius: "0.3rem",
                  cursor: "pointer",
                }}
              >
                Upload NFT Image
              </label>
              <input
                className="text-white text-center hidden"
                name="file1"
                type="file"
                onChange={deploy}
                id="file1"
              />{" "}
              <br />
              {/* <FileUploader
                multiple={false}
                handleChange={handleChange1}
                name="file1"
                types={imgTypes}
              /> */}
              <p className="text-white">
                {file1 ? `File name: ${file1.name}` : "no files uploaded yet"}
              </p>
              {nft && (
                <a className="text-white underline" href={nft}>
                  {nft}
                </a>
              )}
              {file1 && (
                <img className="max-w-[500px] mx-auto" src={URL.createObjectURL(file1)} alt="" />
              )}
              <input
                className="py-4 min-w-[25rem] p-4 rounded-lg border-[#0090ff] border-4"
                placeholder="Name"
                type="text"
                name="name"
                id="name"
                required={true}
                value={nftMetadata.name}
                onChange={onInput}
              />
              <br />
              <textarea
                className="py-4 min-w-[25rem] p-4 rounded-lg border-[#0090ff] border-4"
                placeholder="Description"
                type="text"
                name="description"
                id="description"
                required={true}
                value={nftMetadata.description}
                onChange={onInput}
              />
              <br />
              <input
                type="number"
                className="py-4 min-w-[25rem] p-4 rounded-lg border-[#0090ff] border-4"
                placeholder="Set Price (FIL)"
                name="price"
                id="price"
                required={true}
                onChange={onInput}
                value={nftMetadata.price}
              />{" "}
              <br />
              <input
                type="number"
                className="py-4 min-w-[25rem] p-4 rounded-lg border-[#0090ff] border-4"
                placeholder="Set Supply"
                name="supply"
                id="supply"
                required={true}
                onChange={onInput}
                value={nftMetadata.supply}
              />{" "}
              <br />
              <button
                type="submit"
                onClick={mintNft}
                className="text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105"
              >
                Mint.
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCard
