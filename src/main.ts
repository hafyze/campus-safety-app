import { Capacitor } from '@capacitor/core';

if (!Capacitor.isNativePlatform()) {
  // Polyfill: use browser geolocation
  (navigator as any).geolocation = navigator.geolocation;
}
