#!/bin/bash

# 🐒 Monkey Maze - Générateur d'icônes Android
# Ce script génère les icônes mipmap pour Android à partir de la grande icône iOS (1024x1024)
# ou, si elle n'existe pas encore, à partir du SVG `icon-template.svg`.

set -euo pipefail

# Chemins
IOS_ICON="ios/MonkeyMazeApp/Images.xcassets/AppIcon.appiconset/icon-1024.png"
SVG_FILE="icon-template.svg"
ANDROID_RES_DIR="MonkeyMazeApp/android/app/src/main/res"

# Tableaux densité ↔︎ taille (compatible bash 3)
densities=(mdpi hdpi xhdpi xxhdpi xxxhdpi)
sizes=(48 72 96 144 192)

# Vérifier ImageMagick
if ! command -v magick &> /dev/null; then
  echo "❌ ImageMagick (commande 'magick') est requis mais non installé."
  exit 1
fi

# Choisir la source
if [ -f "$IOS_ICON" ]; then
  SRC="$IOS_ICON"
  echo "📥 Utilisation de l'icône iOS existante ($IOS_ICON) comme source."
elif [ -f "$SVG_FILE" ]; then
  SRC="$SVG_FILE"
  echo "📥 Utilisation de $SVG_FILE comme source."
else
  echo "❌ Impossible de trouver une source d'icône (ni $IOS_ICON ni $SVG_FILE)."
  exit 1
fi

# Génération des icônes
for idx in "${!densities[@]}"; do
  density=${densities[$idx]}
  size=${sizes[$idx]}
  out_dir="$ANDROID_RES_DIR/mipmap-$density"
  mkdir -p "$out_dir"
  echo "🎨 Génération ${density} (${size}x${size})..."
  magick "$SRC" -resize ${size}x${size} "$out_dir/ic_launcher.png"
  magick "$SRC" -resize ${size}x${size} "$out_dir/ic_launcher_round.png"
  echo "✅ $out_dir/ic_launcher.png"
done

echo "🚀 Icônes Android générées avec succès ! N'oubliez pas de reconstruire l'APK." 