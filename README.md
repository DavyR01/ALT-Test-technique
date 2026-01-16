# Order Report – Legacy Refactoring

## 1. Installation

### Prérequis

- Node.js
- npm

### Commandes
- Installation des dépendances

```
npm install
```


## 2. Exécution

### Exécuter les tests
Cette commande exécute le test Golden Master. Ce test vérifie que la sortie du code refactoré est strictement identique, caractère par caractère, à cette référence.
```
npm test
```

### Exécuter le code legacy
```
npm run legacy
```

### Exécuter le code refactoré
Le point d’entrée du code refactoré est `src/runRef.js`.
Au démarrage du projet, ce fichier délègue temporairement au legacy afin de stabiliser le Golden Master.
```
node src/runRef.js
```

### Comparer avec le legacy (validation)
La comparaison avec le code legacy est assurée par un test Golden Master.

Lors de la première exécution des tests, le fichier de référence suivant est généré :

`legacy/expected/report.txt`



## 3. Choix de Refactoring

### Choix

### Problèmes Identifiés dans le Legacy

### Solutions Apportées

### Architecture Choisie

### Exemples Concrets



## 4.  Limites et Améliorations Possibles

### Ce qui n'a pas été fait (par manque de temps)

### Compromis Assumés

### Pistes d'Amélioration Future
