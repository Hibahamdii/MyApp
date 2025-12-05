# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Installer les dépendances système requises pour Expo
RUN apk add --no-cache python3 make g++ bash

# Copier depuis le stage de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Exposer le port Expo
EXPOSE 8081 19000 19001

# Démarrer le serveur Expo
CMD ["npm", "start"]
