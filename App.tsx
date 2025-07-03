/**
 * Monkey Maze Mobile App
 * Affiche le jeu Monkey Maze via WebView
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
// import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import CONFIG from './config';
// import { AdMobService } from './services/AdMobService';
// import { AdMobNativeService } from './services/AdMobNativeService';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Gestion des messages AdMob depuis WebView
  const handleWebViewMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === 'ADMOB_INITIALIZED') {
        console.log('🎯 AdMob JavaScript initialisé dans WebView:', message.status);
      }
    } catch (error) {
      console.log('Message WebView:', event.nativeEvent.data);
    }
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    Alert.alert(
      'Erreur de connexion',
      'Impossible de charger le jeu. Vérifiez votre connexion internet.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#1a1a1a" 
        translucent={false} 
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🐒 Monkey Maze</Text>
      </View>

      {/* WebView Container */}
      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: CONFIG.gameUrl }}
          style={styles.webView}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onMessage={handleWebViewMessage}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ff6b35" />
              <Text style={styles.loadingText}>Chargement du jeu...</Text>
            </View>
          )}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          scrollEnabled={true}
          scalesPageToFit={Platform.OS === 'android'}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          injectedJavaScript={CONFIG.admob.script}
        />

        {/* Loading Overlay */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#ff6b35" />
            <Text style={styles.loadingText}>Chargement du jeu...</Text>
          </View>
        )}

        {/* Error Overlay */}
        {error && (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>❌</Text>
            <Text style={styles.errorMessage}>
              Impossible de charger le jeu
            </Text>
          </View>
        )}
      </View>

      {/* Bannière publicitaire AdMob - Temporairement désactivé */}
      {/* <View style={styles.adContainer}>
        <BannerAd
          unitId={AdMobService.getBannerAdUnitId()}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => console.log('🎯 Bannière AdMob chargée avec succès sur Android !')}
          onAdFailedToLoad={(error) => console.log('❌ Erreur bannière AdMob:', error)}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    height: 60,
    backgroundColor: '#2d2d2d',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ff6b35',
    ...Platform.select({
      ios: {
        paddingTop: 44,
        height: 104,
      },
      android: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  errorText: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  adContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
  },
});

export default App; 