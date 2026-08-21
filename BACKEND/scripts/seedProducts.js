const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { Product } = require("../server/models/Product");

// Read PRODUCTS array from client/src/data/productsData.js
async function seed() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error("No MongoDB URI found in environment!");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB for Product Seeding...");

  // Load products data
  const dataFilePath = path.join(__dirname, "../../client/src/data/productsData.js");
  const fileContent = fs.readFileSync(dataFilePath, "utf8");

  // Extract JSON array after `export const PRODUCTS = [`
  const productsMatch = fileContent.match(/export\s+const\s+PRODUCTS\s*=\s*(\[[\s\S]*?\]);\s*$/);
  if (!productsMatch) {
    console.error("Could not parse PRODUCTS from productsData.js");
    process.exit(1);
  }

  const products = JSON.parse(productsMatch[1]);
  console.log(`Found ${products.length} products to seed.`);

  let inserted = 0;
  let updated = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    p.order = i + 1;
    if (!p.id) {
      p.id = `prod-${p.code || i}`;
    }

    const existing = await Product.findOne({ id: p.id });
    if (existing) {
      Object.assign(existing, p);
      await existing.save();
      updated++;
    } else {
      await Product.create(p);
      inserted++;
    }
  }

  const total = await Product.countDocuments();
  console.log(`✅ Seeding Complete! Inserted: ${inserted}, Updated: ${updated}, Total in DB: ${total}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
