# Sport"heub

## Présentation

Sport"heub est un wiki collaboratif et non professionnel consacré au sport. Au lancement, l'application contient une base réaliste : des sports, des pages d'information (règles, histoire, légendes…) et des fiches d'athlètes. Les utilisateurs peuvent ensuite librement créer, modifier et supprimer des pages et des athlètes : le contenu devient « anarchique », vrai ou faux. Les sports et les tags, qui servent de filtres, restent fixes. Chaque page et chaque athlète affiche un badge de fiabilité (« Vérifié », « Non vérifié », « Fake / parodie »).

## Stack technique

- Langage : JavaScript, modules ESM (`import` / `export`), Node.js 22
- Framework : Express 5
- Base de données : SQLite (fichier `sportheub.db`, créé par `npm run setup`)
- ORM : Drizzle ORM avec le driver `better-sqlite3`, migrations avec `drizzle-kit`
- Templates : Handlebars (`express-handlebars`)
- Architecture : MVC (modèle dans `src/db/`, contrôleurs dans `src/controllers/`, routes dans `src/routes/`, vues dans `views/`)

## Prérequis

- Node.js 22 (ou plus récent), avec npm
- Git

## Lancement

```bash
git clone https://github.com/kerker48/sport-heub.git
cd sport-heub
npm install
npm run setup
npm start
```

`npm run setup` crée la base de données (migrations) puis la remplit avec le seed. Il peut être relancé sans risque : si la base contient déjà des données, le seed ne fait rien.

URL de l'application une fois lancée : http://localhost:3000

## Comptes de test

L'application n'a pas de système de connexion.

## Correspondance avec le sujet

**Entités :** Sport, Tag, Page, Athlète (voir `src/db/schema.js`).
**Entité A :** Page. **Entité B :** Athlète.
**Relations 1-N :** Sport → Pages (`pages.sport_id`), Sport → Athlètes (`athletes.sport_id`).
**Relation N-N :** Page ↔ Tag, via la table `page_tags`.
**Seed :** 6 sports, 8 tags, 12 pages (1 à 3 tags chacune), 12 athlètes ; 3 pages et 3 athlètes à la une. Fichiers : `src/db/seed.js` et `src/db/data/`.
**Ordre des listes :** alphabétique. Pages par titre, athlètes par nom puis prénom, sports et tags par nom.

| Exigence | Où la vérifier |
|---|---|
| D1 – 3 entités | `src/db/schema.js` : `sports`, `tags`, `pages`, `athletes` |
| D2 – 2 relations 1-N | `src/db/schema.js` : `pages.sport_id`, `athletes.sport_id` |
| D3 – relation N-N | `src/db/schema.js` : table `page_tags` |
| D4 – seed | `src/db/seed.js`, lancé par `npm run setup` |
| F1 – créer une page | `/pages/nouvelle` |
| F2 – liste des pages | `/pages` |
| F3 – détail d'une page | `/pages/:id` |
| F4 – modifier une page | `/pages/:id/modifier` |
| F5 – supprimer une page | bouton « Supprimer » sur `/pages/:id` |
| F6 – créer un athlète | `/athletes/nouveau` |
| F7 – liste des athlètes | `/athletes` |
| F8 – détail d'un athlète | `/athletes/:id` |
| F9 – modifier un athlète | `/athletes/:id/modifier` |
| F10 – supprimer un athlète | bouton « Supprimer » sur `/athletes/:id` |
| F11 – éléments liés (1-N) | `/sports/:id` (pages d'un sport), `/sports/:id/athletes` (athlètes d'un sport) |
| F12 – N-N modifiable | cases à cocher des tags dans `/pages/:id/modifier` ; visible sur `/pages/:id` et `/tags/:id` |
| F13 – mis en avant à l'accueil | `/` |
| F14 – mettre / retirer à la une | bouton sur `/pages/:id` et `/athletes/:id` |
| N1 – navigation | `views/partials/nav.hbs`, inclus dans `views/layouts/main.hbs` |
| N2 – tout est cliquable | partials `carte-page.hbs`, `carte-athlete.hbs` et pages de détail |
| N3 – listes triées | ordre alphabétique (voir ci-dessus) |
| N4 – pas d'erreur serveur | erreurs 400 / 404 / 500 gérées : `src/server.js` et `views/erreurs/` |
