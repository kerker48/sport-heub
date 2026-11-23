// Noms affichés dans les messages d'erreur
const LIBELLES = {
  nom: 'Nom', prenom: 'Prénom', nationalite: 'Nationalité',
  dateNaissance: 'Date de naissance', poste: 'Poste', biographie: 'Biographie', sportId: 'Sport',
};

// Vérifie les données envoyées par le formulaire athlète.
// Renvoie un tableau de messages d'erreur (vide si tout est correct).
export function validerAthlete(donnees) {
  const erreurs = [];

  // Champs obligatoires : ni absents, ni remplis d'espaces
  for (const champ of Object.keys(LIBELLES)) {
    if (!donnees[champ] || String(donnees[champ]).trim() === '') {
      erreurs.push(`Le champ « ${LIBELLES[champ]} » est obligatoire.`);
    }
  }

  // Date au format AAAA-MM-JJ (celui envoyé par <input type="date">)
  if (donnees.dateNaissance && !/^\d{4}-\d{2}-\d{2}$/.test(donnees.dateNaissance)) {
    erreurs.push('La date de naissance doit être au format AAAA-MM-JJ.');
  }

  // Fiabilité : uniquement les 3 valeurs autorisées
  if (!['verifie', 'non_verifie', 'fake'].includes(donnees.fiabilite)) {
    erreurs.push('La fiabilité choisie est invalide.');
  }

  return erreurs;
}