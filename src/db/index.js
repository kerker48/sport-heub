// Connexion à la base SQLite. Tous les autres fichiers importent `db` depuis ici.
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as schema from "./schema.js";

// En ESM, __dirname n'existe pas : on le reconstruit à partir de l'URL du fichier.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Le fichier de base est toujours à la racine du projet (deux dossiers au-dessus de src/db),
// quel que soit le dossier depuis lequel on lance la commande.
export const DB_PATH = path.join(__dirname, "..", "..", "sportheub.db");

// Ouvre (ou crée) le fichier sportheub.db
const sqlite = new Database(DB_PATH);

// SQLite n'applique pas les clés étrangères par défaut : on les active.
// Sans cette ligne, ON DELETE CASCADE sur page_tags ne ferait rien.
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });
