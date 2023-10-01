const initStores = (storePaths) => {
  for (const path in storePaths) {
    const module = storePaths[path];
    if (module.default) {
      module.default();
    }
  }
}

const initAllStores = () => {
  // Base App Modules
  const baseStores = import.meta.glob('@base/stores/**/*.ts', { eager: true });

  // Web App Modules (if any)
  const webAppStores = import.meta.glob('~/stores/**/*.ts', { eager: true });

  initStores(baseStores);
  initStores(webAppStores);
}

export default defineNuxtPlugin((nuxtApp) => {
  initAllStores();
});
