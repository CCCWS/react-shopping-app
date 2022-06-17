const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductDataSchema = mongoose.Schema(
  {
    writer: {
      type: String,
      ref: "User",
    },

    title: {
      type: String,
      maxlength: 40,
    },

    price: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      maxlength: 2000,
    },

    category: {
      type: String,
    },

    image: {
      type: Array,
      default: [],
    },

    sold: {
      type: Number,
      defalut: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProductData = mongoose.model("ProductData", ProductDataSchema);

module.exports = { ProductData };
