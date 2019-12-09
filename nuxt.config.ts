import { Configuration } from '@nuxt/types';

const config: Configuration = {
  build: {
    extend(config, { isDev }) {
      if (isDev) { config.devtool = 'inline-source-map'; };
    }
  },
  buildModules: ['@nuxt/typescript-build'],
  devModules: ['@nuxtjs/vuetify'],
  mode: 'spa',
  srcDir: 'src'
};

export default config;
