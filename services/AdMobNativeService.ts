/**
 * Service AdMob Natif pour Monkey Maze
 * Utilise le module AdMob natif Android créé en Kotlin
 */

import { NativeModules } from 'react-native';

const { AdMobModule } = NativeModules;

export class AdMobNativeService {
  private static initialized = false;

  /**
   * Initialise AdMob via le module natif
   */
  static async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      if (AdMobModule) {
        const result = await AdMobModule.initialize();
        this.initialized = true;
        console.log('🎯 AdMob Native initialisé avec succès:', result);
      } else {
        throw new Error('AdMob Native Module not found');
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation d\'AdMob Native:', error);
      throw error;
    }
  }

  /**
   * Charge une bannière publicitaire
   */
  static async loadBannerAd(): Promise<void> {
    try {
      if (AdMobModule) {
        const result = await AdMobModule.loadBannerAd();
        console.log('🎯 Bannière AdMob Native chargée:', result);
      } else {
        throw new Error('AdMob Native Module not found');
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement de la bannière:', error);
      throw error;
    }
  }

  /**
   * Obtient l'ID de l'unité publicitaire bannière
   */
  static async getBannerAdUnitId(): Promise<string> {
    try {
      if (AdMobModule) {
        return await AdMobModule.getBannerAdUnitId();
      } else {
        throw new Error('AdMob Native Module not found');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de l\'ID AdMob:', error);
      return 'ca-app-pub-3940256099942544/6300978111'; // Fallback test ID
    }
  }

  /**
   * Vérifie si AdMob est initialisé
   */
  static isInitialized(): boolean {
    return this.initialized;
  }
} 