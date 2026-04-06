#!/bin/bash

set -euo pipefail

APP_NAME="dellresolve"

echo "Atualizando código..."
git pull --ff-only origin main

echo "Limpando build anterior..."
rm -rf .next

echo "Instalando dependências..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

echo "Gerando build..."
npm run build

echo "Recarregando aplicação no PM2..."
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start npm --name "$APP_NAME" -- start
fi

echo "Deploy concluído com sucesso."
