# MyApp - React Native + Expo

Une application React Native avec Expo Router et TypeScript.

## 📋 Prérequis

- Node.js 20+
- npm ou yarn
- Docker (optionnel)

## 🚀 Installation locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/MyApp.git
cd MyApp

# Installer les dépendances
npm install

# Démarrer le projet
npm start
```

### Options de démarrage

- **Web**: `npm run web`
- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Linter**: `npm run lint`

## 🐳 Docker

### Construire l'image

```bash
docker build -t myapp:latest .
```

### Lancer avec Docker

```bash
docker run -p 8081:8081 -p 19000:19000 -p 19001:19001 myapp:latest
```

### Avec Docker Compose

```bash
docker-compose up -d
```

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

## 📄 Licence

MIT

## 👨‍💻 Auteur

Votre Nom

---

Pour plus d'informations:
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router/introduction/)
- [React Native](https://reactnative.dev/)
