// ---------- CONFIG ----------
const CATEGORY_API = "http://localhost:3000/api/v1/categories";
const PRODUCT_API = "http://localhost:3000/api/v1/product";
const AUTH_TOKEN = ""; // e.g. "Bearer xxxx" if needed later

// ---------- DUMMY CATEGORIES ----------
const categories = [
  { name: "Flour & Atta", slug: "flour-atta" },
  { name: "Rice & Grains", slug: "rice-grains" },
  { name: "Pulses & Lentils", slug: "pulses-lentils" },
  { name: "Cooking Oil & Ghee", slug: "cooking-oil-ghee" },
  { name: "Spices & Masala", slug: "spices-masala" },
];

// ---------- DUMMY PRODUCT TEMPLATES (category assigned later by index) ----------
const productTemplates = [
  { name: "Premium Basmati Rice", brand: "Charminar", price: 1250, discountPrice: 1150, stock: 150, weight: "25 kg", color: "White", spec_type: "Rice", tags: ["rice", "basmati", "premium"], categoryIndex: 1 },
  { name: "Whole Wheat Atta", brand: "Aashirvaad", price: 550, discountPrice: 499, stock: 200, weight: "10 kg", color: "Brown", spec_type: "Flour", tags: ["atta", "wheat", "flour"], categoryIndex: 0 },
  { name: "Maida (Refined Flour)", brand: "Local Mill", price: 300, discountPrice: 280, stock: 180, weight: "5 kg", color: "White", spec_type: "Flour", tags: ["maida", "flour"], categoryIndex: 0 },
  { name: "Toor Dal", brand: "Tata Sampann", price: 620, discountPrice: 580, stock: 130, weight: "5 kg", color: "Yellow", spec_type: "Pulses", tags: ["dal", "pulses", "toor"], categoryIndex: 2 },
  { name: "Moong Dal", brand: "Tata Sampann", price: 640, discountPrice: 600, stock: 110, weight: "5 kg", color: "Yellow", spec_type: "Pulses", tags: ["dal", "moong"], categoryIndex: 2 },
  { name: "Chana Dal", brand: "Fortune", price: 480, discountPrice: 450, stock: 140, weight: "5 kg", color: "Yellow", spec_type: "Pulses", tags: ["dal", "chana"], categoryIndex: 2 },
  { name: "Sunflower Cooking Oil", brand: "Fortune", price: 890, discountPrice: 840, stock: 95, weight: "5 L", color: "Golden", spec_type: "Oil", tags: ["oil", "sunflower"], categoryIndex: 3 },
  { name: "Pure Cow Ghee", brand: "Amul", price: 720, discountPrice: 690, stock: 80, weight: "1 kg", color: "Yellow", spec_type: "Ghee", tags: ["ghee", "dairy"], categoryIndex: 3 },
  { name: "Mustard Oil", brand: "Dhara", price: 410, discountPrice: 390, stock: 100, weight: "2 L", color: "Dark Yellow", spec_type: "Oil", tags: ["oil", "mustard"], categoryIndex: 3 },
  { name: "Turmeric Powder", brand: "Everest", price: 120, discountPrice: 110, stock: 250, weight: "500 g", color: "Yellow", spec_type: "Spice", tags: ["spice", "turmeric", "haldi"], categoryIndex: 4 },
  { name: "Red Chilli Powder", brand: "MDH", price: 150, discountPrice: 135, stock: 220, weight: "500 g", color: "Red", spec_type: "Spice", tags: ["spice", "chilli"], categoryIndex: 4 },
  { name: "Garam Masala", brand: "MDH", price: 180, discountPrice: 165, stock: 160, weight: "200 g", color: "Brown", spec_type: "Spice", tags: ["spice", "masala"], categoryIndex: 4 },
  { name: "Basmati Rice (Economy)", brand: "India Gate", price: 950, discountPrice: 890, stock: 175, weight: "10 kg", color: "White", spec_type: "Rice", tags: ["rice", "economy"], categoryIndex: 1 },
  { name: "Sona Masoori Rice", brand: "Local Mill", price: 780, discountPrice: 730, stock: 190, weight: "10 kg", color: "White", spec_type: "Rice", tags: ["rice", "sona masoori"], categoryIndex: 1 },
  { name: "Multigrain Atta", brand: "Aashirvaad", price: 610, discountPrice: 570, stock: 140, weight: "10 kg", color: "Brown", spec_type: "Flour", tags: ["atta", "multigrain"], categoryIndex: 0 },
];

