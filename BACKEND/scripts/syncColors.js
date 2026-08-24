const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { Product } = require("../server/models/Product");

async function run() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.log("No MongoDB URI found in environment, skipping DB direct update");
    return;
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB for updating color variants...");

  const dataFilePath = path.join(__dirname, "../../client/src/data/productsData.js");
  const fileContent = fs.readFileSync(dataFilePath, "utf8");

  const productsMatch = fileContent.match(/export\s+const\s+PRODUCTS\s*=\s*(\[[\s\S]*?\]);\s*$/);
  if (!productsMatch) {
    console.error("Could not parse products");
    process.exit(1);
  }

  const staticProducts = JSON.parse(productsMatch[1]);
  const p764 = staticProducts.find(p => p.code === "764");
  const p971 = staticProducts.find(p => p.code === "971");

  if (p764) {
    const res764 = await Product.updateMany(
      {
        $or: [
          { code: { $regex: /764/i } },
          { id: { $regex: /764/i } },
          { name: { $regex: /764/i } },
          { description: { $regex: /764/i } },
          { subtitle: { $regex: /6 Colors/i } }
        ]
      },
      {
        $set: {
          image: p764.image,
          colors: p764.colors,
          images: p764.images
        }
      }
    );
    console.log("Updated 764 in DB:", res764);
  }

  if (p971) {
    const res971 = await Product.updateMany(
      { $or: [{ code: "971" }, { name: { $regex: /971/i } }] },
      {
        $set: {
          image: p971.image,
          colors: p971.colors,
          images: p971.images
        }
      }
    );
    console.log("Updated 971 in DB:", res971);
  }

  await mongoose.disconnect();
  console.log("Done!");
}

run().catch(console.error);
