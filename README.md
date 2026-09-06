# Portfolio React/Vite

Portfolio personnel de Mortadha Hassen MASMOUDI, avec pages publiques, projets, formulaire de contact et espace d'administration.

## Prerequis

- Node.js 20 ou superieur
- npm

## Installation

```bash
npm install
Copy-Item .env.example .env.local
```

Dans `.env.local`, definir l'URL de l'API :

```env
VITE_API_URL=http://localhost:4000
```

Ne jamais committer `.env.local` ni de vraies informations d'identification.

## Lancement local

Dans un premier terminal :

```bash
npm run api
```

Dans un second terminal :

```bash
npm run dev
```

L'application est ensuite disponible sur l'URL affichee par Vite.

## Scripts

```bash
npm run dev      # serveur Vite de developpement
npm run api      # json-server local sur le port 4000
npm run build    # build de production
npm run preview  # previsualisation du build
npm run lint     # ESLint
```

## Variables d'environnement

| Variable       | Description                           |
| -------------- | ------------------------------------- |
| `VITE_API_URL` | URL de l'API utilisee par le frontend |

## Limites de production

`json-server` et `db.json` servent uniquement au developpement local. Ils ne constituent pas un backend de production : les utilisateurs, les mots de passe et les donnees sont stockes sans authentification serveur ni hashage. Avant un deploiement public, remplacer cette API par un backend securise avec une vraie base de donnees et une authentification cote serveur.
