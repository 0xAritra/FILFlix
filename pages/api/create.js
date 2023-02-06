import mongoose from "mongoose"
import Content from "../../models/Content"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require("dotenv").config()

mongoose.connect(process.env.DB_URI, () => console.log("connected to mongodb"))

export default async function handler(req, res) {
  console.log(req.body)
  const content = await Content.create(JSON.parse(req.body))
  console.log(content)
  res.status(200).json({ content })
}
