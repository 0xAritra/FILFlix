import mongoose from "mongoose"
import Content from "../../models/Content"
import * as PushAPI from "@pushprotocol/restapi"
import * as ethers from "ethers"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require("dotenv").config()

mongoose.connect(process.env.DB_URI, () => console.log("connected to mongodb"))

export default async function handler(req, res) {
  console.log(req.body)
  const content = await Content.create(JSON.parse(req.body))
  console.log(content)

  const PK = process.env.PRIVATE_KEY // channel private key
  const Pkey = `0x${PK}`
  const signer = new ethers.Wallet(Pkey)
  const apiResponse = await PushAPI.payloads.sendNotification({
    signer,
    type: 1, // broadcast
    identityType: 2, // direct payload
    notification: {
      title: `New Content ALERT!`,
      body: `New Content: ${content.name}`,
    },
    payload: {
      title: `New Content ALERT!`,
      body: req.body.description,
      cta: "",
      img: req.body.image,
    },
    channel: "eip155:5:0x9d05E4A9EC50acA799B6BF818ff7697108F7212A", // your channel address
    env: "staging",
  })

  res.status(200).json({ content })
}
