import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  build: {
    extend(config, { isDev }) {
      if (isDev) { config.devtool = 'inline-source-map'; };
    }
  },
  devModules: ['@nuxtjs/vuetify'],
  mode: 'spa',
  srcDir: 'src'
};

export default config;