// ---------- HELPERS ----------
const authHeaders = AUTH_TOKEN ? { Authorization: AUTH_TOKEN } : {};

// Downloads a placeholder image and returns it as a Blob, ready to attach to FormData
async function getPlaceholderImageBlob(text) {
  const res = await fetch(`https://placehold.co/400x400.png?text=${encodeURIComponent(text)}`);
  const arrayBuffer = await res.arrayBuffer();
  return new Blob([arrayBuffer], { type: "image/png" });
}

function slugifyFilename(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ---------- CREATE CATEGORIES ----------
async function createCategories() {
  const createdIds = [];

  for (const [i, cat] of categories.entries()) {
    try {
      const imageBlob = await getPlaceholderImageBlob(cat.name);

      const formData = new FormData();
      formData.append("name", cat.name);
      formData.append("slug", cat.slug);
      formData.append("image", imageBlob, `${cat.slug}.png`);

      const res = await fetch(CATEGORY_API, {
        method: "POST",
        headers: authHeaders,
        body: formData,
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error(`❌ Category failed [${i + 1}] ${cat.name}: ${res.status} ${res.statusText}`);
        console.error(`   → Server said: ${errBody}`);

        // If it already exists, look it up instead of leaving the id null
        if (errBody.includes("already exists")) {
          try {
            const listRes = await fetch(CATEGORY_API);
            const listData = await listRes.json();
            const existing = (listData.categories || listData.data || []).find(
              (c) => c.slug === cat.slug || c.name === cat.name
            );
            if (existing) {
              console.log(`   ↪ Reusing existing category id: ${existing._id}`);
              createdIds.push(existing._id);
              continue;
            }
          } catch (lookupErr) {
            console.error(`   → Could not look up existing category:`, lookupErr.message);
          }
        }

        createdIds.push(null);
        continue;
      }

      const data = await res.json();
      const id = data.category?._id || data._id;
      console.log(`✅ Category created: ${cat.name} (id: ${id})`);
      createdIds.push(id);
    } catch (err) {
      console.error(`❌ Error creating category ${cat.name}:`, err.message);
      createdIds.push(null);
    }
  }

  return createdIds;
}

// ---------- CREATE PRODUCTS ----------
async function createProducts(categoryIds) {
  for (const [i, tpl] of productTemplates.entries()) {
    const categoryId = categoryIds[tpl.categoryIndex];

    if (!categoryId) {
      console.error(`⏭️ Skipping ${tpl.name} — missing category id`);
      continue;
    }

    try {
      const imageBlob1 = await getPlaceholderImageBlob(tpl.name);
      const imageBlob2 = await getPlaceholderImageBlob(`${tpl.name} 2`);
      const filenameBase = slugifyFilename(tpl.name);

      const formData = new FormData();
      formData.append("name", tpl.name);
      formData.append("category", categoryId);
      formData.append("brand", tpl.brand);
      formData.append("description", `${tpl.name} - high quality, ideal for daily household use.`);

      // Flat fields — matches backend Zod schema (price, stock, stockStatus, weight, color, spec_type)
      formData.append("price", tpl.price);
      formData.append("discountPrice", tpl.discountPrice);
      formData.append("stock", tpl.stock);
      formData.append("stockStatus", "Available");
      formData.append("weight", tpl.weight);
      formData.append("color", tpl.color);
      formData.append("spec_type", tpl.spec_type);
      formData.append("tags", JSON.stringify(tpl.tags));
      formData.append("isFeatured", Math.random() > 0.7 ? "true" : "false");

      // Multiple images — adjust field name if your route uses something other than "images"
      formData.append("images", imageBlob1, `${filenameBase}-1.png`);
      formData.append("images", imageBlob2, `${filenameBase}-2.png`);

      const res = await fetch(PRODUCT_API, {
        method: "POST",
        headers: authHeaders,
        body: formData,
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error(`❌ Product failed [${i + 1}] ${tpl.name}: ${res.status} ${res.statusText}`);
        console.error(`   → Server said: ${errBody}`);
        continue;
      }

      const data = await res.json();
      const id = data.product?._id || data._id;
      console.log(`✅ Product created [${i + 1}] ${tpl.name} (id: ${id})`);
    } catch (err) {
      console.error(`❌ Error creating product ${tpl.name}:`, err.message);
    }
  }
}

// ---------- RUN ----------
(async () => {
  console.log("🚀 Creating categories...");
  const categoryIds = await createCategories();

  console.log("🚀 Creating products...");
  await createProducts(categoryIds);

  console.log("🎉 Done!");
})();