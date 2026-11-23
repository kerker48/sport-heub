# **Sport"heub"**

Fiche projet — R1.02 Développement web

## **Sommaire**

1. Pitch  
2. Membres du groupe  
3. Stack technique  
4. Entités  
5. Relations  
6. Entités A et B (F1 à F10)  
7. Seed (D4)  
8. Mise en avant (F13 et F14)  
9. Ordre des listes (N3)  
10. Architecture  
11. Base de données  
12. Routes  
13. Gestion des erreurs (N4)  
14. Répartition des tâches  
15. Planning

---

## **Pitch**

Sport"heub" est un wiki collaboratif et non professionnel consacré au sport. Au lancement, l'application contient une base réaliste : des sports, des pages d'information (règles, histoire, légendes…) et des fiches d'athlètes. Les utilisateurs peuvent ensuite librement modifier ces pages et en créer de nouvelles : le contenu devient « anarchique », vrai ou faux. La structure du site (les sports et les tags qui servent de filtres) reste fixe et ne peut pas être modifiée. Chaque page et chaque athlète affiche un badge de fiabilité (« Vérifié », « Non vérifié », « Fake / parodie ») pour que le lecteur sache à quoi s'en tenir.

## **Membres du groupe**

* Shahine Meziane  
* Lucas Colombet  
* Ryan Saderne  
* Kerouann Touami--Causse

## **Stack technique**

