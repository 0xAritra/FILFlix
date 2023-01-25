import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"

const CreateCard = () => {
  const fileTypes = ["MP3", "MP4", "FLV", "MKV", "JPEG", "JPG", "PNG", "GIF", "PDF"]
  const imgTypes = ["JPEG", "JPG", "PNG", "GIF"]

  const [file, setFile] = useState(null)
  const [ext, setExt] = useState(null)
  const [file1, setFile1] = useState(null)
  const handleChange = (file) => {
    console.log(file)
    setExt(file.name.split(".").pop().toLowerCase())
    setFile(file)
  }

  const handleChange1 = (file1) => {
    console.log(file1)
    setFile1(file1)
  }

  return (
    <div className="p-1 bg-gradient-to-r from-[#0090ff] to-[#E50914] rounded-xl m-8">
      <div className="p-5 flex text-center justify-around items-center h-full bg-[#08071B] rounded-xl">
        <form className="m-4" onSubmit={(e) => e.preventDefault()}>
          {/* Step - 1 */}
          <div className="m-4">
            <h2 className="underline text-xl">Step 1: Upload File</h2>
            <div className="file-upload">
              <FileUploader
                multiple={false}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
            </div>
            <p className="my-2">{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
            {(ext === "mp4" || ext === "flv" || ext === "mkv") && (
              <video
                controls
                className="mx-auto max-w-[500px]"
                src={URL.createObjectURL(file)}
              ></video>
            )}
            {imgTypes.includes(ext?.toUpperCase()) && (
              <img className="max-w-[500px] mx-auto" src={URL.createObjectURL(file)} alt="" />
            )}
            {ext === "mp3" && (
              <audio className="mx-auto" src={URL.createObjectURL(file)} controls />
            )}
            {ext === "pdf" && (
              <a
                className="mx-auto block underline"
                href={URL.createObjectURL(file)}
                target="_blank"
              >
                Open PDF
              </a>
            )}
            <button className="my-2 text-white bg-[#E50914] rounded-lg px-6 py-2 transform hover:scale-105">
              Upload.
            </button>
          </div>

          {/* Step - 2 */}
          <div className="text-center">
            <h2 className="underline text-xl my-4">Step 2: Mint NFT</h2>
            <h3>add preview/cover image:</h3>
            <div className="img-file m-4 text-black space-y-4 mx-auto">
              <FileUploader
                multiple={false}
                handleChange={handleChange1}
                name="file1"
                types={imgTypes}
              />
              <p className="text-white">
                {file1 ? `File name: ${file1.name}` : "no files uploaded yet"}
              </p>
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
