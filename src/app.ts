import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { UserProductRouter, UserProductsRouter } from './router/user-product';
import { ProductsRouter } from './router/products';
import { UserRouter } from './router/user';
import { AuthRouter } from './router/auth';

const app = express();

const corsOptions = {
  origin: process.env.PUBLIC_WEB_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const port = 4000;
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Node 20 Express API with Swagger',
      version: '0.1.0',
      description: 'This API was made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Lazaro',
        url: 'https://github.com/lazarok09',
        email: 'lazarok09@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./src/controllers/**/*.ts', './src/controllers/**/*docs.yaml'],
};

const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);
// Welcome route
app.get('/', async (_, res) => {
  res.send(
    `<div><h1>Welcome to the API</h1><p> Access the <a href=${process.env.PUBLIC_API_URL}/api-docs>docs</a> to more details.</p></div>`,
  );
});

app.use('/', cors(corsOptions));
// Auth
app.use('/auth', AuthRouter());

// User

app.use('/user', UserRouter());
// Public product
app.use('/products', ProductsRouter());


// User Product
app.use('/user/products', UserProductsRouter());
app.use('/user/product', UserProductRouter());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
