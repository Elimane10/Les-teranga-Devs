# API TerrangaFood - Documentation

## Base URL

http://localhost:3001/api

## Etat actuel du projet

- Routes actives dans l'API: restaurants, plats
- Les fichiers Commande et commandeController existent, mais la route commandes n'est pas encore branchee dans app.js

## Endpoints Restaurants (actifs)

| Methode | Endpoint | Description |
| --- | --- | --- |
| GET | /api/restaurants | Lister les restaurants |
| GET | /api/restaurants/:id | Detail d'un restaurant |
| POST | /api/restaurants | Creer un restaurant |
| PUT | /api/restaurants/:id | Modifier un restaurant |
| DELETE | /api/restaurants/:id | Supprimer un restaurant |

## Endpoints Plats (actifs)

| Methode | Endpoint | Description |
| --- | --- | --- |
| GET | /api/plats | Lister les plats |
| GET | /api/plats/:id | Detail d'un plat |
| GET | /api/plats/restaurant/:restaurantId | Lister les plats d'un restaurant |
| POST | /api/plats | Creer un plat |
| PUT | /api/plats/:id | Modifier un plat |
| DELETE | /api/plats/:id | Supprimer un plat |

## Endpoints Commandes (prets dans le code, non exposes actuellement)

Ces endpoints correspondent au commandeController, mais ne sont pas encore accessibles tant que la route n'est pas ajoutee et montee dans app.js.

| Methode | Endpoint | Description |
| --- | --- | --- |
| POST | /api/commandes | Creer une commande |
| GET | /api/commandes | Lister les commandes |
| GET | /api/commandes/:id | Detail d'une commande |
| PATCH | /api/commandes/:id/statut | Changer le statut |
| DELETE | /api/commandes/:id | Supprimer une commande |

### POST /api/commandes

Corps de requete (JSON):

```json
{
  "client": "Moussa Diop",
  "telephone": "+221771234567",
  "adresseLivraison": "Keur Gorgui, Villa 12",
  "restaurant": "ID_RESTAURANT",
  "plats": ["ID_PLAT_1", "ID_PLAT_2"],
  "montantTotal": 4500,
  "commentaire": "Sans piment"
}
```

Reponse succes (201):

```json
{
  "_id": "6630f9f6a7f9b41f7b8f0c11",
  "client": "Moussa Diop",
  "telephone": "+221771234567",
  "adresseLivraison": "Keur Gorgui, Villa 12",
  "restaurant": "6630f8e9a7f9b41f7b8f0b01",
  "plats": ["6630f93da7f9b41f7b8f0b90"],
  "montantTotal": 4500,
  "statut": "en attente",
  "commentaire": "Sans piment",
  "createdAt": "2026-04-23T10:14:00.000Z",
  "updatedAt": "2026-04-23T10:14:00.000Z"
}
```

Reponse erreur validation (400):

```json
{
  "message": "Données invalides",
  "erreurs": ["Le téléphone est obligatoire"]
}
```

### GET /api/commandes

Reponse succes (200):

```json
[
  {
    "_id": "6630f9f6a7f9b41f7b8f0c11",
    "client": "Moussa Diop",
    "restaurant": {
      "_id": "6630f8e9a7f9b41f7b8f0b01",
      "nom": "Chez Aida",
      "adresse": "Dakar"
    },
    "plats": [
      {
        "_id": "6630f93da7f9b41f7b8f0b90",
        "nom": "Thiebou Dieune",
        "prix": 2500
      }
    ],
    "montantTotal": 4500,
    "statut": "en attente"
  }
]
```

### GET /api/commandes/:id

Reponse succes (200):

```json
{
  "_id": "6630f9f6a7f9b41f7b8f0c11",
  "client": "Moussa Diop",
  "restaurant": {
    "_id": "6630f8e9a7f9b41f7b8f0b01",
    "nom": "Chez Aida",
    "adresse": "Dakar",
    "telephone": "+221338000000"
  },
  "plats": [
    {
      "_id": "6630f93da7f9b41f7b8f0b90",
      "nom": "Thiebou Dieune",
      "prix": 2500,
      "categorie": "plat"
    }
  ],
  "montantTotal": 4500,
  "statut": "en attente"
}
```

Reponse non trouvee (404):

```json
{
  "message": "Commande non trouvée"
}
```

### PATCH /api/commandes/:id/statut

Corps de requete (JSON):

```json
{
  "statut": "confirmée"
}
```

Reponse succes (200): commande mise a jour.

Reponse erreur (400) si transition invalide:

```json
{
  "message": "Transition impossible",
  "details": "\"en attente\" ne peut pas devenir \"livrée\"",
  "transitionsAutorisees": ["confirmée", "annulée"]
}
```

### DELETE /api/commandes/:id

Reponse succes (200):

```json
{
  "message": "Commande supprimée avec succès"
}
```

Reponse non trouvee (404):

```json
{
  "message": "Commande non trouvée"
}
```

### Transitions de statut autorisees

- en attente -> confirmee -> en livraison -> livree
- en attente -> annulee
- confirmee -> annulee

### Codes HTTP

- 200: succes
- 201: ressource creee
- 400: donnees invalides ou transition interdite
- 404: ressource non trouvee
- 500: erreur serveur

## Option pour activer Commandes

Pour exposer vraiment les endpoints commandes, il faut:

1. Creer api/src/routes/commandes.js
2. Ajouter dans api/src/app.js:

```js
const commandeRoutes = require('./routes/commandes');
app.use('/api/commandes', commandeRoutes);
```
