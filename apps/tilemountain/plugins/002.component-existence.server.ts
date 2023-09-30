import { defineNuxtPlugin } from '#app'
import fs from 'fs'
import path from 'path'

export default defineNuxtPlugin(nuxtApp => {
  const { $config } = nuxtApp;
  const store = useComponentStore();
  const componentRegistry: { [key: string]: string } = {};

  const getDynamicPages = (dir: string) => {
    if (!dir) return [];
    const fullPath = path.join(dir, 'pages', '_dynamic');
    let files: string[] = [];
    try {
      if (fs.existsSync(fullPath)) {
        files = fs.readdirSync(fullPath)
          .filter(file => file.startsWith('_') && file.endsWith('.vue'));
      }
    } catch (error) {
      console.error(`Error reading dynamic pages: ${error}`);
    }
    return files;
  }

  const checkAndRegisterComponent = (rootPath: string, alias: string, page: string) => {
    const relativeComponentPath: string = `pages/_dynamic/${page}`;
    const fullPath: string = path.resolve(rootPath, relativeComponentPath);
    try {
      if (fs.existsSync(fullPath)) {
        componentRegistry[page] = `${alias}/${relativeComponentPath}`;
        return true;
      }
    } catch (error) {
      console.error(`Error checking component existence: ${error}`);
    }
    return false;
  }

  const themeDir = $config.public.rootDir;
  const baseDir = $config.public.baseDir;
  let dynamicPages: string[] = [...new Set([...getDynamicPages(themeDir), ...getDynamicPages(baseDir)])];
  dynamicPages.forEach((page) => {
    if (!checkAndRegisterComponent(themeDir,'@theme', page)) {
      checkAndRegisterComponent(baseDir,'@base', page)
    }
  });

  // Store in Pinia store
  store.setComponentRegistry(componentRegistry);
});
