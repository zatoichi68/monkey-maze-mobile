# 🚀 GUIDE PUBLICATION GOOGLE PLAY STORE - MONKEY MAZE

## 📋 PRÉREQUIS COMPLÉTÉS ✅

- ✅ **Keystore de production créé** : `monkey-maze-upload-key.keystore`
- ✅ **Configuration de signature** : gradle.properties et build.gradle mis à jour
- ✅ **App fonctionnelle** : Tests réussis sur iOS Simulator
- ✅ **Configuration de base** : app.json, AndroidManifest.xml

## 🎯 ÉTAPES DE PUBLICATION

### **ÉTAPE 1 : Finaliser la configuration Android**

#### 1.1 Créer l'APK de production
```bash
cd /Applications/MonkeyMazeApp/android
./gradlew assembleRelease
```

#### 1.2 Localisation de l'APK généré
L'APK sera créé dans : `android/app/build/outputs/apk/release/app-release.apk`

### **ÉTAPE 2 : Préparer les assets pour le Play Store**

#### 2.1 Icônes et captures d'écran requises
- **Icône de l'application** : 512x512 pixels (PNG de haute qualité)
- **Feature Graphic** : 1024x500 pixels
- **Captures d'écran** : 
  - Téléphone : minimum 2, maximum 8 images
  - Tablette : minimum 1, maximum 8 images
  - Tailles recommandées : 1080x1920 (portrait) ou 1920x1080 (paysage)

#### 2.2 Textes marketing requis
- **Titre** : "Monkey Maze" (30 caractères max)
- **Description courte** : 80 caractères max
- **Description longue** : 4000 caractères max
- **Catégorie** : Jeux / Puzzle ou Arcade

### **ÉTAPE 3 : Compte développeur Google Play**

#### 3.1 Créer un compte développeur
1. Aller sur [Google Play Console](https://play.google.com/console)
2. Payer les frais d'inscription uniques (25 USD)
3. Vérifier votre identité

#### 3.2 Politique de confidentialité
**OBLIGATOIRE** : Créer une politique de confidentialité accessible en ligne

### **ÉTAPE 4 : Configuration Play Console**

#### 4.1 Créer une nouvelle application
1. Se connecter à Google Play Console
2. Cliquer sur "Créer une application"
3. Choisir la langue par défaut : Français
4. Nom de l'application : "Monkey Maze"
5. Type d'application : Application

#### 4.2 Remplir les informations obligatoires

**Contenu de l'application :**
- Description de l'application
- Captures d'écran
- Icône de l'application

**Classification du contenu :**
- Remplir le questionnaire sur le contenu
- Age approprié : Tous âges (3+)

**Prix et distribution :**
- Application gratuite
- Pays/régions de distribution
- Consentement aux politiques

### **ÉTAPE 5 : Upload de l'APK**

#### 5.1 Version de test interne (RECOMMANDÉ)
1. Aller dans "Tests" > "Test interne"
2. Créer une nouvelle version
3. Uploader l'APK `app-release.apk`
4. Renseigner les notes de version

#### 5.2 Publication en production
1. Aller dans "Production"
2. Créer une nouvelle version
3. Uploader l'APK
4. Remplir les notes de version
5. Examiner et publier

### **ÉTAPE 6 : Informations légales**

#### 6.1 Politique de confidentialité (EXEMPLE)
```
POLITIQUE DE CONFIDENTIALITÉ - MONKEY MAZE

Cette application est un jeu de puzzle simple qui ne collecte aucune donnée personnelle.

Données collectées : Aucune
Données partagées : Aucune
Données stockées : Scores locaux uniquement

Contact : [votre-email@domain.com]
```

#### 6.2 Description de l'application (EXEMPLE)
```
🐒 MONKEY MAZE - LE JEU DE PUZZLE ADDICTIF !

Aidez le singe à naviguer dans des labyrinthes de plus en plus complexes !

🎮 FONCTIONNALITÉS :
• Gameplay intuitif et addictif
• Niveaux progressifs de difficulté
• Interface claire et colorée
• Adapté à tous les âges

🏆 POURQUOI JOUER À MONKEY MAZE ?
• Améliore la logique et la réflexion
• Divertissement garanti
• Pas de publicités intrusives
• Gratuit à télécharger

Téléchargez maintenant et commencez l'aventure !
```

## 🔧 DÉPANNAGE

### Problème : APK trop volumineux
**Solution :** Utiliser App Bundle (AAB) au lieu d'APK :
```bash
./gradlew bundleRelease
```

### Problème : Erreurs de signature
**Solution :** Vérifier les mots de passe dans `gradle.properties`

### Problème : Rejet de l'application
**Causes communes :**
- Politique de confidentialité manquante
- Captures d'écran non conformes
- Description incomplète
- Classification de contenu incorrecte

## 📱 APRÈS PUBLICATION

### Suivi des performances
- Utiliser Google Play Console Analytics
- Surveiller les crashes et ANR
- Répondre aux avis utilisateurs

### Mises à jour
- Augmenter `versionCode` dans `build.gradle`
- Mettre à jour `versionName`
- Publier les nouvelles versions

## 🎯 PROCHAINES ÉTAPES

1. **Version 1.0.0** : Publication de base sans AdMob
2. **Version 1.1.0** : Intégration AdMob complète
3. **Version 1.2.0** : Fonctionnalités supplémentaires

---

📞 **SUPPORT** : Pour toute aide, contactez Steve Rioux
📅 **Dernière mise à jour** : Janvier 2025 