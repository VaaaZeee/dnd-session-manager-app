import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'DnD Session Manager',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
