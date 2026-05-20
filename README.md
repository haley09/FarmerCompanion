# Farmer Companion

Farmer Companion is a crop farm management dashboard for fields, input costs, equipment service, tasks, market targets, weather, reports, and team access.

## Features

- Register and log in with server-issued JWTs
- Save farm workspace data to PostgreSQL
- Track field profitability, activities, equipment, service logs, and tasks
- Export planning reports and farm data backups
- Owner and employee dashboard views

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and add:

   ```text
   DATABASE_URL=your-postgres-connection-string
   JWT_SECRET=your-long-random-secret
   ```

3. Build the React app:

   ```bash
   npm run build
   ```

4. Start the Express server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000`.

## Development

For frontend-only development, use:

```bash
npm run dev
```

The production-style server uses the built `dist` folder and the Express API.

## Deployment

Deploy as a Node web service. On Render, use:

```text
Build Command: npm install && npm run build
Start Command: npm start
```

Add these environment variables in the Render dashboard:

```text
DATABASE_URL
JWT_SECRET
NODE_ENV=production
```

Do not commit `.env`.
