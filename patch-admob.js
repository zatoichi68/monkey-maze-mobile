#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Patching react-native-google-mobile-ads...');

// Chemin vers le build.gradle d'AdMob
const admobBuildGradle = path.join(__dirname, 'node_modules/react-native-google-mobile-ads/android/build.gradle');

if (fs.existsSync(admobBuildGradle)) {
  let content = fs.readFileSync(admobBuildGradle, 'utf8');
  
  // Patch 1: Remplacer la vérification googleMobileAdsJson
  content = content.replace(
    'if (rootProject.ext.googleMobileAdsJson) {',
    'if (false) { // Patched - configuration disabled'
  );
  
  // Patch 2: Fixer compileSdk
  content = content.replace(
    'compileSdk: jsonCompileSdk,',
    'compileSdk 35'
  );
  
  // Patch 3: Ajouter une configuration par défaut
  const defaultConfig = `
project.ext {
  appJSONGoogleMobileAdsAppIDString = "ca-app-pub-3940256099942544~3347511713"
  appJSONGoogleMobileAdsDelayAppMeasurementInitBool = true
  appJSONGoogleMobileAdsOptimizeInitializationBool = true
}
`;
  
  content = content.replace(
    'apply plugin: "com.android.library"',
    `apply plugin: "com.android.library"\n${defaultConfig}`
  );
  
  fs.writeFileSync(admobBuildGradle, content);
  console.log('✅ AdMob build.gradle patched successfully!');
} else {
  console.log('❌ AdMob build.gradle not found');
}

console.log('🎯 AdMob patch completed!'); 