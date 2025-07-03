/**
 * Monkey Maze Mobile App - Version Simple pour Play Store
 * Affiche le jeu Monkey Maze via WebView
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import CONFIG from './config';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    Alert.alert(
      CONFIG.MESSAGES.CONNECTION_ERROR,
      CONFIG.MESSAGES.CONNECTION_ERROR_MESSAGE,
      [{ text: 'OK' }]
    );
  };

  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log('📩 Message reçu du jeu:', message);
      
      switch (message.type) {
        case 'LEVEL_COMPLETED':
          console.log('🎉 Niveau terminé !', message.data);
          break;
        case 'GAME_OVER':
          console.log('💀 Game Over', message.data);
          break;
        default:
          console.log('📨 Message non géré:', message);
      }
    } catch (error) {
      console.log('📧 Message texte:', event.nativeEvent.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#2c3e50"
        translucent={false}
      />
      
      {/* Header simple */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🐒 Monkey Maze</Text>
        <Text style={styles.headerSubtitle}>Le jeu de puzzle addictif</Text>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e74c3c" />
          <Text style={styles.loadingText}>{CONFIG.MESSAGES.LOADING}</Text>
        </View>
      )}

      {/* WebView */}
      {!error && (
        <WebView
          source={{ uri: CONFIG.GAME_URL }}
          style={styles.webview}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          userAgent={`${CONFIG.APP.USER_AGENT_SUFFIX} ${Platform.OS}`}
        />
      )}

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>😞</Text>
          <Text style={styles.errorTitle}>{CONFIG.MESSAGES.ERROR_TITLE}</Text>
          <Text style={styles.errorText}>
            {CONFIG.MESSAGES.ERROR_MESSAGE}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  header: {
    backgroundColor: '#2c3e50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#34495e',
  },
  headerTitle: {
    color: '#ecf0f1',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#95a5a6',
    fontSize: 14,
  },
  webview: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    zIndex: 1000,
  },
  loadingText: {
    color: '#ecf0f1',
    fontSize: 16,
    marginTop: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  errorTitle: {
    color: '#e74c3c',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    color: '#ecf0f1',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default App; 