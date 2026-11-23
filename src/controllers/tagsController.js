import { db } from '../db/index.js';
import { tags, pages, pageTags } from '../db/schema.js';
import { eq, asc } from 'drizzle-orm';

// GET /tags
export async function liste(req, res, next) {
  try {
    const tousLesTags = await db.select().from(tags).orderBy(asc(tags.nom));
    res.render('tags/liste', { titre: 'Tags', tags: tousLesTags });
  } catch (err) {
    next(err);
  }
}

// GET /tags/:id
export async function detail(req, res, next) {
  try {
    const id = Number(req.params.id);
    
    // N4 : si l'id n'est pas un nombre (ex: /tags/abc), on renvoie une erreur 400
    if (Number.isNaN(id)) {
      return res.status(400).render('erreurs/400', { titre: 'Requête invalide' });
    }

    // On cherche le tag
    const [tag] = await db.select().from(tags).where(eq(tags.id, id));

    // N4 : si le tag n'existe pas (ex: /tags/9999), on renvoie une erreur 404
    if (!tag) {
      return res.status(404).render('erreurs/404', { titre: 'Tag introuvable', url: req.originalUrl });
    }

    // On cherche les pages associées à ce tag
    const pagesLiees = await db
      .select({
        id: pages.id,
        titre: pages.titre,
        resume: pages.resume,
        fiabilite: pages.fiabilite,
        officielle: pages.officielle,
      })
      .from(pages)
      .innerJoin(pageTags, eq(pageTags.pageId, pages.id))
      .where(eq(pageTags.tagId, id))
      .orderBy(asc(pages.titre));

    res.render('tags/detail', { titre: tag.nom, tag: tag, pages: pagesLiees });
  } catch (err) {
    next(err);
  }
}