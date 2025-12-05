# 🎬 CinéBook - Application de Réservation de Films

Une application mobile moderne pour réserver des billets de cinéma, découvrir des films, et gérer vos réservations. Construite avec Expo, React Native et Firebase.

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Configuration Firebase](#configuration-firebase)
- [Déploiement Docker](#déploiement-docker)
- [Configuration GitHub](#configuration-github)
- [Pages et Interfaces](#pages-et-interfaces)
- [Structure du Projet](#structure-du-projet)
- [Guide d'Utilisation](#guide-dutilisation)

---

## 🎯 Vue d'Ensemble

**CinéBook** est une plateforme complète de réservation de films permettant aux utilisateurs de :
- ✅ S'authentifier avec Firebase
- ✅ Parcourir et rechercher des films
- ✅ Consulter les détails des films et acteurs
- ✅ Réserver des billets dans les cinémas
- ✅ Commander des snacks et boissons
- ✅ Effectuer des paiements sécurisés
- ✅ Gérer leurs réservations et favoris

---

## ✨ Fonctionnalités Principales

### 🔐 Authentification
- Inscription avec email/mot de passe (Firebase)
- Connexion sécurisée
- Gestion de session avec AsyncStorage
- Messages d'erreur personnalisés
- Déconnexion

### 🎬 Exploration des Films
- Catalogue complet
- Recherche en temps réel
- Films tendances
- Filtrage par catégorie
- Notes et évaluations

### 🎫 Réservation
- Sélection des cinémas
- Choix des dates/horaires
- Sélection des places
- Commande de snacks
- Paiement sécurisé

### 👤 Profil Utilisateur
- Gestion du profil
- Liste de favoris
- Historique des réservations
- Notifications

---

## 🔧 Installation

### Prérequis
- Node.js 18+
- npm
- Git
- Compte Firebase

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/Hibahamdii/MyApp.git
cd MyApp

# 2. Installer les dépendances
npm install

# 3. Installer les dépendances Firebase
npm install firebase @react-native-firebase/app @react-native-firebase/auth

# 4. Installer les autres dépendances
npm install @tanstack/react-query lucide-react-native
npm install @nkzw/create-context-hook @react-native-async-storage/async-storage

# 5. Configurer Firebase (voir section suivante)

# 6. Lancer l'application
npm start
```

### Options de Démarrage
- **iOS**: `i`
- **Android**: `a`
- **Web**: `w`

---

## 🔐 Configuration Firebase

### 1. Créer un Projet Firebase

1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Cliquer sur "Créer un projet"
3. Nommer le projet : `CineBook`
4. Accepter les conditions et créer

### 2. Ajouter une Application Web

1. Dans Firebase Console → Settings ⚙️
2. Onglet "Vos apps"
3. Ajouter une nouvelle application Web
4. Copier la configuration

### 3. Configuration dans le Projet

Créer `config/firebase.ts` :

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

### 4. Activer Authentication

1. Firebase Console → Authentication
2. Onglet "Sign-in method"
3. Activer "Email/Password"
4. Sauvegarder

---

## 🐳 Déploiement Docker

### Construire l'Image

```bash
docker build -t cinebook:latest .
```

### Lancer le Conteneur

```bash
docker run -it -p 8081:8081 -p 19000:19000 -p 19001:19001 \
  -v $(pwd):/app \
  -v /app/node_modules \
  cinebook:latest
```

### Utiliser Docker Compose

```bash
# Démarrer
docker-compose up

# Arrêter
docker-compose down

# Logs
docker-compose logs -f
```

---

## 📦 Configuration GitHub

### 1. Créer le Repository

1. Aller sur [GitHub](https://github.com)
2. Cliquer sur "New repository"
3. Nommer : `MyApp`
4. Description : "Application de réservation de films"
5. Rendre public
6. Créer

### 2. Initialiser Git

```bash
cd MyApp
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Hibahamdii/MyApp.git
git branch -M main
git push -u origin main
```

### 3. Ajouter des Secrets GitHub

Settings → Secrets and variables → Actions

Ajouter :
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

### 4. Commits Réguliers

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

---

## 📱 Pages et Interfaces

### 1. Pages d'Authentification

**Connexion (signin.tsx)**
- Email et mot de passe
- Validation
- Gestion des erreurs
- Lien vers inscription

**Inscription (signup.tsx)**
- Création de compte
- Validation des champs
- Vérification des mots de passe
- Navigation automatique

### 2. Navigation par Onglets

**Accueil (index.tsx)**
- Films tendances
- Catégories
- Films populaires
- Acteurs

**Recherche (search.tsx)**
- Barre de recherche
- Résultats en temps réel
- Grille de films

**Cinémas (cinemas.tsx)**
- Carte interactive
- Liste des cinémas
- Distances

**Profil (profile.tsx)**
- Infos utilisateur
- Réservations
- Favoris
- Paramètres

### 3. Pages Détaillées

**Film (movie/[id].tsx)**
- Image de fond
- Synopsis
- Réalisateur
- Distribution
- Cinémas disponibles
- Horaires

**Acteur (actor/[id].tsx)**
- Photo de l'acteur
- Biographie
- Filmographie

**Réservation (booking/[id].tsx)**
- Sélection des places
- Commande de snacks
- Récapitulatif
- Total

**Paiement (payment.tsx)**
- Formulaire de carte
- Informations de facturation
- Validation

**Succès (success.tsx)**
- Confirmation
- Numéro de réservation
- Détails
- Retour accueil

### 4. Profil Utilisateur

**Favoris (profile/favorites.tsx)**
- Liste de favoris
- Suppression

**Réservations (profile/booking.tsx)**
- Historique complet
- Détails de chaque réservation
- Statut

---

## 🏗️ Structure du Projet

```
MyApp/
├── app/
│   ├── (auth)/
│   │   ├── signin.tsx
│   │   └── signup.tsx
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── search.tsx
│   │   ├── cinemas.tsx
│   │   └── profile.tsx
│   ├── movie/[id].tsx
│   ├── actor/[id].tsx
│   ├── booking/[id].tsx
│   ├── payment.tsx
│   ├── success.tsx
│   ├── profile/
│   │   ├── favorites.tsx
│   │   └── booking.tsx
│   └── _layout.tsx
├── contexts/
│   ├── AuthContext.tsx (Firebase)
│   └── UserContext.tsx
├── config/
│   └── firebase.ts
├── constants/
│   └── colors.ts
├── mocks/
│   └── movies.ts
├── types/
│   └── router.ts
├── package.json
├── tsconfig.json
├── app.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 📖 Guide d'Utilisation

### Pour les Utilisateurs

#### 1. S'inscrire
- Ouvrir l'app
- Cliquer "S'inscrire"
- Entrer email et mot de passe
- Confirmer le mot de passe
- Cliquer "S'inscrire"

#### 2. Réserver un Billet
1. Accueil → Choisir un film
2. Sélectionner cinéma et horaire
3. Choisir nombre de places
4. Ajouter snacks (optionnel)
5. Vérifier récapitulatif
6. Payer
7. Confirmation

#### 3. Gérer le Profil
- Ajouter aux favoris
- Voir historique
- Gérer paramètres
- Se déconnecter

### Pour les Développeurs

#### Stack Technologique
```
Frontend:  React Native, Expo, TypeScript
Icons:     Lucide React Native
State:     React Context, AsyncStorage
Backend:   Firebase Authentication
Build:     Docker, npm
Deploy:    GitHub, Docker Hub
```

#### Développement

```bash
# Lancer en mode dev
npm start

# Lancer les tests
npm test

# Linter
npm run lint
```

#### Structure AuthContext

```typescript
const { user, loading, error, signin, signup, logout } = useAuth();

// signin(email, password) - Se connecter
// signup(email, password) - S'inscrire
// logout() - Se déconnecter
// user - Utilisateur actuel
// loading - En cours de traitement
// error - Erreur
```

---

## 🚀 Commandes Utiles

```bash
# Installation
npm install

# Démarrage
npm start

# Linter
npm run lint

# Tests
npm test

# Docker
docker build -t cinebook:latest .
docker run -p 8081:8081 cinebook:latest
docker-compose up

# Git
git status
git add .
git commit -m "message"
git push origin main
```

---

## 🔍 Dépannage

### Erreurs Courantes

**1. "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**2. Port en utilisation**
```bash
# Chercher le processus
lsof -i :19000

# Tuer le processus
kill -9 <PID>
```

**3. Firebase non configuré**
- Vérifier `config/firebase.ts`
- Vérifier les identifiants
- Vérifier Firebase Console

**4. Problèmes Docker**
```bash
docker system prune -a
docker build --no-cache -t cinebook:latest .
```

---

## 📊 Informations du Projet

- **Langage**: TypeScript
- **Framework**: React Native + Expo
- **Backend**: Firebase
- **Type**: Application Mobile
- **Version**: 1.0.0

---

## 📄 Licence

MIT

---

## 👥 Auteur

**Hiba Hamdii**

---

**Merci d'utiliser CinéBook!** 🎬🍿

Arrêter le conteneur:
```bash
docker-compose down
```

## 📁 Structure du projet

```
├── app/              # Pages et layouts (Expo Router)
├── components/       # Composants réutilisables
├── constants/        # Constantes et thèmes
├── hooks/           # Hooks personnalisés
├── assets/          # Images et ressources
├── scripts/         # Scripts utilitaires
└── package.json     # Dépendances
```

## 🔧 Technologies

- React Native 0.81.5
- Expo 54.0
- Expo Router 6.0
- TypeScript
- React Native Reanimated
- React Navigation

## 📦 Dépendances principales

- `@react-navigation/*` - Navigation
- `expo-router` - Routing
- `react-native-reanimated` - Animations
- `expo-haptics` - Feedback haptique
- `@expo/vector-icons` - Icônes

## 📝 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Démarrer le serveur Expo |
| `npm run web` | Lancer sur le web |
| `npm run android` | Lancer sur Android |
| `npm run ios` | Lancer sur iOS |
| `npm run lint` | Vérifier le code |
| `npm run reset-project` | Réinitialiser le projet |

## 🐙 GitHub

### Initialiser Git

```bash
git init
git add .
git commit -m "Initial commit: MyApp project"
git branch -M main
git remote add origin https://github.com/votre-username/MyApp.git
git push -u origin main
```



## 👨‍💻 Auteurs
Hiba Hamdi
Mariem Rabhi


---

Pour plus d'informations:
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router/introduction/)
- [React Native](https://reactnative.dev/)
