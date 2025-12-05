# MyApp

[![CI/CD](https://github.com/votre-username/MyApp/workflows/CI%2FCD/badge.svg)](https://github.com/votre-username/MyApp/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Une application React Native moderne avec Expo Router, TypeScript et support Docker.

## 🚀 Démarrage rapide

### Localement

```bash
# Cloner et installer
git clone https://github.com/votre-username/MyApp.git
cd MyApp
npm install

# Démarrer
npm start
```

### Avec Docker

```bash
docker-compose up -d
```

## 📋 Prérequis

- Node.js 20+
- npm/yarn
- Docker (optionnel)

## 🐳 Docker

**Build:**
```bash
docker build -t myapp .
```

**Run:**
```bash
docker run -p 8081:8081 -p 19000:19000 -p 19001:19001 myapp
```

**Compose:**
```bash
docker-compose up
```

## 🔧 Scripts

```bash
npm start          # Démarrer le serveur Expo
npm run web        # Lancer sur web
npm run android    # Lancer sur Android
npm run ios        # Lancer sur iOS
npm run lint       # Vérifier le code
```

## 📁 Structure

```
├── app/              # Pages (Expo Router)
├── components/       # Composants
├── constants/        # Config
├── hooks/           # Hooks
└── assets/          # Ressources
```

## 🔗 GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/MyApp.git
git push -u origin main
```

## 📦 Tech Stack

- React Native 0.81
- Expo 54
- TypeScript
- Expo Router
- React Navigation
- Reanimated

## 📝 Licence

MIT

## 🤝 Support

Pour des questions ou des bugs, ouvrez une issue sur GitHub.
