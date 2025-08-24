import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.campus-safety.app',
  appName: 'Campus Safety App',
  webDir: 'build',
  plugins: {
    LiveUpdates: {
      appId: 'bd2faea3',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  }
};

export default config;
