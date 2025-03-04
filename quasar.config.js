/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require('quasar/wrappers');
const env = require('dotenv');

const generateRandomName = () => {
  return Math.random().toString(36).substring(2, 15);
};

module.exports = configure(function (/* ctx */) {
  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: ['components', 'axios'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ['app.scss', 'tailwind.css'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      env: env.config().parsed,
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20',
      },
      cssCodeSplit: true,
      preloadChunks: false,
      sourcemap: true,
      cssMinify: true,
      jsMinify: true,
      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      publicPath: '/',
      analyze: true,
      // rawDefine: {}
      // ignorePublicFolder: true,
      minify: true,
      // polyfillModulePreload: true,
      // distDir

      extendViteConf(viteConf) {
        viteConf.build = {
          ...viteConf.build,
          output: {
            inlineDynamicImports: false,
            chunkFileNames: '[name]-[hash].js',
            entryFileNames: '[name]-[hash].js',
            assetFileNames: '[name]-[hash].[ext]',
          },
          rollupOptions: {
            manualChunks(id) {
              // if (id.includes('node_modules')) {
              //   const vendorMap = new Map([
              //     ['quasar', 'vendor-quasar'],
              //     ['vue', 'vendor-vue'],
              //     ['vue-router', 'vendor-vue-router'],
              //     ['axios', 'vendor-axios'],
              //     ['moment', 'vendor-moment'],
              //     ['jspdf', 'vendor-jspdf'],
              //     ['crypto-js', 'vendor-crypto-js'],
              //     ['html2canvas', 'vendor-html2canvas'],
              //     ['canvg', 'vendor-canvg'],
              //   ]);

              //   const vendor = [...vendorMap.keys()].find((lib) =>
              //     id.includes(lib)
              //   );
              //   if (vendor) return vendorMap.get(vendor);

              //   const parts = id.split('node_modules/')[1].split('/');
              //   return `vendor-${parts[0]}`;
              // }

              if (id.includes('node_modules')) {
                const vendorMap = new Map([
                  ['jspdf', 'vendor-jspdf'],
                  ['html2canvas', 'vendor-html2canvas'],
                  ['moment', 'vendor-moment'],
                  ['jspdf-autotable', 'vendor-jspdf-autotable'],
                  ['runtime-core', 'vendor-runtime-core'],
                  ['vue', 'vendor-vue'],
                  ['vue-router', 'vendor-vue-router'],
                  ['axios', 'vendor-axios'],
                  ['crypto-js', 'vendor-crypto-js'],
                  ['canvg', 'vendor-canvg'],
                ]);

                const vendor = [...vendorMap.keys()].find((lib) =>
                  id.includes(lib)
                );
                if (vendor) return vendorMap.get(vendor);

                const parts = id.split('node_modules/')[1].split('/');
                return `vendor-${parts[0]}`;
              }

              if (id.includes('/src/shared/components/')) {
                return `component-${generateRandomName()}`;
              }
              if (id.endsWith('.svg')) {
                return `svg-${generateRandomName()}`;
              }
            },
            preserveEntrySignatures: 'strict',
          },
          target: 'esnext',
        };
        viteConf.optimizeDeps = {
          ...viteConf.optimizeDeps,
          esbuildOptions: {
            target: 'esnext',
          },
        };
      },
      // viteVuePluginOptions: {},

      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            vueTsc: {
              tsconfigPath: 'tsconfig.vue-tsc.json',
            },
            eslint: {
              lintCommand: 'eslint "./**/*.{js,ts,mjs,cjs,vue}"',
            },
          },
          { server: false },
        ],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true
      host: '0.0.0.0',
      port: 3000,
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['Notify'],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render', // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // useFilenameHashes: true,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'IPersonal',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: ['my-content-script'],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    },
  };
});
