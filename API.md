# API TerrangaFood - Documentation

## Base URL

http://localhost:3001/api

## Etat actuel du projet

- Routes actives dans l'API: `restaurants`, `plats`
- Les fichiers `Commande` et `commandeController` existent, mais la route `commandes` n'est pas encore branchee dans `app.js`

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

Ces endpoints correspondent au `commandeController`, mais ne sont pas encore accessibles tant que la route n'est pas ajoutee et montee dans `app.js`.

| Methode | Endpoint | Description |
| --- | --- | --- |
| POST | /api/commandes | Creer une commande |
| GET | /api/commandes | Lister les commandes |
| GET | /api/commandes/:id | Detail d'une commande |
| PATCH | /api/commandes/:id/statut | Changer le statut |
| DELETE | /api/commandes/:id | Supprimer une commande |

### Exemple body - POST /api/commandes

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

1. Creer `api/src/routes/commandes.js`
2. Ajouter dans `api/src/app.js`:

```js
const commandeRoutes = require('./routes/commandes');
app.use('/api/commandes', commandeRoutes);
```
