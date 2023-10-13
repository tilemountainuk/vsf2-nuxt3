import express from 'express';
import cors from 'cors'
import { createServer } from '@vue-storefront/middleware';
import '@vue-storefront/magento-api/server/index.js';
import config from './middleware.config';
// const app = express();
(async () => {
  const app = await createServer({ integrations: config.integrations });

  const allowedHosts = [
    ".*divante.pl",
    ".*vuestorefront.io",
    ".*bathroom.com",
    ".*tiles247.co.pk",
    ".*tilemountain.co.uk",
    ".*tm8.co.uk",
    ".*vercel.app",
    "localhost"
  ];

  app.use(cors({
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (!origin) return callback(null, true); // allow requests with no origin

      const isAllowed = allowedHosts.some((host) => {
        const regex = new RegExp(host, 'i'); // case-insensitive
        return regex.test(origin);
      });

      if (isAllowed) {
        return callback(null, true);
      } else {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
    }
  }));

  app.get('/', (req, res) => {
    res.send('Welcome to the simple Express server!');
  });

  const PORT = process.env.SERVER_PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
