const CONFIG = {
  // URL du jeu Monkey Maze
  gameUrl: 'https://monkeymaze.pages.dev',
  
  // Configuration AdMob
  admob: {
    // IDs de test Google AdMob
    android_app_id: 'ca-app-pub-7227752150836542~8940066846',
    ios_app_id: 'ca-app-pub-3940256099942544~1458002511',
    banner_ad_unit_id: 'ca-app-pub-3940256099942544/6300978111',
    
    // Script AdMob à injecter dans le WebView
    script: `
      (function() {
        // Créer et injecter le script Google AdSense
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3940256099942544';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        // Créer la bannière AdMob
        var adContainer = document.createElement('ins');
        adContainer.className = 'adsbygoogle';
        adContainer.style.cssText = 'display:block; position:fixed; bottom:0; left:0; right:0; height:50px; z-index:9999; background:#fff; width:100%;';
        adContainer.setAttribute('data-ad-client', 'ca-pub-3940256099942544');
        adContainer.setAttribute('data-ad-slot', '6300978111');
        adContainer.setAttribute('data-ad-format', 'horizontal');
        
        // Ajouter la bannière au body
        document.body.appendChild(adContainer);
        
        // Initialiser AdSense quand le script est chargé
        script.onload = function() {
          try {
            (adsbygoogle = window.adsbygoogle || []).push({});
            console.log('🎯 AdMob JavaScript initialisé dans WebView');
            
            // Message vers React Native
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'ADMOB_INITIALIZED',
                status: 'success'
              }));
            }
          } catch (error) {
            console.error('Erreur AdMob:', error);
          }
        };
      })();
      true; // Éviter les erreurs d'injection
    `
  }
};

module.exports = CONFIG; 