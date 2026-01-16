# 🧾 Order Report – Legacy Refactoring

## ⚙️ 1. Installation

### 🔧 Prérequis

- Node.js
- npm

### Commandes
- Installation des dépendances

```
npm install
```



## ▶️ 2. Exécution

### 🧪 Exécuter les tests
Cette commande exécute tous les tests, dont :
- ✅ le test Golden Master (vérifie que le code refactoré produit la même sortie que le legacy)
- ✅ des tests unitaires sur les fonctions métiers extraites
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
La comparaison avec le code legacy est assurée par un test Golden Master (`golden-master.test.ts`).

Lors de la première exécution des tests, le fichier de référence suivant est généré :

`legacy/expected/report.txt`

Ce fichier devient la référence de sortie pour tous les tests futurs.

## 🧠 3. Choix de Refactoring
### ❌ Problèmes Identifiés dans le Legacy

   1. **Responsabilités non séparées** : toute la logique (lecture, calcul, affichage) est centralisée dans un seul fichier.
      - Impact : difficile à tester, à maintenir, et à faire évoluer sans risque.

   2. **Données manipulées sans typage clair** : les structures CSV sont utilisées directement.
      - Impact : erreur possible sur les noms de champs, absence de validation, lisibilité réduite.

   3. **Règles métiers cachées dans des blocs imbriqués** : logique de remise et bonus non explicites.
      - Impact : compréhension difficile, duplication potentielle, difficile à extraire ou tester.

### ✅ Solutions Apportées

   1. **Extraction de la lecture CSV**  
      - Déplacement dans un module dédié `csv.ts`
      - Permet de centraliser le parsing et d’y appliquer des types

   2. **Création de modèles typés (`models.ts`)**  
      - Types explicites pour `Customer`, `Order`, `Product`, etc.
      - Améliore l’autocomplétion, le typage, la robustesse du code

   3. **Isolation des règles de calcul (`calculate.ts`)**  
      - Extractions de fonctions pures pour `calculateVolumeDiscount` et `calculateBonus`
      - Reproduisent fidèlement la logique métier du legacy sans modification
      - Testables de manière unitaire

   4. **Séparation des I/O (`run.ts`)**  
      - Création d’un point d’entrée clair qui appelle `generateReport()`
      - Permet de tester la logique métier sans effet de bord
      - Requis pour comparer les sorties dans un test Golden Master (`runRef.js`)

### 🗂️ Architecture Choisie

Le code refactoré est structuré par **responsabilités** :
- lecture / parsing
- règles métier
- orchestration
- exécution / affichage

Signification des fichiers :
- `pricing/calculate.ts` : fonctions pures pour les règles de calcul métier (remises et bonus)
- `csv.ts` : lecture et parsing des fichiers de données CSV, centralisé
- `index.ts` : orchestration principale via la fonction `generateReport()`
- `models.ts` : définition explicite des structures manipulées (typage fort)
- `run.ts` : point d’entrée exécutable, séparé de la logique métier
- `runRef.js` : point d’entrée utilisé pour les tests de non-régression (Golden Master) ou adaptateur de test qui exécute le code refactoré via `run.ts` pour comparaison avec le legacy

Cette architecture permet de tester chaque partie isolément, de limiter les effets de bord, et de préparer l’ajout progressif des règles restantes.


### 🔍 Exemples Concrets

**Exemple 1 : Parsing CSV**
- Problème : lecture CSV inline dans le legacy, avec manipulation de chaînes
- Solution : centralisation dans `csv.ts` avec typage explicite (`Customer[]`, etc.)

**Exemple 2 : Calcul des remises**
- Problème : règles de bonus et volume codées en dur dans des `reduce`
- Solution : fonctions `calculateVolumeDiscount()` et `calculateBonus()` isolées et testables

**Exemple 3 : Point d’entrée**
- Problème : affichage et logique imbriqués dans `orderReportLegacy.ts`
- Solution : `generateReport()` dans `index.ts` + exécution via `run.ts`


## 🚧 4. Limites et Améliorations Possibles

### Ce qui n'a pas été fait (par manque de temps)
- Refactorisation complète de `generateReport()`
- Gestion avancée des erreurs sur les fichiers CSV
- Couverture de test unitaire fine sur les fonctions métier

### Compromis Assumés
- Fonction `generateReport()` simplifiée pour poser l’architecture
- Pas de validation métier approfondie sur les données d’entrée

### Pistes d'Amélioration Future
- Compléter `generateReport()` pour couvrir tous les cas du legacy
- Ajouter une vraie couverture de tests unitaires
- Rendre les règles métier configurables ou plus flexibles



## 🛠️ Note technique

Le projet est compilé en `commonjs`, avec `esModuleInterop` activé dans `tsconfig.json`.  
Cela permet d’utiliser la syntaxe moderne `import`/`export` dans les fichiers TypeScript,  
tout en garantissant la compatibilité avec `ts-node`, `ts-jest`, et les modules Node (`fs`, `path`, etc.).