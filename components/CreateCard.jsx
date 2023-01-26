import { useState } from "react"
// import { FileUploader } from "react-drag-drop-files"
import lighthouse from "@lighthouse-web3/sdk"
import { ethers } from "ethers"

const CreateCard = () => {
  // const fileTypes = ["MP3", "MP4", "FLV", "MKV", "JPEG", "JPG", "PNG", "GIF", "PDF"]
  const imgTypes = ["JPEG", "JPG", "PNG", "GIF"]

  const [file, setFile] = useState(null)
  const [ext, setExt] = useState(null)
  const [file1, setFile1] = useState(null)
  const [nft, setNft] = useState(null)
  const [content, setContent] = useState(null)

  // const handleChange = (file) => {
  // console.log(file)
  // setExt(file.name.split(".").pop().toLowerCase())
  // setFile(file)
  // }

  // const handleChange1 = (file1) => {
  //   console.log(file1)
  //   setFile1(file1)
  // }

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
    console.log(response)
    console.log("https://files.lighthouse.storage/viewFile/" + response.data.Hash)
    setContent("https://files.lighthouse.storage/viewFile/" + response.data.Hash)
  }

  return (
    <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8">
      <div className="p-5 flex text-center justify-around items-center h-full bg-[#08071B] rounded-xl">
        <form className="m-4" onSubmit={(e) => e.preventDefault()}>
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
              />
              <br />
              <textarea
                className="py-4 min-w-[25rem] p-4 rounded-lg border-[#0090ff] border-4"
                placeholder="Description"
                type="text"
                name="description"
                id="description"
                required={true}
              />
              <br />
              <input
                type="number"
                className="py-4 min-w-[25rem] p-4 rounded-lg border-[#0090ff] border-4"
                placeholder="Set Price (FIL)"
                name="price"
                id="price"
                required={true}
              />{" "}
              <br />
              <input
                type="number"
                className="py-4 min-w-[25rem] p-4 rounded-lg border-[#0090ff] border-4"
                placeholder="Set Supply"
                name="supply"
                id="supply"
                required={true}
              />{" "}
              <br />
              <button className="text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105">
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
