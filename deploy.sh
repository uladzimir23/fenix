#!/bin/bash

echo "🚀 Starting full deployment process..."

# Проверяем что есть изменения для коммита
if git diff-index --quiet HEAD --; then
    echo "📝 No changes to commit"
else
    echo "📝 Committing changes..."
    git add .
    git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
fi

# Собираем и деплоим проект
echo "📦 Building and deploying..."
npm run build
npm run deploy

echo "✅ Deployment completed!"
echo "🌐 Your site is live at: https://uladzimir23.github.io/fenix"