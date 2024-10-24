const mongoose = require("mongoose");

console.log("bleh");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  variants:{ type: [String], default: [] },
  prices:  { type: Object, 
  required: true },
  category: { type: String, required: true },
  //image: { type: String, required: true },
  description: { type: String, required: true },
  collection:{type: String},
  targetmarket:{type: String }
}, 
//{ timestamps: true,}
);

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    //user: {
      //type: mongoose.Schema.Types.ObjectId,
      //required: true,
      //ref: "User",
    //},
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema, "stocks");//here stock is db name and the itemModel is refernced in server.js
console.log('Item model created:', Item);


module.exports = Item;
