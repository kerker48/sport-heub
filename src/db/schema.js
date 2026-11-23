// Modèle de données de Sport"heub.
// ⚠️ Seul Kerouann modifie ce fichier. Après toute modification : npm run db:generate
//
// Pour chaque colonne : la clé (ex. aLaUne) est le nom utilisé dans le code JS,
// la chaîne (ex. "a_la_une") est le nom de la colonne dans la base SQLite.
import { sql } from "drizzle-orm";
import {
    sqliteTable,
    integer,
    text,
    primaryKey,
    check,
} from "drizzle-orm/sqlite-core";

// ---------- Sport (fixe : rempli par le seed, jamais modifié dans l'interface) ----------
export const sports = sqliteTable(
    "sports",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        nom: text("nom").notNull().unique(),
        description: text("description").notNull(),
        type: text("type").notNull(), // "collectif" ou "individuel"
    },
    // contrainte CHECK : SQLite refuse toute autre valeur pour type
    (table) => [check("type_valide", sql`${table.type} IN ('collectif', 'individuel')`)],
);

// ---------- Tag (fixe : seules ses associations avec les pages changent) ----------
export const tags = sqliteTable("tags", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nom: text("nom").notNull().unique(),
    description: text("description").notNull(),
});

// ---------- Page (entité A) ----------
export const pages = sqliteTable("pages", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    titre: text("titre").notNull().unique(),
    resume: text("resume").notNull(),
    contenu: text("contenu").notNull(),
    fiabilite: text("fiabilite").notNull().default("non_verifie"), // verifie / non_verifie / fake
    // vrai pour les pages du seed ; passe à faux dès qu'un utilisateur modifie la page
    officielle: integer("officielle", { mode: "boolean" }).notNull().default(false),
    aLaUne: integer("a_la_une", { mode: "boolean" }).notNull().default(false),
    // rempli automatiquement par SQLite à la création (date actuelle)
    dateModification: integer("date_modification", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
    // relation 1-N : un sport a plusieurs pages, une page a un seul sport
    sportId: integer("sport_id")
        .notNull()
        .references(() => sports.id),
});

// ---------- Athlète (entité B) ----------
export const athletes = sqliteTable("athletes", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nom: text("nom").notNull(),
    prenom: text("prenom").notNull(),
    nationalite: text("nationalite").notNull(),
    dateNaissance: text("date_naissance"), // texte au format AAAA-MM-JJ
    poste: text("poste"),
    biographie: text("biographie").notNull(),
    fiabilite: text("fiabilite").notNull().default("non_verifie"),
    officiel: integer("officiel", { mode: "boolean" }).notNull().default(false),
    aLaUne: integer("a_la_une", { mode: "boolean" }).notNull().default(false),
    // relation 1-N : un sport regroupe plusieurs athlètes, un athlète a un seul sport
    sportId: integer("sport_id")
        .notNull()
        .references(() => sports.id),
});

// ---------- Table de liaison Page <-> Tag (relation N-N) ----------
export const pageTags = sqliteTable(
    "page_tags",
    {
        // ON DELETE CASCADE : si la page est supprimée, ses lignes ici le sont aussi
        pageId: integer("page_id")
            .notNull()
            .references(() => pages.id, { onDelete: "cascade" }),
        tagId: integer("tag_id")
            .notNull()
            .references(() => tags.id),
    },
    // clé primaire composée : un même tag ne peut être lié qu'une fois à une page
    (table) => [primaryKey({ columns: [table.pageId, table.tagId] })],
);
