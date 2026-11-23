// Données du seed : les pages.
// Chacun ajoute les siennes à la suite dans le tableau.
// "sport" et "tags" contiennent des NOMS, écrits exactement comme dans sports.js et tags.js.
export const pagesData = [
  // ---------- Rugby (Ryan) ----------
  {
    titre: 'Les règles du rugby à XV',
    resume: 'Les bases pour comprendre un match de rugby à XV.',
    contenu:
      "Un match de rugby à XV oppose deux équipes de quinze joueurs pendant deux mi-temps de 40 minutes. " +
      "Le but est de porter le ballon ovale derrière la ligne adverse et de l'aplatir pour marquer un essai, qui rapporte 5 points. " +
      "Après un essai, la transformation au pied rapporte 2 points ; une pénalité ou un drop en rapportent 3. " +
      "La passe à la main doit toujours aller vers l'arrière : une passe vers l'avant est une faute (un « en-avant »).",
    sport: 'Rugby',
    tags: ['Règles'],
    aLaUne: false,
  },
  {
    titre: 'Le Tournoi des Six Nations',
    resume: "La plus ancienne compétition internationale de rugby, disputée chaque hiver en Europe.",
    contenu:
      "Le Tournoi est né en 1883 sous le nom de Home Nations Championship, entre l'Angleterre, l'Écosse, l'Irlande et le pays de Galles. " +
      "La France le rejoint en 1910 et il devient le Tournoi des Cinq Nations. " +
      "Avec l'arrivée de l'Italie en 2000, il prend son nom actuel de Tournoi des Six Nations. " +
      "Une équipe qui gagne tous ses matchs réalise le Grand Chelem ; celle qui les perd tous reçoit la « cuillère de bois ».",
    sport: 'Rugby',
    tags: ['Compétitions', 'Histoire'],
    aLaUne: false,
  },

  // ---------- Cyclisme (Ryan) ----------
  {
    titre: 'Histoire du Tour de France',
    resume: 'De 1903 à aujourd’hui, la plus célèbre course cycliste du monde.',
    contenu:
      "Le Tour de France est créé en 1903 par Henri Desgrange et le journal L'Auto, pour faire vendre le quotidien. " +
      "Le premier vainqueur est le Français Maurice Garin. " +
      "Le maillot jaune, qui distingue le leader du classement général, apparaît en 1919. " +
      "Le record de victoires est de cinq, partagé par Jacques Anquetil, Eddy Merckx, Bernard Hinault et Miguel Indurain.",
    sport: 'Cyclisme',
    tags: ['Histoire', 'Compétitions', 'Records'],
    aLaUne: true,
  },
];