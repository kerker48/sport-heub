// Données du seed : les athlètes.
// Chacun ajoute les siens à la suite dans le tableau.
// "sport" contient le NOM du sport : le seed retrouve son id.
// fiabilite et officiel ne sont pas indiqués ici : le seed met "verifie" et true pour tous.
export const athletesData = [
  // ---------- Rugby (Ryan) ----------
  {
    nom: 'Dupont',
    prenom: 'Antoine',
    nationalite: 'Française',
    dateNaissance: '1996-11-15',
    poste: 'Demi de mêlée',
    biographie:
      "Né à Lannemezan, dans les Hautes-Pyrénées, Antoine Dupont a grandi à Castelnau-Magnoac, où il a commencé le rugby à 4 ans. " +
      "Formé à Auch, il joue au Stade Toulousain et est le capitaine du XV de France. " +
      "Il a été élu meilleur joueur du monde World Rugby en 2021. " +
      "En 2024, il a remporté la médaille d'or olympique en rugby à sept aux Jeux de Paris.",
    sport: 'Rugby',
    aLaUne: true,
  },
  {
    nom: 'Wilkinson',
    prenom: 'Jonny',
    nationalite: 'Britannique (Angleterre)',
    dateNaissance: '1979-05-25',
    poste: "Demi d'ouverture",
    biographie:
      "Né à Frimley, en Angleterre, Jonny Wilkinson est l'un des plus grands buteurs de l'histoire du rugby. " +
      "Le 22 novembre 2003 à Sydney, il offre la Coupe du monde à l'Angleterre grâce à un drop dans les dernières secondes de la prolongation face à l'Australie (20-17). " +
      "Il dispute une deuxième finale de Coupe du monde en 2007. " +
      "Arrivé à Toulon en 2009, il y remporte la Coupe d'Europe en 2013 et en 2014.",
    sport: 'Rugby',
    aLaUne: false,
  },

  // ---------- Cyclisme (Ryan) ----------
  {
    nom: 'Pogačar',
    prenom: 'Tadej',
    nationalite: 'Slovène',
    dateNaissance: '1998-09-21',
    poste: 'Coureur sur route (grimpeur, leader de classement général)',
    biographie:
      "Coureur slovène de l'équipe UAE Team Emirates, Tadej Pogačar est considéré comme le cycliste le plus dominant de sa génération. " +
      "Il a remporté le Tour de France à quatre reprises : en 2020, 2021, 2024 et 2025. " +
      "En 2025, il s'impose avec 4 minutes et 24 secondes d'avance sur le Danois Jonas Vingegaard. " +
      "Il est également devenu champion du monde sur route en 2024.",
    sport: 'Cyclisme',
    aLaUne: false,
  },
];