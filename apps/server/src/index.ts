import express from 'express';
import { createServer } from '@vue-storefront/middleware';
import '@vue-storefront/magento-api/server/index.js';
import config from './middleware.config';
// const app = express();
(async () => {
  const app = await createServer({ integrations: config.integrations });

  app.get('/', (req, res) => {
    res.send('Welcome to the simple Express server!');
  });

  const PORT = process.env.SERVER_PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
