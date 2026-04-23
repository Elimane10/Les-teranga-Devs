# Rapport de tests - Lab 1


| # | Test | Résultat | Notes |
|---|------|----------|-------|
| 1 | POST commande valide | ✅ PASS | 201 Created, statut "en attente" |
| 2 | POST commande sans client | ✅ PASS | 400 Bad Request |
| 3 | GET toutes les commandes | ✅ PASS | 200 OK |
| 4 | GET commande par ID | ✅ PASS | 200 OK |
| 5 | GET commande ID inexistant | ✅ PASS | 404 Not Found |
| 6 | PATCH en attente → confirmée | ✅ PASS | 200 OK |
| 7 | PATCH confirmée → en livraison | ✅ PASS | 200 OK |
| 8 | PATCH en livraison → livrée | ✅ PASS | 200 OK |
| 9 | PATCH transition interdite | ✅ PASS | 400 Transition impossible |
| 10 | PATCH commande livrée | ✅ PASS | 400 transitionsAutorisees vide |
| 11 | DELETE commande | ✅ PASS | 200 Supprimée avec succès |
| 12 | Populate restaurant visible | ✅ PASS | Nom restaurant affiché |
| 13 | Populate plats visible | ✅ PASS | Nom et prix des plats affichés |