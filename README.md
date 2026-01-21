# KROMA - Backend

Le backend de l'application KROMA, responsable de l'API, de l'authentification et de la gestion des données de jeu.

Développé avec **Node.js**, **Express**, **Prisma** et **PostgreSQL**.

## Prérequis

- [Node.js](https://nodejs.org/) (Version 18+ recommandée)
- [npm](https://www.npmjs.com/)
- Une base de données [PostgreSQL](https://www.postgresql.org/) accessible.

## Installation

1.   **Naviguer vers le dossier server :**

```bash
 cd skill-forg-server
```

2.   **Installer les dépendances :**

```bash
npm install
```

   

## Configuration

1.   Créer un fichier `.env` à la racine du dossier `skill-forg-server`.
2.   Ajouter les variables suivantes :
```bash
DATABASE_URL="postgresql://admin:password123@localhost:5432/mon_projet_db?schema=public"
PORT=3000
```

## Base de Données (Prisma & Docker)

## Docker Desktop

Prérequis : Avoir Docker Desktop installé et lancé.

1. **Créer le .env à la racine (si ce n'est pas déjà fait)** :

```bash
DATABASE_URL="postgresql://admin:password123@localhost:5432/mon_projet_db?schema=public"
PORT=3000
```

2. **Démarrage de la base de données** :

```bash
docker-compose up -d
```

3.   **Initialiser la base de données :**

```bash
npx prisma migrate dev --name init
```

    4.  **(Optionnel) Générer le client Prisma :**

```bash
npx prisma generate
```

5.   **(Optionnel) Seeder la base de données :**

```bash
npx prisma db seed
```

6.   **Explorer la base de données (GUI) :**

```bash
npx prisma studio
```

Accessible à [http://localhost:51212](http://localhost:51212).

## Démarrage

### Mode Développement

Avec rechargement automatique (via nodemon) :

```bash
npm run dev
```

Le serveur démarrera sur [http://localhost:3000](http://localhost:3000).

### Mode Production

Pour compiler et lancer la version optimisée :

```bash
npm run build
npm start
```

## Structure du Projet

```bash
skill-forg-server/
├── prisma/              # Schéma de base de données et seeds
│   ├── schema.prisma    # Définition des modèles
│   └── seed.ts          # Script de seed
├── src/
│   ├── controllers/     # Logique des routes
│   ├── dto/             # Validation Zod
│   ├── middlewares/     # Middlewares Express
│   ├── services/        # Logique métier
│   ├── routes/          # Définition des endpoints API
│   ├── lib/             # Configuration des librairies (Auth, DB)
│   ├── index.ts         # Point d'entrée serveur
│   └── env.ts           # Validation des variables d'env
├── .env
├── package.json         # Dépendances
└── tsconfig.json        # Configuration TypeScript
```

## Sécurité & Performance

- **Rate Limiting** : Limite à 100 requêtes par 15min par IP pour éviter les abus.
- **Helmet** : Sécurisation des headers HTTP.
- **CORS** : Restreint aux origines de confiance (ex: Frontend local).
- **Transactions Atomic** : Les actions de jeu critiques (finir un quiz) sont protégées par des transactions DB pour éviter les incohérences.

## API Endpoints

- `GET /api/challenges` : Lister les quiz.
- `POST /api/challenges/:id/start` : Démarrer un quiz (-1 coeur).
- `POST /api/challenges/:id/complete` : Valider un quiz (+XP, +Coins).
- `GET /api/users/profile` : Obtenir le profil utilisateur.
- `POST /api/shop/buy-heart` : Acheter un coeur.

## MCD (Modèle de Données)

Un diagramme complet de la base de données est disponible dans le fichier [`MCD.md`](./MCD.md) à la racine du projet.
