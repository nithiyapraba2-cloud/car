# Car Depreciation Calculator

Estimate how much a car will be worth over the next 10 years based on its price, purchase year, condition and category.

- **Backend:** NestJS + TypeORM + PostgreSQL (`backend/`)
- **Frontend:** React + Vite (`frontend/`)

## How it works

Each car category has two depreciation rates stored in the `depreciation_rates` table:

| Category  | 1st year | Later years |
|-----------|----------|-------------|
| hatchback | 15%      | 10%         |
| sedan     | 18%      | 12%         |
| suv       | 16%      | 11%         |
| luxury    | 22%      | 15%         |

These defaults are seeded automatically when the table is empty.

The value is reduced every year by `value × (1 − rate)` (declining balance). A **new** car uses the first-year rate in year 1; a **used** car uses the yearly rate from the start.

## Getting started

### Prerequisites

- Node.js
- PostgreSQL

### 1. Install dependencies

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure the database

Create a database in PostgreSQL, then create `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=car
```

Tables are created automatically on startup (`synchronize: true`, development only).

### 3. Run

```bash
npm run dev
```

This starts the backend (http://localhost:3000) and frontend together.

## API

### `POST /depreciation/calculate`

Request:

```json
{
  "price": 1000000,
  "purchaseYear": 2026,
  "condition": "new",
  "category": "sedan"
}
```

- `condition`: `"new"` or `"used"`
- `category`: `hatchback`, `sedan`, `suv` or `luxury`

Response:

```json
{
  "price": 1000000,
  "condition": "new",
  "category": "sedan",
  "after5Years": 491750,
  "after10Years": 259512,
  "lossAfter5Years": 508250,
  "lossAfter10Years": 740488,
  "yearly": [
    { "year": 2027, "value": 820000 },
    { "year": 2028, "value": 721600 }
  ]
}
```

`yearly` contains all 10 years (shortened above).
