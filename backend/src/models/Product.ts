// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   category: String,
//   image: String, // base64
// });

// export default mongoose.model("Product", ProductSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  public_id: String, // 🔥 IMPORTANT
});

export default mongoose.model("Product", productSchema);
