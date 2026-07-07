// ---------- CONFIG ----------
const CATEGORY_API = "http://localhost:3000/api/v1/categories";
const PRODUCT_API = "http://localhost:3000/api/v1/product";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjY4ZDg4NzQ0MGE3OTRmOGNjMGI4MSIsImlhdCI6MTc4MzQwODczNiwiZXhwIjoxNzgzNDk1MTM2fQ.uwSX0upntcaTa9728RfAS9Z9oKei2RAVVPXdS8j65U4"; // e.g. "Bearer xxxx" if needed later

// ---------- DUMMY CATEGORIES ----------
const categories = [
  {
    name: "Flour & Atta",
    slug: "flour-atta",
  },
  {
    name: "Rice & Grains",
    slug: "rice-grains",
  },
  {
    name: "Pulses & Lentils",
    slug: "pulses-lentils",
  },
  {
    name: "Cooking Oil & Ghee",
    slug: "cooking-oil-ghee",
  },
  {
    name: "Spices & Masala",
    slug: "spices-masala",
  },
  {
    name: "Dry Fruits",
    slug: "dry-fruits",
  },
  {
    name: "Tea & Coffee",
    slug: "tea-coffee",
  },
  {
    name: "Sugar & Salt",
    slug: "sugar-salt",
  },
];

// ---------- DUMMY PRODUCT TEMPLATES (category assigned later by index) ----------
const productTemplates = [
  {
    name: "Premium Basmati Rice",
    brand: "India Gate",
    price: 1250,
    discountPrice: 1149,
    stock: 150,
    weight: "25 Kg",
    color: "White",
    spec_type: "Rice",
    tags: ["rice", "basmati", "premium"],
    categoryIndex: 1,
  },
  {
    name: "Sona Masoori Rice",
    brand: "Daawat",
    price: 920,
    discountPrice: 849,
    stock: 170,
    weight: "10 Kg",
    color: "White",
    spec_type: "Rice",
    tags: ["rice", "sona"],
    categoryIndex: 1,
  },
  {
    name: "Whole Wheat Atta",
    brand: "Aashirvaad",
    price: 560,
    discountPrice: 510,
    stock: 220,
    weight: "10 Kg",
    color: "Brown",
    spec_type: "Atta",
    tags: ["atta", "wheat"],
    categoryIndex: 0,
  },
  {
    name: "Multigrain Atta",
    brand: "Fortune",
    price: 650,
    discountPrice: 599,
    stock: 120,
    weight: "10 Kg",
    color: "Brown",
    spec_type: "Atta",
    tags: ["multigrain", "atta"],
    categoryIndex: 0,
  },
  {
    name: "Toor Dal",
    brand: "Tata Sampann",
    price: 690,
    discountPrice: 650,
    stock: 120,
    weight: "5 Kg",
    color: "Yellow",
    spec_type: "Dal",
    tags: ["dal", "toor"],
    categoryIndex: 2,
  },
  {
    name: "Moong Dal",
    brand: "Fortune",
    price: 640,
    discountPrice: 599,
    stock: 110,
    weight: "5 Kg",
    color: "Yellow",
    spec_type: "Dal",
    tags: ["dal", "moong"],
    categoryIndex: 2,
  },
  {
    name: "Chana Dal",
    brand: "24 Mantra",
    price: 520,
    discountPrice: 489,
    stock: 130,
    weight: "5 Kg",
    color: "Yellow",
    spec_type: "Dal",
    tags: ["dal", "chana"],
    categoryIndex: 2,
  },
  {
    name: "Sunflower Oil",
    brand: "Fortune",
    price: 980,
    discountPrice: 930,
    stock: 90,
    weight: "5 L",
    color: "Golden",
    spec_type: "Oil",
    tags: ["oil", "sunflower"],
    categoryIndex: 3,
  },
  {
    name: "Mustard Oil",
    brand: "Dhara",
    price: 540,
    discountPrice: 499,
    stock: 105,
    weight: "2 L",
    color: "Golden",
    spec_type: "Oil",
    tags: ["oil", "mustard"],
    categoryIndex: 3,
  },
  {
    name: "Pure Cow Ghee",
    brand: "Amul",
    price: 780,
    discountPrice: 739,
    stock: 80,
    weight: "1 Kg",
    color: "Yellow",
    spec_type: "Ghee",
    tags: ["ghee", "cow"],
    categoryIndex: 3,
  },
  {
    name: "Turmeric Powder",
    brand: "Everest",
    price: 140,
    discountPrice: 129,
    stock: 250,
    weight: "500 g",
    color: "Yellow",
    spec_type: "Spice",
    tags: ["turmeric", "haldi"],
    categoryIndex: 4,
  },
  {
    name: "Red Chilli Powder",
    brand: "MDH",
    price: 170,
    discountPrice: 155,
    stock: 210,
    weight: "500 g",
    color: "Red",
    spec_type: "Spice",
    tags: ["chilli", "spice"],
    categoryIndex: 4,
  },
  {
    name: "Garam Masala",
    brand: "Catch",
    price: 190,
    discountPrice: 175,
    stock: 180,
    weight: "200 g",
    color: "Brown",
    spec_type: "Spice",
    tags: ["masala"],
    categoryIndex: 4,
  },
  {
    name: "Premium Cashew",
    brand: "Nutraj",
    price: 960,
    discountPrice: 899,
    stock: 70,
    weight: "1 Kg",
    color: "Cream",
    spec_type: "Dry Fruit",
    tags: ["cashew"],
    categoryIndex: 5,
  },
  {
    name: "California Almonds",
    brand: "Nutraj",
    price: 890,
    discountPrice: 839,
    stock: 90,
    weight: "1 Kg",
    color: "Brown",
    spec_type: "Dry Fruit",
    tags: ["almond"],
    categoryIndex: 5,
  },
  {
    name: "Premium Raisins",
    brand: "Tulsi",
    price: 420,
    discountPrice: 389,
    stock: 100,
    weight: "500 g",
    color: "Golden",
    spec_type: "Dry Fruit",
    tags: ["raisins"],
    categoryIndex: 5,
  },
  {
    name: "Premium Tea",
    brand: "Taj Mahal",
    price: 620,
    discountPrice: 579,
    stock: 120,
    weight: "1 Kg",
    color: "Black",
    spec_type: "Tea",
    tags: ["tea"],
    categoryIndex: 6,
  },
  {
    name: "Instant Coffee",
    brand: "Nescafe",
    price: 510,
    discountPrice: 479,
    stock: 130,
    weight: "500 g",
    color: "Brown",
    spec_type: "Coffee",
    tags: ["coffee"],
    categoryIndex: 6,
  },
  {
    name: "Refined Sugar",
    brand: "Madhur",
    price: 280,
    discountPrice: 259,
    stock: 240,
    weight: "5 Kg",
    color: "White",
    spec_type: "Sugar",
    tags: ["sugar"],
    categoryIndex: 7,
  },
  {
    name: "Rock Salt",
    brand: "Tata",
    price: 90,
    discountPrice: 79,
    stock: 300,
    weight: "1 Kg",
    color: "Pink",
    spec_type: "Salt",
    tags: ["salt", "rock salt"],
    categoryIndex: 7,
  },
];

