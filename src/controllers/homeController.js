import { db } from '../db/index.js';
import { pages, athletes, sports } from '../db/schema.js';
import { eq, asc } from 'drizzle-orm';

export async function accueil(req, res, next) {
  try {
    // 1. On récupère les pages à la une
    const pagesUne = await db
      .select({
        id: pages.id,
        titre: pages.titre,
        resume: pages.resume,
        fiabilite: pages.fiabilite,
        officielle: pages.officielle,
      })
      .from(pages)
      .where(eq(pages.aLaUne, true))
      .orderBy(asc(pages.titre));

    // 2. On récupère les athlètes à la une (triés par nom puis prénom, N3)
    const athletesUne = await db
      .select({
        id: athletes.id,
        nom: athletes.nom,
        prenom: athletes.prenom,
        nationalite: athletes.nationalite,
        poste: athletes.poste,
        fiabilite: athletes.fiabilite,
        officiel: athletes.officiel,
      })
      .from(athletes)
      .where(eq(athletes.aLaUne, true))
      .orderBy(asc(athletes.nom), asc(athletes.prenom));

    // 3. On envoie tout ça à la vue home.hbs
    res.render('home', {
      titre: 'Accueil',
      pagesUne: pagesUne,
      athletesUne: athletesUne,
    });
  } catch (err) {
    next(err); // En cas de bug SQL, ça part dans le middleware 500 de server.js
  }
}