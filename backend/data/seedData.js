const mongoose = require("mongoose");
require("dotenv").config();

const Plant = require("../models/Plant");

// Connect to database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/rahuldb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Sample plant data (50+ plants)
const plantsData = [
  {
    name: "Monstera Deliciosa",
    price: 1299,
    categories: ["indoor", "air purifying", "large plants"],
    availability: true,
    description:
      "Popular houseplant with beautiful split leaves. Perfect for bright, indirect light.",
    imageUrl:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TW9uc3RlcmElMjBEZWxpY2lvc2F8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 15,
    care: { light: "bright indirect", water: "medium", difficulty: "easy" },
    tags: ["swiss cheese plant", "fenestration"],
  },
  {
    name: "Snake Plant",
    price: 599,
    categories: ["indoor", "air purifying", "low maintenance"],
    availability: true,
    description:
      "Extremely low-maintenance plant that tolerates neglect. Perfect for beginners.",
    imageUrl:
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stockQuantity: 25,
    care: { light: "low", water: "low", difficulty: "easy" },
    tags: ["sansevieria", "mother in law tongue"],
  },
  {
    name: "Fiddle Leaf Fig",
    price: 2499,
    categories: ["indoor", "large plants", "home decor"],
    availability: true,
    description:
      "Statement plant with large, violin-shaped leaves. Great for modern interiors.",
    imageUrl:
      "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RmlkZGxlJTIwTGVhZiUyMEZpZ3xlbnwwfHwwfHx8MA%3D%3D",
    stockQuantity: 8,
    care: { light: "bright indirect", water: "medium", difficulty: "medium" },
    tags: ["ficus lyrata", "statement plant"],
  },
  {
    name: "Peace Lily",
    price: 799,
    categories: ["indoor", "air purifying", "flowering"],
    availability: true,
    description: "Elegant plant with white flowers. Excellent air purifier.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1676117273363-2b13dbbc5385?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVhY2UlMjBMaWx5fGVufDB8fDB8fHww",
    stockQuantity: 12,
    care: { light: "medium", water: "medium", difficulty: "easy" },
    tags: ["spathiphyllum", "white flowers"],
  },
  {
    name: "Rubber Plant",
    price: 899,
    categories: ["indoor", "air purifying", "large plants"],
    availability: true,
    description:
      "Glossy, dark green leaves make this a popular choice for modern homes.",
    imageUrl:
      "https://images.unsplash.com/photo-1615804509230-86d839151e0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFJ1YmJlciUyMFBsYW50fGVufDB8fDB8fHww",
    stockQuantity: 18,
    care: { light: "bright indirect", water: "medium", difficulty: "easy" },
    tags: ["ficus elastica", "burgundy"],
  },
  {
    name: "ZZ Plant",
    price: 749,
    categories: ["indoor", "low maintenance", "air purifying"],
    availability: true,
    description:
      "Nearly indestructible plant perfect for low-light conditions.",
    imageUrl:
      "https://images.unsplash.com/photo-1686893043633-465fe4383769?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFpaJTIwUGxhbnR8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 20,
    care: { light: "low", water: "low", difficulty: "easy" },
    tags: ["zamioculcas zamiifolia", "drought tolerant"],
  },
  {
    name: "Pothos Golden",
    price: 399,
    categories: ["indoor", "hanging", "air purifying"],
    availability: true,
    description:
      "Trailing plant with heart-shaped leaves. Perfect for hanging baskets.",
    imageUrl:
      "https://images.unsplash.com/photo-1668476760239-c93d957d8370?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R29sZGVuJTIwcG90aG9zfGVufDB8fDB8fHww",
    stockQuantity: 30,
    care: { light: "medium", water: "medium", difficulty: "easy" },
    tags: ["devil's ivy", "trailing"],
  },
  {
    name: "Aloe Vera",
    price: 349,
    categories: ["succulent", "medicinal", "low maintenance"],
    availability: true,
    description:
      "Healing plant with medicinal properties. Very easy to care for.",
    imageUrl:
      "https://images.unsplash.com/photo-1632380211596-b96123618ca8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWxvZSUyMHZlcmF8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 25,
    care: { light: "high", water: "low", difficulty: "easy" },
    tags: ["healing", "gel"],
  },
  {
    name: "Boston Fern",
    price: 649,
    categories: ["indoor", "hanging", "air purifying"],
    availability: true,
    description: "Lush, feathery fronds perfect for humid environments.",
    imageUrl:
      "https://images.unsplash.com/photo-1599148401005-fe6d7497cb5e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9zdG9uJTIwZmVybnxlbnwwfHwwfHx8MA%3D%3D",
    stockQuantity: 14,
    care: { light: "medium", water: "high", difficulty: "medium" },
    tags: ["nephrolepis", "feathery"],
  },
  {
    name: "Spider Plant",
    price: 299,
    categories: ["indoor", "hanging", "air purifying", "pet safe"],
    availability: true,
    description: "Easy-care plant that produces baby plantlets. Safe for pets.",
    imageUrl:
      "https://images.unsplash.com/photo-1611527664689-d430dd2a6774?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BpZGVyJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 35,
    care: { light: "medium", water: "medium", difficulty: "easy" },
    tags: ["chlorophytum comosum", "babies"],
  },
  {
    name: "Jade Plant",
    price: 449,
    categories: ["succulent", "low maintenance", "indoor"],
    availability: true,
    description:
      "Thick, fleshy leaves store water. Symbol of good luck and prosperity.",
    imageUrl:
      "https://images.unsplash.com/photo-1616189597001-9046fce2594d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFkZSUyMHBsYW50fGVufDB8fDB8fHww",
    stockQuantity: 22,
    care: { light: "high", water: "low", difficulty: "easy" },
    tags: ["crassula ovata", "money tree"],
  },
  {
    name: "Philodendron Heartleaf",
    price: 459,
    categories: ["indoor", "hanging", "air purifying"],
    availability: true,
    description: "Heart-shaped leaves on trailing vines. Very adaptable plant.",
    imageUrl:
      "https://images.unsplash.com/photo-1594525622124-86be08198f7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhpbG9kZW5kcm9uJTIwSGVhcnRsZWFmfGVufDB8fDB8fHww",
    stockQuantity: 28,
    care: { light: "medium", water: "medium", difficulty: "easy" },
    tags: ["philodendron scandens", "heart shaped"],
  },
  {
    name: "Dracaena Marginata",
    price: 1199,
    categories: ["indoor", "air purifying", "large plants"],
    availability: true,
    description: "Spiky leaves on woody stems. Excellent air purifier.",
    imageUrl:
      "https://media.istockphoto.com/id/1384595756/photo/dracaena-marginata-plant.webp?a=1&b=1&s=612x612&w=0&k=20&c=oH2GRfNmwM9uKa_B82EUWS2Psz44EAtkVLwFlMAesPU=",
    stockQuantity: 11,
    care: { light: "medium", water: "low", difficulty: "easy" },
    tags: ["dragon tree", "spiky"],
  },
  {
    name: "Bird of Paradise",
    price: 2899,
    categories: ["indoor", "large plants", "tropical"],
    availability: true,
    description: "Large, paddle-shaped leaves create a tropical feel indoors.",
    imageUrl:
      "https://images.unsplash.com/photo-1585598116402-c686b02ba581?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmlyZCUyMG9mJTIwUGFyYWRpc2V8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 6,
    care: { light: "high", water: "medium", difficulty: "medium" },
    tags: ["strelitzia", "tropical"],
  },
  {
    name: "Chinese Money Plant",
    price: 599,
    categories: ["indoor", "small plants", "home decor"],
    availability: true,
    description:
      "Round, coin-like leaves on delicate stems. Instagram favorite!",
    imageUrl:
      "https://images.unsplash.com/photo-1714674119508-6676b71d3bf7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2hpbmVzZSUyME1vbmV5JTIwUGxhbnR8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 19,
    care: { light: "bright indirect", water: "medium", difficulty: "easy" },
    tags: ["pilea peperomioides", "pancake plant"],
  },
  {
    name: "Haworthia Zebra Plant",
    price: 379,
    categories: ["succulent", "small plants", "low maintenance"],
    availability: true,
    description:
      "Small succulent with distinctive white stripes on thick leaves.",
    imageUrl:
      "https://images.unsplash.com/photo-1639627369574-28d7fde9fe68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGF3b3J0aGlhJTIwWmVicmElMjBQbGFudHxlbnwwfHwwfHx8MA%3D%3D",
    stockQuantity: 24,
    care: { light: "high", water: "low", difficulty: "easy" },
    tags: ["haworthia fasciata", "striped"],
  },
  {
    name: "Majesty Palm",
    price: 1899,
    categories: ["indoor", "large plants", "tropical"],
    availability: true,
    description: "Feathery palm fronds bring tropical vibes to any room.",
    imageUrl:
      "https://media.istockphoto.com/id/1403435335/photo/majesty-palm-houseplant-in-the-pot.webp?a=1&b=1&s=612x612&w=0&k=20&c=oEV6RtFjIMTjnlzTPBL1HbqyibmstE-3y_gGsIqxYyw=",
    stockQuantity: 9,
    care: { light: "bright indirect", water: "high", difficulty: "medium" },
    tags: ["ravenea rivularis", "palm"],
  },
  {
    name: "English Ivy",
    price: 349,
    categories: ["indoor", "hanging", "air purifying", "climbers"],
    availability: true,
    description:
      "Classic trailing plant perfect for hanging baskets or climbing.",
    imageUrl:
      "https://images.unsplash.com/photo-1657401923955-efe43f7d1196?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RW5nbGlzaCUyMEl2eXxlbnwwfHwwfHx8MA%3D%3D",
    stockQuantity: 26,
    care: { light: "medium", water: "medium", difficulty: "easy" },
    tags: ["hedera helix", "trailing"],
  },
  {
    name: "Calathea Rattlesnake",
    price: 899,
    categories: ["indoor", "air purifying", "home decor"],
    availability: true,
    description:
      "Striking patterned leaves that fold up at night. Prayer plant family.",
    imageUrl:
      "https://media.istockphoto.com/id/2193275985/photo/calathea-insignis.webp?a=1&b=1&s=612x612&w=0&k=20&c=2_2cnbrepLQwyhj5QLm-CXEbq2PfpVNgJNBPhTaAluQ=",
    stockQuantity: 13,
    care: { light: "medium", water: "high", difficulty: "medium" },
    tags: ["calathea lancifolia", "prayer plant"],
  },
  {
    name: "Lavender",
    price: 549,
    categories: ["herbs", "outdoor", "flowering"],
    availability: true,
    description:
      "Fragrant herb with purple flowers. Great for cooking and aromatherapy.",
    imageUrl:
      "https://images.unsplash.com/photo-1565011523534-747a8601f10a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TGF2ZW5kZXJ8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 17,
    care: { light: "high", water: "low", difficulty: "easy" },
    tags: ["lavandula", "fragrant"],
  },
  {
    name: "Rosemary",
    price: 449,
    categories: ["herbs", "outdoor", "medicinal"],
    availability: true,
    description:
      "Aromatic herb perfect for cooking. Drought tolerant and hardy.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661697466676-200ffe1cbf1e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Um9zZW1hcnl8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 21,
    care: { light: "high", water: "low", difficulty: "easy" },
    tags: ["rosmarinus officinalis", "cooking"],
  },
  {
    name: "Basil Sweet",
    price: 199,
    categories: ["herbs", "outdoor", "small plants"],
    availability: true,
    description: "Essential culinary herb. Easy to grow and harvest.",
    imageUrl:
      "https://media.istockphoto.com/id/2164870947/photo/holy-basil-in-vegetable-garden-fresh-green-leaves-of-herb-plant.webp?a=1&b=1&s=612x612&w=0&k=20&c=y0abRkksK1CI3aIGYOX6QwJ2MqX_AZEyFN6BfcjiYzc=",
    stockQuantity: 40,
    care: { light: "high", water: "medium", difficulty: "easy" },
    tags: ["ocimum basilicum", "cooking"],
  },
  {
    name: "Mint",
    price: 249,
    categories: ["herbs", "outdoor", "medicinal"],
    availability: true,
    description: "Refreshing herb for teas and cooking. Spreads quickly.",
    imageUrl:
      "https://images.unsplash.com/photo-1588908933351-eeb8cd4c4521?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWludHxlbnwwfHwwfHx8MA%3D%3D",
    stockQuantity: 32,
    care: { light: "medium", water: "high", difficulty: "easy" },
    tags: ["mentha", "refreshing"],
  },
  {
    name: "Echeveria Blue Bird",
    price: 429,
    categories: ["succulent", "small plants", "outdoor"],
    availability: true,
    description:
      "Beautiful blue-gray rosette succulent. Perfect for arrangements.",
    imageUrl:
      "https://media.istockphoto.com/id/1152553736/photo/miniature-succulent-plants.webp?a=1&b=1&s=612x612&w=0&k=20&c=TczRCyy5t_wv17dSgYR2OW0pd_Hbo8V4OfHsyVSmAUM=",
    stockQuantity: 18,
    care: { light: "high", water: "low", difficulty: "easy" },
    tags: ["rosette", "blue"],
  },
  {
    name: "Barrel Cactus",
    price: 699,
    categories: ["succulent", "outdoor", "low maintenance"],
    availability: true,
    description: "Round cactus with prominent spines. Very drought tolerant.",
    imageUrl:
      "https://images.unsplash.com/photo-1688344834969-1bb7a78bd079?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFycmVsJTIwQ2FjdHVzfGVufDB8fDB8fHww",
    stockQuantity: 12,
    care: { light: "high", water: "low", difficulty: "easy" },
    tags: ["ferocactus", "spiny"],
  },
  {
    name: "String of Pearls",
    price: 599,
    categories: ["succulent", "hanging", "indoor"],
    availability: true,
    description: "Unique trailing succulent with bead-like leaves.",
    imageUrl:
      "https://images.unsplash.com/photo-1648070024548-b0ccc1e6fc1e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3RyaW5nJTIwb2YlMjBQZWFybHN8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 15,
    care: { light: "bright indirect", water: "low", difficulty: "medium" },
    tags: ["senecio rowleyanus", "beads"],
  },
  {
    name: "Monstera Adansonii",
    price: 849,
    categories: ["indoor", "climbing", "air purifying"],
    availability: true,
    description:
      "Swiss cheese vine with natural holes in leaves. Great climber.",
    imageUrl:
      "https://images.unsplash.com/photo-1640451379124-68b5c872d59a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TW9uc3RlcmElMjBBZGFuc29uaWl8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 16,
    care: { light: "bright indirect", water: "medium", difficulty: "easy" },
    tags: ["swiss cheese vine", "fenestration"],
  },
  {
    name: "Fiddle Leaf Fig Bush",
    price: 1799,
    categories: ["indoor", "large plants", "home decor"],
    availability: true,
    description:
      "Compact version of the popular fiddle leaf fig. Bushy growth.",
    imageUrl:
      "https://media.istockphoto.com/id/2223641100/photo/image-of-fiddle-leaf-fig-houseplant-indoor-potted-ficus-lyrata-with-large-green-leaves.webp?a=1&b=1&s=612x612&w=0&k=20&c=p6Zf4DRDdWVCa3U_RpELd_qgplwvkdTsG6n7DY_jXvc=",
    stockQuantity: 10,
    care: { light: "bright indirect", water: "medium", difficulty: "medium" },
    tags: ["ficus lyrata compacta", "bushy"],
  },
  {
    name: "Parlor Palm",
    price: 799,
    categories: ["indoor", "low maintenance", "pet safe"],
    availability: true,
    description: "Elegant palm that tolerates low light. Safe for pets.",
    imageUrl:
      "https://images.unsplash.com/photo-1687269111857-3b398711c2f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFybG9yJTIwcGFsbXxlbnwwfHwwfHx8MA%3D%3D",
    stockQuantity: 14,
    care: { light: "low", water: "medium", difficulty: "easy" },
    tags: ["chamaedorea elegans", "pet friendly"],
  },
  {
    name: "Anthurium Red",
    price: 1299,
    categories: ["indoor", "flowering", "air purifying"],
    availability: true,
    description:
      "Glossy heart-shaped flowers in vibrant red. Long-lasting blooms.",
    imageUrl:
      "https://media.istockphoto.com/id/1359117982/photo/house-plant-anthurium-in-white-flowerpot-isolated-on-white-table-and-gray-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=owhGi7dkhn8TDmvvJhyoZZiJR_Gx6qpQnbOeMbee1J4=",
    stockQuantity: 8,
    care: { light: "bright indirect", water: "medium", difficulty: "medium" },
    tags: ["flamingo flower", "heart shaped"],
  },
  {
    name: "Norfolk Pine",
    price: 1599,
    categories: ["indoor", "large plants", "home decor"],
    availability: true,
    description: "Pyramid-shaped evergreen perfect as a living Christmas tree.",
    imageUrl:
      "https://images.unsplash.com/photo-1596183920906-b3afaccab8c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Tm9yZm9sayUyMFBpbmV8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 7,
    care: { light: "bright indirect", water: "medium", difficulty: "medium" },
    tags: ["araucaria heterophylla", "christmas tree"],
  },
  {
    name: "Croton Petra",
    price: 949,
    categories: ["indoor", "home decor", "tropical"],
    availability: true,
    description: "Colorful foliage plant with yellow, red, and green leaves.",
    imageUrl:
      "https://media.istockphoto.com/id/1360470166/photo/closeup-variegated-foliage-croton-petra-plant-colored-red-and-green-colorful-leaves-pattern.webp?a=1&b=1&s=612x612&w=0&k=20&c=eUClt7f_Zic81V3G5A8LmXOnRWn0vHBlYF7boNaXKTs=",
    stockQuantity: 11,
    care: { light: "high", water: "medium", difficulty: "medium" },
    tags: ["codiaeum variegatum", "colorful"],
  },
  {
    name: "Yucca Plant",
    price: 1199,
    categories: ["indoor", "outdoor", "low maintenance"],
    availability: true,
    description: "Sword-like leaves on sturdy stems. Very drought tolerant.",
    imageUrl:
      "https://images.unsplash.com/photo-1676107273713-9786686651d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8WXVjY2ElMjBQbGFudHxlbnwwfHwwfHx8MA%3D%3D",
    stockQuantity: 9,
    care: { light: "high", water: "low", difficulty: "easy" },
    tags: ["yucca elephantipes", "drought tolerant"],
  },
  {
    name: "Ponytail Palm",
    price: 899,
    categories: ["indoor", "succulent", "low maintenance"],
    availability: true,
    description: "Unique plant with swollen trunk base and long, thin leaves.",
    imageUrl:
      "https://images.unsplash.com/photo-1612881073328-735a582c73f2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UG9ueXRhaWwlMjBQYWxtfGVufDB8fDB8fHww",
    stockQuantity: 13,
    care: { light: "high", water: "low", difficulty: "easy" },
    tags: ["beaucarnea recurvata", "elephant foot"],
  },
  {
    name: "Schefflera Umbrella Tree",
    price: 749,
    categories: ["indoor", "air purifying", "large plants"],
    availability: true,
    description: "Glossy compound leaves arranged like umbrella spokes.",
    imageUrl:
      "https://media.istockphoto.com/id/1420136042/photo/plant-dwarf-umbrella-tree-schefflera-actinophylla-variegata-kept-indoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=Nb18y7v7Db14UAwbplahXeWhqDGc5I573YK4StkNztY=",
    stockQuantity: 16,
    care: { light: "bright indirect", water: "medium", difficulty: "easy" },
    tags: ["schefflera actinophylla", "umbrella"],
  },
  {
    name: "Dieffenbachia Dumb Cane",
    price: 679,
    categories: ["indoor", "air purifying", "large plants"],
    availability: true,
    description: "Large tropical leaves with cream and green variegation.",
    imageUrl:
      "https://media.istockphoto.com/id/1138553566/photo/repotting-plant-concept-dieffenbachia-plant-potted-with-new-soil-into-new-modern-pot-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=iRhW3TX6TGlS_AHeHZVxWQwV1XTcw7zLcQLu0BwUpL4=",
    stockQuantity: 12,
    care: { light: "medium", water: "medium", difficulty: "easy" },
    tags: ["dieffenbachia seguine", "variegated"],
  },
  {
    name: "Peperomia Baby Rubber Plant",
    price: 399,
    categories: ["indoor", "small plants", "pet safe"],
    availability: true,
    description: "Compact plant with thick, glossy leaves. Perfect for desks.",
    imageUrl:
      "https://media.istockphoto.com/id/2173252952/photo/peperomia-obtusifolia-baby-rubber-plant-or-pepper-face-or-piperaceae-or-bicolor-plant.webp?a=1&b=1&s=612x612&w=0&k=20&c=qFlofa5_SFAUUyX_ERH-wctjDV5ny_eOHR6gAxNEFwc=",
    stockQuantity: 23,
    care: { light: "medium", water: "low", difficulty: "easy" },
    tags: ["peperomia obtusifolia", "compact"],
  },
  {
    name: "Hoya Heart Plant",
    price: 1499,
    categories: ["indoor", "hanging", "flowering"],
    availability: true,
    description:
      "Heart-shaped succulent leaves. Produces fragrant waxy flowers.",
    imageUrl:
      "https://images.unsplash.com/photo-1597055181414-98245499529a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SG95YSUyMEhlYXJ0JTIwUGxhbnR8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 5,
    care: { light: "bright indirect", water: "low", difficulty: "medium" },
    tags: ["hoya kerrii", "valentine"],
  },
  {
    name: "Tradescantia Zebrina",
    price: 349,
    categories: ["indoor", "hanging", "home decor"],
    availability: true,
    description: "Purple and silver striped trailing plant. Fast growing.",
    imageUrl:
      "https://images.unsplash.com/photo-1747774504116-ed3319ce061d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8VHJhZGVzY2FudGlhJTIwWmVicmluYXxlbnwwfHwwfHx8MA%3D%3D",
    stockQuantity: 29,
    care: { light: "bright indirect", water: "medium", difficulty: "easy" },
    tags: ["wandering jew", "purple"],
  },
  {
    name: "Fittonia Nerve Plant",
    price: 299,
    categories: ["indoor", "small plants", "home decor"],
    availability: true,
    description: "Delicate leaves with intricate white or pink veining.",
    imageUrl:
      "https://images.unsplash.com/photo-1581176780057-c6b5258ff5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEZpdHRvbmlhJTIwTmVydmUlMjBQbGFudHxlbnwwfHwwfHx8MA%3D%3D",
    stockQuantity: 27,
    care: { light: "low", water: "high", difficulty: "medium" },
    tags: ["fittonia albivenis", "mosaic plant"],
  },
  {
    name: "Bonsai Ficus",
    price: 2299,
    categories: ["bonsai", "indoor", "home decor"],
    availability: true,
    description: "Traditional bonsai tree perfect for meditation spaces.",
    imageUrl:
      "https://images.unsplash.com/photo-1649610503292-148c0e1dd109?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qm9uc2FpJTIwRmljdXN8ZW58MHx8MHx8fDA%3D",
    stockQuantity: 4,
    care: { light: "bright indirect", water: "medium", difficulty: "hard" },
    tags: ["ficus microcarpa", "meditation"],
  },
  {
    name: "Aglaonema Chinese Evergreen",
    price: 849,
    categories: ["indoor", "air purifying", "low maintenance"],
    availability: true,
    description: "Colorful leaves with silver, green, and pink patterns.",
    imageUrl:
      "https://media.istockphoto.com/id/1263431301/photo/aglaonema-maria-houseplant-cuttings-in-a-red-glass-vase-in-front-of-a-white-wall-chinese.webp?a=1&b=1&s=612x612&w=0&k=20&c=9EpPAxWS4nq4oLYmfr0UG80oPI_2BayobcHYKwLon0g=",
    stockQuantity: 14,
    care: { light: "low", water: "medium", difficulty: "easy" },
    tags: ["aglaonema commutatum", "colorful"],
  },
  {
    name: "Monstera Thai Constellation",
    price: 4999,
    categories: ["indoor", "air purifying", "large plants"],
    availability: false,
    description: "Rare variegated Monstera with cream and green sectoring.",
    imageUrl:
      "https://images.unsplash.com/photo-1662457476797-f36dfcf08317?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fE1vbnN0ZXJhJTIwVGhhaSUyMENvbnN0ZWxsYXRpb258ZW58MHx8MHx8fDA%3D",
    stockQuantity: 0,
    care: { light: "bright indirect", water: "medium", difficulty: "hard" },
    tags: ["rare", "variegated", "constellation"],
  },
  {
    name: "Philodendron Pink Princess",
    price: 3499,
    categories: ["indoor", "air purifying", "climbing"],
    availability: true,
    description: "Stunning dark leaves with bright pink variegation.",
    imageUrl:
      "https://media.istockphoto.com/id/2198949154/photo/this-rooted-cutting-of-philodendron-pink-princess-in-sphagnum-moss-showcases-its-vibrant-pink.webp?a=1&b=1&s=612x612&w=0&k=20&c=4lO_mrvoTbrA4PXIB8-EOP1IWXE_lFfE_OZQlbowkmg=",
    stockQuantity: 2,
    care: { light: "bright indirect", water: "medium", difficulty: "hard" },
    tags: ["rare", "pink", "variegated"],
  },
  {
    name: "Alocasia Polly",
    price: 1199,
    categories: ["indoor", "tropical", "home decor"],
    availability: true,
    description:
      "Arrow-shaped leaves with prominent white veining. Elephant ear family.",
    imageUrl:
      "https://media.istockphoto.com/id/2228265682/photo/dark-green-alocasia-leaves-with-striking-white-veins.webp?a=1&b=1&s=612x612&w=0&k=20&c=opfeOxIAYQ-7tlw4XQRGv7HQqsw_bKFgGyeVAKDuKqQ=",
    stockQuantity: 6,
    care: { light: "bright indirect", water: "high", difficulty: "medium" },
    tags: ["alocasia amazonica", "elephant ear"],
  },
  {
    name: "Pilea Aluminum Plant",
    price: 449,
    categories: ["indoor", "small plants", "home decor"],
    availability: true,
    description: "Textured leaves with metallic silver markings.",
    imageUrl:
      "https://media.istockphoto.com/id/1625297993/photo/aluminium-plant-aka-pilea-cadierei-leaves-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=CQQZWY9QwjSmcZqLU5ZBggYbBCzZkRutxqcjdn364VA=",
    stockQuantity: 19,
    care: { light: "medium", water: "medium", difficulty: "easy" },
    tags: ["pilea cadierei", "metallic"],
  },
  {
    name: "Maranta Prayer Plant",
    price: 749,
    categories: ["indoor", "air purifying", "home decor"],
    availability: true,
    description: "Oval leaves with distinctive red veining. Folds up at night.",
    imageUrl:
      "https://images.unsplash.com/photo-1639756534497-d3271888337c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFyYW50YSUyMFByYXllciUyMFBsYW50fGVufDB8fDB8fHww",
    stockQuantity: 11,
    care: { light: "medium", water: "high", difficulty: "medium" },
    tags: ["maranta leuconeura", "red veins"],
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");

    // Clear existing plants
    await Plant.deleteMany({});
    console.log("✅ Cleared existing plants");

    // Insert new plants
    const result = await Plant.insertMany(plantsData);
    console.log(`✅ Successfully seeded ${result.length} plants`);

    // Handle text index creation with error handling
    try {
      // First, try to drop any existing text indexes to avoid conflicts
      const collection = mongoose.connection.db.collection("plants");
      const indexes = await collection.indexes();

      // Find and drop existing text indexes
      for (const index of indexes) {
        if (index.key && index.key._fts === "text") {
          console.log(`🗑️ Dropping existing text index: ${index.name}`);
          await collection.dropIndex(index.name);
        }
      }

      // Create comprehensive text index for search functionality
      await collection.createIndex(
        {
          name: "text",
          description: "text",
          categories: "text",
          tags: "text",
        },
        {
          name: "comprehensive_text_search",
          weights: {
            name: 10, // Higher weight for name matches
            categories: 5,
            tags: 3,
            description: 1,
          },
          default_language: "english",
        }
      );
      console.log("✅ Created comprehensive text search index");
    } catch (indexError) {
      if (indexError.code === 85) {
        // IndexOptionsConflict
        console.log(
          "⚠️ Text index already exists with compatible options, continuing..."
        );
      } else {
        console.log("⚠️ Index creation warning:", indexError.message);
        // Don't throw error, seeding was successful even without index
      }
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
    console.log("📦 Database connection closed");
  }
}

seedDatabase();
