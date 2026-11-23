import express from 'express';
import { engine } from 'express-handlebars';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as helpers from './helpers.js';

// Import des routes (on les décommentera au fur et à mesure)
import homeRoutes from './routes/home.js';
import tagsRoutes from './routes/tags.js';
// import pagesRoutes from './routes/pages.js';       // Lucas
// import athletesRoutes from './routes/athletes.js'; // Ryan
// import sportsRoutes from './routes/sports.js';     // Kerouann

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
  partialsDir: path.join(__dirname, '..', 'views', 'partials'),
  helpers,
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'views'));

// Montage des routes
app.use('/', homeRoutes);
app.use('/tags', tagsRoutes);
// app.use('/pages', pagesRoutes);
// app.use('/athletes', athletesRoutes);
// app.use('/sports', sportsRoutes);

// Middleware 404
app.use((req, res) => {
  res.status(404).render('erreurs/404', { titre: 'Introuvable', url: req.originalUrl });
});

// Middleware 500 (4 paramètres obligatoires)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('erreurs/500', { titre: 'Erreur serveur' });
});

app.listen(PORT, () => console.log('✅ Serveur Sport"heub" sur http://localhost:' + PORT));