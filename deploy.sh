#!/bin/bash

echo "Atualizando código..."
git pull origin main

echo "Instalando dependências..."
npm install

echo "Gerando build..."
npm run build

if [ $? -eq 0 ]; then
  echo "Build OK — reiniciando servidor"
  pm2 restart dellresolve
else
  echo "Erro no build — servidor NÃO reiniciado"
fi
