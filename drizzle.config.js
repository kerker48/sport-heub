// Configuration de drizzle-kit : l'outil qui génère les migrations SQL
// à partir de src/db/schema.js (commande : npm run db:generate).
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/db/schema.js", // où sont décrites nos tables
    out: "./drizzle", // où sont écrits les fichiers de migration (commités)
    dbCredentials: {
        url: "sportheub.db",
    },
});
