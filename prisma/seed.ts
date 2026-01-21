import { Difficulty } from "@prisma/client";
import { prisma } from "../src/lib/db";

async function main() {
  console.log("Start seeding challenges...");

  /* Clean up existing challenges */
  await prisma.question.deleteMany({});
  await prisma.challenge.deleteMany({});

  const challenges = [
    {
      title: "Histoire de France",
      description: "Testez vos connaissances sur l'histoire de France.",
      difficulty: Difficulty.MEDIUM,
      xp: 200,
      tags: ["histoire", "france", "culture"],
      questions: [
        {
          question: "Qui fut le premier roi de France ?",
          options: ["Charlemagne", "Clovis", "Louis XIV", "Napoléon"],
          answer: 1,
        },
        {
          question: "En quelle année a eu lieu la prise de la Bastille ?",
          options: ["1789", "1799", "1804", "1776"],
          answer: 0,
        },
        {
          question: "Qui est surnommé le Roi-Soleil ?",
          options: ["Louis XIII", "Louis XIV", "Louis XVI", "Henri IV"],
          answer: 1,
        },
        {
          question: "Quelle guerre a duré de 1337 à 1453 ?",
          options: [
            "La Guerre de Cent Ans",
            "La Guerre de Trente Ans",
            "La Première Guerre mondiale",
            "Les Guerres de religion",
          ],
          answer: 0,
        },
        {
          question: "Qui a instauré le Code Civil ?",
          options: [
            "De Gaulle",
            "Robespierre",
            "Napoléon Bonaparte",
            "François Ier",
          ],
          answer: 2,
        },
        {
          question: "Quelle héroïne a délivré Orléans en 1429 ?",
          options: [
            "Jeanne d'Arc",
            "Aliénor d'Aquitaine",
            "Marie-Antoinette",
            "Olympe de Gouges",
          ],
          answer: 0,
        },
        {
          question:
            "En quelle année la France a-t-elle remporté sa première Coupe du Monde de football ?",
          options: ["1986", "1998", "2006", "2018"],
          answer: 1,
        },
        {
          question: "Qui a été le premier président de la Ve République ?",
          options: [
            "François Mitterrand",
            "Georges Pompidou",
            "Charles de Gaulle",
            "Valéry Giscard d'Estaing",
          ],
          answer: 2,
        },
        {
          question: "Quel roi a été guillotiné en 1793 ?",
          options: ["Louis XVI", "Louis XV", "Louis XIV", "Henri III"],
          answer: 0,
        },
        {
          question: "Quel traité a mis fin à la Première Guerre mondiale ?",
          options: [
            "Le traité de Rome",
            "Le traité de Verdun",
            "Le traité de Versailles",
            "Le traité de Paris",
          ],
          answer: 2,
        },
      ],
    },
    {
      title: "Géographie Mondiale",
      description: "Connaissez-vous bien notre planète ?",
      difficulty: Difficulty.MEDIUM,
      xp: 200,
      tags: ["géographie", "monde", "voyage"],
      questions: [
        {
          question: "Quel est le plus grand pays du monde par superficie ?",
          options: ["Chine", "États-Unis", "Canada", "Russie"],
          answer: 3,
        },
        {
          question: "Quelle est la capitale de l'Australie ?",
          options: ["Sydney", "Melbourne", "Canberra", "Perth"],
          answer: 2,
        },
        {
          question: "Quel fleuve traverse l'Égypte ?",
          options: ["L'Amazone", "Le Nil", "Le Yangzi Jiang", "Le Mississipi"],
          answer: 1,
        },
        {
          question: "Dans quel pays se trouve le Machu Picchu ?",
          options: ["Chili", "Pérou", "Bolivie", "Équateur"],
          answer: 1,
        },
        {
          question: "Quel est le plus haut sommet du monde ?",
          options: ["Mont Blanc", "K2", "Everest", "Kilimandjaro"],
          answer: 2,
        },
        {
          question: "Quelle mer sépare l'Europe de l'Afrique ?",
          options: [
            "La mer Rouge",
            "La mer Noire",
            "La mer Méditerranée",
            "La mer Caspienne",
          ],
          answer: 2,
        },
        {
          question: "Combien y a-t-il d'États aux États-Unis ?",
          options: ["48", "50", "52", "49"],
          answer: 1,
        },
        {
          question: "Quelle est la capitale du Japon ?",
          options: ["Osaka", "Tokyo", "Kyoto", "Hiroshima"],
          answer: 1,
        },
        {
          question: "Quel pays a la forme d'une botte ?",
          options: ["L'Espagne", "Le Portugal", "La Grèce", "L'Italie"],
          answer: 3,
        },
        {
          question: "Sur quel continent se trouve le désert du Sahara ?",
          options: ["Asie", "Amérique", "Afrique", "Australie"],
          answer: 2,
        },
      ],
    },
    {
      title: "Sciences & Nature",
      description: "Explorez les mystères de la science et de la nature.",
      difficulty: Difficulty.HARD,
      xp: 250,
      tags: ["science", "nature", "biologie", "physique"],
      questions: [
        {
          question:
            "Quel gaz les plantes absorbent-elles pour la photosynthèse ?",
          options: ["Oxygène", "Azote", "Dioxyde de carbone", "Hydrogène"],
          answer: 2,
        },
        {
          question:
            "Quel est l'élément chimique le plus abondant dans l'univers ?",
          options: ["Hydrogène", "Hélium", "Carbone", "Oxygène"],
          answer: 0,
        },
        {
          question: "Combien de planètes composent notre système solaire ?",
          options: ["7", "8", "9", "10"],
          answer: 1,
        },
        {
          question: "Quelle est la vitesse de la lumière (environ) ?",
          options: ["300 000 km/s", "150 000 km/s", "1 000 km/s", "3 000 km/s"],
          answer: 0,
        },
        {
          question: "Quel organe pompe le sang dans le corps humain ?",
          options: ["Le foie", "Le cerveau", "Les poumons", "Le coeur"],
          answer: 3,
        },
        {
          question: "Quelle est la formule chimique de l'eau ?",
          options: ["H2O", "CO2", "O2", "NaCl"],
          answer: 0,
        },
        {
          question: "Qui a formulé la théorie de la relativité ?",
          options: [
            "Isaac Newton",
            "Albert Einstein",
            "Galilée",
            "Nikola Tesla",
          ],
          answer: 1,
        },
        {
          question: "Quel animal est le plus grand mammifère marin ?",
          options: [
            "Le requin baleine",
            "La baleine bleue",
            "L'orque",
            "Le cachalot",
          ],
          answer: 1,
        },
        {
          question:
            "A quelle température l'eau bout-elle (au niveau de la mer) ?",
          options: ["90°C", "100°C", "110°C", "120°C"],
          answer: 1,
        },
        {
          question: "Quelle partie de l'atome a une charge positive ?",
          options: ["Électron", "Neutron", "Proton", "Photon"],
          answer: 2,
        },
      ],
    },
    {
      title: "Cinéma & Séries",
      description: "Pour les cinéphiles incollables.",
      difficulty: Difficulty.EASY,
      xp: 150,
      tags: ["cinéma", "film", "culture pop"],
      questions: [
        {
          question: "Qui a réalisé 'Titanic' ?",
          options: [
            "Steven Spielberg",
            "James Cameron",
            "Christopher Nolan",
            "Martin Scorsese",
          ],
          answer: 1,
        },
        {
          question: "Dans 'Star Wars', qui est le père de Luke Skywalker ?",
          options: ["Obi-Wan Kenobi", "Yoda", "L'Empereur", "Dark Vador"],
          answer: 3,
        },
        {
          question:
            "Quel film a remporté l'Oscar du meilleur film en 2020 (film sud-coréen) ?",
          options: ["Roma", "Parasite", "1917", "Joker"],
          answer: 1,
        },
        {
          question: "Quel acteur incarne Iron Man dans le MCU ?",
          options: [
            "Chris Evans",
            "Chris Hemsworth",
            "Robert Downey Jr.",
            "Mark Ruffalo",
          ],
          answer: 2,
        },
        {
          question:
            "Dans 'Harry Potter', comment s'appelle l'école de sorcellerie ?",
          options: ["Beauxbâtons", "Durmstrang", "Poudlard", "Ilvermorny"],
          answer: 2,
        },
        {
          question: "Quel film d'animation met en scène des jouets vivants ?",
          options: ["Shrek", "Toy Story", "Nemo", "Cars"],
          answer: 1,
        },
        {
          question: "Qui joue Jack Sparrow dans 'Pirates des Caraïbes' ?",
          options: ["Orlando Bloom", "Brad Pitt", "Johnny Depp", "Tom Cruise"],
          answer: 2,
        },
        {
          question: "Quel est le nom du lion dans 'Le Roi Lion' ?",
          options: ["Mufasa", "Scar", "Simba", "Timon"],
          answer: 2,
        },
        {
          question:
            "Quelle série met en scène des dragons et le trône de fer ?",
          options: [
            "The Witcher",
            "Lord of the Rings",
            "Game of Thrones",
            "Vikings",
          ],
          answer: 2,
        },
        {
          question: "Quel agent secret porte le matricule 007 ?",
          options: ["Ethan Hunt", "Jason Bourne", "James Bond", "Jack Ryan"],
          answer: 2,
        },
      ],
    },
    {
      title: "Musique",
      description: "Testez votre rythme et vos connaissances musicales.",
      difficulty: Difficulty.EASY,
      xp: 150,
      tags: ["musique", "art", "chanson"],
      questions: [
        {
          question: "Qui est surnommé le 'Roi de la Pop' ?",
          options: [
            "Elvis Presley",
            "Prince",
            "Michael Jackson",
            "Freddie Mercury",
          ],
          answer: 2,
        },
        {
          question: "Combien de cordes a une guitare standard ?",
          options: ["4", "5", "6", "7"],
          answer: 2,
        },
        {
          question: "Quel groupe a chanté 'Let It Be' ?",
          options: ["The Rolling Stones", "The Beatles", "Queen", "U2"],
          answer: 1,
        },
        {
          question: "Quel compositeur est devenu sourd à la fin de sa vie ?",
          options: ["Mozart", "Bach", "Beethoven", "Chopin"],
          answer: 2,
        },
        {
          question: "Qui chante 'La Vie en rose' ?",
          options: ["Édith Piaf", "Céline Dion", "Mireille Mathieu", "Dalida"],
          answer: 0,
        },
        {
          question: "Quel instrument joue-t-on avec un archet ?",
          options: ["Guitare", "Piano", "Violon", "Saxophone"],
          answer: 2,
        },
        {
          question: "De quel pays vient le groupe ABBA ?",
          options: ["Norvège", "Suède", "Danemark", "Finlande"],
          answer: 1,
        },
        {
          question: "Quel style de musique est né à la Nouvelle-Orléans ?",
          options: ["Rock", "Jazz", "Reggae", "Techno"],
          answer: 1,
        },
        {
          question: "Qui est l'interprète de 'Thriller' ?",
          options: [
            "Madonna",
            "Stevie Wonder",
            "Michael Jackson",
            "David Bowie",
          ],
          answer: 2,
        },
        {
          question: "Quel rappeur américain s'appelle Marshall Mathers ?",
          options: ["Jay-Z", "Snoop Dogg", "Eminem", "50 Cent"],
          answer: 2,
        },
      ],
    },
    {
      title: "Littérature Classique",
      description: "Les grands auteurs et leurs oeuvres.",
      difficulty: Difficulty.HARD,
      xp: 250,
      tags: ["littérature", "livre", "lecture"],
      questions: [
        {
          question: "Qui a écrit 'Les Misérables' ?",
          options: [
            "Émile Zola",
            "Honoré de Balzac",
            "Victor Hugo",
            "Gustave Flaubert",
          ],
          answer: 2,
        },
        {
          question: "Quel dramaturge a écrit 'Roméo et Juliette' ?",
          options: ["Molière", "William Shakespeare", "Racine", "Corneille"],
          answer: 1,
        },
        {
          question: "Qui est l'auteur de 'Le Petit Prince' ?",
          options: [
            "Antoine de Saint-Exupéry",
            "Jules Verne",
            "Albert Camus",
            "Marcel Proust",
          ],
          answer: 0,
        },
        {
          question: "Dans quel roman trouve-t-on le personnage de d'Artagnan ?",
          options: [
            "Le Comte de Monte-Cristo",
            "Les Trois Mousquetaires",
            "Vingt ans après",
            "La Reine Margot",
          ],
          answer: 1,
        },
        {
          question: "Quel poète a écrit 'Les Fleurs du mal' ?",
          options: ["Rimbaud", "Verlaine", "Baudelaire", "Apollinaire"],
          answer: 2,
        },
        {
          question: "Qui a écrit '1984' ?",
          options: [
            "Aldous Huxley",
            "Ray Bradbury",
            "George Orwell",
            "Isaac Asimov",
          ],
          answer: 2,
        },
        {
          question:
            "Quel est le nom du détective créé par Arthur Conan Doyle ?",
          options: [
            "Hercule Poirot",
            "Sherlock Holmes",
            "Miss Marple",
            "Arsène Lupin",
          ],
          answer: 1,
        },
        {
          question: "Qui a écrit 'L'Étranger' ?",
          options: [
            "Jean-Paul Sartre",
            "Boris Vian",
            "Albert Camus",
            "Louis-Ferdinand Céline",
          ],
          answer: 2,
        },
        {
          question: "Quel auteur a écrit 'Harry Potter' ?",
          options: [
            "J.R.R. Tolkien",
            "J.K. Rowling",
            "Stephen King",
            "George R.R. Martin",
          ],
          answer: 1,
        },
        {
          question: "Dans quelle ville se déroule 'Notre-Dame de Paris' ?",
          options: ["Lyon", "Marseille", "Paris", "Rouen"],
          answer: 2,
        },
      ],
    },
    {
      title: "Sport",
      description: "Êtes-vous un champion ?",
      difficulty: Difficulty.EASY,
      xp: 150,
      tags: ["sport", "compétition", "jeux olympiques"],
      questions: [
        {
          question:
            "Combien de joueurs y a-t-il dans une équipe de football (sur le terrain) ?",
          options: ["9", "10", "11", "12"],
          answer: 2,
        },
        {
          question:
            "Quel cycliste a remporté 5 fois le Tour de France (dont 4 consécutives) ?",
          options: [
            "Raymond Poulidor",
            "Bernault Hinault",
            "Lance Armstrong",
            "Eddy Merckx",
          ],
          answer: 3,
        },
        {
          question: "Dans quel sport utilise-t-on une raquette et un volant ?",
          options: ["Tennis", "Badminton", "Squash", "Ping-pong"],
          answer: 1,
        },
        {
          question: "Quel pays organise les Jeux Olympiques de 2024 ?",
          options: ["États-Unis", "Japon", "France", "Australie"],
          answer: 2,
        },
        {
          question:
            "Combien de périodes y a-t-il dans un match de hockey sur glace ?",
          options: ["2", "3", "4", "5"],
          answer: 1,
        },
        {
          question: "Qui détient le record du monde du 100m (athlétisme) ?",
          options: ["Carl Lewis", "Tyson Gay", "Usain Bolt", "Asafa Powell"],
          answer: 2,
        },
        {
          question: "Quel sport se pratique sur un tatami ?",
          options: ["Boxe", "Escrime", "Judo", "Natation"],
          answer: 2,
        },
        {
          question:
            "Combien de points vaut un panier classique au basket (hors ligne des 3 points) ?",
          options: ["1", "2", "3", "4"],
          answer: 1,
        },
        {
          question:
            "Quelle compétition de tennis se déroule sur terre battue à Paris ?",
          options: [
            "Wimbledon",
            "US Open",
            "Roland-Garros",
            "Open d'Australie",
          ],
          answer: 2,
        },
        {
          question: "Quel est le sport national de la Nouvelle-Zélande ?",
          options: ["Football", "Cricket", "Rugby", "Surf"],
          answer: 2,
        },
      ],
    },
    {
      title: "Gastronomie",
      description: "Cuisine et saveurs du monde.",
      difficulty: Difficulty.MEDIUM,
      xp: 200,
      tags: ["cuisine", "nourriture", "lifestyle"],
      questions: [
        {
          question: "Quel est l'ingrédient principal du guacamole ?",
          options: ["Tomate", "Avocat", "Oignon", "Citron"],
          answer: 1,
        },
        {
          question: "De quel pays vient la pizza ?",
          options: ["France", "États-Unis", "Italie", "Espagne"],
          answer: 2,
        },
        {
          question: "Qu'est-ce que le tofu ?",
          options: [
            "Du fromage de chèvre",
            "De la pâte de soja",
            "Du blé fermenté",
            "Un champignon",
          ],
          answer: 1,
        },
        {
          question: "Quel vin est traditionnellement pétillant ?",
          options: ["Bordeaux", "Champagne", "Bourgogne", "Côtes du Rhône"],
          answer: 1,
        },
        {
          question:
            "Quel est le plat national de l'Espagne (souvent associé à Valence) ?",
          options: ["Tapas", "Paella", "Gazpacho", "Tortilla"],
          answer: 1,
        },
        {
          question: "Avec quel légume fait-on des frites ?",
          options: ["Carotte", "Navet", "Patate douce", "Pomme de terre"],
          answer: 3,
        },
        {
          question: "Quel est l'ingrédient principal du chocolat ?",
          options: ["Sucre", "Lait", "Cacao", "Vanille"],
          answer: 2,
        },
        {
          question: "Dans quel pays mange-t-on des sushis ?",
          options: ["Chine", "Japon", "Thaïlande", "Vietnam"],
          answer: 1,
        },
        {
          question: "Quel fruit est une agrume ?",
          options: ["Pomme", "Banane", "Citron", "Fraise"],
          answer: 2,
        },
        {
          question: "Quelle épice est la plus chère du monde ?",
          options: ["Vanille", "Safran", "Cannelle", "Poivre"],
          answer: 1,
        },
      ],
    },
    {
      title: "Animaux & Nature",
      description: "Le règne animal.",
      difficulty: Difficulty.EASY,
      xp: 150,
      tags: ["animaux", "nature", "biologie"],
      questions: [
        {
          question: "Quel est l'animal le plus rapide au monde (sur terre) ?",
          options: ["Lion", "Gazelle", "Guépard", "Cheval"],
          answer: 2,
        },
        {
          question: "Combien de pattes a une araignée ?",
          options: ["6", "8", "10", "12"],
          answer: 1,
        },
        {
          question: "Quel oiseau ne peut pas voler ?",
          options: ["Aigle", "Pigeon", "Autruche", "Hirondelle"],
          answer: 2,
        },
        {
          question: "Quel animal est le symbole du WWF ?",
          options: ["Tigre", "Panda", "Éléphant", "Gorille"],
          answer: 1,
        },
        {
          question: "Comment appelle-t-on le petit du chien ?",
          options: ["Chaton", "Chiot", "Poussin", "Veau"],
          answer: 1,
        },
        {
          question: "Quel mammifère pond des oeufs ?",
          options: ["Kangourou", "Ornithorynque", "Chauve-souris", "Dauphin"],
          answer: 1,
        },
        {
          question: "Quel est le plus grand primate ?",
          options: ["Chimpanzé", "Gorille", "Orang-outan", "Babouin"],
          answer: 1,
        },
        {
          question: "Où vivent les ours polaires ?",
          options: ["Arctique", "Antarctique", "Amazonie", "Sahara"],
          answer: 0,
        },
        {
          question: "Quel reptile change de couleur ?",
          options: ["Lézard", "Caméléon", "Serpent", "Tortue"],
          answer: 1,
        },
        {
          question: "Quel insecte produit du miel ?",
          options: ["Fourmi", "Guêpe", "Abeille", "Papillon"],
          answer: 2,
        },
      ],
    },
    {
      title: "Technologie & Innovation",
      description: "Le monde numérique et les inventions.",
      difficulty: Difficulty.MEDIUM,
      xp: 200,
      tags: ["tech", "informatique", "futur"],
      questions: [
        {
          question: "Qui a fondé Microsoft ?",
          options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
          answer: 1,
        },
        {
          question: "Que signifie 'WWW' ?",
          options: [
            "World Wide Web",
            "World Web Wibe",
            "Wide World Web",
            "Web World Wide",
          ],
          answer: 0,
        },
        {
          question:
            "Quel réseau social a pour logo un oiseau bleu (anciennement) ?",
          options: ["Facebook", "Instagram", "Twitter", "Snapchat"],
          answer: 2,
        },
        {
          question: "Quelle entreprise fabrique l'iPhone ?",
          options: ["Samsung", "Google", "Apple", "Huawei"],
          answer: 2,
        },
        {
          question:
            "Quel est le moteur de recherche le plus utilisé au monde ?",
          options: ["Bing", "Yahoo", "Google", "DuckDuckGo"],
          answer: 2,
        },
        {
          question:
            "En quelle année le premier homme a-t-il marché sur la Lune ?",
          options: ["1959", "1969", "1979", "1989"],
          answer: 1,
        },
        {
          question:
            "Quel langage informatique est principalement utilisé pour le web (frontend) ?",
          options: ["Python", "Java", "C++", "JavaScript"],
          answer: 3,
        },
        {
          question: "Comment s'appelle l'IA conversationnelle d'OpenAI ?",
          options: ["Siri", "Alexa", "ChatGPT", "Cortana"],
          answer: 2,
        },
        {
          question: "Quel est le nom de la monnaie virtuelle la plus célèbre ?",
          options: ["Euro", "Dollar", "Bitcoin", "Gold"],
          answer: 2,
        },
        {
          question: "Quelle couleur est le robot R2-D2 ?",
          options: [
            "Rouge et Or",
            "Bleu et Blanc",
            "Noir et Blanc",
            "Vert et Jaune",
          ],
          answer: 1,
        },
      ],
    },
  ];

  for (const challengeData of challenges) {
    const { questions, ...data } = challengeData;
    const challenge = await prisma.challenge.create({
      data: {
        ...data,
        questions: {
          create: questions,
        },
      },
    });
    console.log(`Created challenge with id: ${challenge.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
