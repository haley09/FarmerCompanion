import "dotenv/config";

import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required.");
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is required.");
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

app.use(express.json({ limit: "2mb" }));

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ detail: "Authentication is required." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const { rows } = await pool.query(
      "SELECT id, name, email, role FROM farmer_users WHERE id = $1",
      [payload.id]
    );

    if (!rows[0]) {
      return res.status(401).json({ detail: "Session no longer exists." });
    }

    req.user = rows[0];
    return next();
  } catch {
    return res.status(401).json({ detail: "Session expired. Please log in again." });
  }
}

app.post("/auth/register/", async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const role = req.body.role === "employee" ? "employee" : "owner";

  if (!name || !email || password.length < 8) {
    return res.status(400).json({
      detail: "Name, valid email, role, and an 8+ character password are required.",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      `INSERT INTO farmer_users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, passwordHash, role]
    );

    return res.status(201).json({ user: publicUser(rows[0]), role });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ detail: "An account with that email already exists." });
    }

    console.error(error);
    return res.status(500).json({ detail: "Could not create account." });
  }
});

app.post("/auth/login/", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!email || !password) {
    return res.status(400).json({ detail: "Email and password are required." });
  }

  try {
    const { rows } = await pool.query(
      "SELECT id, name, email, password_hash, role FROM farmer_users WHERE email = $1",
      [email]
    );
    const user = rows[0];
    const isValid = user ? await bcrypt.compare(password, user.password_hash) : false;

    if (!isValid) {
      return res.status(401).json({ detail: "Email or password is incorrect." });
    }

    const access = signToken(user);
    return res.json({
      access,
      refresh: access,
      role: user.role,
      user: publicUser(user),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ detail: "Could not log in." });
  }
});

app.get("/farm/workspace/", requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT data FROM farmer_workspaces WHERE user_id = $1",
      [req.user.id]
    );

    return res.json({ data: rows[0]?.data || null });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ detail: "Could not load farm workspace." });
  }
});

app.put("/farm/workspace/", requireAuth, async (req, res) => {
  const data = req.body.data;

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return res.status(400).json({ detail: "Workspace data is required." });
  }

  try {
    await pool.query(
      `INSERT INTO farmer_workspaces (user_id, data, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      [req.user.id, data]
    );

    return res.json({ saved: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ detail: "Could not save farm workspace." });
  }
});

const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS farmer_users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'owner',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS farmer_workspaces (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL UNIQUE REFERENCES farmer_users(id) ON DELETE CASCADE,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS farmer_workspaces_user_id_idx
      ON farmer_workspaces(user_id);
  `);
}

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Farmer Companion server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database.", error);
    process.exit(1);
  });