// ---------- HELPERS ----------
const authHeaders = AUTH_TOKEN ? { Authorization: AUTH_TOKEN } : {};

// Downloads a placeholder image and returns it as a Blob, ready to attach to FormData
async function getPlaceholderImageBlob(text) {
  const res = await fetch(
    `https://placehold.co/400x400.png?text=${encodeURIComponent(text)}`,
    
  );
  const arrayBuffer = await res.arrayBuffer();
  return new Blob([arrayBuffer], { type: "image/png" });
}

function slugifyFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
        console.error(
          `❌ Category failed [${i + 1}] ${cat.name}: ${res.status} ${res.statusText}`,
        );
        console.error(`   → Server said: ${errBody}`);

        // If it already exists, look it up instead of leaving the id null
        if (errBody.includes("already exists")) {
          try {
            const listRes = await fetch(CATEGORY_API);
            const listData = await listRes.json();
            const existing = (listData.categories || listData.data || []).find(
              (c) => c.slug === cat.slug || c.name === cat.name,
            );
            if (existing) {
              console.log(`   ↪ Reusing existing category id: ${existing._id}`);
              createdIds.push(existing._id);
              continue;
            }
          } catch (lookupErr) {
            console.error(
              `   → Could not look up existing category:`,
              lookupErr.message,
            );
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

      formData.append(
        "description",
        `${tpl.name} is a premium quality grocery product sourced from trusted suppliers. Ideal for homes, restaurants and commercial kitchens.`,
      );

      formData.append("price", tpl.price);
      formData.append("discountPrice", tpl.discountPrice);

      formData.append("stock", tpl.stock);
      formData.append("stockStatus", "Available");

      formData.append("weight", tpl.weight);
      formData.append("color", tpl.color);
      formData.append("spec_type", tpl.spec_type);

      formData.append(
        "metaTitle",
        `${tpl.name} | Buy Online at Anna Laxmi Agro`,
      );

      formData.append(
        "metaDescription",
        `Buy ${tpl.name} online at the best price from Anna Laxmi Agro. High quality grocery products with fast delivery.`,
      );

      formData.append(
        "keywords",
        [tpl.name, tpl.brand, tpl.spec_type, "Grocery", "Anna Laxmi Agro"].join(
          ",",
        ),
      );

      formData.append("tags", tpl.tags.join(","));

      formData.append("isFeatured", Math.random() > 0.7 ? "true" : "false");
      formData.append("isActive", "true");

      formData.append("images", imageBlob1, `${filenameBase}-1.png`);
      formData.append("images", imageBlob2, `${filenameBase}-2.png`);

      const res = await fetch(PRODUCT_API, {
        method: "POST",
        headers: authHeaders,
        body: formData,
        credentials:"include"
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error(
          `❌ Product failed [${i + 1}] ${tpl.name}: ${res.status} ${res.statusText}`,
        );
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
