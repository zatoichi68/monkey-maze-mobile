/**
 * Service AdMob pour Monkey Maze
 * Gestion des publicités via Google Mobile Ads
 */

import mobileAds, { TestIds, AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, MaxAdContentRating } from 'react-native-google-mobile-ads';

export class AdMobService {
  private static initialized = false;
  private static initializationPromise: Promise<void> | null = null;

  /**
   * Initialise AdMob avec configuration manuelle
   */
  static async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.performInitialization();
    return this.initializationPromise;
  }

  private static async performInitialization(): Promise<void> {
    try {
      console.log('🚀 Initialisation d\'AdMob...');
      
      // Configuration manuelle de l'App ID
      const adMobConfig = {
        android_app_id: 'ca-app-pub-7227752150836542~8940066846',
        ios_app_id: 'ca-app-pub-3940256099942544~1458002511',
      };

      // Initialisation d'AdMob avec configuration
      await mobileAds().initialize();
      
      // Configuration des paramètres de test
      await mobileAds().setRequestConfiguration({
        // Maximal Ad Request Level
        maxAdContentRating: MaxAdContentRating.G,
        // Disable personalized ads for GDPR compliance
        tagForChildDirectedTreatment: true,
        // Set test device IDs
        testDeviceIdentifiers: ['EMULATOR'],
      });

      this.initialized = true;
      console.log('🎯 AdMob initialisé avec succès !');
      console.log('📱 Configuration:', adMobConfig);
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation d\'AdMob:', error);
      this.initializationPromise = null;
      throw error;
    }
  }

  /**
   * Obtient l'ID de l'unité publicitaire bannière
   */
  static getBannerAdUnitId(): string {
    return TestIds.BANNER;
  }

  /**
   * Obtient l'ID de l'unité publicitaire interstitielle
   */
  static getInterstitialAdUnitId(): string {
    return 'ca-app-pub-7227752150836542/8550583404';
  }

  /**
   * Obtient l'ID de l'unité publicitaire récompensée
   */
  static getRewardedAdUnitId(): string {
    return TestIds.REWARDED;
  }

  /**
   * Vérifie si AdMob est initialisé
   */
  static isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Obtient la taille de bannière standard
   */
  static getBannerSize() {
    return BannerAdSize.BANNER;
  }
}

export default AdMobService; 