| Élément | Choix |
| ----- | ----- |
| Langage | JavaScript (Node.js 22) |
| Serveur | Express 5 |
| Base de données | SQLite (fichier local, créé par les commandes d'installation) |
| ORM | Drizzle ORM (driver `better-sqlite3`), migrations avec `drizzle-kit` |
| Templates | Handlebars (`express-handlebars`) |

**Pourquoi :** c'est la stack vue en cours, que tout le groupe maîtrise et sait expliquer. SQLite ne nécessite ni serveur ni Docker : l'application se lance avec quelques commandes npm, ce qui limite le risque au lancement depuis un clone vierge.

---

## **Entités**

### **Sport — filtre, fixe (non modifiable depuis l'interface)**

| Champ | Description |
| ----- | ----- |
| `id` | identifiant |
| `nom` | unique |
| `description` | texte court |
| `type` | `collectif` ou `individuel` |

### **Tag — filtre, fixe (non modifiable depuis l'interface)**

| Champ | Description |
| ----- | ----- |
| `id` | identifiant |
| `nom` | unique — ex. Règles, Histoire, Légendes, Records |
| `description` | texte court |

### **Page — entité A**

| Champ | Description |
| ----- | ----- |
| `id` | identifiant |
| `titre` | unique |
| `resume` | description courte |
| `contenu` | texte de la page |
| `fiabilite` | `verifie` / `non_verifie` / `fake`, choisie dans le formulaire |
| `officielle` | booléen, vrai pour les pages créées par le seed (affiché sous forme de badge). **Géré automatiquement** : passe à faux dès que la page est modifiée depuis l'interface |
| `a_la_une` | booléen |
| `date_modification` | **gérée automatiquement**, mise à jour à chaque création ou modification |
| `sport_id` | → Sport |

### **Athlète — entité B**

| Champ | Description |
| ----- | ----- |
| `id` | identifiant |
| `nom`, `prenom` |  |
| `nationalite` |  |
| `date_naissance` |  |
| `poste` | poste ou spécialité |
| `biographie` |  |
| `fiabilite` | `verifie` / `non_verifie` / `fake`, choisie dans le formulaire |
| `officiel` | booléen, vrai pour les athlètes créés par le seed. **Géré automatiquement**, même règle que pour les pages |
| `a_la_une` | booléen |
| `sport_id` | → Sport |

## **Relations**

### **1-N n°1 : Sport → Pages**

Un sport possède une ou plusieurs pages ; une page appartient à un seul sport.

* Page « les pages d'un sport » : `/sports/:id`

### **1-N n°2 : Sport → Athlètes**

Un sport regroupe plusieurs athlètes ; un athlète pratique un seul sport.

* Page « les athlètes d'un sport » : `/sports/:id/athletes`

### **N-N : Page ↔ Tag (table de liaison `page_tags`)**

Une page peut avoir plusieurs tags ; un tag est associé à plusieurs pages.

* La liste des tags est fixe (filtres).  
* Les associations sont modifiables depuis l'interface : on ajoute ou retire un tag sur une page grâce à des cases à cocher dans le formulaire de création / modification de la page.  
* Visible des deux côtés : les tags sur la page de détail d'une page (`/pages/:id`), et la liste des pages sur la page d'un tag (`/tags/:id`).  
* Supprimer une page supprime aussi ses lignes dans `page_tags` (`ON DELETE CASCADE`).

## **Entités A et B (F1 à F10)**

A \= Page et B \= Athlète, entièrement gérables depuis l'interface :

|  | Page (A) | Athlète (B) |
| ----- | ----- | ----- |
| Création | `/pages/nouvelle` | `/athletes/nouveau` |
| Liste | `/pages` | `/athletes` |
| Détail | `/pages/:id` (sport, tags) | `/athletes/:id` (sport) |
| Modification | `/pages/:id/modifier` : tous les champs, y compris le sport et les tags | `/athletes/:id/modifier` : tous les champs, y compris le sport |
| Suppression | bouton sur la page de détail (supprime aussi ses liens dans `page_tags`) | bouton sur la page de détail |

Les pages et athlètes créés par le seed sont modifiables et supprimables comme les autres : c'est le principe du wiki anarchique. Seuls les sports et les tags sont figés.

Pages de consultation supplémentaires (navigation, N2) : `/sports` (liste des sports) et `/tags` (liste des tags).

## **Seed (D4)**

Le seed est exécuté par une commande de la section Lancement (`npm run setup`), avant le démarrage du serveur.

**Pas de doublons :** le seed vérifie d'abord si la table `sports` contient déjà des données. Si c'est le cas, la base a déjà été initialisée et le seed ne fait rien. Ainsi, relancer la commande ne recrée ni doublons, ni les pages que les utilisateurs ont renommées ou supprimées. Les contraintes `UNIQUE` (nom des sports et des tags, titre des pages) servent de sécurité supplémentaire.

Contenu prévu :

* **6 sports** : Football, Basketball, Rugby, Tennis, Natation, Cyclisme.  
* **8 tags** : Règles, Histoire, Légendes, Records, Matériel, Compétitions, Anecdotes, Insolite.  
* **12 pages au minimum**, au moins une par sport et plusieurs pour certains sports (ex. « Les règles du football », « Histoire du Tour de France »), chacune avec 1 à 3 tags.  
* **12 athlètes au minimum**, répartis sur tous les sports, avec des informations publiques et factuelles.

Toutes les relations sont utilisées : chaque page et chaque athlète est rattaché à un sport, et chaque page a au moins un tag. Les fiches du seed sont marquées « officielles » et « vérifiées ».

Éléments mis en avant : 3 pages et 3 athlètes ont `a_la_une = vrai` dès le seed.

## **Mise en avant (F13 et F14)**

* **F13** : la page d'accueil affiche deux blocs, « Pages à la une » et « Athlètes à la une ». Chaque élément est cliquable et mène à sa page de détail.  
* **F14** : sur la page de détail d'une page ou d'un athlète, un bouton « Mettre à la une » / « Retirer de la une » change la valeur de `a_la_une`. La case « À la une » est aussi présente dans le formulaire de modification.

## **Ordre des listes (N3)**

Toutes les listes sont triées par ordre alphabétique : pages par titre, athlètes par nom puis prénom, sports et tags par nom. Cela vaut aussi pour les listes affichées dans les pages de détail (pages d'un sport, tags d'une page, etc.).

---

## **Architecture**

L'application suit une architecture **MVC (Modèle-Vue-Contrôleur)** pour séparer clairement les responsabilités :

| Couche | Dossier | Rôle |
| ----- | ----- | ----- |
| **Modèle** | `src/db/` | Schéma de la base SQLite et accès aux données avec Drizzle ORM |
| **Contrôleur** | `src/controllers/` | Traitement des requêtes : lecture des paramètres, validation, appels à la base, choix de la vue à afficher |
| **Routes** | `src/routes/` | Associent chaque URL (méthode \+ chemin) à une fonction du contrôleur. Aucune logique ici |
| **Vue** | `views/` | Templates Handlebars, rendu HTML côté serveur |
| **Initialisation** | `src/db/migrate.js`, `src/db/seed.js` | Création de la base et insertion des données de départ |

Exemple du trajet d'une requête : `GET /pages/3` → `routes/pages.js` → `pagesController.detail()` → requête Drizzle → `res.render('pages/detail', { page })`.

### **Arborescence**

```
sportheub/
├── package.json            # dépendances + scripts npm
├── drizzle.config.js       # config drizzle-kit (schéma, dossier des migrations)
├── .gitignore              # node_modules/, *.db
├── README.md
├── SUJET.md
├── drizzle/                # migrations SQL générées par drizzle-kit (versionnées)
├── src/
│   ├── server.js           # app Express, Handlebars, montage des routes, middlewares 404 et 500
│   ├── helpers.js          # helpers Handlebars (eq, formatDate, includes…)
│   ├── db/
│   │   ├── index.js        # connexion SQLite + instance Drizzle, PRAGMA foreign_keys = ON
│   │   ├── schema.js       # tables : sports, tags, pages, athletes, page_tags
│   │   ├── migrate.js      # applique les migrations du dossier drizzle/
│   │   ├── seed.js         # insère les données si la table sports est vide
│   │   └── data/           # contenu du seed
│   │       ├── sports.js
│   │       ├── tags.js
│   │       ├── pages.js
│   │       └── athletes.js
│   ├── controllers/
│   │   ├── homeController.js
│   │   ├── pagesController.js
│   │   ├── athletesController.js
│   │   ├── sportsController.js
│   │   └── tagsController.js
│   └── routes/
│       ├── home.js         # GET /
│       ├── pages.js        # /pages…
│       ├── athletes.js     # /athletes…
│       ├── sports.js       # /sports…
│       └── tags.js         # /tags…
├── views/
│   ├── layouts/main.hbs    # squelette HTML commun (head, nav, footer)
│   ├── partials/
│   │   ├── nav.hbs
│   │   ├── badge-fiabilite.hbs
│   │   ├── badge-officielle.hbs
│   │   ├── carte-page.hbs
│   │   └── carte-athlete.hbs
│   ├── home.hbs
│   ├── pages/      liste.hbs  detail.hbs  formulaire.hbs
│   ├── athletes/   liste.hbs  detail.hbs  formulaire.hbs
│   ├── sports/     liste.hbs  detail.hbs  athletes.hbs
│   ├── tags/       liste.hbs  detail.hbs
│   └── erreurs/
│       ├── 400.hbs         # requête invalide (ex. /pages/abc)
│       ├── 404.hbs         # élément ou page introuvable (ex. /pages/9999)
│       └── 500.hbs         # erreur serveur inattendue
└── public/
    └── css/style.css
```

Le même `formulaire.hbs` sert à la création et à la modification : on lui passe soit un objet vide, soit l'élément à modifier.

### **Scripts npm**

```json
"scripts": {
  "db:generate": "drizzle-kit generate",
  "db:migrate": "node src/db/migrate.js",
  "seed": "node src/db/seed.js",
  "setup": "npm run db:migrate && npm run seed",
  "start": "node src/server.js",
  "dev": "node --watch src/server.js"
}
```

| Script | Utilisé par | Rôle |
| ----- | ----- | ----- |
| `db:generate` | les développeurs | à lancer après chaque modification de `schema.js` ; les migrations produites dans `drizzle/` sont commitées |
| `setup` | le correcteur | applique les migrations (création de `sportheub.db`) puis lance le seed, sans question interactive |
| `start` | le correcteur | démarre le serveur sur [http\://localhost:3000](http://localhost:3000) |
| `dev` | les développeurs | redémarre le serveur à chaque modification de fichier |

## **Base de données**

| Table | Colonnes | Contraintes |
| ----- | ----- | ----- |
| `sports` | id, nom, description, type | `nom` UNIQUE, `type` ∈ {collectif, individuel} |
| `tags` | id, nom, description | `nom` UNIQUE |
| `pages` | id, titre, resume, contenu, fiabilite, officielle, a\_la\_une, date\_modification, sport\_id | `titre` UNIQUE, `sport_id` → sports.id NOT NULL |
| `athletes` | id, nom, prenom, nationalite, date\_naissance, poste, biographie, fiabilite, officiel, a\_la\_une, sport\_id | `sport_id` → sports.id NOT NULL |
| `page_tags` | page\_id, tag\_id | clé primaire (page\_id, tag\_id), `page_id` → pages.id **ON DELETE CASCADE**, `tag_id` → tags.id |

* Les booléens sont stockés en entier (0/1) avec `integer(..., { mode: 'boolean' })` dans Drizzle.  
* Il faut activer les clés étrangères dans SQLite (`PRAGMA foreign_keys = ON`) dans `src/db/index.js`, sinon le `ON DELETE CASCADE` ne fonctionne pas.

## **Routes**

Les formulaires HTML ne savent envoyer que GET et POST, d'où des URL d'action en POST.

| Méthode | URL | Rôle | Exigence |
| ----- | ----- | ----- | ----- |
| GET | `/` | accueil, pages et athlètes à la une | F13 |
| GET | `/pages` | liste des pages (triées par titre) | F2 |
| GET | `/pages/nouvelle` | formulaire de création | F1 |
| POST | `/pages` | enregistre la nouvelle page \+ ses tags | F1, F12 |
| GET | `/pages/:id` | détail : sport, tags, boutons | F3, F12 |
| GET | `/pages/:id/modifier` | formulaire prérempli | F4 |
| POST | `/pages/:id/modifier` | met à jour la page, remplace ses tags | F4, F12 |
| POST | `/pages/:id/supprimer` | supprime la page | F5 |
| POST | `/pages/:id/une` | inverse `a_la_une` | F14 |
| GET | `/athletes` | liste (triée par nom, prénom) | F7 |
| GET | `/athletes/nouveau` | formulaire de création | F6 |
| POST | `/athletes` | enregistre l'athlète | F6 |
| GET | `/athletes/:id` | détail : sport, boutons | F8 |
| GET | `/athletes/:id/modifier` | formulaire prérempli | F9 |
| POST | `/athletes/:id/modifier` | met à jour | F9 |
| POST | `/athletes/:id/supprimer` | supprime | F10 |
| POST | `/athletes/:id/une` | inverse `a_la_une` | F14 |
| GET | `/sports` | liste des sports | N2 |
| GET | `/sports/:id` | sport \+ ses pages | F11 |
| GET | `/sports/:id/athletes` | sport \+ ses athlètes | F11 |
| GET | `/tags` | liste des tags | N2 |
| GET | `/tags/:id` | tag \+ ses pages | F12 |

**Modifier les tags d'une page (F12)** : le formulaire affiche une case à cocher par tag (`name="tags"`). À l'enregistrement, on supprime toutes les lignes `page_tags` de la page, puis on insère celles cochées. Attention : une seule case cochée arrive sous forme de chaîne, plusieurs sous forme de tableau → toujours normaliser en tableau.

## **Gestion des erreurs (N4)**

| Situation | Réponse | Vue |
| ----- | ----- | ----- |
| `id` non numérique dans l'URL (`/pages/abc`) | `res.status(400)` | `erreurs/400.hbs` |
| `id` inexistant (`/pages/9999`) ou URL inconnue | `res.status(404)` | `erreurs/404.hbs` |
| Erreur inattendue (bug, requête SQL qui échoue) | `res.status(500)` via le middleware d'erreur | `erreurs/500.hbs` |
| Formulaire invalide (champ vide, titre déjà pris) | `res.status(400)` et on **réaffiche le formulaire** avec un message et les valeurs saisies | `pages/formulaire.hbs` ou `athletes/formulaire.hbs` |

* Pour un formulaire invalide, on n'affiche pas la page 400 : l'utilisateur perdrait sa saisie.  
* Ordre à la fin de `server.js` : toutes les routes, puis le middleware 404, puis le middleware d'erreur 500 (4 paramètres : `err, req, res, next`).  
* Après chaque POST réussi → `res.redirect(...)` vers la page de détail ou la liste.

---

## **Répartition des tâches**

Chacun prend une partie « verticale » (base de données, contrôleur, route, vue) pour comprendre toute la chaîne. **Tout le monde peut être interrogé sur n'importe quelle partie** : chaque Pull Request est relue par un autre membre, qui doit pouvoir l'expliquer.

### **Kerouann — Socle et base de données**

* Créer le dépôt GitHub **public**, `package.json`, `.gitignore`, structure des dossiers  
* `src/db/schema.js`, `index.js`, `migrate.js`, `drizzle.config.js`  
* `src/db/seed.js` (la logique : test « table sports vide », insertion, liens `page_tags`)  
* Données du seed : `sports.js` et `tags.js`  
* Contrôleur, routes et vues **Sports** : `/sports`, `/sports/:id`, `/sports/:id/athletes` (F11)  
* Tenir le README à jour (section Lancement)

### **Lucas — Entité A : Pages**

* Contrôleur, routes et vues : liste, détail, création, modification, suppression (F1 à F5)  
* Cases à cocher des tags et mise à jour de `page_tags` (F12 côté page)  
* Validation du formulaire (champs obligatoires, titre unique), passage de `officielle` à faux et mise à jour de `date_modification`  
* Bouton « Mettre à la une » sur une page (F14)

### **Ryan — Entité B : Athlètes**

* Contrôleur, routes et vues : liste, détail, création, modification, suppression (F6 à F10)  
* Validation du formulaire (champs obligatoires, format de date), passage de `officiel` à faux  
* Bouton « Mettre à la une » sur un athlète (F14)  
* Tri par nom puis prénom (N3)

### **Shahine — Interface, accueil et tags**

* `server.js` : configuration Handlebars, helpers, middlewares 404 et 500 (N4)  
* Vues `erreurs/400.hbs`, `erreurs/404.hbs`, `erreurs/500.hbs`  
* Layout `main.hbs`, navigation `nav.hbs` (N1), CSS  
* Partials : badge de fiabilité, badge « officielle », cartes page / athlète  
* Page d'accueil avec les deux blocs « à la une » (F13)  
* Contrôleur, routes et vues **Tags** : `/tags`, `/tags/:id` (F12 côté tag)

### **Contenu du seed (tout le monde)**

Chacun rédige **3 pages et 3 athlètes** (textes courts mais réalistes, infos publiques et vérifiables) dans `src/db/data/pages.js` et `athletes.js` :

| Membre | Sports |
| ----- | ----- |
| Shahine | Football \+ 1 page Tennis |
| Lucas | Basketball \+ 1 page Natation |
| Ryan | Rugby, Cyclisme |
| Kerouann | Tennis, Natation |

Chaque page doit avoir 1 à 3 tags. Choisir ensemble les 3 pages et les 3 athlètes à la une.

## **Planning**

Rendu : **vendredi 4 décembre 2026**.

| Dates | Étape | Qui |
| ----- | ----- | ----- |
| **lun. 23 nov.** | Décisions communes (ESM ou CommonJS, MVC), relance du professeur si le sujet n'est pas validé | Tous |
| **lun. 23 – mar. 24 nov.** | Socle : dépôt, schéma, migrations, seed des sports et tags. Objectif : `npm install`, `npm run setup`, `npm start` fonctionnent | Kerouann |
| lun. 23 – mar. 24 nov. | `server.js`, layout, nav, pages d'erreur, CSS de base | Shahine |
| lun. 23 – mar. 24 nov. | Vues Pages / Athlètes avec données en dur \+ textes du seed | Lucas, Ryan |
| **mer. 25 – dim. 29 nov.** | Fonctionnalités, dans l'ordre : liste et détail → création → modification → suppression → à la une | Chacun sa partie |
| **lun. 30 nov. – mar. 1 déc.** | Intégration : tests de toutes les actions, cas d'erreur (N4), liens cliquables (N2), tris (N3) | Tous |
| **mer. 2 déc.** | README complet (correspondance), **test depuis un clone vierge sur une autre machine** | Kerouann \+ un autre |
| **jeu. 3 déc.** | Gel du code. Révision de l'oral : chacun explique à voix haute une partie codée par un autre | Tous |
| **ven. 4 déc.** | Rendu | — |

### **Fonctionnement git**

* Branche `main` toujours fonctionnelle.  
* Une branche par fonctionnalité : `feat/socle`, `feat/pages-crud`, `feat/athletes-crud`…  
* Une Pull Request par fonctionnalité, **relue et approuvée par un autre membre** avant fusion.  
* Un seul `schema.js`, modifié uniquement par Kerouann (les autres lui demandent).  
* Ne jamais commiter `node_modules/` ni `sportheub.db`.