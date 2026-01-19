# LocalLoop - Backend

Backend Node.js/Express pour l'application web **LocalLoop**.

**Localloop** est une application web de **parcours de découverte participatifs**.

Les utilisateurs peuvent créer leurs propres parcours composés d’étapes, découvrir ceux proposés par la communauté et sauvegarder leurs favoris.
L’objectif est de favoriser la **découverte** et l’**échange d’expériences** autour des lieux et des monuments locaux.

Ce backend utilise une interface front développée dans un repository frontend séparé, disponible via ce lien :

  ```bash
   https://github.com/sophie-rud/localloop-app.git
   ```

---

## Sommaire
- [Technologies](#technologies)
- [Variables d'environnement](#variables-denvironnement)
- [Installation et lancement](#installation-et-lancement)
- [Structure du projet](#structure-du-projet)
- [Spécifications de l'API REST](#spécifications-de-lapi-rest)
- [Déploiement](#déploiement)

---

## Technologies

- **Backend :** Node.js, Express, PostgreSQL, Prisma, JWT
- **Frontend :** React, React Router, Zustand, Leaflet, Lucide Icons
- **UI / Styles :** modules CSS

---

## Variables d'environnement

Créer un fichier `.env` à la racine, sur le modèle du fichier `.env.test`
en remplaçant les valeurs par vos informations locales.

---

## Installation et lancement

Pour lancer le projet en local :

Cloner le repo :
```bash
git clone https://github.com/sophie-rud/localloop-backend.git
```

Installer les dépendances :
```bash
npm install
```

Générer le prisma client :
```bash
npx prisma generate
```

Lancer les migrations :
```bash
npx prisma migrate dev
```

[Optionnel] Lancer le seed :
```bash
node prisma/seed-postgresql.js
```

Lancer le serveur :
```bash
nodemon app.js
```

Le serveur sera accessible sur http://localhost:3000 (ou sur le port indiqué par le terminal).

### Base de données

Pour utiliser le projet en local, il faut créer une base de données PostgreSQL :

- Installer PostgreSQL si nécessaire
- Créer une base nommée localloop
- Configurer la variable DATABASE_URL dans .env
- Les données sont locales et seront perdues si la base est supprimée

Les migrations Prisma créent automatiquement les tables nécessaires avec la commande `npx prisma migrate dev`.

---

## Structure du projet
```bash
src/
  ├─ config/        # Configuration prisma
  ├─ controllers/   # Reçoivent les requêtes et renvoient les réponses
  ├─ generated/     # Fichiers générés par Prisma
  ├─ middlewares/   # Auth, erreurs, validations...
  ├─ prisma/        # Schéma prisma, migrations et seed
  ├─ repositories/  # Accès à la base de données via Prisma
  ├─ routes/        # Définition des routes
  ├─ services/      # Logique métier
  ├─ uploads/       # Fichiers uploadés par les utilisateurs
  ├─ utils/         # Fonctions utilitaires
  ├─ .env.test      # Exemple de fichier .env
  └─ app.js         # Point d'entrée du serveur
```

---

## Spécifications de l'API REST

La documentation complète de l’API se trouve dans le repository, dans le fichier **spec_api.md**.

---

## Déploiement

Le projet a été déployé sur un serveur public.

À la date du rendu, la version déployée est en cours de validation en raison d’un problème de configuration serveur (SSL).
L’application est fonctionnelle en environnement local.

---