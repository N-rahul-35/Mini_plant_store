# 🌿 Mini Plant Store (Urvann) — Full‑Stack App

A mini e‑commerce app where customers can browse plants, search & filter by name/category, and (admin) add new plants. Built with **React (frontend)** and **Node.js + Express + MongoDB (backend)** using a **local MongoDB** instance.

---

## ✨ Features

- **Plant Catalog**: Grid/list view with **Name, Price, Categories, In-Stock**.
- **Search**:

  - Case-insensitive by **plant name**.
  - Keyword search across **categories** (e.g., "home decor" → Money Plant).

- **Filters**:

  - Dropdown filter by category (Indoor, Outdoor, Succulent, Air-Purifying, Home-Decor, etc.).

- **Admin: Add Plant**:

  - Form with validation: **name, price, multiple categories, availability**.

- **Responsive UI**: Mobile-first, works on phones and desktops.
- **UX States**: Loading and error states while fetching.
- **Seed Data**: 50+ plants with realistic names, prices, and categories.

---

## 🧱 Tech Stack

**Frontend:** React, Vite/CRA, Axios, Tailwind/Vanilla CSS, React Router

**Backend:** Node.js, Express, Mongoose, CORS, Helmet, morgan

**Database:** Local MongoDB (`mongodb://localhost:27017/urvann_plants`)
For MongoDB Atlas: mongodb+srv://rahul:password@cluster.mongodb.net/plant

**Tooling:** ESLint, Prettier, npm scripts

---

## 📁 Project Structure

```Mini-plant-store/
├── backend/
│   ├── models/
│   │   └── Plant.js
│   ├── routes/
│   │   └── plants.js
│   ├── middleware/
│   │   └── validation.js
│   ├── config/
│   │   └── database.js
│   ├── data/
│   │   └── seedData.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PlantCard.js
│   │   │   ├── PlantGrid.js
│   │   │   ├── SearchFilter.js
│   │   │   ├── AddPlantForm.js
│   │   │   └── LoadingSpinner.js
│   │   ├── hooks/
│   │   │   └── usePlants.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── constants.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md

---

## 🔧 Local Setup (MongoDB Local)

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- MongoDB Community Server running locally

  - **Windows:** `mongod --dbpath C:\\data\\db`

### Clone & Install

```

### Environment Variables

**backend/.env**:

```

PORT=4000
MONGO_URI=mongodb://localhost:27017
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
MONGODB_URI= mongodb+srv://rahul:<password>@cluster0.00houn3.mongodb.net/plant

```

**frontend/.env**:

```

```

### Seed Database

```bash
cd backend
npm run seed
```

### Run the App

```bash
# backend
npm run dev

# frontend (separate terminal)
npm run dev  # Vite or npm start for CRA
```

---

## 🛣️ REST API

**Base URL:** `http://localhost:5000/api`

### GET `/plants`

- Query params: `q` (search), `category`, `inStock`, `sort`, `page`, `limit`

### POST `/plants` (Admin)

- Body:

```json
{
  "name": "Snake Plant",
  "price": 249,
  "categories": ["Indoor", "Air-Purifying"],
  "inStock": true
}
```

- Validation: required fields, number >=0, categories from whitelist, boolean inStock

---

## 🖼️ Frontend UX

- Responsive grid with cards for each plant
- Debounced search by name/category
- Category dropdown + in-stock toggle
- Add Plant form with inline validation and success notifications
- Loading skeletons and error banners

---

## Data added on mongodb local

-open mongoshell type mongosh
show db using show dbs
you can see collection by using this command show collections otherwise you need to create db.createCollection("plants").
then use rahuldb database
for updation in data(plant db)use this command "db.plants.find().pretty()"

## 🚀 Scripts

**Backend:**

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "seed": "node data/seedData.js"
  }
}
```

**Frontend:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🧠 Notes

- Indexed `name` and `categories` for fast search
- Pagination supported for larger datasets
- CORS configured for local frontend
- Validation shared between client & server

---

## 🧰 Troubleshooting

- MongoDB connection issues: ensure service running and correct `MONGO_URI`
- Ajv errors: ensure compatible `ajv` and `ajv-keywords` versions
- Port conflicts: change `PORT` in `.env`
- CORS: match `CORS_ORIGIN` with frontend URL

---
