#!/bin/bash

# 🐒 Monkey Maze - Générateur d'icônes iOS
echo "🎨 Génération des icônes iOS pour Monkey Maze..."

# Répertoire source et destination
SVG_FILE="icon-template.svg"
ICON_DIR="ios/MonkeyMazeApp/Images.xcassets/AppIcon.appiconset"

# Vérifier que le fichier SVG existe
if [ ! -f "$SVG_FILE" ]; then
    echo "❌ Erreur: $SVG_FILE non trouvé"
    exit 1
fi

# Créer le répertoire si nécessaire
mkdir -p "$ICON_DIR"

echo "📱 Génération des icônes iPhone..."

# Générer toutes les tailles d'icônes requises
magick "$SVG_FILE" -resize 40x40 "$ICON_DIR/icon-20@2x.png"
magick "$SVG_FILE" -resize 60x60 "$ICON_DIR/icon-20@3x.png"
magick "$SVG_FILE" -resize 58x58 "$ICON_DIR/icon-29@2x.png"
magick "$SVG_FILE" -resize 87x87 "$ICON_DIR/icon-29@3x.png"
magick "$SVG_FILE" -resize 80x80 "$ICON_DIR/icon-40@2x.png"
magick "$SVG_FILE" -resize 120x120 "$ICON_DIR/icon-40@3x.png"
magick "$SVG_FILE" -resize 120x120 "$ICON_DIR/icon-60@2x.png"
magick "$SVG_FILE" -resize 180x180 "$ICON_DIR/icon-60@3x.png"
magick "$SVG_FILE" -resize 1024x1024 "$ICON_DIR/icon-1024.png"

echo "📋 Mise à jour du fichier Contents.json..."

# Créer le nouveau fichier Contents.json avec les noms de fichiers
cat > "$ICON_DIR/Contents.json" << EOF
{
  "images" : [
    {
      "filename" : "icon-20@2x.png",
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "20x20"
    },
    {
      "filename" : "icon-20@3x.png",
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "20x20"
    },
    {
      "filename" : "icon-29@2x.png",
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "29x29"
    },
    {
      "filename" : "icon-29@3x.png",
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "29x29"
    },
    {
      "filename" : "icon-40@2x.png",
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "40x40"
    },
    {
      "filename" : "icon-40@3x.png",
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "40x40"
    },
    {
      "filename" : "icon-60@2x.png",
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "60x60"
    },
    {
      "filename" : "icon-60@3x.png",
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "60x60"
    },
    {
      "filename" : "icon-1024.png",
      "idiom" : "ios-marketing",
      "scale" : "1x",
      "size" : "1024x1024"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
EOF

echo "✅ Icônes générées avec succès!"
echo "📱 Tailles créées :"
echo "   • 40x40px (20@2x)"
echo "   • 60x60px (20@3x)"  
echo "   • 58x58px (29@2x)"
echo "   • 87x87px (29@3x)"
echo "   • 80x80px (40@2x)"
echo "   • 120x120px (40@3x)"
echo "   • 120x120px (60@2x)"
echo "   • 180x180px (60@3x)"
echo "   • 1024x1024px (App Store)"
echo ""
echo "🚀 Prêt pour la compilation iOS!" 