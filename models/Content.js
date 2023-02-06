const { Schema, model, models } = require("mongoose")

const contentSchema = Schema(
  {
    tokenId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    supply: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = models.Content || model("Content", contentSchema)
