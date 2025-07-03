#!/bin/bash

# 🐒 Monkey Maze — Générateur d'icônes iOS (AppIcon.appiconset)
# Utilise ImageMagick pour redimensionner une image source (1024x1024 PNG ou SVG)
# vers toutes les tailles requises par Xcode.
# Place les fichiers générés dans ios/MonkeyMazeApp/Images.xcassets/AppIcon.appiconset

set -euo pipefail

IOS_ICONSET="MonkeyMazeApp/ios/MonkeyMazeApp/Images.xcassets/AppIcon.appiconset"
SRC_PNG="ios-icon-1024.png"
SVG_FALLBACK="icon-template.svg"

# Créer dossier s'il n'existe pas
mkdir -p "$IOS_ICONSET"

# Si un PNG 1024 existe à côté du script on l'utilise, sinon on exporte depuis le SVG template.
if [[ -f "$SRC_PNG" ]]; then
  SRC="$SRC_PNG"
else
  if [[ ! -f "$SVG_FALLBACK" ]]; then
    echo "❌ Source icon introuvable (ni $SRC_PNG ni $SVG_FALLBACK)" >&2
    exit 1
  fi
  echo "🎨 Export du SVG vers PNG 1024x1024…"
  magick "$SVG_FALLBACK" -background none -resize 1024x1024 "$SRC_PNG"
  SRC="$SRC_PNG"
fi

declare -a sizes=(
  "20 2" "20 3" \
  "29 2" "29 3" \
  "40 2" "40 3" \
  "60 2" "60 3" \
  "1024 1"
)

# Nettoyer anciens PNG
find "$IOS_ICONSET" -type f -name "icon-*\.png" -delete || true

json_images="[]"

for entry in "${sizes[@]}"; do
  pt=$(echo "$entry" | awk '{print $1}')
  scale=$(echo "$entry" | awk '{print $2}')
  px=$((pt * scale))
  if [[ "$pt" == "1024" ]]; then
    filename="icon-1024.png"
    idiom="ios-marketing"
  else
    filename="icon-${pt}@${scale}x.png"
    idiom="iphone"
  fi
  echo "📐 $filename (${px}x${px})"
  magick "$SRC" -resize ${px}x${px} "$IOS_ICONSET/$filename"

  # Concat JSON entry
  json_images=$(jq \
    --arg idiom "$idiom" \
    --arg size "${pt}x${pt}" \
    --arg scale "${scale}x" \
    --arg filename "$filename" \
    '. + [{idiom:$idiom,size:$size,scale:$scale,filename:$filename}]' <<< "$json_images")
done

# Écrire Contents.json
cat > "$IOS_ICONSET/Contents.json" <<JSON
{
  "images" : $(echo "$json_images" | jq --compact-output),
  "info" : { "author" : "script", "version" : 1 }
}
JSON

echo "✅ Icônes iOS générées dans $IOS_ICONSET" 