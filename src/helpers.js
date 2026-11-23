// Helpers Handlebars : fonctions utilisables dans les vues. Responsable : Shahine.

// Vrai si a et b sont égaux. Ex. : {{#if (eq id ../athlete.sportId)}}selected{{/if}}
// String() : après un formulaire invalide, sportId revient de req.body en texte ("3")
// alors que l'id du sport est un nombre (3). Sans String(), 3 === "3" serait faux.
export function eq(a, b) {
  return String(a) === String(b);
}

// Vrai si la liste contient la valeur. Ex. : cocher les tags déjà associés à une page (Lucas, F12)
export function includes(liste, valeur) {
  return Array.isArray(liste) && liste.map(String).includes(String(valeur));
}

export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('fr-FR');
}
