// Applique les migrations du dossier drizzle/ sur sportheub.db.
// Crée la base si elle n'existe pas. Sans effet si elle est déjà à jour.
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

migrate(db, { migrationsFolder: path.join(__dirname, "..", "..", "drizzle") });

console.log("Migrations appliquées.");
