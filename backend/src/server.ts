// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import multer from "multer";
// import fs from "fs";
// import dotenv from "dotenv";

// import Product from "./models/Product";

// dotenv.config();

// const app = express();
// app.use(
//   cors({
//     origin: "*",
//   }),
// );
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => console.log("MongoDB connected"));

// // ADMIN CHECK
// const adminAuth = (req: any, res: any, next: any) => {
//   if (req.headers.key !== process.env.ADMIN_KEY) {
//     return res.status(403).send("Unauthorized");
//   }
//   next();
// };

// // MULTER
// const upload = multer({ dest: "src/uploads/" });

// // GET
// app.get("/products", async (req, res) => {
//   const data = await Product.find();
//   res.json(data);
// });

// // ADD PRODUCT
// app.post("/products", adminAuth, upload.single("image"), async (req, res) => {
//   try {
//     const filePath = req.file?.path as string;

//     // convert image → base64
//     const file = fs.readFileSync(filePath);
//     const base64 = file.toString("base64");

//     // save to DB
//     const product = await Product.create({
//       name: req.body.name,
//       price: req.body.price,
//       category: req.body.category,
//       image: `data:image/png;base64,${base64}`,
//     });

//     // DELETE FILE AFTER SAVE ✅
//     fs.unlinkSync(filePath);

//     res.json(product);
//   } catch (err) {
//     res.status(500).send("Error");
//   }
// });

// // DELETE
// app.delete("/products/:id", adminAuth, async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.send("Deleted");
// });

// // EDIT
// app.put("/products/:id", adminAuth, async (req, res) => {
//   await Product.findByIdAndUpdate(req.params.id, req.body);
//   res.send("Updated");
// });

// app.listen(process.env.PORT, () => console.log("Server running"));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Product from "./models/Product";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// DB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"));

// ADMIN CHECK
const adminAuth = (req: any, res: any, next: any) => {
  if (req.headers.key !== process.env.ADMIN_KEY) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

// MULTER
const upload = multer({ dest: "uploads/" });

/* =========================
   GET PRODUCTS
========================= */
app.get("/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

/* =========================
   ADD PRODUCT
========================= */
app.post("/products", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file?.path as string;

    // ✅ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "products",
    });

    // ✅ Save DB (IMPORTANT)
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url, // 🔥 USE URL
      public_id: result.public_id, // 🔥 FOR DELETE
    });

    // ✅ Delete local file
    fs.unlinkSync(filePath);

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error uploading");
  }
});

/* =========================
   DELETE PRODUCT
========================= */
app.delete("/products/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product?.public_id) {
      // ✅ delete from Cloudinary
      await cloudinary.uploader.destroy(product.public_id);
    }

    const result = await Product.findByIdAndDelete(req.params.id);

    res.send(result);
  } catch (err) {
    res.status(500).send("Error deleting");
  }
});

/* =========================
   UPDATE PRODUCT
========================= */
app.put("/products/:id", adminAuth, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

app.listen(process.env.PORT, () => console.log("Server running"));
