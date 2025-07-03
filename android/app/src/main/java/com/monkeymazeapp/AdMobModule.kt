package com.monkeymazeapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.initialization.InitializationStatus
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener
import android.widget.LinearLayout
import com.facebook.react.bridge.UiThreadUtil

class AdMobModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    private var isInitialized = false
    
    override fun getName(): String {
        return "AdMobModule"
    }
    
    @ReactMethod
    fun initialize(promise: Promise) {
        if (isInitialized) {
            promise.resolve("AdMob already initialized")
            return
        }
        
        UiThreadUtil.runOnUiThread {
            try {
                MobileAds.initialize(reactApplicationContext) { initializationStatus ->
                    isInitialized = true
                    promise.resolve("AdMob initialized successfully")
                }
            } catch (e: Exception) {
                promise.reject("ADMOB_INIT_ERROR", "Failed to initialize AdMob: ${e.message}")
            }
        }
    }
    
    @ReactMethod
    fun loadBannerAd(promise: Promise) {
        UiThreadUtil.runOnUiThread {
            try {
                // Using test banner ad unit ID
                val testAdUnitId = "ca-app-pub-3940256099942544/6300978111"
                
                val adView = AdView(reactApplicationContext)
                adView.setAdSize(AdSize.BANNER)
                adView.adUnitId = testAdUnitId
                
                val adRequest = AdRequest.Builder().build()
                adView.loadAd(adRequest)
                
                promise.resolve("Banner ad loaded successfully")
            } catch (e: Exception) {
                promise.reject("BANNER_LOAD_ERROR", "Failed to load banner: ${e.message}")
            }
        }
    }
    
    @ReactMethod
    fun getBannerAdUnitId(promise: Promise) {
        // Return test ad unit ID for development
        promise.resolve("ca-app-pub-3940256099942544/6300978111")
    }
} 